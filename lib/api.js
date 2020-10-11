import { createClient } from 'contentful'

const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
})

export async function getPage(contentType, lang, depth = 10) {
    const entries = await client.getEntries({
        content_type: contentType,
        locale: lang,
        include: depth
    });

    return entries?.items[0]?.fields;
}

export async function getAllEntries(contentType, lang, depth = 5) {
    const entries = await client.getEntries({
        content_type: contentType,
        locale: lang,
        include: depth
    });

    return entries?.items;
}

export async function getAllProjectsWithSlug(depth = 10) {
    const entries = await client.getEntries({
        content_type: 'project',
        select: 'fields.slug',
        include: depth
    });

    return entries?.items
}

export async function getAllSkillsWithSlug(depth = 10) {
    const entries = await client.getEntries({
        content_type: 'skill',
        select: 'fields.slug',
        include: depth
    });

    return entries?.items
}

export async function getProject(slug, lang, depth = 10) {
    const entry = await client.getEntries({
        content_type: 'project',
        locale: lang,
        limit: 1,
        include: depth,
        'fields.slug[in]': slug,
    })

    return entry?.items[0]?.fields
}
