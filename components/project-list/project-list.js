import ProjectListItem from '../project-list-item/project-list-item';

function ProjectList({projects}) {
    return (
        <ul>
            {projects.map((project, i) => (
                <ProjectListItem key={i} project={project} />
            ))}
        </ul>
    )
}
export default ProjectList
