import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import AboutMe from './pages/AboutMe.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'


function App() {
  return (
    <div className="relative m-0 m-auto w-full overflow-x-hidden">
      <AboutMe className="text-center h-screen w-full flex flex-col justify-center items-center text-center snap static"/>
      <Projects />
      <Resume />
      <div className="footer text-center">
        <p>© 2023 My Portfolio</p>
      </div>
    </div>
  )
}

export default App
