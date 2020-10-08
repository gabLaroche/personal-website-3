import SkillListItem from '../skill-list-item/skill-list-item';

function SkillList({skills}) {
    return (
        <ul>
            {skills.map((skill, i) => (
                <SkillListItem key={i} skill={skill} />
            ))}
        </ul>
    )
}
export default SkillList
