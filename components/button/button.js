import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './button.module.css';

export default function Button({href, label, onClick, disabled, type = 'button'}) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={classnames('custom-link', styles.button)}>
            <span>{label}</span>
            <span aria-hidden={'true'}>{label}</span>
          </a>
        </Link>
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
