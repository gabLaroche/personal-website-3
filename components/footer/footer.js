import styles from './footer.module.css';
import ReactMarkdown from 'react-markdown';

function Footer({footer}) {
    const fields = footer?.fields || {}

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <ul className={styles.socialList}>
                    {fields?.socialMediaLinks?.map((socialMediaLink, i) => (
                        <li key={i} className={styles.socialListItem}>
                            <a href={socialMediaLink.fields.url} aria-label={socialMediaLink.fields.title} className={styles.socialListItemLink}>
                                <i aria-hidden={true} className={`fab ${socialMediaLink.fields.fontAwesomeIcon}`}></i>
                            </a>
                        </li>
                    ))}
                </ul>
                <p className={styles.copyright}>{fields?.copyright}</p>
                <ReactMarkdown className={styles.sourceCode} source={fields?.sourceCode} />
            </div>
        </footer>
    )
}
export default Footer
