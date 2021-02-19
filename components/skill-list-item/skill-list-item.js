import React from 'react';
import styles from './skill-list-item.module.css';
import LocalLink from '../local-link/local-link';

function SkillListItem({skill}) {
    return (
        <li className={styles.skill}>
            <LocalLink href={{
                pathname: `/projects`,
                query: { filter: encodeURIComponent(skill.fields.slug)}
            }}>
                <a className={'custom-link'}>
                    {skill.fields.title}
                </a>
            </LocalLink>
        </li>
    )
}
export default SkillListItem
