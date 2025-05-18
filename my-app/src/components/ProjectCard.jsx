import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

const ProjectCard = ({ projectName='', projectDesc='', projectImg='', className = '' }) => {
    return (
        <div className={`project-card ${className} rounded-lg shadow-lg border-solid border-2 border-white p-4 w-1/2 mx-auto`}>
            <div className="project-header w-full flex justify-center items-center mb-4 h-1/5">
                <h2 className="text-2xl font-bold text-center">{projectName}</h2>
            </div>
            <div className="project-image-container w-full flex justify-center items-center mb-4 h-1/5">
                <img src={projectImg} alt={projectName} className="rounded-lg" />
            </div>
            <div className="project-description w-full flex justify-center items-center mb-4 h-1/5">
                <p className="text-center">{projectDesc}</p>
            </div>
        </div>
    )
}
    
export default ProjectCard;