import Layout from '../../components/layout/layout';
import { getPage } from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import ProjectList from '../../components/project-list/project-list';
import SkillList from '../../components/skill-list/skill-list';
import Svg from '../../components/svg/svg';
import {locales} from '../../translations/config';

function Home({content, lang}) {
    return (
        <Layout layout={content.layout} lang={lang}>
            <div>
                <section className={styles.hero}>
                    <div className={styles.avatarContainer}>
                        <Svg name={'bug-outline'} />
                        <Svg name={'bug-fill'} />
                        <Svg name={'bug-outline'} />
                        <img src={`${content.avatar.fields.file.url}?w=215&h=215`} />
                    </div>
                    <h1 className={styles.title}><ReactMarkdown source={content.title} /></h1>
                </section>
                <section className={styles.projectsContainer}>
                    <Svg className={styles.wave} name={'wave'} fillColour={'#FFFFFE'} />
                    <h2 className={styles.sectionTitle}>{content.featuredProjectsTitle}</h2>
                    <ProjectList projects={content.featuredProjects} />
                    <Link href={content.viewAllProjectsButtonUrl}>
                        <a className={'button custom-link'}>
                            <span>{content.viewAllProjectsButtonLabel}</span>
                            <span aria-hidden={'true'}>{content.viewAllProjectsButtonLabel}</span>
                        </a>
                    </Link>
                    <Svg className={styles.wave} name={'wave'} fillColour={'#FFFFFE'} />
                </section>
                <section className={styles.skillsContainer}>
                    <h2 className={styles.sectionTitle}>{content.skillsTitle}</h2>
                    <SkillList skills={content.featuredSkills} />
                    <ReactMarkdown source={content.skillUpsell} />
                </section>
                <ReactMarkdown source={content.aboutMeText} />
            </div>
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
    const content = await getPage('homepage', lang)
    return {
        props: { content, lang },
    }
}

export default Home
