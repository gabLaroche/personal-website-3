export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'querySlug',
            title: 'Query slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'showOnHomepage',
            title: 'Show on Homepage',
            type: 'boolean'
        }
    ]
}
