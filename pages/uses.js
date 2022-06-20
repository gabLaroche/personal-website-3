import React from 'react';
import Layout from '../components/layout/layout';
import { getPage } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Uses.module.css';

export default function UsesPage({ content }) {
	return (
		<Layout layout={content.layout} config={content.meta}>
			<h1 className={styles.title}>{content.title}</h1>
			<section className={styles.section}>
				<img src={`${content.usesImage?.fields?.file?.url}?w=455&`} alt={content.usesImage?.fields?.description} />
				<div>
					<ReactMarkdown source={content.usesText}/>
				</div>
			</section>
		</Layout>
	)
}


export async function getServerSideProps({ locale }) {
	const content = await getPage('usesPage', locale);
	return {
		props: { content },
	}
}
