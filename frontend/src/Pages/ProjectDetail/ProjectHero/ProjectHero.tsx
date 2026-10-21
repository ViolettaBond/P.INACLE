import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Photos } from '../../../../Photos';
import { getProject, type Project } from '../projectDetailApi';
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi';
import styles from './ProjectHero.module.scss';

export default function ProjectHero() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!id) return;

        getProject(id).then(setProject).catch(console.error);
    }, [id]);

    if (!project) return null;

    return (
        <section className={styles.projectHero}>
            <div className={styles.container}>
                <Link to="/projects" className={styles.back}>
                    <img src={Photos.Icon.ArrowLeft} alt="" />
                    Back to all Projects
                </Link>

                <div className={styles.head}>
                    <h1 className={styles.title}>{project.name}</h1>

                    <p className={styles.desc}>{project.description}</p>

                    <div className={styles.badges}>
                        <span className={styles.badge}>{project.tag}</span>

                        <span className={styles.badge}>
                            <img src={Photos.Icon.Pin} alt="" />
                            {project.location}
                        </span>
                    </div>
                </div>

                <div className={styles.cover}>
                    <img src={projectImage(project.image)} alt={project.name} />
                </div>
            </div>
        </section>
    );
}
