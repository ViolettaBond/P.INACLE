import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Photos } from '../../../../Photos'
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi'
import { getBlogPosts, type BlogPost } from './blogNewsApi'
import styles from './BlogNews.module.scss'

const LIMIT = 6

const tabs = [
    { key: 'all',            label: 'ALL' },
    { key: 'Home Design',    label: 'Home Design' },
    { key: 'Sustainability', label: 'Sustainability' },
    { key: 'Renovation',     label: 'Renovation' },
]

export default function BlogNews() {
    const [items, setItems] = useState<BlogPost[]>([])
    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState(0)
    const [category, setCategory] = useState('all')

    useEffect(() => {
        getBlogPosts(category, LIMIT, offset)
            .then((data) => {
                setItems((prev) => (offset === 0 ? data.items : [...prev, ...data.items]))
                setTotal(data.total)
            })
            .catch(console.error)
    }, [category, offset])

    const changeTab = (key: string) => {
        setCategory(key)
        setOffset(0)
    }

    const loadMore = () => setOffset((v) => v + LIMIT)
    const hasMore = offset + LIMIT < total

    return (
        <section className={styles.blogNews}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h2 className={styles.title}>
                        <img src={Photos.zigurat} alt="" />
                        Latest News
                    </h2>

                    <div className={styles.tabs}>
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => changeTab(t.key)}
                                className={category === t.key ? styles.active : ''}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </header>

                <div className={styles.grid}>
                    {items.map((post) => (
                        <Link key={post.id} to={`/blog/${post.id}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={projectImage(post.image)} alt={post.title} />
                            </div>

                            <div className={styles.cardBody}>
                                <span className={styles.tag}>{post.tag}</span>

                                <h3 className={styles.cardTitle}>{post.title}</h3>

                                <div className={styles.cardFooter}>
                                    <span className={styles.date}>
                                        <img
                                            src={Photos.Icon.Calendar}
                                            className={styles.dateIcon}
                                            alt=""
                                        />
                                        {post.date_text}
                                    </span>

                                    <span className={styles.readMore}>Read more...</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {hasMore && (
                    <div className={styles.more}>
                        <button onClick={loadMore}>Load More</button>
                    </div>
                )}
            </div>
        </section>
    )
}