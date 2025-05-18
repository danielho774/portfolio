import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import SnapScrollCarousel from '../components/SnapScrollCarousel';
import ProjectCard from '../components/ProjectCard';

const Projects = ({className = ''}) => {
    return (
        <div className={`projects ${className}`}>
            <div className="projects-header w-full flex justify-center items-center mb-4 h-1/5">
                <h1 className="text-3xl font-bold text-center mb-4">Projects</h1>
            </div>
            <div className= "projects-content w-full flex justify-center items-center h-4/5">
                <div className="circular-scroll w-full h-full">
                    <SnapScrollCarousel>
                        <ProjectCard 
                            projectName="Project 1" 
                            projectDesc="This is a description of project 1."
                            projectImg="https://via.placeholder.com/150"
                        />
                        <ProjectCard 
                            projectName="Project 2" 
                            projectDesc="This is a description of project 2."
                            projectImg="https://via.placeholder.com/150"
                        />
                        <ProjectCard 
                            projectName="Project 3" 
                            projectDesc="This is a description of project 3."
                            projectImg="https://via.placeholder.com/150"
                        />
                    </SnapScrollCarousel>
                </div>
            </div>
        </div>
    );
};

export default Projects;