
import React, { useEffect, useState, useRef } from 'react';
import { getPage, getPosts } from '../../lib/api';
import Layout from '../../components/layout/layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LocalLink from '../../components/local-link/local-link';
import styles from '../../styles/Blog.module.css';

export default function BlogHome({ content, posts }) {
    const { locale } = useRouter();
    const [modalIsActive, setModalIsActive] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        window.addEventListener('keydown', handleTab);

        return () => {
            window.removeEventListener('keydown', handleTab);
        }
    }, []);

    useEffect(() => {
        setModalIsActive(locale === 'fr');


    }, [locale]);

    useEffect(() => {
        if (modalIsActive) {
            modalRef.current.focus();
        }
    }, [modalIsActive]);

    const handleTab = (event) => {
        if (event.key !== 'Tab') {
            return;
        }
        const modal = modalRef.current;

        const focusableElements = modal.querySelectorAll('a');

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }

    return (
        <Layout
            config={content.meta}
            layout={content.layout}
            isBlog={true}
        >
            { modalIsActive &&
                <div className={styles.modalContainer}>
                    <div ref={modalRef} className={styles.modal} tabIndex={0} role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDesc">
                        <h2 id="modalTitle">Attention, changement de langue</h2>

                        <p id="modalDesc">
                            Mon blogue est seulement en Anglais pour le moment, si vous voulez absolument une traduction en Français,
                            n&apos;hésitez pas à me <LocalLink href="/contact">Contacter</LocalLink>
                        </p>

                        <div className={styles.modalActions}>
                            <div>
                                <Link href="/blog" locale="en">
                                    <a>
                                        Continuer en Anglais
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <LocalLink href="/">
                                    Retourner à la page d&apos;accueil
                                </LocalLink>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <h1>Blog Home</h1>

            <ul>
                { posts.map((post, index) => (
                    <li key={index}>
                        <Link href={`/en/blog/${post.fields.slug}`}>
                            <a>
                                {post.fields.title}
                            </a>
                        </Link>
                    </li>
                ))
                }
            </ul>
        </Layout>
    )
}

export async function getServerSideProps() {
    const content = await getPage('blogHomepage');
    const posts = await getPosts();
    // await generateRssFeed();

    return {
        props: { content, posts },
    }
}
