// import React, { useState } from 'react';
// import './EmployeeLogin.css'; 
// import { useNavigate } from 'react-router-dom';

// function EmployeeLogin() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loggedin, setLoggedin] = useState(false);
//     const user = {};

//     const login = (e) => {
//         e.preventDefault();
//         user.email = email;
//         user.password = password;
//         user.userType = "";
//         user.token = "";
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user)
//         };

//         fetch("https://localhost:7198/api/Employee/Login", requestOptions)
//         .then(res => res.json())
//         .then(res => {
//             sessionStorage.setItem("token", res.token);
//             sessionStorage.setItem("email", res.email);
//             sessionStorage.setItem("userType",res.userType);
//             alert("Login success-" + res.email);
//             navigate('/detailEmployee');
//             setLoggedin(true);
//             // Navigate to the dashboard after successful login
        
//         })
//         .catch(err => {
//             console.log(err);
//             setLoggedin(false);
//         });
//     };

//     return (
//         <div >
//             {loggedin === true ? <h2 className='alert alert-success'>Welcome, you have successfully logged in - {email}</h2> : null}


//             <div className='container'>
//                 <div className='header'>
//                     <h3> Emplyee Login</h3>
//                 </div>
//                 <div className='form'>
//                     <form onSubmit={login}>
//                         <div className='form-control'>
//                             <label>Email</label>
//                             <input placeholder='Email' className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                         </div>
//                         <div className='form-control'>
//                             <label>Password</label>
//                             <input placeholder='Password' className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//                         </div>
//                         <button onClick={login} className='btn btn-success' type='submit'>Login</button>
//                         <button className='btn btn-danger' type='button'>Cancel</button>
//                         <div className="text-center pt-3">
//                       <p className="text-dark mb-0">Already have account?<a href="/employeeregister" className="text-primary ms-1">Sign In</a></p>
//                      </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EmployeeLogin;

import React, { useState } from 'react';
import './EmployeeLogin.css'; 
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedin, setLoggedin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const login = (e) => {
        e.preventDefault();

        // Validate email format
        if (!validateEmail(email)) {
            setErrorMessage("Invalid email format");
            return;
        }

        // Validate password length
       
        setErrorMessage("");

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

        fetch("https://localhost:7198/api/Employee/Login", requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error("Invalid email or password"); // Throw error for incorrect credentials
            }
            return res.json();
        })
        .then(res => {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("userType", res.userType);
            alert("Login success-" + res.email);
            navigate('/detailEmployee');
            setLoggedin(true);
        })
        .catch(err => {
            console.log(err);
            setLoggedin(false);
            alert("Invalid email or password"); // Display alert for incorrect credentials
        });
    };

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div>
            {loggedin === true ? <h2 className='alert alert-success'>Welcome, you have successfully logged in - {email}</h2> : null}

            <div className='container'>
                <div className='header'>
                    <h3> Emplyee Login</h3>
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
                        <button onClick={login} className='btn btn-success' type='submit'>Login</button>
                        <button className='btn btn-danger' type='button'>Cancel</button>
                        <div className="text-center pt-3">
                            <p className="text-dark mb-0">Already have account?<a href="/employeeregister" className="text-primary ms-1">Sign In</a></p>
                        </div>
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeLogin;
