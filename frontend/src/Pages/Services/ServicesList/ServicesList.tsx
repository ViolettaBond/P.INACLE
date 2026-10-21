import React, { useEffect, useState } from 'react';
import { Photos } from '../../../../Photos';
import styles from './ServicesList.module.scss';

interface Subsection {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface ServiceData {
    id: number;
    name: string;
    description: string;
    subsections: Subsection[];
}

export const ServicesList: React.FC = () => {
    const [data, setData] = useState<ServiceData | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/services/main')
            .then((res) => res.json())
            .then((resData) => setData(resData))
            .catch((err) => console.error(err));
    }, []);

    if (!data) return null;

    return (
        <section className={styles.servicesSection}>
            <div className={styles.container}>
                
                <aside className={styles.sidebar}>
                    <div className={styles.stickyBlock}>
                        <h2 className={styles.mainTitle}>{data.name}</h2>
                        <button className={styles.scheduleBtn}>Schedule a Call</button>
                    </div>
                </aside>

                <div className={styles.contentColumn}>
                    <p className={styles.categoryDesc}>{data.description}</p>

                    <div className={styles.subsectionsList}>
                        {data.subsections.map((sub) => (
                            <div key={sub.id} className={styles.subCard}>
                                <h3 className={styles.subTitle}>{sub.title}</h3>
                                <p className={styles.subDesc}>{sub.description}</p>
                                <div className={styles.imageWrapper}>
                                    <img 
                                        src={Photos.Services[sub.image as keyof typeof Photos.Services] || Photos.Residential} 
                                        alt={sub.title} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesList;
