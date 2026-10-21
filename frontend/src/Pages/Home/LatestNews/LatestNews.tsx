import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Photos } from '../../../../Photos';
import { getLatestNews, type NewsItem } from './latestNewsApi';
import styles from './LatestNews.module.scss';

const LIMIT = 2;

export default function LatestNews() {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getLatestNews(LIMIT, offset)
            .then((data) => {
                setItems(data.items);
                setTotal(data.total);
            })
            .catch(console.error);
    }, [offset]);

    const page = Math.floor(offset / LIMIT) + 1;
    const pages = Math.ceil(total / LIMIT) || 1;

    const prev = () => setOffset((v) => Math.max(0, v - LIMIT));
    const next = () => setOffset((v) => Math.min(total - LIMIT, v + LIMIT));

    return (
        <section className={styles.news}>
            <div className={styles.container}>
                
                <div className={styles.head}>
                    <div className={styles.text}>
                        <h2 className={styles.title}>
                            <img src={Photos.newsIcon} alt="" />
                            Latest News
                        </h2>
                        <p className={styles.subtitle}>
                            We've built a reputation for delivering exceptional results and exceeding our clients' 
                            expectations. From luxurious residential homes to state-of-the-art commercial properties, 
                            our team of experts is dedicated to bringing your vision to life.
                        </p>
                    </div>
                    
                    <Link to="/blog" className={styles.viewAllBtn}>
                        View all blog post
                    </Link>
                </div>

                <div className={styles.grid}>
                    {items.map((post) => (
                        <article key={post.id} className={styles.card}>
                            <img
                                className={styles.image}
                                src={Photos.Projects[post.image] ?? Photos.Projects.Cover1}
                                alt={post.title}
                            />

                            <div className={styles.content}>
                                <span className={styles.tag}>{post.tag}</span>
                                <h3 className={styles.name}>{post.title}</h3>
                                
                                <div className={styles.cardFooter}>
                                    <span className={styles.date}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        {post.date_text}
                                    </span>
                                    <Link to={`/blog/${post.id}`} className={styles.link}>
                                        Read More...
                                    </Link>
                                </div>
                            </div>
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
    );
}