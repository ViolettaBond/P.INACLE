import { useEffect, useState } from 'react';
import { Photos } from '../../../../Photos';
import { getProject, type Project } from '../projectDetailApi';
import { projectImage } from '../../Home/FeaturedProjects/featuredProjectsApi';
import styles from './ProjectInfo.module.scss';

interface Props {
    projectId: string;
}

export default function ProjectInfo({ projectId }: Props) {
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        getProject(projectId).then(setProject).catch(console.error);
    }, [projectId]);

    if (!project) return null;

    const shareLinks = [
        { icon: Photos.SocNet.Link, href: '#' },
        { icon: Photos.SocNet.Download, href: '#' },
        { icon: Photos.SocNet.Facebook, href: '#' },
        { icon: Photos.SocNet.Instagram, href: '#' },
        { icon: Photos.SocNet.Linkedin, href: '#' },
    ];

    return (
        <section className={styles.projectInfo}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Planning and Development</h2>
                        <p className={styles.blockText}>
                            The planning and development of the {project.name} began several years
                            ago, with a team of experts working tirelessly to bring this vision to
                            life. From the initial concept to the final construction, every detail
                            was carefully considered to ensure that the {project.name} would be a
                            truly exceptional community.
                        </p>

                        {project.planning_image && (
                            <div className={styles.imageSingle}>
                                <img src={projectImage(project.planning_image)} alt="" />
                            </div>
                        )}
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Design and Architecture</h2>
                        <p className={styles.blockText}>
                            The {project.name}'s design and architecture were inspired by the finest
                            luxury estates around the world. Each home was designed to be a
                            masterpiece of modern design, with clean lines, sleek surfaces, and an
                            emphasis on natural light and ventilation.
                        </p>

                        {project.design_images?.length > 0 && (
                            <div className={styles.imagePair}>
                                {project.design_images.map((img, i) => (
                                    <div key={i} className={styles.image}>
                                        <img src={projectImage(img)} alt="" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Amenities</h2>
                        <p className={styles.blockText}>
                            The {project.name} offers a range of luxurious amenities, including:
                        </p>

                        {project.amenities_list?.length > 0 && (
                            <ul className={styles.list}>
                                {project.amenities_list.map((item, i) => {
                                    const [head, ...rest] = item.split(':');
                                    return (
                                        <li key={i}>
                                            <strong>{head}:</strong> {rest.join(':').trim()}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        {project.amenities_images?.length > 0 && (
                            <div className={styles.imagePair}>
                                {project.amenities_images.map((img, i) => (
                                    <div key={i} className={styles.image}>
                                        <img src={projectImage(img)} alt="" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Community</h2>
                        <p className={styles.blockText}>
                            The {project.name} is more than just a collection of homes — it's a
                            community. Residents can enjoy a range of community amenities,
                            including:
                        </p>

                        {project.community_list?.length > 0 && (
                            <ul className={styles.list}>
                                {project.community_list.map((item, i) => {
                                    const [head, ...rest] = item.split(':');
                                    return (
                                        <li key={i}>
                                            <strong>{head}:</strong> {rest.join(':').trim()}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        {project.community_image && (
                            <div className={styles.imageSingle}>
                                <img src={projectImage(project.community_image)} alt="" />
                            </div>
                        )}
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>Conclusion</h2>
                        <p className={styles.blockText}>{project.conclusion}</p>
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Amenities</h3>
                        <ul className={styles.cardList}>
                            <li>Private movie theater</li>
                            <li>Indoor swimming pool</li>
                            <li>Fitness center</li>
                            <li>Private parking</li>
                            <li>Gated community</li>
                        </ul>
                    </div>

                    <div className={styles.share}>
                        <span className={styles.shareLabel}>Share</span>
                        <div className={styles.shareIcons}>
                            {shareLinks.map((s, i) => (
                                <a key={i} href={s.href}>
                                    <img src={s.icon} alt="" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.read}>
                        <span className={styles.readLabel}>{project.read_time}</span>
                        <div className={styles.readBar} />
                    </div>

                    <div className={styles.cta}>
                        <p className={styles.ctaText}>Have a project in your mind?</p>
                        <button className={styles.ctaBtn}>Schedule a free call</button>
                    </div>
                </aside>
            </div>
        </section>
    );
}
