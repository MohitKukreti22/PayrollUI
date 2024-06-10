// import React, { useState } from 'react';
// import './EmployeeLogin.css'; 
// import { useNavigate } from 'react-router-dom';

// function AdminLogin() {
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

//         fetch("https://localhost:7198/api/Admin/Login", requestOptions)
//         .then(res => res.json())
//         .then(res => {
//             sessionStorage.setItem("token", res.token);
//             sessionStorage.setItem("email", res.email);
            
//             alert("Login success-" + res.email);
//             navigate('/AdminEmployee');
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
//                     <h3>Admin Login</h3>
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

// export default AdminLogin;


import React, { useState } from 'react';
import './EmployeeLogin.css'; 
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedin, setLoggedin] = useState(false);

    const login = (e) => {
        e.preventDefault();
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

        fetch("https://localhost:7198/api/Admin/Login", requestOptions)
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("userType", res.userType); // Store userType in session storage

            alert("Login success - " + res.email);
            navigate('/AdminEmployee');
            setLoggedin(true);
        })
        .catch(err => {
            console.error(err);
            alert("Login failed, please check your credentials.");
            setLoggedin(false);
        });
    };

    return (
        <div className="EmployeeLogin">
            {loggedin ? <h2 className='alert alert-success'>Welcome, you have successfully logged in - {email}</h2> : null}

            <div className='container'>
                <div className='header'>
                    <h3>Admin Login</h3>
                </div>
                <div className='form'>
                    <form onSubmit={login}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input placeholder='Email' className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input placeholder='Password' className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='btn btn-success' type='submit'>Login</button>
                        <button className='btn btn-danger' type='button' onClick={() => navigate('/')}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;