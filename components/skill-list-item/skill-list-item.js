import Link from 'next/link'

function SkillListItem({skill}) {
    return (
        <li>
            <Link href={`/projects?filter=${encodeURIComponent(skill.fields.slug)}`}>
                <a>
                    {skill.fields.title}
                </a>
            </Link>
        </li>
    )
}
export default SkillListItem
