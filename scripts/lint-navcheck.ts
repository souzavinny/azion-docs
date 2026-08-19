/**
 * lint-navcheck.ts — validates every curated menu JSON (src/i18n/*.menu.json and
 * src/i18n/menus/*.menu.json) and reports sidebar coverage. Run with: npm run lint:navcheck (tsx).
 *
 * Hard errors (exit 1): JSON slug that resolves to no content permalink in its
 * language; duplicate keys across all menus; rows with neither slug nor items;
 * depth > 5; group `ui` key missing from the EN ui dictionary; product menus
 * without valid meta; nav rows whose `menu` has no matching menu file or whose
 * slug differs from that menu's root; product menus referenced by no nav row;
 * pages whose explicit menu_namespace is unregistered or whose permalink is
 * missing from the JSON menu they select.
 * Informational: rows at depth 4; PT twin fallback report; orphan report.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { DEFAULT_MOBILE_ANCHORS, type NavMenuJson, type NavEntry } from '../src/i18n/nav-transform';
import { availableMenus } from '../src/data/availableMenu';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'pt-br'] as const;
type Lang = (typeof LANGS)[number];

// The main sidebar is pillars + flat product children; children open their own sidebar.
const NAV_MAX_DEPTH_ONE = true;
// Child sidebars reachable by CTA instead of a main-nav row.
const NOT_IN_MAIN_NAV = ['fundamentalsMenu', 'styleGuideMenu'];

const isURL = (slug: string) => /^https?:\/\//.test(slug);
const norm = (slug: string) => slug.replace(/\/+$/, '') + '/';

// ---- content permalinks + namespace pairing ----------------------------------
function walkFiles(dir: string): string[] {
	let out: string[] = [];
	for (const item of fs.readdirSync(dir)) {
		const full = path.join(dir, item);
		if (fs.statSync(full).isDirectory()) out = out.concat(walkFiles(full));
		else if (item.endsWith('.md') || item.endsWith('.mdx')) out.push(full);
	}
	return out;
}

const permalinks: Record<Lang, Set<string>> = { en: new Set(), 'pt-br': new Set() };
const nsByEnPermalink = new Map<string, string>();
const ptPermalinkByNs = new Map<string, string>();
type PageInfo = { file: string; lang: Lang; permalink: string; namespace?: string; menuNamespace?: string };
const pages: PageInfo[] = [];
for (const lang of LANGS) {
	for (const file of walkFiles(path.join(ROOT, 'src/content/docs', lang))) {
		const { data } = matter(fs.readFileSync(file, 'utf-8'));
		if (!data.permalink) continue;
		const perm = norm(data.permalink);
		permalinks[lang].add(perm);
		if (lang === 'en' && data.namespace) nsByEnPermalink.set(perm, data.namespace);
		if (lang === 'pt-br' && data.namespace) ptPermalinkByNs.set(data.namespace, perm);
		pages.push({
			file: path.relative(ROOT, file),
			lang,
			permalink: perm,
			namespace: data.namespace,
			menuNamespace: data.menu_namespace,
		});
	}
}

// ---- menu discovery ----------------------------------------------------------
function camelize(kebab: string): string {
	return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

const menuFiles: { name: string; file: string; isProductMenu: boolean }[] = [];
for (const f of fs.readdirSync(path.join(ROOT, 'src/i18n'))) {
	if (!f.endsWith('.menu.json')) continue;
	const base = f.replace(/\.menu\.json$/, '');
	const name = base === 'nav' ? 'nav' : `${camelize(base)}Menu`;
	menuFiles.push({ name, file: path.join(ROOT, 'src/i18n', f), isProductMenu: false });
}
const menusDir = path.join(ROOT, 'src/i18n/menus');
if (fs.existsSync(menusDir)) {
	for (const f of fs.readdirSync(menusDir)) {
		if (!f.endsWith('.menu.json')) continue;
		const base = f.replace(/\.menu\.json$/, '');
		menuFiles.push({ name: `${camelize(base)}Menu`, file: path.join(menusDir, f), isProductMenu: true });
	}
}
const jsonMenus = new Map<string, { json: NavMenuJson; isProductMenu: boolean }>();
for (const { name, file, isProductMenu } of menuFiles) {
	jsonMenus.set(name, { json: JSON.parse(fs.readFileSync(file, 'utf-8')), isProductMenu });
}

const errors: string[] = [];
const warnings: string[] = [];
const seenKeys = new Set<string>();
const depth4: string[] = [];
const untranslated: string[] = [];

function checkKey(key: string, menuName: string) {
	if (seenKeys.has(key)) errors.push(`${menuName}: duplicate key: ${key}`);
	seenKeys.add(key);
}

function checkSlug(owner: string, slug: { en: string; 'pt-br'?: string }) {
	if (!isURL(slug.en) && !permalinks.en.has(norm(slug.en)))
		errors.push(`${owner}: slug.en not a content permalink: ${slug.en}`);
	if (slug['pt-br'] && !isURL(slug['pt-br']) && !permalinks['pt-br'].has(norm(slug['pt-br'])))
		errors.push(`${owner}: slug.pt-br not a content permalink: ${slug['pt-br']}`);
}

function checkEntry(e: NavEntry, depth: number, menuName: string) {
	checkKey(e.key, menuName);
	if (!e.label?.en) errors.push(`${e.key}: missing label.en`);
	if (!e.slug && !e.items?.length) errors.push(`${e.key}: neither slug nor items`);
	// máx. 5 desde o toggle Modules dentro de Applications (Marcus, 2026-07-24)
	if (depth > 5) errors.push(`${e.key}: depth ${depth} > 5`);
	else if (depth >= 4) depth4.push(e.key);
	if (menuName === 'nav' && NAV_MAX_DEPTH_ONE && depth === 1 && e.items?.length)
		errors.push(`${e.key}: main-nav rows must be flat (children open their own sidebar)`);
	if (e.slug) {
		checkSlug(e.key, e.slug);
		if (!e.slug['pt-br'] && !isURL(e.slug.en)) {
			const ns = nsByEnPermalink.get(norm(e.slug.en));
			if (ns && ptPermalinkByNs.has(ns))
				untranslated.push(`${e.key}: PT twin exists (${ptPermalinkByNs.get(ns)}) but menu falls back to /en/`);
		}
	}
	for (const child of e.items ?? []) checkEntry(child, depth + 1, menuName);
}

const { default: enUI } = await import('../src/i18n/en/ui');
const { default: ptUI } = await import('../src/i18n/pt-br/ui');

const menuRefs = new Map<string, { rowKey: string; slugEn?: string }>();

for (const [menuName, { json, isProductMenu }] of jsonMenus) {
	// mobileAnchors are shared verbatim across menus, so their keys skip the
	// duplicate-key check; their slugs are validated once via the nav menu.
	if (menuName === 'nav') {
		for (const anchor of json.mobileAnchors ?? []) checkSlug(anchor.key, anchor.slug);
	}
	if (isProductMenu) {
		if (!json.meta) errors.push(`${menuName}: product menus require meta {title, root}`);
		else {
			if (!json.meta.title?.en) errors.push(`${menuName}: meta.title.en missing`);
			if (!json.meta.root?.en) errors.push(`${menuName}: meta.root.en missing`);
			else checkSlug(`${menuName}.meta.root`, json.meta.root);
		}
	}
	for (const group of json.groups) {
		checkKey(group.key, menuName);
		if (group.ui) {
			if (!(group.ui in enUI)) errors.push(`${group.key}: ui key "${group.ui}" missing in en/ui.ts`);
			else if (!(group.ui in ptUI))
				warnings.push(`${group.key}: ui key "${group.ui}" missing in pt-br/ui.ts (falls back to EN)`);
		}
		if (!group.items?.length) errors.push(`${group.key}: empty group`);
		if (group.slug) checkSlug(group.key, group.slug);
		for (const e of group.items) checkEntry(e, 1, menuName);
	}
	const collectRefs = (e: NavEntry) => {
		if (e.menu) {
			if (menuRefs.has(e.menu)) errors.push(`${e.key}: menu "${e.menu}" referenced by more than one nav row`);
			menuRefs.set(e.menu, { rowKey: e.key, slugEn: e.slug?.en });
		}
		for (const child of e.items ?? []) collectRefs(child);
	};
	if (menuName === 'nav') json.groups.forEach((g) => g.items.forEach(collectRefs));
}

// ---- nav row <-> product menu bijection --------------------------------------
for (const [refName, ref] of menuRefs) {
	const target = jsonMenus.get(refName);
	if (!target || !target.isProductMenu) {
		errors.push(`${ref.rowKey}: menu "${refName}" has no file in src/i18n/menus/`);
		continue;
	}
	if (!availableMenus.some((m) => m.name === refName))
		errors.push(`${ref.rowKey}: menu "${refName}" not registered in availableMenu.ts`);
	const root = target.json.meta?.root?.en;
	if (root && ref.slugEn && norm(ref.slugEn) !== norm(root))
		errors.push(`${ref.rowKey}: row slug ${ref.slugEn} differs from ${refName} meta.root ${root}`);
}
for (const [menuName, { isProductMenu }] of jsonMenus) {
	if (!isProductMenu || NOT_IN_MAIN_NAV.includes(menuName)) continue;
	if (NAV_MAX_DEPTH_ONE && !menuRefs.has(menuName))
		errors.push(`${menuName}: no main-nav row opens this menu`);
	if (!availableMenus.some((m) => m.name === menuName))
		errors.push(`${menuName}: not registered in availableMenu.ts`);
}

// ---- per-page ownership sweep ------------------------------------------------
const slugsByMenu = new Map<string, Record<Lang, Set<string>>>();
// A row with `covers` is a hub: a landing page that lists its own children, so
// pages under the listed path prefixes belong to the menu without each getting
// a sidebar row of its own.
const hubPrefixesByMenu = new Map<string, Record<Lang, string[]>>();
for (const [menuName, { json }] of jsonMenus) {
	const slugs: Record<Lang, Set<string>> = { en: new Set(), 'pt-br': new Set() };
	const hubs: Record<Lang, string[]> = { en: [], 'pt-br': [] };
	const collect = (e: NavEntry) => {
		if (e.slug && !isURL(e.slug.en)) {
			slugs.en.add(norm(e.slug.en));
			if (e.slug['pt-br']) slugs['pt-br'].add(norm(e.slug['pt-br']));
			const covers = (e as NavEntry & { covers?: Record<string, string[]> }).covers;
			if (covers) {
				for (const lang of LANGS) for (const p of covers[lang] ?? []) hubs[lang].push(norm(p));
			}
		}
		for (const child of e.items ?? []) collect(child);
	};
	// Anchors count as membership: landing hubs select their own menu while
	// appearing in it only as a mobile anchor.
	for (const anchor of json.mobileAnchors ?? DEFAULT_MOBILE_ANCHORS) {
		slugs.en.add(norm(anchor.slug.en));
		if (anchor.slug['pt-br']) slugs['pt-br'].add(norm(anchor.slug['pt-br']));
	}
	for (const group of json.groups) {
		if (group.slug && !isURL(group.slug.en)) {
			slugs.en.add(norm(group.slug.en));
			if (group.slug['pt-br']) slugs['pt-br'].add(norm(group.slug['pt-br']));
		}
		group.items.forEach(collect);
	}
	slugsByMenu.set(menuName, slugs);
	hubPrefixesByMenu.set(menuName, hubs);
}

const registeredNames = new Set(availableMenus.map((m) => m.name));
for (const page of pages) {
	const name = page.menuNamespace;
	if (name === undefined) continue;
	if (name === '') {
		warnings.push(`${page.file}: empty menu_namespace (falls back to nav)`);
		continue;
	}
	if (!registeredNames.has(name)) {
		errors.push(`${page.file}: menu_namespace "${name}" is not a registered menu (silently falls back to nav)`);
		continue;
	}
	const menuSlugs = slugsByMenu.get(name);
	if (!menuSlugs) continue;
	const hubs = hubPrefixesByMenu.get(name) ?? { en: [], 'pt-br': [] };
	const inMenu =
		menuSlugs[page.lang].has(page.permalink) ||
		hubs[page.lang].some((prefix) => page.permalink.startsWith(prefix)) ||
		(page.lang === 'pt-br' &&
			page.namespace !== undefined &&
			[...nsByEnPermalink].some(([en, ns]) => ns === page.namespace && menuSlugs.en.has(en)));
	if (!inMenu)
		errors.push(`${page.file}: selects ${name} but ${page.permalink} is not in that menu`);
}

// ---- coverage / orphan report ------------------------------------------------
const reachable: Record<Lang, Set<string>> = { en: new Set(), 'pt-br': new Set() };
for (const { json } of jsonMenus.values()) {
	const collectJson = (e: NavEntry) => {
		if (e.slug && !isURL(e.slug.en)) {
			reachable.en.add(norm(e.slug.en));
			if (e.slug['pt-br']) reachable['pt-br'].add(norm(e.slug['pt-br']));
		}
		for (const child of e.items ?? []) collectJson(child);
	};
	(json.mobileAnchors ?? []).forEach((a) => collectJson(a as NavEntry));
	json.groups.forEach((g) => {
		if (g.slug && !isURL(g.slug.en)) {
			reachable.en.add(norm(g.slug.en));
			if (g.slug['pt-br']) reachable['pt-br'].add(norm(g.slug['pt-br']));
		}
		g.items.forEach(collectJson);
	});
}

// Pages a hub row covers are reachable through that hub's own page, so they are
// not orphans even though no sidebar row points at them individually.
for (const hubs of hubPrefixesByMenu.values()) {
	for (const lang of LANGS) {
		for (const prefix of hubs[lang]) {
			for (const perm of permalinks[lang]) if (perm.startsWith(prefix)) reachable[lang].add(perm);
		}
	}
}

function collectLegacy(entries: any[], lang: Lang) {
	for (const e of entries ?? []) {
		if (typeof e.slug === 'string' && !isURL(e.slug)) reachable[lang].add(norm(e.slug));
		if (e.items) collectLegacy(e.items, lang);
	}
}
for (const { name, langs } of availableMenus) {
	if (jsonMenus.has(name)) continue;
	for (const lang of langs as Lang[]) {
		try {
			const mod = await import(`../src/i18n/${lang}/${name}.ts`);
			collectLegacy(mod.default, lang);
		} catch {
			warnings.push(`could not load menu ${lang}/${name}.ts for coverage`);
		}
	}
}

console.log(`${jsonMenus.size} menu JSON(s): ${seenKeys.size} keys`);
if (warnings.length) console.log('\nWarnings:\n  ' + warnings.join('\n  '));
if (depth4.length)
	console.log(`\nRows at depth 4 (target ≤ 3): ${depth4.length}\n  ` + depth4.join('\n  '));
if (untranslated.length)
	console.log(`\nTranslated pages a menu links as /en/ fallback: ${untranslated.length}\n  ` + untranslated.join('\n  '));

for (const lang of LANGS) {
	const orphans = [...permalinks[lang]].filter((p) => !reachable[lang].has(p)).sort();
	const byArea = new Map<string, number>();
	for (const p of orphans) {
		const area = p.split('/').slice(1, 3).join('/');
		byArea.set(area, (byArea.get(area) ?? 0) + 1);
	}
	console.log(
		`\nOrphan report [${lang}]: ${orphans.length} of ${permalinks[lang].size} pages in no menu` +
			(orphans.length ? '\n  ' + [...byArea].sort((a, b) => b[1] - a[1]).map(([a, n]) => `${a}: ${n}`).join('\n  ') : '')
	);
	if (process.env.NAVCHECK_VERBOSE) console.log('  ' + orphans.join('\n  '));
}

if (errors.length) {
	console.error(`\nERRORS (${errors.length}):\n  ` + errors.join('\n  '));
	process.exit(1);
}
console.log('\nnavcheck: OK');
