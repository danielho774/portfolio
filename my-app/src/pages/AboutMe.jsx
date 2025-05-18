import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';

const AboutMe = ({ className = '' }) => {
    return (
        <div className={`about-me text-center h-screen w-full flex flex-col justify-center text-center ${className}`}>
            <h1>About Me</h1>
            <p>
                Hello! I'm a software developer with a passion for creating web applications. I love working with React and exploring new technologies.
            </p>
        </div>
    );
};

export default AboutMe;