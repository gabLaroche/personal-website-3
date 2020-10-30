import React from 'react';
import Layout from '../../components/layout/layout';
import { getPage } from '../../lib/api';
import {locales} from '../../translations/config';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/About.module.css';

export default function AboutPage({content, lang}) {
    return (
        <Layout layout={content.layout} config={content.meta} lang={lang}>
            <h1 className={styles.title}>{content.title}</h1>
            <section className={styles.section}>
                <img src={`${content.aboutMeImage?.fields?.file?.url}?w=455&`} alt={content.aboutMeImage?.fields?.description} />
                <div>
                    <h2>{content.aboutMeTitle}</h2>
                    <ReactMarkdown source={content.aboutMeText}/>
                </div>
            </section>
            {content.aboutThisWebsiteTitle && content.aboutThisWebsiteText &&
                <section className={styles.section}>
                    <div>
                        <h2>{content.aboutThisWebsiteTitle}</h2>
                        <ReactMarkdown source={content.aboutThisWebsiteText}/>
                    </div>
                    {content.aboutThisWebsiteImage &&
                        <img src={`${content.aboutThisWebsiteImage?.fields?.file?.url}?w=455&`} alt={content.aboutThisWebsiteImage?.fields?.description}/>
                    }
                </section>
            }
        </Layout>
    )
}

export const getStaticPaths = async () => {
    return {
        paths: locales.map((lang) => ({ params: { lang } })),
        fallback: false,
    };
};


export async function getStaticProps(context) {
    const lang = context.params.lang
    const content = await getPage('aboutPage', lang);
    return {
        props: { content, lang },
    }
}
