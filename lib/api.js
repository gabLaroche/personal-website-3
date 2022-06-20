import { createClient } from 'contentful';
import Feed from 'feed';
import markdown from 'markdown';
/* eslint-disable no-undef */
const fs = require('fs');

const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
});
/* eslint-enable no-undef */

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

export async function getProjects(lang, depth = 5) {
    const entries = await client.getEntries({
        content_type: 'project',
        locale: lang,
        include: depth,
        order: 'fields.name'
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

export async function getPosts( depth = 5) {
    const entries = await client.getEntries({
        content_type: 'blogPost',
        include: depth,
        order: 'fields.date'
    });

    return entries?.items;
}

export async function getBlogPost(slug, depth = 10) {
    const entry = await client.getEntries({
        content_type: 'blogPost',
        limit: 1,
        include: depth,
        'fields.slug[in]': slug,
    })

    return entry?.items[0]?.fields
}

export async function generateRssFeed() {
    const baseUrl = "https://gabriellaroche.dev";
    const date = new Date();

    const author = {
        name: 'Gabriel Laroche',
        email: "gabriel.laroche@hey.com",
        link: "https://twitter.com/glarocheDev",
    };

    const feed = new Feed({
        title: 'Gabriel Laroche\'s Blog',
        description: 'Welcome to my blog!',
        id: baseUrl,
        link: baseUrl,
        language: 'en',
        image: `${baseUrl}/images/logo.svg`,
        favicon: `${baseUrl}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, Gabriel Laroche`,
        updated: date,
        generator: "Next.js using Feed for Node.js",
        feedLinks: {
            rss2: `${baseUrl}/rss/feed.xml`,
            json: `${baseUrl}/rss/feed.json`,
            atom: `${baseUrl}/rss/atom.xml`,
        },
        author,
    });

    const posts = await client.getEntries('blogPost', {
        order: '-fields.publishedDate',
    });

    posts.forEach((post) => {
        const url = `${baseUrl}/blog/posts/${post.slug}`;
        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.description,
            content: markdown.toHTML(post.post),
            author: [author],
            contributor: [author],
            date: new Date(post.date),
        });
    });

    fs.mkdirSync('./public/rss', { recursive: true });
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
    fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
    fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
