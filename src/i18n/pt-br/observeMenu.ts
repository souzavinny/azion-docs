
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
    { text: 'Documentação', header: true, onlyMobile: true, anchor: true, slug: '/documentacao/', key: 'documentation' },
	{ text: 'Guias', header: true, onlyMobile: true, anchor: true, slug: '/documentacao/guides/', key: 'guides' },
	{ text: 'Dev Tools', header: true, onlyMobile: true, anchor: true, slug: '/documentacao/produtos/dev-tools/', key: 'devTools' },


    /// START HERE :::: DO NOT REMOVE the strings above, it's a work around for header on mobile /// 
    { text: 'Visão geral', header: true, anchor: true, slug: '/documentacao/observe/overview/', key: 'observeOverview', hasLabel: 'menu.observe' },
    { text: 'Monitore aplicações', header: true, anchor: true, slug: '/documentacao/observe/data-stream/guides/monitorar-aplicacoes/', key: 'observeMetrics' },
    { text: 'Analise logs', header: true, anchor: true, slug: '/documentacao/observe/data-stream/guides/analisar-logs/', key: 'observeLogs' },
    { text: 'Transmita dados', header: true, anchor: true, slug: '/documentacao/observe/data-stream/guides/transmitir-dados/', key: 'streamData', addBorder: true },

        /// REAL-TIME METRICS ///

        {
            text: 'Inspecione métricas', header: true, type: 'learn', key: 'observeInspectMetrics', hasLabel: 'menu.realTimeMetrics', items: [
                { text: 'Analise métricas', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/analisar-metricas/', key: 'observeAnalyzeMetrics' },
                { text: 'Adicione filtros', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/adicionar-filtros-metrics/', key: 'observeMetricsAddFilters' },
                { text: 'Use a API GraphQL', header: true, anchor: true, type: 'learn', slug: 'documentacao/produtos/graphql-api/visao-geral/', key: 'observeGql' },
                { text: 'Use o playground da API GraphQL', header: true, anchor: true, type: 'learn', slug: '/documentacao/devtools/graphql/reference/playground/', key: 'observeGqlPlayground' },
            ]
        },
    
    
            { text: 'Integre com Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/integrar-grafana/', key: 'observeIntegrateGrafana', hasLabel: 'menu.observeIntegrations' },
            { text: 'Personalize um dashboard no Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/azion-plugin-grafana/', key: 'observeCustomizeDash' },
            { text: 'Use um dashboard pré-configurado no Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/azion-plugin-grafana-dash-pre-configurado/', key: 'observePreBuiltDash' },
            { text: 'Use boas práticas no Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/boas-praticas-grafana/', key: 'observeBestPracticesGrafana' },



    /// REAL-TIME EVENTS ///

    {
        text: 'Analise logs', header: true, type: 'learn', key: 'observeanalyzeLogs', hasLabel: 'menu.realTimeEvents', items: [
            { text: 'Entenda logs', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/entender-logs/', key: 'observeUnderstandLogs' },
            { text: 'Adicione filtros', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/adicionar-filtros-events/', key: 'observeEventsAddFilters' },
            { text: 'Colete dados de navegação', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/analisar-dados-navegacao/', key: 'observeEventsCollectNavigationData' },
            { text: 'Use a API GraphQL', header: true, anchor: true, type: 'learn', slug: 'documentacao/produtos/graphql-api/visao-geral/', key: 'observeGql' },
            { text: 'Use o playground da API GraphQL', header: true, anchor: true, type: 'learn', slug: '/documentacao/devtools/graphql/reference/playground/', key: 'observeGqlPlayground' },

        ]
    },


    { text: 'Integre com Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/integrar-grafana/', key: 'observeIntegrateGrafana', hasLabel: 'menu.observeIntegrations' },
    { text: 'Personalize uma tabela de logs no Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/azion-plugin-grafana-personalizar-tabela-logs/', key: 'observeCustomizeTableGrafana' },
    { text: 'Use boas práticas no Grafana', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/real-time-metrics/guides/boas-praticas-grafana/', key: 'observeBestPracticesGrafana' },

    /// Data Stream//

   {
        text: 'Edite um stream', header: true, type: 'learn', key: 'observeEditDataStreaming', hasLabel: 'menu.dataStreaming', items: [
            { text: 'Configure main settings', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/como-usar-data-stream/', key: 'observeConfigureMainSettings' },
            { text: 'Adicione um payload', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/data-stream-adicionar-payload/', key: 'observeSetPayload' },
						{ text: 'Parar ou deletar um stream', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/deletar-data-stream/', key: 'observeDeleteStream' }
        ]
    },


    { text: 'AWS Kinesis Data Firehose', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/amazon-kinesis-endpoint/', key: 'observeIntegrationsAws', hasLabel: 'menu.observeIntegrations' },
    { text: 'Azure Blob Storage', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/azure-blob-endpoint/', key: 'observeIntegrationsBlob' },
    { text: 'Azure Monitor', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/azure-monitor-endpoint/', key: 'observeIntegrationsMonitor' },
    { text: 'Datadog', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/datadog-endpoint/', key: 'observeIntegrationsDatadog' },
    { text: 'Object Storage da Azion', header: true, anchor: true, type: 'learn', slug: '/documentacao/produtos/guias/conector-azion-edge-storage/', key: 'observeIntegrationsEdgeStorage' },
    { text: 'Elasticsearch', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/elasticsearch-endpoint/', key: 'observeIntegrationsElasticsearch' },
    { text: 'Google BigQuery', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/google-bigquery-endpoint/', key: 'observeIntegrationsBigQuery' },
    { text: 'S3 - Simple Storage Service', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/amazon-s3-endpoint/', key: 'observeIntegrationsS3' },
    { text: 'Splunk', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/splunk-endpoint/', key: 'observeIntegrationsSplunk' },
    { text: 'Standard HTTP/HTTPS POST', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/conector-standard-https-post/', key: 'observeIntegrationsStandard' },



    { text: 'Configure sampling', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/configurar-sampling/', key: 'observeConfigureSampling', hasLabel: 'menu.observeAdvanced' },
    { text: 'Selecione variáveis', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/data-stream-selecionar-variaveis/', key: 'observeSelectVariables' },

    { text: 'Monitore métricas', header: true, anchor: true, type: 'learn', slug: '/documentacao/observe/data-stream/guides/data-stream-monitorar-metricas/', key: 'observeDtsUndersandMetrics', hasLabel: 'menu.observeTroubleshoot' },


] as const;
