export default {
    name: 'siteSettings',
    type: 'document',
    title: 'Site Settings',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Describe your portfolio for search engines and social media.'
        },
        {
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            description: 'Add keywords that describes your portfolio.',
            of: [{type: 'string'}],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'mainNavigation',
            title: 'Main Navigation',
            type: 'array',
            of: [{ type: 'link' }]
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [{ type: 'link' }]
        },
        {
            name: 'copyright',
            title: 'Copyright',
            type: 'string'
        },
        {
            name: 'sourceCode',
            title: 'Source code',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ]
}
