import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './NotFound.module.scss';

export default function NotFound() {
    return (
        <section className={styles.notFound}>
            <div className={styles.glow} />

            <div className={styles.container}>
                <span className={styles.code}>404</span>
                <h1 className={styles.title}>Page Not Found</h1>

                <div className={styles.actions}>
                    <Link to="/">
                        <Button text="Back to Home Page" variant="primary" />
                    </Link>
                </div>
            </div>
        </section>
    );
}