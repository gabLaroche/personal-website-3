import React from 'react';
import Link from 'next/link';
import classnames from 'classnames'
import styles from './button.module.css'

export default function Button({href, label, onClick}) {
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
        <button type={'button'} onClick={onClick} className={styles.button}>
          <span>{label}</span>
          <span aria-hidden={'true'}>{label}</span>
        </button>
      )}
    </>
  )
}
