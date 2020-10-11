import SkillListItem from '../skill-list-item/skill-list-item';
import styles from './skill-list.module.css';

function SkillList({skills}) {
    return (
        <ul className={styles.skills}>
            {skills.map((skill, i) => (
                <SkillListItem key={i} skill={skill} />
            ))}
        </ul>
    )
}
export default SkillList
