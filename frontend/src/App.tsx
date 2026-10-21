import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import About from './Pages/About/About';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import ContactUs from './Pages/ContactUs/ContactUs';
import Services from './Pages/Services/Services';
import Projects from './Pages/Projects/Projects';
import Blog from './Pages/Blog/Blog';
import ProjectDetail from './Pages/ProjectDetail/ProjectDetail';
import BlogDetails from './Pages/BlogDetails/blogDetails';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
