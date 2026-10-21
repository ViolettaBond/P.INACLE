import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Photos } from '../../../../Photos';
import { getProjects, type Project } from './projectsListApi';
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi';
import styles from './ProjectsList.module.scss';

const LIMIT = 6;

export default function ProjectsList() {
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState<Project[]>([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);

    const filters = Object.fromEntries(searchParams.entries());

    useEffect(() => {
        getProjects(LIMIT, offset, filters)
            .then((data) => {
                setItems(data.items);
                setTotal(data.total);
            })
            .catch(console.error);
    }, [offset, searchParams]);

    const loadMore = () => setOffset((v) => v + LIMIT);
    const hasMore = offset + LIMIT < total;

    return (
        <section className={styles.projectsList}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h2 className={styles.title}>Our Exceptional Projects</h2>
                    <p className={styles.subtitle}>
                        Explore our portfolio to see the breadth and quality of our work, and get
                        inspired to start your own dream project.
                    </p>
                </div>

                <div className={styles.grid}>
                    {items.map((p) => (
                        <article key={p.id} className={styles.card}>
                            <img
                                className={styles.image}
                                src={projectImage(p.image)}
                                alt={p.name}
                            />

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

                {hasMore && (
                    <div className={styles.more}>
                        <button onClick={loadMore}>See More</button>
                    </div>
                )}
            </div>
        </section>
    );
}
