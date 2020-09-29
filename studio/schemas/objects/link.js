export default {
    title: 'Link',
    name: 'link',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'URL',
            name: 'href',
            type: 'url',
            validation: Rule =>
                Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel'],
                })
        },
        {
            title: 'Fontawesome Icon Name',
            name: 'icon',
            type: 'string'
        }
    ]
}
