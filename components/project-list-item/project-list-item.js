import React, { useState } from 'react'
import Link from 'next/link'
import styles from './project-list-item.module.css';
import { getInitialLocale } from '../../translations/getInitialLocale';
import {useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

function ProjectListItem({project}) {
    const [projectUrl, setProjectUrl] = useState('')

    useIsomorphicLayoutEffect(() => {
        setProjectUrl(`/${getInitialLocale()}/projects/${encodeURIComponent(project.fields.slug)}`)
    }, [])

    return (
        <li className={styles.projectListItem}>
            <Link href={projectUrl}>
                <a className={'custom-link'}>
                    {project.fields.mainImage &&
                        <span>
                            <img src={project.fields.mainImage.fields.file.url} />
                        </span>
                    }
                    <span>{project.fields.title}</span>
                </a>
            </Link>
        </li>
    )
}
export default ProjectListItem
