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
		slug: '/documentation/store/overview/',
		key: 'storeOverview',
		hasLabel: 'menu.store',
	},

	{
		text: 'Bucket operations',
		header: true,
		type: 'learn',
		key: 'edgeStorage/api',
		hasLabel: 'menu.storage',
		items: [
			{
				text: 'Create a bucket',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/create-bucket/',
				key: 'createBucket',
			},
			{
				text: 'List buckets',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/list-buckets/',
				key: 'listBucket',
			},
			{
				text: 'Update a bucket',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/update-buckets/',
				key: 'updateBucket',
			},
			{
				text: 'Delete a bucket',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/delete-buckets/',
				key: 'deleteBucket',
			},
			{
				text: 'Create an object',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/upload-object/',
				key: 'postObject',
			},
			{
				text: 'Update an object',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/update-object/',
				key: 'putObject',
			},
			{
				text: 'List objects',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/list-objects/',
				key: 'listObjects',
			},
			{
				text: 'Delete an object',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/delete-object/',
				key: 'deleteObject',
			},
			{
				text: 'Use a bucket as origin',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/object-storage/guides/use-bucket-as-origin/',
				key: 'useBucketAsOrigin',
			},
		],
	},

	{
		text: 'S3 Protocol compatibility',
		header: true,
		type: 'learn',
		key: 'edgeStorage/s3',
		items: [
			{
				text: 'Leverage S3 compatibility',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/products/store/storage/s3-protocol-for-edge-storage/',
				key: 'headObject',
			},
		],
	},

	{
		text: 'Manage databases',
		header: true,
		type: 'learn',
		hasLabel: 'menu.edgeSQL',
		key: 'edgeSQL/databases',
		items: [
			{
				text: 'Create a database',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/create-database/',
				key: 'createDatabase',
			},
			{
				text: 'List databases',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/list-databases/',
				key: 'listDatabases',
			},
			{
				text: 'Retrieve database information',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/retrieve-db-info/',
				key: 'retrieveDatabaseInfo',
			},
			{
				text: 'Delete a database',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/delete-database/',
				key: 'deleteDatabase',
			},
		],
	},

	{
		text: 'Work with tables',
		header: true,
		type: 'learn',
		key: 'edgeSQL/tables',
		items: [
			{
				text: 'Create a table',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/create-table/',
				key: 'createTable',
			},
			{
				text: 'Insert into a table',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/insert-into-table/',
				key: 'insertIntoTable',
			},
			{
				text: 'Query table rows',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/products/store/sql/retrieve-data-edge-sql/',
				key: 'queryTableRows',
			},
			{
				text: 'Delete a record',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/delete-record/',
				key: 'deleteRecord',
			},
		],
	},
	{
		text: 'Use the EdgeSQL Shell',
		type: 'learn',
		key: 'edgeSQL/edge-sql-shell',
		items: [
			{
				text: 'Install EdgeSQL Shell',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/store/sql-database/guides/install-edge-sql-shell/',
				key: 'installEdgeSQLShell',
			},
			{
				text: 'EdgeSQL Shell commands',
				header: true,
				anchor: true,
				type: 'learn',
				slug: '/documentation/products/store/sql/edge-sql-shell-commands/',
				key: 'edgeSQLShellCommands',
			}
		]
	},
	{
		text: 'Implement Vector Search',
		type: 'learn',
		key: 'edgeSQL/vector-search',
		slug: '/documentation/products/guides/edge-sql-vector-search/',
	}
] as const;
