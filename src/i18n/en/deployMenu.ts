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
		text: 'Documentation',
		header: true,
		onlyMobile: true,
		anchor: true,
		type: 'learn',
		slug: '/documentation/',
		key: 'documentation',
	},
	{
		text: 'Guides',
		header: true,
		onlyMobile: true,
		anchor: true,
		type: 'learn',
		slug: '/documentation/guides/',
		key: 'guides',
	},
	{
		text: 'Dev Tools',
		header: true,
		onlyMobile: true,
		anchor: true,
		type: 'learn',
		slug: '/documentation/devtools/',
		key: 'devTools',
	},

	/// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile ///
	{
		text: 'Overview',
		header: true,
		anchor: true,
		slug: '/documentation/deploy/overview/',
		key: 'deployOverview',
		hasLabel: 'menu.deploy',
	},
	{
		text: 'Deploy a service',
		header: true,
		anchor: true,
		slug: '/documentation/deploy/orchestrator/guides/deploy-a-service/',
		key: 'deployService',
	},

	{
		text: 'Configure an edge node',
		header: true,
		type: 'learn',
		key: 'configEdgeNode',
		items: [
			{
				text: 'Install agent',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/install-orchestrator-agent/',
				key: 'installAgent',
			},
			{
				text: 'Authorize an edge node',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/authorize-an-edge-node/',
				key: 'authNode',
			},
			{
				text: 'Watch logs',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/watch-logs/',
				key: 'watchLogs',
			},
			{
				text: 'Create an edge service',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/create-edge-service/',
				key: 'createService',
			},
			{
				text: 'Bind an edge service',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/bind-service-node/',
				key: 'bindService',
			},
			{
				text: 'Provision files',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/provision-files/',
				key: 'provisionFiles',
			},
			{
				text: 'Work with variables',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/work-with-variables/',
				key: 'workVariables',
			},
			{
				text: 'Unbind an edge service',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/unbind-service/',
				key: 'unbindService',
			},
		],
	},

	{
		text: 'Advanced configurations',
		header: true,
		type: 'learn',
		key: 'configEdgeNode',
		items: [
			{
				text: 'Explore usage',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/explore-usage/',
				key: 'exploreUsage',
			},
			{
				text: 'Run scripts',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/run-scripts/',
				key: 'runScripts',
			},
			{
				text: 'Uninstall agent',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/deploy/orchestrator/guides/uninstall-agent/',
				key: 'uninstallNode',
			},
		],
	},

	{
		text: 'Azion API',
		header: true,
		anchor: true,
		type: 'learn',
		slug: '/documentation/deploy/orchestrator/guides/api/',
		key: 'deployAutomateAPI',
		hasLabel: 'menu.secureAutomate',
	},
	{
		text: 'Zero-touch provisioning',
		header: true,
		anchor: true,
		type: 'learn',
		slug: '/documentation/deploy/orchestrator/guides/zero-touch-provisioning/',
		key: 'zeroTouchProvisioning',
	},
] as const;
