import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/layout';
import { getPage, getAllEntries } from '../../../lib/api';
import styles from '../../../styles/Projects.module.css'
import ProjectList from '../../../components/project-list/project-list';
import {locales} from '../../../translations/config';
import SkillFilter from '../../../components/skill-filter/skill-filter';
import {useRouter} from 'next/router';

export default function ProjectsPage({content, projects, skills, lang}) {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const filterQuery = router?.query?.filter || '';
    if (filterQuery === '') {
      return;
    }

    setActiveFilters(filterQuery.split(','));
    console.log('router updating...')
  }, [router]);

  useEffect(() => {
    console.log(activeFilters)
  }, [activeFilters])

  const addFilter = (filter) => {
    setActiveFilters([...activeFilters, filter]);
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(oldFilter => oldFilter !== filter));
  };

    return (
        <Layout layout={content.layout} lang={lang}>
            <SkillFilter
              skills={skills}
              filterTitle={content?.filterSkillsLabel}
              activeFilters={activeFilters}
              addFilter={addFilter}
              removefilter={removeFilter}
            />
            <ProjectList projects={projects} activeFilters={activeFilters} />
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
    const content = await getPage('projectsPage', lang);
    const projects = await getAllEntries('project', lang);
    const skills = await getAllEntries('skill', lang, 1);
    return {
        props: { content, projects, skills, lang },
    }
}
