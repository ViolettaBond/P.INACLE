import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Photos } from '../../../Photos';
import Button from '../Button/Button';
import styles from './Header.module.scss';

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Projects' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'News' },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
                    <img src={Photos.Icon.Logo} alt="Pinnacle" />
                </Link>

                <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === '/'}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => (isActive ? styles.active : '')}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.cta}>
                    <Link to="/contact">
                        <Button text="Contact us" variant="ghost" />
                    </Link>
                </div>

                <button
                    className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}