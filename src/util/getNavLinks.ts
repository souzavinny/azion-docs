import type { AstroGlobal } from 'astro';
import { getLanguageFromURL, isURL } from '../util';
import { getNavigationMenu } from './getNav';
import { removeTrailingSlash, removeLeadingSlash } from '../util';
import { useTranslations } from '../i18n/util';

interface NavItem {
	text: string;
	slug: string;
	isFallback?: boolean;
	/** where the page sits in the sidebar (parent rows, or the group label) */
	context?: string;
}

interface LinkItem {
	text: string;
	link: string;
	context?: string;
}

interface PreviousAndNext {
	previous?: LinkItem;
	next?: LinkItem;
}

export async function getNavLinks(
	Astro: Readonly<AstroGlobal>,
	menuName: string,
): Promise<PreviousAndNext> {
	const links = await getNavigationMenu(Astro, menuName);
	const navLinks = getLinksFromMenu(links, useTranslations(Astro));
	return getPreviousAndNext(navLinks, Astro);
}

function getLinksFromMenu(navLinks: any, t: (key: any) => string): NavItem[] {
	const links: NavItem[] = [];
	// group labels are flattened onto the first row of each group (hasLabel = ui key)
	let group: string | undefined;

	function extractLinks(items: any, parents: string[] = []) {

		for (const item of items) {
			if (parents.length === 0 && item.hasLabel) group = t(item.hasLabel);
			if (item.items && item.items.length > 0) {
				extractLinks(item.items, [...parents, item.text])
			} else if (item.slug && !item.onlyMobile) {
				const chain = parents.slice(-2).join(' › ');
				links.push({ text: item.text, slug: item.slug, context: chain || group })
			}
		}
	}

	extractLinks(navLinks)

	return links;
}

export function getPreviousAndNext(links: NavItem[], Astro: Readonly<AstroGlobal>): PreviousAndNext {
	const index = links.findIndex((x) => removeTrailingSlash(Astro.url.pathname).endsWith(removeTrailingSlash(x.slug)));
	const lang = getLanguageFromURL(Astro.url.pathname);

	const makeLinkItem = ({ text, slug, isFallback, context }: NavItem): LinkItem => ({
		text,
		link: isURL(slug) ? slug : `/${isFallback ? 'en' : lang}/${removeTrailingSlash(removeLeadingSlash(slug))}/`,
		context,
	});

	return {
		previous: index > 0 ? makeLinkItem(links[index - 1]) : undefined,
		next: index !== -1 && index < links.length - 1 ? makeLinkItem(links[index + 1]) : undefined,
	};
}
