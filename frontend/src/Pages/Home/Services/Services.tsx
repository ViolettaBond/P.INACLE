import { useEffect, useState } from 'react';
import styles from './Services.module.scss';
import { serviceImage } from './servicesApi';
import { Photos } from '../../../../Photos'

interface Service {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
}

const categories = [
    { label: 'All', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Renovation', value: 'renovation' },
];

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:5000/services?category=${activeCategory}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to load services');
                }

                return res.json();
            })
            .then((data: Service[]) => {
                setServices(data);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, [activeCategory]);

    return (
        <section className={styles.services}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h2 className={styles.title}>
                        Quality service you get
                        <img src={Photos.zvezdocka} alt="" />
                    </h2>

                    <p className={styles.subtitle}>
                        At Pinnacle, we offer a wide range of services to cater to your unique
                        needs. From residential construction to commercial development, we've got
                        you covered.
                    </p>

                    <div className={styles.filters}>
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                className={`${styles.filter} ${
                                    activeCategory === category.value ? styles.active : ''
                                }`}
                                onClick={() => setActiveCategory(category.value)}>
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <p className={styles.message}>Loading services...</p>
                ) : services.length > 0 ? (
                    <div className={styles.grid}>
                        {services.map((service) => (
                            <article key={service.id} className={styles.card}>
                                <img
                                    className={styles.image}
                                    src={serviceImage(service.image)}
                                    alt={service.name}
                                />

                                <h3 className={styles.name}>{service.name}</h3>

                                <p className={styles.description}>{service.description}</p>

                                <a href={`/services/${service.id}`} className={styles.link}>
                                    Learn more <span>↗</span>
                                </a>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className={styles.message}>No services found.</p>
                )}
            </div>
        </section>
    );
}
