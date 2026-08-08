import type { NavDict, UIDictionaryKeys } from './translation-checkers';

/**
 * Shape of src/i18n/nav.menu.json — the hand-curated, bilingual source of truth
 * for the main sidebar ("menu is data"). Validated by scripts/lint-navcheck.ts.
 */
export interface NavMenuJson {
	/** absent -> DEFAULT_MOBILE_ANCHORS (product menus share the three top-level anchors) */
	mobileAnchors?: NavAnchor[];
	/** present -> this menu is a child sidebar: LeftSidebar renders a back header with the product title */
	meta?: NavMenuMeta;
	groups: NavGroup[];
}
export interface NavMenuMeta {
	title: LocalizedText;
	root: LocalizedSlug;
}
export interface SidebarMeta {
	title: string;
	root: string;
}
export interface NavAnchor {
	key: string;
	label: LocalizedText;
	slug: LocalizedSlug;
}
export interface NavGroup {
	/** "grp/..." — namespaced so group keys never collide with row keys */
	key: string;
	/** ui.ts key rendered as the group label (via hasLabel); absent -> label-less group (product menus) */
	ui?: string;
	/** icon class rendered next to the label */
	icon?: string;
	/**
	 * Present -> the label itself links here and renders as a hoverable button;
	 * absent -> the label stays plain, non-clickable text. Pillars point this at
	 * their overview page so it no longer needs an "About <pillar>" row.
	 */
	slug?: LocalizedSlug;
	items: NavEntry[];
}
export interface NavEntry {
	key: string;
	label: LocalizedText;
	/** absent -> toggle-only row (must have items) */
	slug?: LocalizedSlug;
	icon?: string;
	/** name of the child sidebar this row opens (validated by lint-navcheck) */
	menu?: string;
	/** row links a page owned by another menu — migrate-menu-namespace must not claim it */
	linkOnly?: boolean;
	items?: NavEntry[];
}
/** pt-br absent -> falls back to the English text */
export type LocalizedText = { en: string; 'pt-br'?: string };
/** pt-br absent -> isFallback entry linking the /en/ page (never a /pt-br/ 404) */
export type LocalizedSlug = { en: string; 'pt-br'?: string };

const isURL = (slug: string) => /^https?:\/\//.test(slug);

export const DEFAULT_MOBILE_ANCHORS: NavAnchor[] = [
	{
		key: 'documentation',
		label: { en: 'Reference', 'pt-br': 'Referência' },
		slug: { en: '/documentation/', 'pt-br': '/documentacao/' },
	},
	{
		key: 'guides.mobile',
		label: { en: 'Guides', 'pt-br': 'Guias' },
		slug: { en: '/documentation/guides/', 'pt-br': '/documentacao/guides/' },
	},
	{
		key: 'devtools.mobile',
		label: { en: 'Dev Tools' },
		slug: { en: '/documentation/devtools/', 'pt-br': '/documentacao/produtos/devtools/' },
	},
];

export function menuMetaFromJson(menu: NavMenuJson, lang: 'en' | 'pt-br'): SidebarMeta | null {
	if (!menu.meta) return null;
	return {
		title: menu.meta.title[lang] ?? menu.meta.title.en,
		root: menu.meta.root[lang] ?? menu.meta.root.en,
	};
}

export function navFromJson(menu: NavMenuJson, lang: 'en' | 'pt-br'): NavDict {
	const toEntry = (e: NavEntry): NavDict[number] => {
		const out: NavDict[number] = { text: e.label[lang] ?? e.label.en, key: e.key };
		if (e.icon) out.icon = e.icon;
		if (e.menu) out.isProduct = true;
		if (e.slug) {
			out.slug = e.slug[lang] ?? e.slug.en;
			if (!e.slug[lang] && !isURL(e.slug.en)) out.isFallback = true;
		}
		if (e.items?.length) out.items = e.items.map(toEntry);
		return out;
	};
	const nav: NavDict = (menu.mobileAnchors ?? DEFAULT_MOBILE_ANCHORS).map((a) => ({
		text: a.label[lang] ?? a.label.en,
		slug: a.slug[lang] ?? a.slug.en,
		onlyMobile: true,
		header: true,
		anchor: true,
		type: 'learn',
		key: a.key,
	}));
	for (const group of menu.groups) {
		const rows = group.items.map(toEntry);
		if (rows.length && group.ui) {
			rows[0].hasLabel = group.ui as UIDictionaryKeys;
			if (group.icon) rows[0].labelIcon = group.icon;
			if (group.slug) {
				rows[0].labelSlug = group.slug[lang] ?? group.slug.en;
				if (!group.slug[lang] && !isURL(group.slug.en)) rows[0].labelIsFallback = true;
			}
		}
		nav.push(...rows);
	}
	return nav;
}
