import { useEffect, useState } from 'react'
import { Photos } from '../../../../Photos'
import { getBlogPost, type BlogPost, type BlogBlock } from '../blogDetailsApi'
import styles from './BlogContent.module.scss'

interface Props {
    postId: string
}

function renderBlock(block: BlogBlock, i: number) {
    if (block.type === 'heading') {
        return <h2 key={i}>{block.text}</h2>
    }

    if (block.type === 'paragraph') {
        return <p key={i}>{block.text}</p>
    }

    if (block.type === 'list') {
        return (
            <ol key={i} className={styles.list}>
                {block.items.map((item, j) => {
                    const [head, ...rest] = item.split(':')
                    return (
                        <li key={j}>
                            <strong>{head}:</strong>{rest.join(':')}
                        </li>
                    )
                })}
            </ol>
        )
    }

    return null
}

export default function BlogContent({ postId }: Props) {
    const [post, setPost] = useState<BlogPost | null>(null)

    useEffect(() => {
        getBlogPost(postId).then(setPost).catch(console.error)
    }, [postId])

    if (!post) return null

    const shareLinks = [
        { icon: Photos.SocNet.Link,      href: '#' },
        { icon: Photos.SocNet.Download,  href: '#' },
        { icon: Photos.SocNet.Facebook,  href: '#' },
        { icon: Photos.SocNet.Instagram, href: '#' },
        { icon: Photos.SocNet.Linkedin,  href: '#' },
    ]

    return (
        <section className={styles.blogContent}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {post.body?.map(renderBlock)}
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Table of content</h3>
                        <ul className={styles.cardList}>
                            {post.table_of_contents?.map((item, i) => (
                                <li key={i}>
                                    {i + 1}. {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.share}>
                        <span className={styles.shareLabel}>Share</span>
                        <div className={styles.shareIcons}>
                            {shareLinks.map((s, i) => (
                                <a key={i} href={s.href}>
                                    <img src={s.icon} alt="" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.read}>
                        <span className={styles.readLabel}>{post.read_time}</span>
                        <div className={styles.readBar} />
                    </div>

                    <div className={styles.cta}>
                        <p className={styles.ctaText}>Have a project in your mind?</p>
                        <button className={styles.ctaBtn}>Schedule a free call</button>
                    </div>
                </aside>
            </div>
        </section>
    )
}