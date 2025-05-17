import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import AboutMe from './pages/AboutMe.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'


function App() {
  return (
    <div className="app snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      <AboutMe className="snap-center transition-all duration-1000"/>
      <Projects className="snap-center transition-all duration-1000"/>
      <Resume className="snap-center transition-all duration-1000"/>
      <div className="footer text-center">
        <p>© 2023 My Portfolio</p>
      </div>
    </div>
  )
}

export default App
