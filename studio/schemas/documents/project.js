export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}]
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'showOnHomepage',
            title: 'Show on Homepage',
            type: 'boolean'
        },
        {
            name: 'demoUrl',
            title: 'Demo URL',
            type: 'url',
            validation: Rule =>
                Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http'],
                })
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
            validation: Rule =>
                Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http'],
                })
        },
        {
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'skill' }]
                }
            ]
        }
    ]
}
