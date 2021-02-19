import React from 'react';
import classnames from 'classnames';
import styles from './button.module.css';
import LocalLink from '../local-link/local-link';

export default function Button({href, label, onClick, disabled, type = 'button'}) {
  return (
    <>
      {href ? (
        <LocalLink href={href}>
          <a className={classnames('custom-link', styles.button)}>
            <span>{label}</span>
            <span aria-hidden={'true'}>{label}</span>
          </a>
        </LocalLink>
      ) : (
        <button
            type={type}
            onClick={onClick}
            className={styles.button}
            disabled={disabled}
            aria-disabled={disabled}
        >
          <span>{label}</span>
          <span aria-hidden={'true'}>{label}</span>
        </button>
      )}
    </>
  )
}
