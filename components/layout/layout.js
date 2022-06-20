import React from 'react'
import Head from 'next/head';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './layout.module.css'
import { useRouter } from 'next/router';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

function Layout({ children, layout, config, isBlog }) {
    const { locale } = useRouter();

    useIsomorphicLayoutEffect(() => {
        document.querySelector('html').setAttribute('lang', locale)
    }, []);

    return (
        <div className={'layout'}>
            <Head>
                <title>{config?.fields?.title}</title>
                <meta name='description' content={config?.fields?.description} />
                <meta name='keywords' content={config?.fields?.keywords?.join(', ')} />
            </Head>
            <Header
                mainNavigation={layout?.fields?.menu}
                isBlog={isBlog}
            />
            <main className={styles.container}>
                {children}
            </main>
            <Footer footer={layout?.fields?.footer} />
        </div>
    )
}

export default Layout
