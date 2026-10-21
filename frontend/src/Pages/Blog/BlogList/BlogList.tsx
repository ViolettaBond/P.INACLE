import React, { useEffect, useState } from 'react';
import { Photos } from '../../../../Photos';
import styles from './BlogList.module.scss';

interface BlogPost {
    id: number;
    title: string;
    tag: string;
    description: string;
    date_text: string;
    image: string;
}

export const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/blog')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error(err));
    }, []);

    const postsPerPage = 2; 
    const totalPages = Math.ceil(posts.length / postsPerPage) || 1;

    const nextSlide = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const visiblePosts = posts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

    return (
        <section className={styles.blogSection}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <h1 className={styles.mainTitle}>Get the Latest News</h1>
                    <p className={styles.subtitle}>
                        At Pinnacle, we're passionate about sharing our knowledge and expertise with our audience. 
                        Our blog is dedicated to providing valuable insights, tips, and trends in the construction and real estate industries.
                    </p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {visiblePosts.map((post) => (
                        <div key={post.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img 
                                    src={Photos.Projects[post.image as keyof typeof Photos.Projects] || Photos.HeroBuilding} 
                                    alt={post.title} 
                                />
                            </div>
                            
                            <div className={styles.cardBody}>
                                <span className={styles.tag}>{post.tag}</span>
                                <p className={styles.description}>{post.description}</p>
                                
                                <div className={styles.cardFooter}>
                                    <span className={styles.date}>
                                        <img src={Photos.Icon.Mail} className={styles.dateIcon} alt="" />
                                        {post.date_text}
                                    </span>
                                    <span className={styles.lineLink}></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    <span className={styles.pagination}>
                        {String(currentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                    </span>
                    <div className={styles.arrows}>
                        <button
                            onClick={prevSlide}
                            className={`${styles.arrow} ${currentPage === 0 ? styles.disabled : ''}`}
                            disabled={currentPage === 0}
                        >
                            &larr;
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`${styles.arrow} ${currentPage >= totalPages - 1 ? styles.disabled : ''}`}
                            disabled={currentPage >= totalPages - 1}
                        >
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogList;
