import Layout from '../../../components/layout/layout';
import {getProject, getAllProjectsWithSlug, getAllEntries} from '../../../lib/api';
import { locales } from '../../../translations/config';
import styles from '../../../styles/Project.module.css'

function Project({project, lang}) {
    // console.log(project)
    return (
        <Layout layout={project?.layout} lang={lang}>
            <h1>{project?.title}</h1>
        </Layout>
    )
}

export default Project;

export async function getStaticPaths() {
    const allProjects = await getAllProjectsWithSlug()
    let paths = locales.map((locale) => {
        return allProjects?.map(({fields}) => {
            return { params: { lang: locale, slug: fields.slug } }
        });
    });
    paths = paths[0].concat(paths[1])

    return {
        paths: paths ?? [],
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const lang = params.lang;
    const project = await getProject(params.slug, lang);
    const skills = await getAllEntries('skill', lang, 1);

    return {
        props: { project, skills, lang },
    }
}
