import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../Components/Button/Button';
import { Photos } from '../../../../Photos';
import { getProjects, projectImage, type Project } from './featuredProjectsApi';
import styles from './FeaturedProjects.module.scss';

const LIMIT = 3;

export default function FeaturedProjects() {
    const [items, setItems] = useState<Project[]>([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getProjects(LIMIT, offset)
            .then((data) => {
                setItems(data.items);
                setTotal(data.total);
            })
            .catch(console.error);
    }, [offset]);

    const page = Math.floor(offset / LIMIT) + 1;
    const pages = Math.ceil(total / LIMIT);

    const prev = () => setOffset((v) => Math.max(0, v - LIMIT));
    const next = () => setOffset((v) => Math.min(total - LIMIT, v + LIMIT));

    return (
        <>
            <section className={styles.featured}>
                <div className={styles.container}>
                    <div className={styles.head}>
                        <div className={styles.text}>
                            <h2 className={styles.title}>
                                <img src={Photos.Icon.FeaturedIcon} alt="" />
                                Featured Projects
                            </h2>
                            <p className={styles.subtitle}>
                                We've built a reputation for delivering exceptional results and
                                exceeding our clients' expectations. From luxurious residential
                                homes to state-of-the-art commercial properties, our team of experts
                                is dedicated to bringing your vision to life.
                            </p>
                        </div>

                        <Link to="/projects">
                            <Button text="View all Projects" variant="ghost" />
                        </Link>
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

                    <div className={styles.bottom}>
                        <span className={styles.counter}>
                            {String(page).padStart(2, '0')} / {String(pages).padStart(2, '0')}
                        </span>

                        <div className={styles.arrows}>
                            <button onClick={prev} disabled={offset === 0} aria-label="Previous">
                                ←
                            </button>
                            <button
                                onClick={next}
                                disabled={offset + LIMIT >= total}
                                aria-label="Next">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
