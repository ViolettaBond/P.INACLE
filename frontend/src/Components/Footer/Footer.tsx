import { Link } from 'react-router-dom';
import { Photos } from '../../../Photos';
import styles from './Footer.module.scss';

const columns = [
    {
        title: 'Navigation',
        links: [
            { label: 'Home', to: '/' },
            { label: 'Properties', to: '/projects' },
            { label: 'Testimonials', to: '/testimonials' },
            { label: "FAQ's", to: '/faq' },
            { label: 'Terms & Conditions', to: '/privacy' },
        ],
    },
    {
        title: 'About Us',
        links: [
            { label: 'Our Story', to: '/about' },
            { label: 'Our Values', to: '/about' },
            { label: 'Our Team', to: '/about' },
        ],
    },
    {
        title: 'Properties',
        links: [
            { label: 'Portfolio', to: '/projects' },
            { label: 'Categories', to: '/projects' },
        ],
    },
    {
        title: 'Services',
        links: [
            { label: 'Residential Construction', to: '/services' },
            { label: 'Commercial Construction', to: '/services' },
            { label: 'Property Management', to: '/services' },
            { label: 'Development Services', to: '/services' },
        ],
    },
    {
        title: 'Contact Us',
        links: [
            { label: 'Contact Form', to: '/contact' },
            { label: 'Our Offices', to: '/contact' },
        ],
    },
];

const socials = [
    { icon: Photos.SocNet.Facebook, to: '#' },
    { icon: Photos.SocNet.Linkedin, to: '#' },
    { icon: Photos.SocNet.Twitter, to: '#' },
    { icon: Photos.SocNet.YouTube, to: '#' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.bannerWrapper}>
                <div className={styles.banner}>
                    <h2 className={styles.bannerTitle}>
                        Let's Build <img src={Photos.izvilshape} alt="" /> Something
                        Extraordinary Together
                    </h2>
                    <Link to="/projects" className={styles.bannerBtn}>
                        View our projects
                    </Link>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link to="/" className={styles.logo}>
                        <img src={Photos.Icon.Logo} alt="Pinnacle" />
                    </Link>

                    <form className={styles.subscribe} onSubmit={(e) => e.preventDefault()}>
                        <img className={styles.mailIcon} src={Photos.Icon.Mail} alt="" />
                        <input type="email" placeholder="Enter Your Email" required />
                        <button className={styles.send} type="submit">
                            <img src={Photos.Icon.Send} alt="" />
                        </button>
                    </form>
                </div>

                {columns.map((col) => (
                    <div key={col.title} className={styles.col}>
                        <span className={styles.colTitle}>{col.title}</span>
                        <ul>
                            {col.links.map((l) => (
                                <li key={l.label}>
                                    <Link to={l.to}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <span className={styles.copyright}>@2024 Pinnacle, All Rights Reserved.</span>

                    <div className={styles.socials}>
                        {socials.map((s, i) => (
                            <a key={i} href={s.to}>
                                <img src={s.icon} alt="" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
