import { Photos } from '../../../../Photos';
import styles from './AboutIntro.module.scss';

export default function AboutIntro() {
    return (
        <section className={styles.aboutIntro}>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>
                        We're building
                        <br />
                        communities.
                    </h1>

                    <p className={styles.description}>
                        With a commitment to quality, innovation, and customer satisfaction, we've
                        established ourselves as a trusted leader in the construction and real
                        estate industry. We're passionate about building exceptional homes and
                        communities that exceed our clients' expectations.
                    </p>
                </div>

                <div className={styles.gallery}>
                    <img
                        className={styles.galleryMain}
                        src={Photos.About.Cover5}
                        alt="Pinnacle team working together"
                    />

                    <img
                        className={styles.gallerySide}
                        src={Photos.About.Cover6}
                        alt="Modern residential interior"
                    />
                </div>

                <div className={styles.story}>
                    <h2 className={styles.storyTitle}>Our Story &amp; Values</h2>

                    <div className={styles.storyContent}>
                        <p className={styles.storyText}>
                            Pinnacle was founded in 2005 by John Doe, a seasoned entrepreneur with a
                            vision to create a company that would revolutionize the way homes are
                            built and lived in. As Pinnacle's founder and CEO, John Doe has led the
                            company to new heights, driven by his unwavering commitment to
                            excellence.
                        </p>

                        <article className={styles.quote}>
                            <img
                                className={styles.quoteAvatar}
                                src={Photos.Avatar.Avatar3}
                                alt="John Doe"
                            />

                            <div className={styles.quoteContent}>
                                <p className={styles.quoteText}>
                                    "At Pinnacle, we believe that every home we build should be a
                                    masterpiece - a reflection of our clients' dreams and
                                    aspirations. That's why we're dedicated to pushing the
                                    boundaries of what's possible in construction and real estate."
                                </p>

                                <p className={styles.quoteAuthor}>- John Doe, Founder and CEO</p>
                            </div>
                        </article>

                        <p className={styles.storyText}>
                            Since its inception, Pinnacle has grown to become a leading player in
                            the industry, completing over 500 projects and serving thousands of
                            satisfied clients. Today, the company employs a team of over 200
                            professionals, each with a unique set of skills and expertise.
                        </p>

                        <div className={styles.values}>
                            <p>
                                At Pinnacle, we're guided by a set of core values that shape our
                                approach to every project we undertake. These values include:
                            </p>

                            <ul>
                                <li>
                                    <strong>Quality:</strong> We're committed to delivering
                                    exceptional quality in every aspect of our work, from design to
                                    construction to customer service.
                                </li>
                                <li>
                                    <strong>Innovation:</strong> We're always looking for new and
                                    innovative ways to improve our processes, products, and
                                    services, ensuring that our clients receive the best possible
                                    experience.
                                </li>
                                <li>
                                    <strong>Customer Satisfaction:</strong> We're dedicated to
                                    exceeding our clients' expectations, providing them with a
                                    personalized and tailored experience that meets their unique
                                    needs and preferences.
                                </li>
                                <li>
                                    <strong>Sustainability:</strong> We're committed to building
                                    sustainable homes and communities that minimize our impact on
                                    the environment and promote a healthier, more sustainable
                                    future.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
