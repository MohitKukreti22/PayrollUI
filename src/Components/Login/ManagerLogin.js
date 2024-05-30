// import React, { useState } from 'react';
// import './EmployeeLogin.css'; 
// import { useNavigate } from 'react-router-dom';

// function ManagerLogin() {
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

//         fetch("https://localhost:7198/api/Manager/Login", requestOptions)
//         .then(res => res.json())
//         .then(res => {
//             sessionStorage.setItem("token", res.token);
//             sessionStorage.setItem("email", res.email);
//             alert("Login success-" + res.email);
//             navigate('/mangerDetails');
//             setLoggedin(true);
//             // Navigate to the dashboard after successful login
        
//         })
//         .catch(err => {
//             console.log(err);
//             setLoggedin(false);
//         });
//     };

//     return (
//         <div className="EmployeeLogin.css">
//             {loggedin === true ? <h2 className='alert alert-success'>Welcome, you have successfully logged in - {email}</h2> : null}


//             <div className='container'>
//                 <div className='header'>
//                     <h3>Manager Login</h3>
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
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ManagerLogin;

import React, { useState } from 'react';
import './EmployeeLogin.css'; 
import { useNavigate } from 'react-router-dom';

function ManagerLogin() {
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
      

        // If validation passes, proceed with login
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

        fetch("https://localhost:7198/api/Manager/Login", requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error("Invalid email or password"); 
            }
            return res.json();
        })
        .then(res => {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("email", res.email);
            alert("Login success-" + res.email);
            navigate('/mangerDetails');
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
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="EmployeeLogin.css">
            {loggedin === true ? <h2 className='alert alert-success'>Welcome, you have successfully logged in - {email}</h2> : null}

            <div className='container'>
                <div className='header'>
                    <h3>Manager Login</h3>
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
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManagerLogin;
