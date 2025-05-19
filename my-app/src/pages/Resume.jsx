import {useState, useRef, useEffect} from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';

const Resume = ({ className = '' }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const formRef = useRef(null);

    const checkEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const resetForm = () => {
        setFormData({
            name: '',
            email: ''
        });
        setError('');
        setStatus('');
    }

    // Function to handle change events on input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
        setError('');
        setStatus('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        checkEmail(formData.email) ? setError('') : setError('Invalid email address');
        if (error) {
            setLoading(false);
            return;
        }

        try {
            // Create FormData object to send files
            const formDataToSend = {
                name: formData.name,
                email: formData.email,
            };

            // convert to JSON string
            const jsonString = JSON.stringify(formDataToSend);

            console.log('Form data:', formDataToSend);
            // Send data to your backend API
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                body: jsonString,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                resetForm();
            } else {
                setStatus('error');
                console.error('Server error:', result.message);
            }
        } catch (error) {
        console.error('Error sending email:', error);
        setStatus('error');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className={`resume ${className}`}>
            <h1>Resume</h1>
            <form
                className="resume-form"
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-control" id="name" name="name" onChange={handleChange} noValidate />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" id="email" name="email" onChange={handleChange} noValidate />
                </div>
                {error && <div className="text-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Send Resume</button>
            </form>
        </div>
    );
};

export default Resume;