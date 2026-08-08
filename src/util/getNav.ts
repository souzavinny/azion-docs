import type { AstroGlobal } from 'astro';
import type { NavDict } from '../i18n/translation-checkers';
import type { SidebarMeta } from '../i18n/nav-transform';
import { fallbackLang, getMenuMeta, mapNavigationMenuByName } from '../i18n/util';
import { getLanguageFromURL } from '../util';
import { availableMenus } from '~/data/availableMenu';

/** Map of language tags to a `Set` of slugs that exist for that language. */

function resolveMenu(Astro: AstroGlobal, menuName: string) {
	let lang = getLanguageFromURL(Astro.url.pathname)
	const isValidMenuName = availableMenus.find(menu => menu.name === menuName)
	const getMenuProps = isValidMenuName ? isValidMenuName : availableMenus.find(menu => menu.name === 'nav')

	if (getMenuProps) {
		lang = getMenuProps.langs.includes(lang) ? lang : fallbackLang;
		menuName = getMenuProps.name
	}

	return { menuName, lang }
}

export async function getNavigationMenu(Astro: AstroGlobal, menuName: string): Promise<NavDict> {
	const resolved = resolveMenu(Astro, menuName)
	const menu = await mapNavigationMenuByName(resolved.menuName, resolved.lang)

	return menu[resolved.lang]
}

export async function getSidebarMeta(Astro: AstroGlobal, menuName: string): Promise<SidebarMeta | null> {
	const resolved = resolveMenu(Astro, menuName)

	return getMenuMeta(resolved.menuName, resolved.lang)
}
