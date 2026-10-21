import Contacts from './Contacts/Contacts.tsx';
import ServicesHero from './ServicesHero/ServicesHero';
import ServicesList from './ServicesList/ServicesList';

export default function Services() {
    return (
        <>
            <ServicesHero />
            <ServicesList />
            <Contacts />
        </>
    );
}
