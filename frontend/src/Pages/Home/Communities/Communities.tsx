import { Link } from 'react-router-dom'
import Button from '../../../Components/Button/Button'
import { Photos } from '../../../../Photos'
import styles from './Communities.module.scss'

export default function Communities() {
    return (
        <section className={styles.communities}>
            <img className={styles.left} src={Photos.Communities.Left} alt="" />
            <img className={styles.right} src={Photos.Communities.Right} alt="" />

            <div className={styles.container}>
                <h2 className={styles.title}>
                    We're <br />
                    <img src={Photos.Shape} alt="" />
                    <p>building</p>
                    communities.
                </h2>

                <p className={styles.subtitle}>
                    With a commitment to excellence and a focus on innovation, we've established
                    ourselves as a leader in the real estate and construction industry.
                </p>

                <Link to="/about">
                    <Button text="Learn More About Us..." variant="ghost" />
                </Link>

                <div className={styles.rating}>
                    <div className={styles.avatars}>
                        <img src={Photos.Avatar.Avatar1} alt="" />
                        <img src={Photos.Avatar.Avatar2} alt="" />
                        <img src={Photos.Avatar.Avatar3} alt="" />
                    </div>

                    <div className={styles.info}>
                        <div className={styles.stars}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <img key={i} src={Photos.Icon.Star} alt="" />
                            ))}
                        </div>
                        <span className={styles.label}>4.5/5 Rated by 300+ Professionals</span>
                    </div>
                </div>
            </div>
        </section>
    )
}