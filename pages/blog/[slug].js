/* eslint-disable react/no-children-prop */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Layout from '../../components/layout/layout';
import { getBlogPost } from '../../lib/api';

export default function BlogPost({post}) {
    const renderers = {
        // eslint-disable-next-line react/display-name
        code: ({language, value}) => {
            return <SyntaxHighlighter language={language} children={value} />
        }
    }

    return (
        <Layout
            config={post.meta}
            layout={post.layout}
            isBlog={true}
        >
            <h1>{post.title}</h1>
            <ReactMarkdown renderers={renderers} children={`${post.content}`} />
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const post = await getBlogPost(params.slug);

    return {
        props: { post },
    }
}
