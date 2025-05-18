import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';
import SnapScrollCarousel from '../components/SnapScrollCarousel';

const Projects = ({className = ''}) => {
    return (
        <div className={`projects ${className}`}>
            <h1>Projects</h1>
            <ul>
                <li>Project 1: A web application built with React and Node.js.</li>
                <li>Project 2: A mobile app developed using React Native.</li>
                <li>Project 3: A personal blog created with Gatsby.</li>
            </ul>
            <div className="circular-scroll w-full h-1/2">
                <SnapScrollCarousel>
                    <div>Project 1</div>
                    <div>Project 2</div>
                    <div>Project 3</div>
                    <div>Project 4</div>
                    <div>Project 5</div>
                    <div>Project 6</div>
                </SnapScrollCarousel>
            </div>
        </div>
    );
};

export default Projects;