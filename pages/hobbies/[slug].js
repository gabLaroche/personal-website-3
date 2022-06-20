import {getHobby} from "../../lib/api";
import Layout from "../../components/layout/layout";
import styles from "../../styles/Project.module.css";
import React from "react";

function Hobby({ hobby }) {
	return (
		<Layout layout={hobby?.layout} config={hobby?.meta}>
			<div className={styles.container}>
				<h1 className={styles.title}>{hobby?.title}</h1>
			</div>
		</Layout>
	)
}

export default Hobby

export async function getServerSideProps({ params, locale }) {
	const hobby = await getHobby(params.slug, locale);

	return {
		props: { hobby },
	}
}