import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../Components/Button/Button'
import TestimonialCard, { type Testimonial } from '../../../Components/TestimonialCard/TestimonialCard'
import { Photos } from '../../../../Photos'
import styles from './Hero.module.scss'

export default function Hero() {
    const [items, setItems] = useState<Testimonial[]>([])

    useEffect(() => {
        fetch('http://localhost:5000/testimonials')
            .then((r) => r.json())
            .then(setItems)
            .catch(console.error)
    }, [])

    const top = items.find((t) => t.position === 'top')
    const bottom = items.find((t) => t.position === 'bottom')

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Creating a Better Tomorrow, One Home at a Time
                    </h1>

                    <p className={styles.subtitle}>
                        We've built a reputation for delivering exceptional results and exceeding our
                        clients' expectations. From luxurious residential homes to state-of-the-art
                        commercial properties, our team of experts is dedicated to bringing your
                        vision to life.
                    </p>

                    <div className={styles.actions}>
                        <Link to="/contact">
                            <Button text="Schedule a call" variant="primary" />
                        </Link>
                        <Link to="/projects">
                            <Button text="View our projects" variant="ghost" />
                        </Link>
                    </div>
                </div>

                <div className={styles.visual}>
                    <div className={styles.floating + ' ' + styles.top}>
                        {top && <TestimonialCard data={top} />}
                    </div>

                    <img className={styles.building} src={Photos.HeroBuilding} alt="" />

                    <div className={styles.floating + ' ' + styles.bottom}>
                        {bottom && <TestimonialCard data={bottom} />}
                    </div>
                </div>
            </div>
        </section>
    )
}