import styles from './Achievements.module.scss';
import { Photos } from '../../../../Photos'

export default function Achievements() {
    return (
        <section className={styles.achievements}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Our Achievements
                        <img src={Photos.kubiki} alt="" />
                    </h2>
                    <p className={styles.description}>
                        With the company now serving over 100 countries and available in 19
                        different languages. Our customer base is diverse and global, with a strong
                        presence in Europe, Asia, and the Americas.
                    </p>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.card}>
                        <h3 className={styles.number}>10K</h3>
                        <p className={styles.label}>Clients</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.number}>500</h3>
                        <p className={styles.label}>Projects</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.number}>19</h3>
                        <p className={styles.label}>Languages</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.number}>1K+</h3>
                        <p className={styles.label}>Employees</p>
                    </div>
                </div>

                <div className={styles.awardsGrid}>
                    <div className={styles.card}>
                        <h3 className={styles.year}>2021</h3>
                        <p className={styles.awardText}>"Sustainable Design Award" from (USGBC)</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.year}>2020</h3>
                        <p className={styles.awardText}>"Builder of the Year" award</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.year}>2022</h3>
                        <p className={styles.awardText}>"Top 50 Fastest-Growing Companies"</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
