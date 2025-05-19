import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

const ProjectCard = ({ projectName='', projectDesc='', projectImg='', className = '' }) => {
    return (
        <div className={`project-card ${className} rounded-lg shadow-lg border-solid border-2 border-white px-[3vw] py-[4vh] w-1/2 h-8/10 mx-auto`}>
            <div className="project-header w-full flex justify-center items-center mb-2 h-1/6">
                <h2 className="text-2xl font-bold text-center h-full">{projectName}</h2>
            </div>
            <div className="project-image-container flex justify-center items-center mb-2 h-3/6">
                <img src={projectImg} alt={projectName} className="rounded-lg h-full w-auto" />
            </div>
            <div className="project-description w-full flex justify-center items-center mb-2 h-2/6">
                <p className="text-center h-full text-sm md:text-base lg:text-lg">{projectDesc}</p>
            </div>
        </div>
    )
}
    
export default ProjectCard;