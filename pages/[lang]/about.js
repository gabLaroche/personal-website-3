import Layout from '../../components/layout/layout';
import { getPage } from '../../lib/api';
import {locales} from '../../translations/config';

export default function AboutPage({content, lang}) {
    return (
        <Layout layout={content.layout} lang={lang}>
            <p>Hi</p>
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
