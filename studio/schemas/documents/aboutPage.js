export default {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'aboutMeImage',
            title: 'About Me Image',
            type: 'image'
        },
        {
            name: 'aboutMeBody',
            title: 'About Me Body',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'aboutThisWebsiteImage',
            title: 'About This Website Image',
            type: 'image'
        },
        {
            name: 'aboutThisWebsite',
            title: 'About This Website Body',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ]
}
