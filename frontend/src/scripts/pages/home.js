import Navbar from '../includes/navbar'
import Hero from '../sections/hero'
import About from '../sections/about'
import Expertise from '../sections/expertise'
import Experience from '../sections/experience'
import Projects from '../sections/projects'
import Achievements from '../sections/achievements'
import Contact from '../sections/contact'

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Expertise />
            <Projects />
            <Achievements />
            <Contact />
        </>
    );
}

export default Home;
