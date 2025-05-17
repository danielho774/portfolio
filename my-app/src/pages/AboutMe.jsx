import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

const AboutMe = ({ className = '' }) => {
    return (
        <div className={`about-me container text-center h-screen w-screen flex flex-col justify-center items-center text-center ${className}`}>
            <h1>About Me</h1>
            <p>
                Hello! I'm a software developer with a passion for creating web applications. I love working with React and exploring new technologies.
            </p>
        </div>
    );
};

export default AboutMe;