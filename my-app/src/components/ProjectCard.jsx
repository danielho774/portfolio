import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

const ProjectCard = ({ projectName='', projectDesc='', projectImg='', className = '' }) => {
    return (
        <div className={`project-card ${className} shadow-lg shadow-white w-1/2 h-8/10 max-w-[360px] mx-auto`}>
            <div className="project-image-container items-center mb-2 w-full max-h-3/4 overflow-hidden rounded-t-lg">
                <img src={projectImg} alt={projectName} className="w-full" />
            </div>
            <div className="project-header w-full flex justify-center items-center mb-2 h-3/16">
                <h2 className="text-2xl font-bold text-center h-full">{projectName}</h2>
            </div>
            <div className="project-description w-full flex justify-center items-center mb-2 h-1/16">
                <p className="text-center h-full text-sm md:text-base lg:text-lg">{projectDesc}</p>
            </div>
        </div>
    )
}
    
export default ProjectCard;