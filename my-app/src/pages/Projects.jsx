import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import SnapScrollCarousel from '../components/SnapScrollCarousel';
import ProjectCard from '../components/ProjectCard';
import winter from '../assets/winter-wallpaper.jpg';
import hiking from '../assets/hiking.jpg';
import shai from '../assets/shai.jpg';

const Projects = ({className = ''}) => {
    return (
        <div className={`projects ${className}`}>
            <div className="projects-header w-full flex justify-center items-center mb-4 h-1/4">
                <h1 className="text-3xl font-bold text-center mb-4">Projects</h1>
            </div>
            <div className= "projects-content w-full flex justify-center items-center h-[40vh] md:h-[60vh]">
                <SnapScrollCarousel>
                    <ProjectCard 
                        projectName="Project 1" 
                        projectDesc="This is a description of project 1."
                        projectImg={winter}
                    />
                    <ProjectCard 
                        projectName="Project 2" 
                        projectDesc="This is a description of project 2."
                        projectImg={shai}
                    />
                    <ProjectCard 
                        projectName="Project 3" 
                        projectDesc="This is a description of project 3."
                        projectImg={hiking}
                    />
                </SnapScrollCarousel>
            </div>
        </div>
    );
};

export default Projects;