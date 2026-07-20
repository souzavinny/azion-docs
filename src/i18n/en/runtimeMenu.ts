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

	{ text: 'Overview', header: true, anchor: true, type: 'learn', key: 'overview', slug: '/documentation/products/edge-application/edge-functions/runtime/overview', hasLabel: 'menu.runtime' },
	{ text: 'API Reference', header: true, type: 'learn', key: 'apiReference', items: [
		{ text: 'Handlers', slug: '/documentation/products/edge-application/edge-functions/runtime/api-reference/handlers', key: 'runtime/handlers' },
		{ text: 'Environment Variables', slug: '/documentation/products/edge-application/edge-functions/runtime/api-reference/environment-variables', key: 'runtime/variables' },
		{ text: 'Metadata', slug: '/documentation/products/edge-application/edge-functions/runtime/api-reference/metadata', key: 'runtime/metadata' },
		{ text: 'Cache', slug: '/documentation/build/functions/runtime-apis/cache/', key: 'runtime/cache-api' },
		{ text: 'Network List interface', slug: '/documentation/products/edge-application/edge-functions/runtime/api-reference/network-list', key: 'runtime/network-list' },
		{ text: 'Object Storage', slug: '/documentation/build/functions/runtime-apis/storage/', key: 'runtime/storage-api' },
		{ text: 'SQL Database', slug: '/documentation/runtime/api-reference/edge-sql/', key: 'runtime/storage-api' },
		{ text: 'KV Store', header: true, anchor: true, type: 'learn', key: 'runtime/kv-store', slug: '/documentation/build/functions/runtime-apis/kv-store/', items: [
			{ text: 'Overview', slug: '/documentation/build/functions/runtime-apis/kv-store/', key: 'runtime/kv-store-overview' },
			{ text: 'Write', slug: '/documentation/build/functions/runtime-apis/kv-store/write/', key: 'runtime/kv-store-write' },
			{ text: 'Read', slug: '/documentation/build/functions/runtime-apis/kv-store/read/', key: 'runtime/kv-store-read' },
			{ text: 'Delete', slug: '/documentation/build/functions/runtime-apis/kv-store/delete/', key: 'runtime/kv-store-delete' },
		]},
		{ text: 'WebSocket', slug: '/documentation/build/functions/runtime-apis/websocket/', key: 'runtime/websocket' },
	]},

	{ text: 'Compatibility', header: true, type: 'learn', key: 'runtime/compatibility', items: [
		{ text: 'Web frameworks', header: true, anchor: true, type: 'learn', key: 'runtime/frameworks', slug: '/documentation/build/functions/runtime-apis/frameworks-compatibility/' },
		{ text: 'Node.js', header: true, anchor: true, type: 'learn', key: 'runtime/node', slug: '/documentation/build/functions/runtime-apis/compatibility/node/' },
		{ text: 'Use polyfills', header: true, anchor: true, type: 'learn', key: 'runtime/polyfills', slug: '/documentation/build/functions/runtime-apis/guides/use-polyfills/' },
	]},

    { text: 'JavaScript Examples', header: true, anchor: true, type: 'learn', slug: '/documentation/products/edge-application/edge-functions/javascript-examples', key: 'runtime/jsExamples' },
	{ text: 'Debugging', header: true, anchor: true, type: 'learn', slug: '/documentation/products/edge-application/edge-functions/debugging', key: 'runtime/debugging' },
	
    { text: 'Development', header: true, type: 'learn', key: 'development', items: [
			{ text: 'Code Editor', slug: '/documentation/products/edge-application/edge-functions/runtime-api/code-editor', key: 'runtime/code-editor' },
			{ text: 'Preview Deployment', slug: '/documentation/products/edge-application/edge-functions/runtime-api/preview-deployment', key: 'runtime/preview-deployment' },
		] },


] as const;
