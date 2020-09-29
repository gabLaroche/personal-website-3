export default {
    name: 'usesPage',
    title: 'Uses Page',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ]
}
