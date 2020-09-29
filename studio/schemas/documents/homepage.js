export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'avatar',
            title: 'Avatar',
            type: 'image'
        },
        {
            name: 'projectsTitle',
            title: 'Projects section title',
            type: 'string'
        },
        {
            name: 'projectsCta',
            title: 'Projects CTA',
            type: 'link'
        },
        {
            name: 'skillsTitle',
            title: 'Skills section title',
            type: 'string'
        },
        {
            name: 'skillsText',
            title: 'Skills section text',
            type: 'string'
        },
        {
            name: 'aboutText',
            title: 'About Text',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ]
}
