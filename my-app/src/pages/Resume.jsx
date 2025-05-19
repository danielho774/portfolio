import {useState, useRef, useEffect} from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';

const Resume = ({ className = '' }) => {
    const [error, setError] = useState('');

    const checkEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to handle click event on the email input
    const handleClick = (e) => {
        e.preventDefault();
        setError('');
    }

    const sendMail = (email) => {

    }

    return (
        <div className={`resume ${className}`}>
            <h1>Resume</h1>
            <form
                className="resume-form"
                onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    if (!email) {
                        setError('Email is required.');
                        return;
                    }
                    // Example script call (replace with real API/email logic)
                    if (!checkEmail(email)) {
                        setError('Please enter a valid email address.');
                        return;
                    }
                    alert(`Thank you for your interest! A resume has been sent to ${email}.`);
                }}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-control" id="name" name="name" onClick={handleClick} noValidate />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" id="email" name="email" onClick={handleClick} noValidate />
                </div>
                {error && <div className="text-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Send Resume</button>
            </form>
        </div>
    );
};

export default Resume;