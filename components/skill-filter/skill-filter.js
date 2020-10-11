import React from 'react';
import styles from './skill-filter.module.css'
import Button from '../button/button';

export default function SkillFilter({skills, filterTitle, activeFilters, addFilter, removefilter}) {

  const handleOnChange = (event, slug) => {
    console.log(event?.currentTarget)
    if (event?.currentTarget?.checked) {
      addFilter(slug);
    } else {
      removefilter(slug);
    }
  };

    return (
        <div>
            <h2>{filterTitle}</h2>
            <ul>
                {skills?.map((skill) => (
                    <li key={skill?.sys?.id}>
                        <input
                          id={skill?.fields?.slug}
                          className={styles.input}
                          type='checkbox'
                          onChange={event => handleOnChange(event, skill?.fields?.slug)}
                          checked={activeFilters.includes(skill?.fields?.slug)}
                        />
                        <label htmlFor={skill?.fields?.slug}>{skill?.fields?.title}</label>
                    </li>
                ))}
            </ul>
          <Button label={'Clear filter (TODO: add to cms)'} />
        </div>
    )
}
