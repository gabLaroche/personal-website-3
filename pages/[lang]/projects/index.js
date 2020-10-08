import Layout from '../../../components/layout/layout';
import { getPage, getAllEntries } from '../../../lib/api';
import styles from '../../../styles/Projects.module.css'
import ProjectList from '../../../components/project-list/project-list';

function Projects({content, projects, skills, lang}) {
    return (
        <Layout layout={content.layout} lang={lang}>
            <ProjectList projects={projects} />
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const paths = ['en', 'fr'].map((lang) => ({ params: { lang } }));

    console.log(paths)

    return {
        paths: paths,
        fallback: false,
    };
};


export async function getStaticProps(context) {
    const lang = context.params.lang
    const content = await getPage('projectsPage', lang);
    const projects = await getAllEntries('project', lang);
    const skills = await getAllEntries('skill', lang, 1);
    return {
        props: { content, projects, skills, lang },
    }
}

export default Projects
