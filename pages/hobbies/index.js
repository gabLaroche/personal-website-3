import {getPage} from "../../lib/api";
import Layout from "../../components/layout/layout";
import styles from "../../styles/Hobbies.module.css";
import React from "react";

export default function AboutPage({ content }) {
	return (
		<Layout layout={content.layout} config={content.meta}>
			<h1 className={styles.title}>{content.title}</h1>
		</Layout>
	)
}

export async function getServerSideProps({ locale }) {
	const content = await getPage('hobbiesPage', locale);
	return {
		props: { content },
	}
}