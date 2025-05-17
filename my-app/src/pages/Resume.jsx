import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

const Resume = ({ className = '' }) => {
    return (
        <div className={`resume container text-center h-screen w-screen flex flex-col justify-center items-center text-center ${className}`}>
            <h1>Resume</h1>
            <form
                className="resume-form"
                onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    // Example script call (replace with real API/email logic)
                    alert(`Resume will be sent to ${email} for ${name}.`);
                }}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <button type="submit" className="btn btn-primary">Send Resume</button>
            </form>
        </div>
    );
};

export default Resume;