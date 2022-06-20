import React from 'react';
import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';
import styles from './header.module.css';
import classnames from 'classnames';
import {useRouter} from 'next/router';
import LocalLink from '../local-link/local-link';

function Header({mainNavigation, isBlog}) {
    const { locale, locales } = useRouter();
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const fields = mainNavigation?.fields || {};

    useEffect(() => {
        setLastScroll(window.pageYOffset);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[]);

    useEffect(() => {
        if (isMenuOpened) {
            document.body.classList.add('noScroll');
            document.body.style.top = `-${lastScroll}px`;
            document.body.style.height = `${lastScroll}px`;
        } else {
            document.body.classList.remove('noScroll');
            document.body.style.top = null;
            document.body.style.height = null;
            window.scrollTo(0, lastScroll);
        }
    }, [isMenuOpened]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [lastScroll]);

    const handleScroll = throttle(() => {
        if (!document.body.classList.contains('noScroll')) {
            setLastScroll(window.pageYOffset);
        }
    }, 100);

    const handleResize = throttle(() => {
        if (window.matchMedia('(min-width: 768px)') && isMenuOpened) {
            setIsMenuOpened(false);
        }
    })

    const switchLanguage = () => {
        const newLang = locales.find(lang => lang !== locale && lang !== 'en-CA');
        const pathName = window.location.pathname.replace(locale, newLang);
        window.location.replace(pathName);
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.control}>
                    <input
                        type="checkbox"
                        id="menuIconCheck"
                        className={styles.checkbox}
                        checked={isMenuOpened}
                        onChange={() => setIsMenuOpened(!isMenuOpened)}
                    />
                    <label className={styles.icon} htmlFor="menuIconCheck">
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                    </label>
                </div>
                <nav className={classnames(styles.navigation, isMenuOpened && styles.isOpen)}>
                    <LocalLink href='/'>
                        <a className={classnames(styles.logo, 'custom-link')}>
                            <img src={'/logo.svg'} alt="Home" />
                        </a>
                    </LocalLink>
                    <ul className={styles.navigationList}>
                        {fields?.navigation?.map((link, i) => (
                            <li key={i} className={styles.navigationListItem}>
                                {link.fields.url.includes('mailto') ? (
                                    <a href={link.fields.url}>
                                        {link.fields.title}
                                    </a>
                                ) : (
                                    <LocalLink href={link.fields.url}>
                                        <a>
                                            {link.fields.title}
                                        </a>
                                    </LocalLink>
                                )}
                            </li>
                        ))}
                    </ul>
                    { !isBlog &&
                        <div className={styles.switchLangContainer}>
                            <button className={'link'} onClick={switchLanguage} type='button'>
                                {fields?.switchLanguageLabel}
                            </button>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
}
export default Header
