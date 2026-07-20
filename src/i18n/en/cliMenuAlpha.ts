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

	{ text: 'Overview', header: true, anchor: true, type: 'learn', key: 'overview', slug: '/documentation/devtools/cli/', hasLabel:'menu.cli' },
	{ text: 'Global options', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/globals/', key: 'cli/global' },
	
	{ text: 'Commands', header: true, anchor: true, key: 'cli/commands', items: [
		{ text: 'Init', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/init/', key: 'cli/init' },
		{ text: 'Build', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/build/', key: 'cli/build' },
		{ text: 'Deploy', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/deploy/', key: 'cli/deploy' },
		{ text: 'Dev', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/dev-command/', key: 'cli/localDev' },
		{ text: 'Link', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/link-command/', key: 'cli/link' },
		{ text: 'Unlink', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/unlink-command/', key: 'cli/unlink' },
		{ text: 'Whoami', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/whoami/', key: 'cli/whoami' },
		{ text: 'Logs', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/logs/', key: 'cli/logs' },
		{ text: 'Login', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/login/', key: 'cli/login' },
		{ text: 'Logout', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/logout/', key: 'cli/logout' },
		{ text: 'Purge', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/purge/', key: 'cli/purge' },
		{ text: 'Reset', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/reset/', key: 'cli/reset' },
		{ text: 'Sync', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/sync/', key: 'cli/sync' },
		{ text: 'Create', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/create/', key: 'cli/create' },
		{ text: 'List', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/list/', key: 'cli/list' },
		{ text: 'Describe', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/describe/', key: 'cli/describe' },
		{ text: 'Update', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/update/', key: 'cli/update' },
		{ text: 'Delete', header: true, anchor: true, slug: '/documentation/devtools/cli/reference/delete/', key: 'cli/delete' },	
	] },
	





	{
        text: 'Framework specific guides', header: true, type: 'learn', key: 'cli/frameworks', items: [
            { text: 'Angular', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/angular/', key: 'cli/angular' },
            { text: 'Astro', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/astro/', key: 'cli/astro' },
						{ text: 'Docusaurus', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/docusaurus/', key: 'cli/docusaurus' },
						{ text: 'Eleventy', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/eleventy/', key: 'cli/eleventy' },
						{ text: 'Gatsby', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/gatsby/', key: 'cli/gatsby' },
            { text: 'Hexo', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/hexo/', key: 'cli/hexo' },
						{ text: 'Hono', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/hono/', key: 'cli/hono' },
						{ text: 'Hugo', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/hugo/', key: 'cli/hugo' },
            { text: 'Next', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/next/', key: 'cli/next' },
      { text: 'Nextal', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/nextal/', key: 'cli/nextal' },
      { text: 'React', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/react/', key: 'cli/react' },
						{ text: 'Svelte', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/svelte/', key: 'cli/svelte' },
						{ text: 'Vite', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/vite/', key: 'cli/vite' },
            { text: 'Vue', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/vue/', key: 'cli/vue' },
        ]
    },

	{
        text: 'Project configuration', header: true, type: 'learn', key: 'cli/configs', items: [
            { text: 'azion.config.js file', header: true, anchor: true, type: 'learn', slug: '/documentation/devtools/cli/reference/azion-config-js/', key: 'cli/config/azion' },
        ]
    },

] as const;
