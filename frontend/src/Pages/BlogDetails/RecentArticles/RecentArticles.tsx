import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Photos } from '../../../../Photos';
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi';
import { getBlogPosts, type BlogPost } from '../../Blog/BlogNews/blogNewsApi';
import styles from './RecentArticles.module.scss';

interface Props {
    postId: string;
}

export default function RecentArticles({ postId }: Props) {
    const [items, setItems] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch(`http://localhost:5000/blog/list?category=all&limit=3&offset=0`)
            .then((r) => r.json())
            .then((data) => {
                setItems(data.items.filter((p: BlogPost) => p.id !== Number(postId)).slice(0, 2));
            })
            .catch(console.error);
    }, [postId]);

    if (!items.length) return null;

    return (
        <section className={styles.recent}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h2 className={styles.title}>Recent Articles</h2>

                    <Link to="/blog" className={styles.back}>
                        <img src={Photos.Icon.ArrowLeft} alt="" />
                        Back to all Posts
                    </Link>
                </div>

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
            </div>
        </section>
    );
}
