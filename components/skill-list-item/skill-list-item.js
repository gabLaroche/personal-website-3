import React, { useState } from 'react';
import Link from 'next/link'
import styles from './skill-list-item.module.css'
import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect';
import {getInitialLocale} from '../../translations/getInitialLocale';

function SkillListItem({skill}) {
    const [currentLang, setSurrentLang] = useState('')

    useIsomorphicLayoutEffect(() => {
        setSurrentLang(getInitialLocale())
    }, []);


    return (
        <li className={styles.skill}>
            <Link href={{
                pathname: `${currentLang}/projects`,
                query: { filter: encodeURIComponent(skill.fields.slug)}
            }}>
                <a className={'custom-link'}>
                    {skill.fields.title}
                </a>
            </Link>
        </li>
    )
}
export default SkillListItem
