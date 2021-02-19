import React from 'react';
import Layout from '../../components/layout/layout';
import {getProject, getAllProjectsWithSlug, getAllEntries} from '../../lib/api';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Project.module.css'

function Project({ project }) {
    return (
        <Layout layout={project?.layout} config={project?.meta}>
          <div className={styles.container}>
            <h1 className={styles.title}>{project?.title}</h1>
            <section className={styles.grid}>
              <div className={styles.column}>
                <img
                    className={styles.img}
                    src={`${project?.mainImage?.fields?.file?.url}?f=top&fit=fill&w=660&h=344`}
                    alt={project?.title}
                />
                <div className={styles.links}>
                  {project?.sourceCodeLabel && project?.sourceCodeUrl &&
                    <a href={project?.sourceCodeUrl}>{project?.sourceCodeLabel?.fields?.title}</a>
                  }
                  {project?.demoLabel && project?.demoUrl &&
                    <a href={project?.demoUrl}>{project?.demoLabel?.fields?.title}</a>
                  }
                </div>
              </div>
              <div className={styles.column}>

                {project?.description &&
                  <ReactMarkdown source={project?.description} />
                }

                <h2 className={styles.sectionTitle}>{project?.stackLabel?.fields?.title}</h2>
                <ul className={styles.stack}>
                  {project?.stack?.map(skill => (
                    <li className={styles.stackItem} key={skill?.sys?.id}>
                      {skill?.fields?.title}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            {project?.sections?.map((section, index) => (
              <section key={index} className={styles.section}>
                {index % 2 === 1 && section?.fields?.image &&
                  <img src={section?.fields?.image?.fields?.file?.url} alt={section?.fields?.image?.fields?.description}/>
                }
                <div>
                  <h2 className={styles.sectionTitle}>{section?.fields?.title?.fields?.title}</h2>
                  <ReactMarkdown source={section?.fields?.text} />
                </div>
                {index % 2 === 0 && section?.fields?.image &&
                  <img src={section?.fields?.image?.fields?.file?.url} alt={section?.fields?.image?.fields?.description}/>
                }
              </section>
            ))}
          </div>
        </Layout>
    )
}

export default Project;

export async function getServerSideProps({ params, locale }) {
    const project = await getProject(params.slug, locale);
    const skills = await getAllEntries('skill', locale, 1);

    return {
        props: { project, skills },
    }
}
