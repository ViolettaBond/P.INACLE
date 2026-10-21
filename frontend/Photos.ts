import Logo from './src/assets/logo.svg';
import Star from './src/assets/star.svg';
import Avatar1 from './src/assets/Avatar1.png';
import Avatar2 from './src/assets/Avatar2.png';
import Mail from './src/assets/mail.svg';
import Send from './src/assets/send.svg';
import Facebook from './src/assets/facebook.svg';
import Linkedin from './src/assets/linkedin.svg';
import Twitter from './src/assets/twitter.svg';
import YouTube from './src/assets/youtube.svg';
import HeroBuilding from './src/assets/hero-building.png';
import CommunitiesLeft from './src/assets/communities-left.png';
import CommunitiesRight from './src/assets/communities-right.png';
import Avatar3 from './src/assets/Avatar3.png';
import Cover1 from './src/assets/Cover1.png';
import Cover2 from './src/assets/Cover2.png';
import Cover3 from './src/assets/Cover3.png';
import Pin from './src/assets/pin.svg';
import Residential from './src/assets/residential.jpg';
import Avatar5 from './src/assets/Avatar5.png';
import Avatar6 from './src/assets/Avatar6.png';
import Avatar7 from './src/assets/Avatar7.png';
import Avatar8 from './src/assets/Avatar8.png';
import Cover5 from './src/assets/Cover5.png';
import Cover6 from './src/assets/Cover6.png';
import Member1 from './src/assets/Member1.png';
import Member2 from './src/assets/Member2.png';
import Member3 from './src/assets/Member3.png';
import ContactCover from './src/assets/ContactCover.png';
import UserIcon from './src/assets/user.svg';
import mailContacts from './src/assets/mailContacts.svg';
import BudgetIcon from './src/assets/budget.svg';
import ServiceIcon from './src/assets/service.svg';
import MessageIcon from './src/assets/message.svg';
import Calendar from './src/assets/Calendar.svg';

import HouseBuilding from './src/assets/HouseBuilding.png';
import village from './src/assets/village.jpg';
import botania from './src/assets/botania.jpg';
import cleaning from './src/assets/cleaning.jpg';

import ProjectsMap from './src/assets/ProjectsMap.png';
import ArrowLeft from './src/assets/ArrowLeft.svg';

import Link from './src/assets/Link.svg';
import Download from './src/assets/Download.svg';
import Instagram from './src/assets/Instagram.svg';

import Cover7 from './src/assets/Cover7.png';
import Shape from './src/assets/shape.png';
import FeaturedIcon from './src/assets/FeaturedIcon.svg';
import zvezdocka from './src/assets/zvezdocka.png';
import kubiki from './src/assets/kubiki.png';
import izvilshape from './src/assets/izvilshape.svg';
import zigurat from './src/assets/zigurat.svg';
import faqIcon from './src/assets/faqIcon.svg';
import newsIcon from './src/assets/newsIcon.svg';

export const Photos = {
    Icon: { Logo, Star, Mail, Send, Pin, ArrowLeft, Calendar, FeaturedIcon },
    Avatar: { Avatar1, Avatar2, Avatar3, Avatar5, Avatar6, Avatar7, Avatar8 } as Record<
        string,
        string
    >,
    SocNet: { Facebook, Linkedin, Twitter, YouTube, Link, Download, Instagram },
    Communities: { Left: CommunitiesLeft, Right: CommunitiesRight } as Record<string, string>,
    Projects: { Cover1, Cover2, Cover3, Cover7 } as Record<string, string>,
    Residential,
    Services: {
        Residential,
        HouseBuilding,
        village,
        botania,
        cleaning,
    } as Record<string, string>,
    About: {
        Cover5,
        Cover6,
    },
    Team: {
        Member1,
        Member2,
        Member3,
    } as Record<string, string>,
    HeroBuilding,
    ContactCover,
    HouseBuilding,
    village,
    botania,
    cleaning,
    ProjectsMap,

    FormIcon: {
        User: UserIcon,
        Mail: mailContacts,
        Budget: BudgetIcon,
        Service: ServiceIcon,
        Message: MessageIcon,
        Send: Send,
    },
    Shape: Shape,
    zvezdocka: zvezdocka,
    kubiki: kubiki,
    izvilshape: izvilshape,
    zigurat: zigurat,
    faqIcon,
    newsIcon,
};
