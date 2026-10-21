import { Photos } from '../../../Photos';
import styles from './TestimonialCard.module.scss';

export interface Testimonial {
    id: number;
    text: string;
    author_name: string;
    author_role: string;
    author_avatar: string;
    rating: number;
    position: 'top' | 'bottom';
}

interface Props {
    data: Testimonial;
    className?: string;
}

export default function TestimonialCard({ data, className }: Props) {
    const avatar =
        Photos.Avatar[data.author_avatar as keyof typeof Photos.Avatar] ?? Photos.Avatar.Avatar1;

    return (
        <div className={`${styles.card} ${className ?? ''}`}>
            <div className={styles.stars}>
                {Array.from({ length: data.rating }).map((_, i) => (
                    <img key={i} src={Photos.Icon.Star} alt="" />
                ))}
            </div>

            <div className={styles.row}>
                <img className={styles.avatar} src={avatar} alt={data.author_name} />

                <div className={styles.text}>{data.text}</div>
            </div>

            <div className={styles.author}>
                <span className={styles.name}>{data.author_name}</span>
                <span className={styles.role}>{data.author_role}</span>
            </div>
        </div>
    );
}
