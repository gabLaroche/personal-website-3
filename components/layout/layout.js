import React, { useEffect, useLayoutEffect } from 'react'
import Head from 'next/head';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './layout.module.css'
import mailgo from "mailgo";
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

function Layout({ children, layout, config, pageTitle, lang }) {
    mailgo();
    useIsomorphicLayoutEffect(() => {
        if (lang !== localStorage.getItem('locale')) {
            localStorage.setItem('locale', lang)
        }
    }, [])
    return (
        <div className={'layout'}>
            <Head>
                <title>{config?.title}{pageTitle && ` | ${pageTitle}`}</title>
                <meta name='description' content={config?.description} />
                <meta name='keywords' content={config?.keywords?.join(', ')} />
            </Head>
            <Header mainNavigation={layout?.fields?.menu} lang={lang} />
            <main className={styles.container}>
                {children}
            </main>
            <Footer footer={layout?.fields?.footer} />
        </div>
    )
}

export default Layout
