/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
 export default[
	{ text: 'Documentação', header: true, onlyMobile: true, anchor: true, slug: '/documentacao/', key: 'documentation' },
	{ text: 'Guias',header: true, onlyMobile: true, anchor: true, slug: '/documentacao/guides/', key: 'guides' },
	{ text: 'Dev Tools',header: true, onlyMobile: true, anchor: true, slug: '/documentacao/produtos/dev-tools/', key: 'devTools' },

	/// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile /// 

	{ text: 'Visão geral' , header: true, anchor: true, type: 'learn',  key: 'overview', slug: '/documentacao/build/functions/runtime-apis/overview/', hasLabel:'menu.runtime' },
	{ text: 'Referências de API', header: true, type: 'learn',  key: 'apiReference', items: [
		{ text: 'Handlers', slug: '/documentacao/produtos/edge-application/edge-functions/runtime/api-reference/handlers/', key: 'runtime/handlers' },
		{ text: 'Variáveis de Ambiente', slug: '/documentacao/produtos/edge-application/edge-functions/runtime/api-reference/environment-variables/', key: 'runtime/variables' },
		{ text: 'Metadados', slug: '/documentacao/produtos/edge-application/edge-functions/runtime/api-reference/metadata/', key: 'runtime/metadata' },
		{ text: 'Cache', slug: '/documentacao/build/functions/runtime-apis/cache/', key: 'runtime/cache-api' },
		{ text: 'Network List', slug: '/documentacao/produtos/edge-application/edge-functions/runtime/api-reference/network-list/', key: 'runtime/network-list' },
		{ text: 'Object Storage', slug: '/documentacao/build/functions/runtime-apis/storage/', key: 'runtime/storage-api' },
		{ text: 'SQL Database', slug: '/documentacao/runtime/api-reference/edge-sql/', key: 'runtime/storage-api' },
		{ text: 'KV Store', header: true, anchor: true, type: 'learn', key: 'runtime/kv-store', items: [
			{ text: 'Visão geral', slug: '/documentacao/build/functions/runtime-apis/kv-store/', key: 'runtime/kv-store-overview' },
			{ text: 'Escrita', slug: '/documentacao/build/functions/runtime-apis/kv-store/write/', key: 'runtime/kv-store-write' },
			{ text: 'Leitura', slug: '/documentacao/build/functions/runtime-apis/kv-store/read/', key: 'runtime/kv-store-read' },
			{ text: 'Exclusão', slug: '/documentacao/build/functions/runtime-apis/kv-store/delete/', key: 'runtime/kv-store-delete' },
		]},
		{ text: 'Web APIs', slug: '/documentacao/build/functions/runtime-apis/javascript/', key: 'runtime/web-standards' },
		{ text: 'WebSocket', slug: '/documentacao/build/functions/runtime-apis/websocket/', key: 'runtime/websocket' },
	] },

	{ text: 'Compatibilidade', header: true, type: 'learn', key: 'runtime/compatibility', items: [
		{ text: 'Web frameworks', header: true, anchor: true, type: 'learn', key: 'runtime/frameworks', slug: '/documentacao/build/functions/runtime-apis/compatibility/' },
		{ text: 'Node.js', header: true, anchor: true, type: 'learn', key: 'runtime/node', slug: '/documentacao/build/functions/runtime-apis/compatibilidade/node/' },
		{ text: 'Use polyfills', header: true, anchor: true, type: 'learn', key: 'runtime/polyfills', slug: '/documentacao/build/functions/runtime-apis/guides/use-polyfills/' },
	]},

	{ text: 'Exemplos em JavaScript', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/functions/runtime-apis/javascript-examples/', key: 'runtime/jsExamples' },
	{ text: 'Debugging', header: true, anchor: true,  type: 'learn', slug: '/documentacao/build/functions/runtime-apis/debugging/', key: 'runtime/debugging' },
	
	{ text: 'Desenvolvimento', header: true, type: 'learn',  key: 'development', items: [
		{ text: 'Editor de Código', slug: '/documentacao/produtos/edge-application/edge-functions/runtime-api/code-editor/', key: 'runtime/code-editor' },
		{ text: 'Preview Deployment', slug: '/documentacao/produtos/edge-application/edge-functions/runtime-api/preview-deployment/', key: 'runtime/preview-deployment' },
	] },


];
