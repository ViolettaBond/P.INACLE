import Testimonials from '../Home/Testimonials/Testimonials';
import AboutIntro from './AboutIntro/AboutIntro';
import Achievements from './Achievements/Achievements';
import OurTeam from './OurTeam/OurTeam';

export default function About() {
    return (
        <main>
            <AboutIntro />
            <Achievements />
            <Testimonials />
            <OurTeam />
        </main>
    );
}
