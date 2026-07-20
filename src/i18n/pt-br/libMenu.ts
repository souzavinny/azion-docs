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
	{ text: 'Documentação', header: true, onlyMobile: true, anchor: true, slug: '/documentacao/', key: 'documentation' },
	{ text: 'Guias',header: true, onlyMobile: true, anchor: true, slug: '/documentacao/guides/', key: 'guides' },
	{ text: 'Dev Tools',header: true, onlyMobile: true, anchor: true, slug: '/documentacao/produtos/dev-tools/', key: 'devTools' },

	/// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile /// 

	{ text: 'Visão geral', header: true, anchor: true, type: 'learn', key: 'overview', slug: '/documentacao/devtools/lib/' },

	{ text: 'Uso', header: true, key: 'commands', type: 'learn', items: [
		{ text: 'Ai Client', slug: '/documentacao/devtools/lib/reference/ai-client/', key: 'usage/ai-client' },
		{ text: 'Application', slug: '/documentacao/devtools/lib/reference/application/', key: 'usage/application' },
		{ text: 'Client', slug: '/documentacao/devtools/lib/reference/client/', key: 'usage/client' },
		{ text: 'Config', slug: '/documentacao/devtools/lib/reference/config/', key: 'usage/config' },
		{ text: 'Cookies', slug: '/documentacao/devtools/lib/reference/cookies/', key: 'usage/cookies' },
		{ text: 'Domains', slug: '/documentacao/devtools/lib/reference/domains/', key: 'usage/domains' },
		{ text: 'JWT', slug: '/documentacao/devtools/lib/reference/jwt/', key: 'usage/jwt' },
		{ text: 'Purge', slug: '/documentacao/devtools/lib/reference/purge/', key: 'usage/purge' },
		{ text: 'SQL', slug: '/documentacao/devtools/lib/reference/sql/', key: 'usage/sql' },
		{ text: 'Storage', slug: '/documentacao/devtools/lib/reference/storage/', key: 'usage/storage' },
		{ text: 'Types', slug: '/documentacao/devtools/lib/reference/types/', key: 'usage/types' },
		{ text: 'Unenv', slug: '/documentacao/devtools/lib/reference/unenv/', key: 'usage/unenv' },
		{ text: 'Utils', slug: '/documentacao/devtools/lib/reference/utils/', key: 'usage/utils' },
		{ text: 'WASM Image Processor', slug: '/documentacao/devtools/lib/reference/wasm-image-processor/', key: 'usage/wasm' },
	] },
] as const;
