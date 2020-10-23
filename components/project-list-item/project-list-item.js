import React, { useState } from 'react'
import classnames from 'classnames';
import Link from 'next/link'
import styles from './project-list-item.module.css';
import { getInitialLocale } from '../../translations/getInitialLocale';
import {useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

function ProjectListItem({project, activeFilters}) {
    const [projectUrl, setProjectUrl] = useState('');
    const [skills, setSkills] = useState([])

    useIsomorphicLayoutEffect(() => {
        setProjectUrl(`/${getInitialLocale()}/projects/${encodeURIComponent(project.fields.slug)}`)
        setSkills(generateSkillsSlug());
    }, []);

    const generateSkillsSlug = () => {
      return project?.fields?.stack?.map(skill => {
        return skill?.fields?.slug
      })
    };

    return (
        <li className={classnames(styles.item, activeFilters?.length > 0 && activeFilters?.some(filter => !skills?.includes(filter)) && styles.hide)}>
            <Link href={projectUrl}>
                <a className={classnames('custom-link', styles.link)}>
                    {project.fields.mainImage &&
                        <span className={styles.imgContainer}>
                            <img src={`${project.fields.mainImage.fields.file.url}?f=top&fit=fill&w=400&h=190`} />
                        </span>
                    }
                    <span className={styles.title}>{project.fields.title}</span>
                </a>
            </Link>
        </li>
    )
}
export default ProjectListItem
