import { useEffect, useState } from 'react';
import { Photos } from '../../../../Photos';
import styles from './OurTeam.module.scss';

interface TeamMember {
    id: number;
    title: string;
    date_text: string;
    description: string;
    image: string;
}

export default function OurTeam() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/team')
            .then((res) => res.json())
            .then((data) => setTeam(data))
            .catch((err) => console.error(err));
    }, []);

    const totalPages = Math.ceil(team.length / 3) || 1;

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

    return (
        <section className={styles.ourTeam}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <span className={styles.orangeHourglass}></span>
                        Our experienced team
                    </h2>
                    <p className={styles.description}>
                        With a diverse range of skills and expertise, our team is dedicated to
                        delivering exceptional results and exceeding our clients' expectations.
                    </p>
                </div>

                <div className={styles.sliderWrapper}>
                    <div
                        className={styles.cardsTrack}
                        style={{
                            transform: `translateX(-${currentPage * 100}%)`
                        }}
                    >
                        {team.map((member) => (
                            <div key={member.id} className={styles.card}>
                                <div className={styles.imageContainer}>
                                    <img 
                                        src={Photos.Team[member.image as keyof typeof Photos.Team]} 
                                        alt={member.title} 
                                    />
                                </div>
                                <div className={styles.cardInfo}>
                                    <h4 className={styles.cardTitle}>
                                        {member.title} <span className={styles.divider}>/</span>{' '}
                                        <span className={styles.date}>{member.date_text}</span>
                                    </h4>
                                    <p className={styles.cardDesc}>{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
}
