
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
    { text: 'Overview', header: true, anchor: true, slug: '/documentation/observe/overview/', key: 'observeOverview', hasLabel: 'menu.observe' },
    { text: 'Monitor applications', header: true, anchor: true, slug: '/documentation/observe/data-stream/guides/monitor-applications/', key: 'observeMetrics' },
    { text: 'Analyze logs', header: true, anchor: true, slug: '/documentation/observe/data-stream/guides/analyze-logs/', key: 'observeLogs' },
    { text: 'Stream data', header: true, anchor: true, slug: '/documentation/observe/data-stream/guides/stream-data/', key: 'streamData', addBorder: true },

        /// REAL-TIME METRICS ///

        {
            text: 'Inspect metrics', header: true, type: 'learn', key: 'observeInspectMetrics', hasLabel: 'menu.realTimeMetrics', items: [
                { text: 'Analyze metrics', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/analyze-metrics/', key: 'observeAnalyzeMetrics' },
                { text: 'Add filters', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/add-filters-metrics/', key: 'observeMetricsAddFilters' },
                { text: 'Use GraphQL API', header: true, anchor: true, type: 'learn', slug: '/documentation/devtools/graphql/reference/overview/', key: 'observeGql' },
                { text: 'Use GraphQL API playground', header: true, anchor: true, type: 'learn', slug: '/documentation/devtools/graphql/reference/playground/', key: 'observeGqlPlayground' },
                
            ]
        },
    
        { text: 'Integrate with Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/integrate-grafana/', key: 'observeIntegrateGrafana', hasLabel: 'menu.observeIntegrations' },
        { text: 'Customize dashboard on Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/azion-plugin-grafana-custom-dash/', key: 'observeCustomizeDash' },
        { text: 'Use pre-built dashboard on Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/azion-plugin-grafana-pre-built-dash/', key: 'observePreBuiltDash' },
        { text: 'Use best practices on Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/best-practices-grafana/', key: 'observeBestPracticesGrafana' },

        /// REAL-TIME EVENTS ///

    {
        text: 'Analyze logs', header: true, type: 'learn', key: 'observeanalyzeLogs', hasLabel: 'menu.realTimeEvents', items: [
            { text: 'Understand logs', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/understand-logs/', key: 'observeUnderstandLogs' },
            { text: 'Add filters', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/add-filters-events/', key: 'observeEventsAddFilters' },
            { text: 'Collect navigation data', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/analyze-navigation-data/', key: 'observeEventsCollectNavigationData' },
            { text: 'Use GraphQL API', header: true, anchor: true, type: 'learn', slug: '/documentation/devtools/graphql/reference/overview/', key: 'observeGql' },
            { text: 'Use GraphQL API playground', header: true, anchor: true, type: 'learn', slug: '/documentation/devtools/graphql/reference/playground/', key: 'observeGqlPlayground' },
            
        ]
    },


    { text: 'Integrate with Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/integrate-grafana/', key: 'observeIntegrateGrafana', hasLabel: 'menu.observeIntegrations' },
    { text: 'Customize log table on Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/azion-plugin-grafana-customize-log-table/', key: 'observeCustomizeTableGrafana' },
    { text: 'Use best practices on Grafana', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/real-time-metrics/guides/best-practices-grafana/', key: 'observeBestPracticesGrafana' },

    /// Data Stream ///

    {
        text: 'Edit a stream', header: true, type: 'learn', key: 'observeEditDataStreaming', hasLabel: 'menu.dataStreaming', items: [
            { text: 'Configure main settings', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/use-data-stream/', key: 'observeConfigureMainSettings' },
            { text: 'Set a payload', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/data-stream-set-payload/', key: 'observeSetPayload' },
						{ text: 'Stop or delete a stream', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/delete-data-stream/', key: 'observeDeleteStream' }
        ]
    },

    { text: 'AWS Kinesis Data Firehose', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-amazon-kinesis/', key: 'observeIntegrationsAws', hasLabel: 'menu.observeIntegrations' },
    { text: 'Azion Object Storage', header: true, anchor: true, type: 'learn', slug: '/documentation/products/guides/connector-azion-edge-storage/', key: 'observeIntegrationsEdgeStorage' },
    { text: 'Azure Blob Storage', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-azure-blob/', key: 'observeIntegrationsBlob' },
    { text: 'Azure Monitor', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-azure-monitor/', key: 'observeIntegrationsMonitor' },
    { text: 'Datadog', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-datadog/', key: 'observeIntegrationsDatadog' },
    { text: 'Elasticsearch', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-elasticsearch/', key: 'observeIntegrationsElasticsearch' },
    { text: 'Google BigQuery', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-google-bigquery/', key: 'observeIntegrationsBigQuery' },
    { text: 'S3 - Simple Storage Service', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-amazon-s3/', key: 'observeIntegrationsS3' },
    { text: 'Splunk', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/endpoint-splunk/', key: 'observeIntegrationsSplunk' },
    { text: 'Standard HTTP/HTTPS POST', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/connector-standard-https-post/', key: 'observeIntegrationsStandard' },




    { text: 'Configure sampling', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/configure-sampling/', key: 'observeConfigureSampling', hasLabel: 'menu.observeAdvanced' },
    { text: 'Select variables', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/data-stream-select-variables/', key: 'observeSelectVariables' },  


    { text: 'Understand metrics', header: true, anchor: true, type: 'learn', slug: '/documentation/observe/data-stream/guides/data-stream-understand-metrics/', key: 'observeDtsUndersandMetrics', hasLabel: 'menu.observeTroubleshoot', addBorder: true },





] as const;
