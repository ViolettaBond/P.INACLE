import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Photos } from '../../../../Photos';
import { getFilters, type FiltersResponse } from './projectsHeroApi';
import styles from './ProjectsHero.module.scss';

const emptyFilters: FiltersResponse = { locations: [], types: [], costs: [] };

export default function ProjectsHero() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<FiltersResponse>(emptyFilters);
    const [search, setSearch] = useState('');
    const [locationId, setLocationId] = useState<number | null>(null);
    const [typeId, setTypeId] = useState<number | null>(null);
    const [costId, setCostId] = useState<number | null>(null);

    useEffect(() => {
        getFilters().then(setFilters).catch(console.error);
    }, []);

    const onFind = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (locationId) {
            const loc = filters.locations.find((l) => l.id === locationId);
            if (loc?.name) params.set('location', loc.name);
        }
        if (typeId) {
            const t = filters.types.find((t) => t.id === typeId);
            if (t?.name) params.set('type', t.name);
        }
        if (costId) {
            const c = filters.costs.find((c) => c.id === costId);
            if (c) {
                if (c.min !== undefined) params.set('minCost', String(c.min));
                if (c.max !== undefined && c.max !== null) params.set('maxCost', String(c.max));
            }
        }
        navigate(`/projects?${params.toString()}`);
    };

    return (
        <section className={styles.projectsHero}>
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <h1 className={styles.mainTitle}>Building Beyond Expectations</h1>
                    <p className={styles.subtitle}>
                        Explore a curated selection of our finest residential, commercial, and
                        mixed-use developments — each one shaped by a commitment to craft,
                        innovation, and enduring quality.
                    </p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.mapWrapper}>
                    <img src={Photos.ProjectsMap} alt="" />
                </div>

                <div className={styles.filters}>
                    <input
                        className={styles.search}
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className={styles.select}
                        value={locationId ?? ''}
                        onChange={(e) => setLocationId(Number(e.target.value) || null)}>
                        <option value="">Location</option>
                        {filters.locations.map((l) => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        value={typeId ?? ''}
                        onChange={(e) => setTypeId(Number(e.target.value) || null)}>
                        <option value="">Type</option>
                        {filters.types.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        value={costId ?? ''}
                        onChange={(e) => setCostId(Number(e.target.value) || null)}>
                        <option value="">Project Cost</option>
                        {filters.costs.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>

                    <button className={styles.apply} onClick={onFind}>
                        Find a property
                    </button>
                </div>
            </div>
        </section>
    );
}
