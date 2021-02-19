import React, { useState, useRef } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/layout';
import styles from '../../styles/Contact.module.css';
import Button from '../../components/button/button';
import classnames from 'classnames';
import { locales } from '../../translations/config';
import { getPage } from '../../lib/api';

export default function ContactPage({content, lang}) {

    const formRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isErroneous, setIsErroneous] = useState(false);

    const close = () => {
        setIsSuccessful(false);
        setIsErroneous(false);
        formRef.current.reset();
    }

    const sendForm = (event) => {
        event.preventDefault();

        if (name === '' || email === '' || text === '' || isLoading) {
            return;
        }
        setIsLoading(true);

        axios.post('/api/contact', {
            name: name,
            email: email,
            text: text,
        }).then(() => {
            setIsSuccessful(true);
            setIsErroneous(false);
        }).catch(() => {
            setIsErroneous(true);
            setIsSuccessful(false);
        }).finally(() => {
            setIsLoading(false);
            window.setTimeout(() => {
                close();
            }, 3500);
        })
    }

    return (
        <Layout layout={content.layout} config={content.meta} lang={lang}>
            { (isLoading || isSuccessful || isErroneous) &&
                <div className={styles.overlay}>
                    <span className={styles.icon}>
                        { (isSuccessful || isErroneous) &&
                            <button
                                className={styles.close}
                                onClick={close}
                            >
                                <i
                                    aria-hidden={true}
                                    className={classnames('fas fa-times', styles.closeIcon)}
                                />
                            </button>
                        }

                        { isLoading &&
                            <>
                                <i
                                    aria-hidden={true}
                                    className={classnames('fas fa-circle-notch', styles.spin)}
                                />

                                <span>{content.loading}</span>
                            </>
                        }
                        { isSuccessful &&
                            <>
                                <i
                                    aria-hidden={true}
                                    className={classnames('fas fa-check-circle', styles.success)}
                                />

                                <span>{content.success}</span>
                            </>
                        }
                        { isErroneous &&
                            <>
                                <i
                                    aria-hidden={true}
                                    className={classnames('fas fa-exclamation-circle', styles.error)}
                                />

                                <span>{content.error}</span>
                            </>
                        }
                    </span>
                </div>
            }

            <h1 className={styles.title}>{content.title}</h1>

            <form
                className={styles.form}
                onSubmit={sendForm}
                ref={formRef}
            >
                <div className={styles.fieldGroup}>
                    <label
                        className={styles.label}
                        htmlFor="name"
                    >
                        {content.nameField.fields.title}
                    </label>

                    <input
                        className={styles.field}
                        type="text"
                        id="name"
                        name="name"
                        required={true}
                        onChange={event => setName(event.target.value)}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label
                        className={styles.label}
                        htmlFor="email"
                    >
                        {content.emailField.fields.title}
                    </label>

                    <input
                        className={styles.field}
                        type="email"
                        id="email"
                        name="email"
                        required={true}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label
                        className={styles.label}
                        htmlFor="message"
                    >
                        {content.messageField.fields.title}
                    </label>

                    <textarea
                        className={styles.textarea}
                        id="message"
                        name="message"
                        required={true}
                        onChange={event => setText(event.target.value)}
                    />
                </div>

                <Button
                    label={content.sendFormButton.fields.title}
                    type="submit"
                    disabled={isLoading}
                />
            </form>
        </Layout>
    )
};

export const getStaticPaths = async () => {
    return {
        paths: locales.map((lang) => ({ params: { lang } })),
        fallback: false,
    };
};


export async function getStaticProps(context) {
    const lang = context.params.lang
    const content = await getPage('contactPage', lang);
    return {
        props: { content, lang },
    }
}
