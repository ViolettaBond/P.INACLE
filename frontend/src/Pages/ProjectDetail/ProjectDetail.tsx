import { useParams } from 'react-router-dom'
import ProjectHero from './ProjectHero/ProjectHero'
import ProjectInfo from './ProjectInfo/ProjectInfo'
import YouMayAlsoLike from './YouMayAlsoLike/YouMayAlsoLike'

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>()

    return (
        <>
            <ProjectHero />
            {id && <ProjectInfo projectId={id} />}
            {id && <YouMayAlsoLike projectId={id} />}
        </>
    )
}