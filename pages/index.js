import React from 'react';
import Layout from '../components/layout/layout';
import { getPage } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Home.module.css'
import ProjectList from '../components/project-list/project-list';
import SkillList from '../components/skill-list/skill-list';
import Svg from '../components/svg/svg';
import Button from '../components/button/button';

function Home({ content }) {
    return (
        <Layout layout={content.layout} config={content.meta}>
            <div className={styles.home}>
                <section className={styles.hero}>
                    <div className={styles.avatarContainer}>
                        <div>
                            <div className={styles.svgContainer}><Svg name={'bug-outline'} /></div>
                            <div className={styles.svgContainer}><Svg name={'bug-fill'} /></div>
                            <div className={styles.svgContainer}><Svg name={'bug-outline'} /></div>
                        </div>
                        <img src={`${content.avatar.fields.file.url}?w=215&h=215`} alt={content.avatar.fields.description} />
                    </div>
                    <h1 className={styles.title}><ReactMarkdown source={content.title} /></h1>
                </section>
                <section className={styles.projectsContainer}>
                    <Svg className={styles.wave} name={'wave'} fillColour={'#FFFFFE'} />
                    <div className={styles.projects}>
                        <h2 className={styles.sectionTitle}>{content.featuredProjectsTitle}</h2>
                        <ProjectList projects={content.featuredProjects} />
                        <Button href={content.viewAllProjectsButtonUrl} label={content.viewAllProjectsButtonLabel} />
                    </div>
                    <Svg className={styles.wave} name={'wave'} fillColour={'#FFFFFE'} />
                </section>
                <section className={styles.skillsContainer}>
                    <h2 className={styles.sectionTitle}>{content.skillsTitle}</h2>
                    <SkillList skills={content.featuredSkills} />
                    <ReactMarkdown className={styles.skillUpsell} source={content.skillUpsell} />
                    <ReactMarkdown className={styles.aboutMeText} source={content.aboutMeText} />
                </section>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ locale }) {
    const content = await getPage('homepage', locale)
    return {
        props: { content, locale },
    }
}

export default Home
