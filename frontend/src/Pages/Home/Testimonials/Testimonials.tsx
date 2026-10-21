import { useEffect, useState } from 'react';
import { Photos } from '../../../../Photos';
import styles from './Testimonials.module.scss';

interface Testimonial {
    id: number;
    text: string;
    author_name: string;
    author_role: string;
    author_avatar: string;
    rating: number;
    position: 'top' | 'bottom';
}

export default function Testimonials() {
    const [items, setItems] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/testimonials?position=bottom')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to load testimonials');
                }

                return res.json();
            })
            .then((data: Testimonial[]) => {
                setItems(data.slice(0, 4));
            })
            .catch(console.error);
    }, []);

    const avatarImage = (name: string) => {
        return Photos.Avatar[name as keyof typeof Photos.Avatar] ?? Photos.Avatar.Avatar1;
    };

    const averageRating = items.length
        ? items.reduce((sum, item) => sum + item.rating, 0) / items.length
        : 0;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={
                    index < Math.floor(rating)
                        ? styles.starFilled
                        : index < rating
                          ? styles.starHalf
                          : styles.starEmpty
                }>
                ★
            </span>
        ));
    };

    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h2 className={styles.title}>
                        What Our Clients Say
                        <img src={Photos.kubiki} alt="" />
                    </h2>

                    <p className={styles.subtitle}>
                        At Pinnacle, we're not just building structures - we're building
                        relationships. Here's what some of our satisfied clients have to say about
                        their experience with us.
                    </p>

                    <div className={styles.rating}>
                        <div className={styles.avatars}>
                            {items.map((item) => (
                                <img
                                    key={item.id}
                                    src={avatarImage(item.author_avatar)}
                                    alt={item.author_name}
                                />
                            ))}
                        </div>

                        <div className={styles.ratingInfo}>
                            <div className={styles.stars}>{renderStars(averageRating)}</div>

                            <span>{averageRating.toFixed(1)}/5 Average rating</span>
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {items.map((item) => (
                        <article key={item.id} className={styles.card}>
                            <img
                                className={styles.avatar}
                                src={avatarImage(item.author_avatar)}
                                alt={item.author_name}
                            />

                            <div className={styles.content}>
                                <p className={styles.text}>"{item.text}"</p>

                                <p className={styles.author}>
                                    - {item.author_name}, {item.author_role}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
