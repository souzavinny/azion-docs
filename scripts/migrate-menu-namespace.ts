/**
 * migrate-menu-namespace.ts — points every content page at the child sidebar
 * that lists it. Ownership comes from src/i18n/menus/*.menu.json: a page whose
 * permalink appears in exactly one child menu gets that menu as menu_namespace.
 * Pages owned by the live hand-written menus (runtime, CLI, GraphQL, devtools,
 * lib, MCP) are never touched, so link menus can list them without stealing
 * them. Idempotent: a second run reports 0 edits.
 *
 * Run with: npx tsx scripts/migrate-menu-namespace.ts [--dry-run]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import type { NavMenuJson, NavEntry } from '../src/i18n/nav-transform';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'pt-br'] as const;
type Lang = (typeof LANGS)[number];
const DRY = process.argv.includes('--dry-run');

const LIVE_TS_MENUS = new Set(['runtimeMenu', 'cliMenuAlpha', 'graphqlMenu', 'devtoolsMenu', 'libMenu', 'mcpMenu']);
// permalink -> menu that wins when more than one child menu lists the page
const OVERRIDES: Record<string, string> = {};

const isURL = (slug: string) => /^https?:\/\//.test(slug);
const norm = (slug: string) => slug.replace(/\/+$/, '') + '/';

function camelize(kebab: string): string {
	return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

const own: Record<Lang, Map<string, string>> = { en: new Map(), 'pt-br': new Map() };
const conflicts: string[] = [];
const menusDir = path.join(ROOT, 'src/i18n/menus');
const menuNames: string[] = [];
for (const f of fs.readdirSync(menusDir).sort()) {
	if (!f.endsWith('.menu.json')) continue;
	const name = `${camelize(f.replace(/\.menu\.json$/, ''))}Menu`;
	menuNames.push(name);
	const json: NavMenuJson = JSON.parse(fs.readFileSync(path.join(menusDir, f), 'utf-8'));
	const claim = (lang: Lang, slug: string) => {
		const perm = norm(slug);
		const existing = own[lang].get(perm);
		if (existing && existing !== name) {
			const winner = OVERRIDES[perm];
			if (!winner) conflicts.push(`${perm} claimed by ${existing} and ${name} (add an OVERRIDES entry)`);
			else own[lang].set(perm, winner);
			return;
		}
		own[lang].set(perm, OVERRIDES[perm] ?? name);
	};
	const collect = (e: NavEntry) => {
		if (e.slug && !e.linkOnly && !isURL(e.slug.en)) {
			claim('en', e.slug.en);
			if (e.slug['pt-br']) claim('pt-br', e.slug['pt-br']);
		}
		for (const child of e.items ?? []) collect(child);
	};
	json.groups.forEach((g) => g.items.forEach(collect));
}
if (conflicts.length) {
	console.error(`Ownership conflicts (${conflicts.length}):\n  ` + [...new Set(conflicts)].join('\n  '));
	process.exit(1);
}

function walkFiles(dir: string): string[] {
	let out: string[] = [];
	for (const item of fs.readdirSync(dir)) {
		const full = path.join(dir, item);
		if (fs.statSync(full).isDirectory()) out = out.concat(walkFiles(full));
		else if (item.endsWith('.md') || item.endsWith('.mdx')) out.push(full);
	}
	return out;
}

type FileInfo = { file: string; lang: Lang; permalink: string; namespace?: string; menuNamespace?: string };
const files: FileInfo[] = [];
const enPermalinkByNs = new Map<string, string>();
for (const lang of LANGS) {
	for (const file of walkFiles(path.join(ROOT, 'src/content/docs', lang))) {
		const { data } = matter(fs.readFileSync(file, 'utf-8'));
		if (!data.permalink) continue;
		const perm = norm(data.permalink);
		if (lang === 'en' && data.namespace) enPermalinkByNs.set(data.namespace, perm);
		files.push({ file, lang, permalink: perm, namespace: data.namespace, menuNamespace: data.menu_namespace });
	}
}

function setMenuNamespace(file: string, value: string): boolean {
	const text = fs.readFileSync(file, 'utf-8');
	const fence = /^---[ \t]*\n([\s\S]*?)\n---[ \t]*$/m;
	const m = text.match(fence);
	if (!m) return false;
	const block = m[1];
	let newBlock: string;
	if (/^menu_namespace:.*$/m.test(block)) {
		newBlock = block.replace(/^menu_namespace:.*$/m, `menu_namespace: ${value}`);
	} else {
		newBlock = block + `\nmenu_namespace: ${value}`;
	}
	if (newBlock === block) return false;
	if (!DRY) fs.writeFileSync(file, text.replace(fence, () => `---\n${newBlock}\n---`));
	return true;
}

const stats = new Map<string, { listed: { en: number; 'pt-br': number }; updated: number; correct: number; kept: number }>();
for (const name of menuNames) stats.set(name, { listed: { en: 0, 'pt-br': 0 }, updated: 0, correct: 0, kept: 0 });
for (const lang of LANGS) {
	for (const [, menu] of own[lang]) stats.get(menu)!.listed[lang]++;
}

const unresolved: string[] = [];
let totalUpdates = 0;
for (const info of files) {
	let owner = own[info.lang].get(info.permalink);
	if (!owner && info.lang === 'pt-br' && info.namespace) {
		const enPerm = enPermalinkByNs.get(info.namespace);
		if (enPerm) owner = own.en.get(enPerm);
	}
	if (!owner) continue;
	if (info.menuNamespace && LIVE_TS_MENUS.has(info.menuNamespace)) {
		stats.get(owner)!.kept++;
		continue;
	}
	if (info.menuNamespace === owner) {
		stats.get(owner)!.correct++;
		continue;
	}
	if (setMenuNamespace(info.file, owner)) {
		stats.get(owner)!.updated++;
		totalUpdates++;
	} else {
		unresolved.push(path.relative(ROOT, info.file));
	}
}

console.log(`${DRY ? '[dry-run] ' : ''}menu_namespace migration — ${totalUpdates} file(s) changed\n`);
console.log('menu'.padEnd(26) + 'listed en/pt'.padEnd(16) + 'updated'.padEnd(9) + 'correct'.padEnd(9) + 'kept');
for (const [name, s] of stats) {
	console.log(name.padEnd(26) + `${s.listed.en}/${s.listed['pt-br']}`.padEnd(16) + String(s.updated).padEnd(9) + String(s.correct).padEnd(9) + String(s.kept));
}
if (unresolved.length) {
	console.error(`\nCould not edit (${unresolved.length}):\n  ` + unresolved.join('\n  '));
	process.exit(1);
}
