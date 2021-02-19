import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import { getPage, getAllEntries, getProjects } from '../../lib/api';
import styles from '../../styles/Projects.module.css'
import ProjectList from '../../components/project-list/project-list';
import SkillFilter from '../../components/skill-filter/skill-filter';
import { useRouter } from 'next/router';

export default function ProjectsPage({ content, projects, skills }) {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const filterQuery = router?.query?.filter || '';
    console.log(router)
    if (filterQuery === '') {
      return;
    }

    setActiveFilters(filterQuery.split(','));
  }, [router]);

  const addFilter = (filter) => {
    setActiveFilters([...activeFilters, filter]);
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(oldFilter => oldFilter !== filter));
  };

  const removeAllFilters = () => {
    setActiveFilters([])
  };

    return (
        <Layout layout={content.layout} config={content.meta}>
          <section className={styles.container}>
            <h1 className={styles.title}>{content?.title}</h1>
            <SkillFilter
              skills={skills}
              filterTitle={content?.filterSkillsLabel}
              clearFilterLabel={content?.clearFilterLabel?.fields?.title}
              activeFilters={activeFilters}
              addFilter={addFilter}
              removefilter={removeFilter}
              removeAllFilters={removeAllFilters}
              router={router}
            />
            <ProjectList projects={projects} activeFilters={activeFilters} />
          </section>
        </Layout>
    )
}

export async function getServerSideProps({ locale }) {
    const content = await getPage('projectsPage', locale);
    const projects = await getProjects(locale);
    const skills = await getAllEntries('skill', locale, 1);
    return {
        props: { content, projects, skills },
    }
}
