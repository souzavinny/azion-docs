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
    { text: 'Documentation', header: true, onlyMobile: true, anchor: true, type: 'learn', slug: '/documentation/', key: 'documentation' },
    { text: 'Guides', header: true, onlyMobile: true, anchor: true, type: 'learn', slug: '/documentation/guides/', key: 'guides' },
    { text: 'Dev Tools', header: true, onlyMobile: true, anchor: true, type: 'learn', slug: '/documentation/devtools/', key: 'devTools' },

    /// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile /// 
    { text: 'Overview', header: true, anchor: true, slug: '/documentation/build/overview/', key: 'buildOverview', hasLabel: 'menu.build' },
    { text: 'Build an application', header: true, anchor: true, slug: '/documentation/get-started/journeys/launch/', key: 'buildEdgeApps' },

    {
        text: 'Edit an application', header: true, type: 'learn', key: 'editEdgeApp', items: [
            { text: 'Configure main settings', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/configure-main-settings/', key: 'mainSettings' },
            { text: 'Create device groups', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/create-device-groups/', key: 'deviceGroups' },
            { text: 'Set error pages', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/set-error-pages/', key: 'errorPages' },
            { text: 'Work with origins', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/work-with-origins/', key: 'origins' },
            { text: 'Tune cache settings', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/tune-cache-settings/', key: 'cacheSettings' },
            { text: 'Work with rules engine', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/work-with-rules-engine/', key: 'rules' },
            { text: 'Instantiate a function', header: true, anchor: true, type: 'learn', slug: '/documentation/products/guides/build/instantiate-edge-functions/', key: 'functions' },
        ]
    },

    {
        text: 'Advanced configurations', header: true, type: 'learn', key: 'advancedConfig', addBorder: true, items: [
            { text: 'Process images', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/process-images/', key: 'processImages' },
            { text: 'Configure multiple origins', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/multiple-origins/', key: 'multiOrigin' },
        ]
    },



    { text: 'CLI', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/cli/', key: 'developCli', hasLabel: 'menu.buildDev' },
    { text: 'Azion IDE', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/code-editor/', key: 'developIDE' },
    { text: 'Local Development', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/local-dev/', key: 'developLocalDev' },
    { text: 'SDKs', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/go/', key: 'developSDK' },
    { text: 'Terraform', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/terraform-provider/', key: 'developTerraform' },
    { text: 'Azion Runtime', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/runtime-apis/', key: 'developEdgeRuntime' },


    { text: 'Framework specific guides', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/overview/', key: 'frameworkAngular' },

    {
        text: 'Language specific guides', header: true, type: 'learn', key: 'languageSpecifics', addBorder: true, items: [
            { text: 'JavaScript', slug: '/documentation/get-started/frameworks/javascript/', key: 'devJS' },
            { text: 'WebAssembly', slug: '/documentation/get-started/frameworks/wasm/', key: 'devWasm' },
        ]
    },

    { text: 'Environment Variables', header: true, anchor: true, type: 'learn', slug: '/documentation/get-started/frameworks/environment-variables/', key: 'envVars', hasLabel: 'menu.buildData', addBorder: true, },


    { text: 'Understand metrics', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/troubleshooting/understand-metrics/', key: 'understandMetrics', hasLabel: 'menu.buildTroubleshoot' },
    { text: 'Debug applications', header: true, anchor: true, type: 'learn', slug: '/documentation/build/applications/guides/troubleshooting/debug-applications/', key: 'debugApps', addBorder: true, },


] as const;
