import ProjectListItem from '../project-list-item/project-list-item';
import styles from './project-list.module.css'

function ProjectList({projects}) {
    return (
        <ul className={styles.projectList}>
            {projects.map((project, i) => (
                <ProjectListItem key={i} project={project} />
            ))}
        </ul>
    )
}
export default ProjectList
