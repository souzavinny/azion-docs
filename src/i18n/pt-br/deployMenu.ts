/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven't translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [
	{
		text: 'Documentação',
		header: true,
		onlyMobile: true,
		anchor: true,
		slug: '/documentacao/',
		key: 'documentation',
	},
	{
		text: 'Guias',
		header: true,
		onlyMobile: true,
		anchor: true,
		slug: '/documentacao/guides/',
		key: 'guides',
	},
	{
		text: 'Dev Tools',
		header: true,
		onlyMobile: true,
		anchor: true,
		slug: '/documentacao/produtos/dev-tools/',
		key: 'devTools',
	},

	/// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile ///
	{
		text: 'Visão geral',
		header: true,
		anchor: true,
		slug: '/documentacao/deploy/overview/',
		key: 'deployOverview',
		hasLabel: 'menu.deploy',
	},
	{
		text: 'Implante um edge service',
		header: true,
		anchor: true,
		slug: '/documentacao/deploy/orchestrator/guides/implantar-servico/',
		key: 'deployService',
	},
	{
		text: 'Configure um edge node',
		header: true,
		type: 'learn',
		key: 'configEdgeNode',
		items: [
			{
				text: 'Instale o agente',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/instalar-orchestrator-agent/',
				key: 'installAgent',
			},
			{
				text: 'Autorize um edge node',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/autorizar-edge-node/',
				key: 'authNode',
			},
			{
				text: 'Acompanhe logs',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/verificar-logs/',
				key: 'watchLogs',
			},
			{
				text: 'Crie um edge service',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/criar-edge-service/',
				key: 'createService',
			},
			{
				text: 'Vincule um edge service',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/vincular-servico/',
				key: 'bindService',
			},
			{
				text: 'Provisione arquivos',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/provisionar-arquivos/',
				key: 'provisionFiles',
			},
			{
				text: 'Trabalhe com variáveis',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/trabalhar-com-variaveis/',
				key: 'workVariables',
			},
			{
				text: 'Desvincule um edge service',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/desvincular-servico/',
				key: 'unbindService',
			},
		],
	},
	{
		text: 'Configurações avançadas',
		header: true,
		type: 'learn',
		key: 'configEdgeNode',
		items: [
			{
				text: 'Explore o uso',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/explore-uso/',
				key: 'exploreUsage',
			},
			{
				text: 'Execute scripts',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/rodar-scripts/',
				key: 'runScripts',
			},
			{
				text: 'Desinstale o agente',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentacao/deploy/orchestrator/guides/desinstalar-agent/',
				key: 'uninstallNode',
			},
		],
	},
	{
		text: 'Azion API',
		header: true,
		anchor: true,
		type: 'learn',
		slug: '/documentacao/deploy/orchestrator/guides/api/',
		key: 'deployAutomateAPI',
		hasLabel: 'menu.secureAutomate',
	},
	{
		text: 'Zero-touch provisioning',
		header: true,
		anchor: true,
		type: 'learn',
		slug: '/documentacao/deploy/orchestrator/guides/zero-touch-provisioning/',
		key: 'zeroTouchProvisioning',
	},
] as const;
