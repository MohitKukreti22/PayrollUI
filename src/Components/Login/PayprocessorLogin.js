import React, { useState, useEffect } from 'react';
import './EmployeeLogin.css'; 
import { useNavigate } from 'react-router-dom';

function PayProcessorLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in
        const token = sessionStorage.getItem("token");
        if (token) {
            navigate('/payprocesssordetails');
        }
    }, [navigate]);

    const login = (e) => {
        e.preventDefault();

        // Email validation check
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const user = {
            email: email,
            password: password,
            userType: "",
            token: ""
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        fetch("https://localhost:7198/api/PayrollProcessor/Login", requestOptions)
        .then(res => res.json())
        .then(res => {
            if (res.token) {
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("email", res.email);
                alert("Login success-" + res.email);
                navigate('/payprocesssordetails');
                setLoggedin(true);
            } else {
                // Show error message if login fails
                alert('Invalid email or password. Please try again.');
                setLoggedin(false);
            }
        })
        .catch(err => {
            console.log(err);
            alert('Error occurred while logging in. Please try again.');
            setLoggedin(false);
        });
    };

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="EmployeeLogin.css">
            {loggedin ? <h2 className='alert alert-success'>Welcome, you have successfully logged in - {email}</h2> : null }

            <div className='container'>
                <div className='header'>
                    <h3>Payprocessor Login</h3>
                </div>
                <div className='form'>
                    <form onSubmit={login}>
                        <div className='form-control'>
                            <label>Email</label>
                            <input placeholder='Email' className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='form-control'>
                            <label>Password</label>
                            <input placeholder='Password' className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='btn btn-success' type='submit'>Login</button>
                        <button className='btn btn-danger' type='button'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PayProcessorLogin;