import { useState, useEffect } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AboutMe from './pages/AboutMe.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'

function App() {
  const [InProjects, setInProjects] = useState(false);

  // create an event listener to change the background color of the main div based on scroll position
  useEffect(() => {

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // start transitioning halfway through the first page
      const projectsStart = window.innerHeight/2;
      // transition out after projects page has been scrolled through
      const projectsEnd = projectsStart + (window.innerHeight);
      
      if (currentScrollTop >= projectsStart && currentScrollTop <= projectsEnd) {
      setInProjects(true);
      } else {
      setInProjects(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`relative m-0 m-auto w-full overflow-x-hidden ${InProjects ? 'inverted' : 'normal'}`}>
      <AboutMe className={`text-(--text-color) page`}/>
      <Projects className={`page`}/>
      <Resume className={`text-(--text-color) page`}/>
      <div className="footer text-center">
        <p>© 2023 My Portfolio</p>
      </div>
    </div>
  )
}

export default App
