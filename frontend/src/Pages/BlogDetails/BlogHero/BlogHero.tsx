import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Photos } from '../../../../Photos'
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi'
import { getBlogPost, type BlogPost } from '../blogDetailsApi'
import styles from './BlogHero.module.scss'

export default function BlogHero() {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<BlogPost | null>(null)

    useEffect(() => {
        if (!id) return

        getBlogPost(id).then(setPost).catch(console.error)
    }, [id])

    if (!post) return null

    const avatar = Photos.Avatar[post.author_avatar] ?? Photos.Avatar.Avatar1

    return (
        <section className={styles.blogHero}>
            <div className={styles.container}>
                <Link to="/blog" className={styles.back}>
                    <img src={Photos.Icon.ArrowLeft} alt="" />
                    Back to all Posts
                </Link>

                <div className={styles.head}>
                    <h1 className={styles.title}>{post.title}</h1>

                    <p className={styles.desc}>{post.description}</p>

                    <div className={styles.badges}>
                        <span className={styles.badge}>{post.tag}</span>

                        <span className={styles.badge}>
                            <img src={Photos.Icon.Calendar} alt="" />
                            {post.date_text}
                        </span>

                        <span className={styles.badge}>
                            <img className={styles.avatar} src={avatar} alt="" />
                            By {post.author_name}
                        </span>
                    </div>
                </div>

                <div className={styles.cover}>
                    <img src={projectImage(post.image)} alt={post.title} />
                </div>
            </div>
        </section>
    )
}