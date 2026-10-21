import React from 'react';
import { Photos } from '../../../../Photos';
import styles from './ServicesHero.module.scss';

export const ServicesHero: React.FC = () => {
    return (
        <section className={styles.servicesHero}>
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <h1 className={styles.mainTitle}>Bringing Your Vision to Life</h1>
                    <p className={styles.subtitle}>
                        Pinnacle's commitment to excellence extends beyond just constructing buildings — 
                        it's about crafting exceptional spaces that inspire and delight.
                    </p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.heroImage}>
                    <img src={Photos.HouseBuilding} alt="Building structure under construction" />
                </div>
            </div>
        </section>
    );
};

export default ServicesHero;
