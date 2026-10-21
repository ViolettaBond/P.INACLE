import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Photos } from '../../../../Photos'
import { getProjects, type Project } from '../../Projects/ProjectsList/projectsListApi'
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi'
import styles from './YouMayAlsoLike.module.scss'

interface Props {
    projectId: string
}

export default function YouMayAlsoLike({ projectId }: Props) {
    const [items, setItems] = useState<Project[]>([])

    useEffect(() => {
        getProjects(3, 0, { exclude: projectId })
            .then((data) => setItems(data.items))
            .catch(console.error)
    }, [projectId])

    if (!items.length) return null

    return (
        <section className={styles.youMayAlsoLike}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <div className={styles.text}>
                        <h2 className={styles.title}>
                            <span className={styles.dot} />
                            You may also like
                        </h2>
                        <p className={styles.subtitle}>
                            You may also want to check the following projects we worked on.
                        </p>
                    </div>

                    <Link to="/projects" className={styles.back}>
                        <img src={Photos.Icon.ArrowLeft} alt="" />
                        Back to all Projects
                    </Link>
                </div>

                <div className={styles.grid}>
                    {items.map((p) => (
                        <article key={p.id} className={styles.card}>
                            <img className={styles.image} src={projectImage(p.image)} alt={p.name} />

                            <h3 className={styles.name}>{p.name}</h3>
                            <p className={styles.desc}>{p.description}</p>

                            <div className={styles.location}>
                                <img src={Photos.Icon.Pin} alt="" />
                                {p.location}
                            </div>

                            <span className={styles.tag}>{p.tag}</span>

                            <Link to={`/projects/${p.id}`} className={styles.btn}>
                                View Property
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}