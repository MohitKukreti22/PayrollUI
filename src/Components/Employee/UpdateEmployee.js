



// import React, { useState, useEffect } from 'react';
// import './UpdateEmployee.css'; // Ensure the CSS file path is correct

// function UpdateEmployee() {
//     const [employeeID, setEmployeeID] = useState('');
//     const [newPhone, setNewPhone] = useState('');
//     const [newName, setNewName] = useState('');
//     const [newAddress, setNewAddress] = useState('');
//     const [response, setResponse] = useState(null);
//     const [token, setToken] = useState('');
//     const [activeCard, setActiveCard] = useState(null);

//     useEffect(() => {
//         const storedEmployeeID = sessionStorage.getItem('employeeID');
//         if (storedEmployeeID) {
//             setEmployeeID(parseInt(storedEmployeeID));
//         }
//         const storedToken = sessionStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//         }
//     }, []);

//     const handleSubmit = (event, field, value) => {
//         event.preventDefault();
//         let url;
//         switch (field) {
//             case 'phone':
//                 url = `https://localhost:7198/api/Employee/${employeeID}/change-phone?phone=${value}`;
//                 break;
//             case 'name':
//                 url = `https://localhost:7198/api/Employee/${employeeID}/change-name?name=${value}`;
//                 break;
//             case 'address':
//                 url = `https://localhost:7198/api/Employee/${employeeID}/change-address?address=${encodeURIComponent(value)}`;
//                 break;
//             default:
//                 return;
//         }

//         const requestOptions = {
//             method: 'PUT',
//             headers: { 
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer ' + token
//             },
//         };

//         fetch(url, requestOptions)
//             .then(response => response.json())
//             .then(data => {
//                 setResponse(data);
//             })
//             .catch(error => console.error('Error:', error));
//     };

//     const toggleCard = (card) => {
//         if (activeCard === card) {
//             setActiveCard(null);
//         } else {
//             setActiveCard(card);
//         }
//     };

//     return (
//         <div className="employee-update-container">
//             <div className="update-sidebar">
//                 <button onClick={() => toggleCard('phone')}>Toggle Phone Update</button>
//                 <button onClick={() => toggleCard('name')}>Toggle Name Update</button>
//                 <button onClick={() => toggleCard('address')}>Toggle Address Update</button>
//             </div>
//             <div className="update-content">
//                 {activeCard === 'phone' && (
//                     <div className="update-card">
//                         <h5>Update Employee Phone Number</h5>
//                         <form onSubmit={(event) => handleSubmit(event, 'phone', newPhone)}>
//                             <input
//                                 type="tel"
//                                 value={newPhone}
//                                 onChange={e => setNewPhone(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Update Phone Number</button>
//                         </form>
//                     </div>
//                 )}
//                 {activeCard === 'name' && (
//                     <div className="update-card">
//                         <h5>Update Employee Name</h5>
//                         <form onSubmit={(event) => handleSubmit(event, 'name', newName)}>
//                             <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={e => setNewName(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Update Name</button>
//                         </form>
//                     </div>
//                 )}
//                 {activeCard === 'address' && (
//                     <div className="update-card">
//                         <h5>Update Employee Address</h5>
//                         <form onSubmit={(event) => handleSubmit(event, 'address', newAddress)}>
//                             <input
//                                 type="text"
//                                 value={newAddress}
//                                 onChange={e => setNewAddress(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Update Address</button>
//                         </form>
//                     </div>
//                 )}
//                 {response && (
//                     <div className="update-response">
//                         <h5>Response:</h5>
//                         <pre>{JSON.stringify(response, null, 2)}</pre>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UpdateEmployee;

// import React, { useState, useEffect } from 'react';
// import './UpdateEmployee.css'; // Ensure the CSS file path is correct

// function UpdateEmployee() {
//     const [employeeID, setEmployeeID] = useState('');
//     const [newPhone, setNewPhone] = useState('');
//     const [newName, setNewName] = useState('');
//     const [newAddress, setNewAddress] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [token, setToken] = useState('');
//     const [activeCard, setActiveCard] = useState(null);

//     useEffect(() => {
//         const storedEmployeeID = sessionStorage.getItem('employeeID');
//         if (storedEmployeeID) {
//             setEmployeeID(parseInt(storedEmployeeID));
//         }
//         const storedToken = sessionStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//         }
//     }, []);

//     const handleSubmit = (event, field, value) => {
//         event.preventDefault();
//         let url;
//         switch (field) {
//             case 'phone':
//                 url = `https://localhost:7198/api/Employee/${employeeID}/change-phone?phone=${value}`;
//                 break;
//             case 'name':
//                 url = `https://localhost:7198/api/Employee/${employeeID}/change-name?name=${value}`;
//                 break;
//             case 'address':
//                 url = `https://localhost:7198/api/Employee/${employeeID}/change-address?address=${encodeURIComponent(value)}`;
//                 break;
//             default:
//                 return;
//         }

//         const requestOptions = {
//             method: 'PUT',
//             headers: { 
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer ' + token
//             },
//         };

//         fetch(url, requestOptions)
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.status === 'success') {
//                     setResponseMessage(`${field} updated successfully!`);
//                 } else {
//                     setResponseMessage(`Failed to update ${field}.`);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 setResponseMessage(`Error updating ${field}.`);
//             });
//     };

//     const toggleCard = (card) => {
//         if (activeCard === card) {
//             setActiveCard(null);
//         } else {
//             setActiveCard(card);
//         }
//     };

//     return (
//         <div className="employee-update-container">
//             <div className="update-sidebar">
//                 <button onClick={() => toggleCard('phone')}>Toggle Phone Update</button>
//                 <button onClick={() => toggleCard('name')}>Toggle Name Update</button>
//                 <button onClick={() => toggleCard('address')}>Toggle Address Update</button>
//             </div>
//             <div className="update-content">
//                 {activeCard === 'phone' && (
//                     <div className="update-card">
//                         <h5>Update Employee Phone Number</h5>
//                         <form onSubmit={(event) => handleSubmit(event, 'phone', newPhone)}>
//                             <input
//                                 type="tel"
//                                 value={newPhone}
//                                 onChange={e => setNewPhone(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Update Phone Number</button>
//                         </form>
//                     </div>
//                 )}
//                 {activeCard === 'name' && (
//                     <div className="update-card">
//                         <h5>Update Employee Name</h5>
//                         <form onSubmit={(event) => handleSubmit(event, 'name', newName)}>
//                             <input
//                                 type="text"
//                                 value={newName}
//                                 onChange={e => setNewName(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Update Name</button>
//                         </form>
//                     </div>
//                 )}
//                 {activeCard === 'address' && (
//                     <div className="update-card">
//                         <h5>Update Employee Address</h5>
//                         <form onSubmit={(event) => handleSubmit(event, 'address', newAddress)}>
//                             <input
//                                 type="text"
//                                 value={newAddress}
//                                 onChange={e => setNewAddress(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Update Address</button>
//                         </form>
//                     </div>
//                 )}
//                 {responseMessage && (
//                     <div className="update-response">
//                         <h5>Response:</h5>
//                         <p>{responseMessage}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UpdateEmployee;


import React, { useState, useEffect } from 'react';
import './UpdateEmployee.css'; // Ensure the CSS file path is correct

function UpdateEmployee() {
    const [employeeID, setEmployeeID] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [token, setToken] = useState('');
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const storedEmployeeID = sessionStorage.getItem('employeeID');
        if (storedEmployeeID) {
            setEmployeeID(parseInt(storedEmployeeID));
        }
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleSubmit = (event, field, value) => {
        event.preventDefault();
        let url;
        switch (field) {
            case 'phone':
                url = `https://localhost:7198/api/Employee/${employeeID}/change-phone?phone=${value}`;
                break;
            case 'name':
                url = `https://localhost:7198/api/Employee/${employeeID}/change-name?name=${value}`;
                break;
            case 'address':
                url = `https://localhost:7198/api/Employee/${employeeID}/change-address?address=${encodeURIComponent(value)}`;
                break;
            default:
                return;
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.status === 'success') {
                    setResponseMessage(`${field} updated successfully!`);
                } else {
                    setResponseMessage(`Failed to update ${field}. Reason: ${data.message}`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setResponseMessage(`Error updating ${field}.`);
            });
    };

    const toggleCard = (card) => {
        if (activeCard === card) {
            setActiveCard(null);
        } else {
            setActiveCard(card);
        }
    };

    return (
        <div className="employee-update-container">
            <div className="update-sidebar">
                <button onClick={() => toggleCard('phone')}>Toggle Phone Update</button>
                <button onClick={() => toggleCard('name')}>Toggle Name Update</button>
                <button onClick={() => toggleCard('address')}>Toggle Address Update</button>
            </div>
            <div className="update-content">
                {activeCard === 'phone' && (
                    <div className="update-card">
                        <h5>Update Employee Phone Number</h5>
                        <form onSubmit={(event) => handleSubmit(event, 'phone', newPhone)}>
                            <input
                                type="tel"
                                value={newPhone}
                                onChange={e => setNewPhone(e.target.value)}
                                required
                            />
                            <button type="submit">Update Phone Number</button>
                        </form>
                    </div>
                )}
                {activeCard === 'name' && (
                    <div className="update-card">
                        <h5>Update Employee Name</h5>
                        <form onSubmit={(event) => handleSubmit(event, 'name', newName)}>
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                required
                            />
                            <button type="submit">Update Name</button>
                        </form>
                    </div>
                )}
                {activeCard === 'address' && (
                    <div className="update-card">
                        <h5>Update Employee Address</h5>
                        <form onSubmit={(event) => handleSubmit(event, 'address', newAddress)}>
                            <input
                                type="text"
                                value={newAddress}
                                onChange={e => setNewAddress(e.target.value)}
                                required
                            />
                            <button type="submit">Update Address</button>
                        </form>
                    </div>
                )}
                {responseMessage && (
                    <div className="update-response">
                        <h5>Response:</h5>
                        <p>{responseMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UpdateEmployee;