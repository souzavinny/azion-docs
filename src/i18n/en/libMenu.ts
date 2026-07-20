/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [
	{ text: 'Documentation', header: true, onlyMobile: true, anchor: true, type: 'learn', slug: '/documentation/', key: 'documentation' },
	{ text: 'Guides', header: true, onlyMobile: true, anchor: true, type: 'learn', slug: '/documentation/guides/', key: 'guides' },
	{ text: 'Dev Tools', header: true, onlyMobile: true, anchor: true, type: 'learn', slug: '/documentation/devtools/', key: 'devTools' },

	/// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile /// 

	{ text: 'Overview', header: true, anchor: true, type: 'learn', key: 'overview', slug: '/documentation/products/azion-lib/overview' },

	{ text: 'Usage', header: true, key: 'commands', type: 'learn', items: [
		{ text: 'Ai Client', slug: '/documentation/devtools/lib/reference/ai-client/', key: 'usage/ai-client' },
		{ text: 'Application', slug: '/documentation/devtools/lib/reference/application/', key: 'usage/application' },
		{ text: 'Client', slug: '/documentation/devtools/lib/reference/client/', key: 'usage/client' },
		{ text: 'Config', slug: '/documentation/devtools/lib/reference/config/', key: 'usage/config' },
		{ text: 'Cookies', slug: '/documentation/devtools/lib/reference/cookies/', key: 'usage/cookies' },
		{ text: 'Domains', slug: '/documentation/devtools/lib/reference/domains/', key: 'usage/domains' },
		{ text: 'JWT', slug: '/documentation/devtools/lib/reference/jwt/', key: 'usage/jwt' },
		{ text: 'Purge', slug: '/documentation/devtools/lib/reference/purge/', key: 'usage/purge' },
		{ text: 'SQL', slug: '/documentation/devtools/lib/reference/sql/', key: 'usage/sql' },
		{ text: 'Storage', slug: '/documentation/devtools/lib/reference/storage/', key: 'usage/storage' },
		{ text: 'Types', slug: '/documentation/devtools/lib/reference/types/', key: 'usage/types' },
		{ text: 'Unenv', slug: '/documentation/devtools/lib/reference/unenv/', key: 'usage/unenv' },
		{ text: 'Utils', slug: '/documentation/devtools/lib/reference/utils/', key: 'usage/utils' },
		{ text: 'WASM Image Processor', slug: '/documentation/devtools/lib/reference/wasm-image-processor/', key: 'usage/wasm' },
	] },
] as const;
