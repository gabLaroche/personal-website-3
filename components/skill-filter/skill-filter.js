import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './skill-filter.module.css'
import Button from '../button/button';

export default function SkillFilter({skills, filterTitle, clearFilterLabel, activeFilters, addFilter, removefilter, removeAllFilters}) {
  const [isActive, setIsActive] = useState(true);

  const handleOnChange = (event, slug) => {
    if (event?.currentTarget?.checked) {
      addFilter(slug);
    } else {
      removefilter(slug);
    }
  };

    return (
        <div className={styles.container}>
          <button type='button' className={classnames(styles.titleButton, isActive && styles.active)} onClick={() => setIsActive(!isActive)}>
            <h2 className={styles.title}>
              {filterTitle}
              <i className="fas fa-caret-down"></i>
            </h2>
          </button>
          <div className={classnames(styles.filter, isActive && styles.active)}>
              <ul className={styles.list}>
                  {skills?.map((skill) => (
                      <li className={styles.item} key={skill?.sys?.id}>
                          <input
                            id={skill?.fields?.slug}
                            className={styles.input}
                            type='checkbox'
                            onChange={event => handleOnChange(event, skill?.fields?.slug)}
                            checked={activeFilters.includes(skill?.fields?.slug)}
                          />
                          <label className={styles.label} htmlFor={skill?.fields?.slug}>{skill?.fields?.title}</label>
                      </li>
                  ))}
              </ul>
            <Button onClick={removeAllFilters} label={clearFilterLabel} />
          </div>
        </div>
    )
}
