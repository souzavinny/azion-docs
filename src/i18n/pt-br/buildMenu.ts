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

    { text: 'Visão geral',header: true, anchor: true, type: 'learn', key: 'overview', slug: '/documentacao/build/overview/', hasLabel:'menu.build' },
	{ text: 'Construa uma aplicação',header: true, anchor: true, type: 'learn', key: 'firstSteps', slug: '/documentacao/build/applications/guides/criar-uma-aplicacao/' },

	{ text: 'Edite uma aplicação',header: true,  type: 'learn',  key: 'editEdgeApp', items: [
		{ text: 'Configure main settings', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/definir-configuracoes-principais/', key: 'mainSettings' },
            { text: 'Crie device groups', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/criar-device-groups/', key: 'deviceGroups' },
            { text: 'Defina páginas de erro', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/configurar-paginas-de-erro/', key: 'errorPages' },
            { text: 'Trabalhe com origins', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/definir-origens/', key: 'origins' },
            { text: 'Ajuste cache settings', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/ajustar-cache-settings/', key: 'cacheSettings' },
            { text: 'Trabalhe com rules engine', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/trabalhar-com-rules-engine/', key: 'rules' },
            { text: 'Instancie uma function', header: true, anchor: true, type: 'learn', slug: '/documentacao/produtos/guias/build/instanciar-edge-functions/', key: 'functions' },
        ]
    },

    {
        text: 'Configurações avançadas', header: true, type: 'learn', key: 'advancedConfig', addBorder: true, items: [
            { text: 'Processe imagens', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/processar-imagens/', key: 'processImages' },
            { text: 'Configure múltiplas origens', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/configure-multiplas-origens/', key: 'multiOrigin' },
        ]
    },

    { text: 'CLI', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/cli/', key: 'developCli', hasLabel: 'menu.buildDev' },
    { text: 'Azion IDE', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/code-editor/', key: 'developIDE' },
    { text: 'Desenvolvimento local', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/local-dev/', key: 'developLocalDev' },
    { text: 'SDKs', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/go/', key: 'developSDK' },
    { text: 'Terraform', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/terraform-provider/', key: 'developTerraform' },
    { text: 'Azion Runtime', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/runtime/', key: 'developEdgeRuntime' },


    { text: 'Guias específicos por framework', header: true, anchor: true, type: 'learn', slug: '/documentacao/get-started/frameworks/overview/', key: 'frameworkAngular' },

    {
        text: 'Guias específicos por linguagem', header: true, type: 'learn', key: 'languageSpecifics', addBorder: true, items: [
            { text: 'JavaScript', slug: '/documentacao/build/applications/guides/javascript/', key: 'devJS' },
            { text: 'WebAssembly', slug: '/documentacao/build/applications/guides/wasm/', key: 'devWasm' },
        ]
    },

    { text: 'Environment Variables', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/environment-variables/', key: 'envVars', hasLabel: 'menu.buildData', addBorder: true, },


    { text: 'Monitore métricas', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/troubleshooting/monitorar-metricas/', key: 'understandMetrics', hasLabel: 'menu.buildTroubleshoot' },
    { text: 'Debugue aplicações', header: true, anchor: true, type: 'learn', slug: '/documentacao/build/applications/guides/troubleshooting/debug-aplicacoes/', key: 'debugApps', addBorder: true, },


] as const;
