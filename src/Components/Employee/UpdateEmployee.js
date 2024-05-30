

import React, { useState, useEffect } from 'react';

function UpdateEmployee() {
    const [employeeID, setEmployeeID] = useState(''); // Initial employee ID
    const [newPhone, setNewPhone] = useState('');
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [response, setResponse] = useState(null);
    const [token, setToken] = useState('');
    const [showResponse, setShowResponse] = useState(false);

    // Fetch employee ID and token from session storage on component mount
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

        // Define the PUT request options
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Accept':'application/json',
                'Authorization':'Bearer ' + token
            },
        };

        // Send the PUT request
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                setResponse(data); // Set the response data
            })
            .catch(error => console.error('Error:', error));
    };
    const toggleResponse = () => {
        setShowResponse(!showResponse);
    };
    return (
        <div className="containers">
            <h3>Update Employee Information</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="cards">
                        <h5 className="cards-header">Update Employee Phone Number</h5>
                        <div className="cards-body">
                            <form onSubmit={(event) => handleSubmit(event, 'phone', newPhone)}>
                                <div className="form-group">
                                    <label htmlFor="newPhone">New Phone Number:</label>
                                    <input
                                        type="tel"
                                        id="newPhone"
                                        value={newPhone}
                                        onChange={e => setNewPhone(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Phone Number</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="cards">
                        <h5 className="cards-header">Update Employee Name</h5>
                        <div className="cards-body">
                            <form onSubmit={(event) => handleSubmit(event, 'name', newName)}>
                                <div className="form-group">
                                    <label htmlFor="newName">New Name:</label>
                                    <input
                                        type="text"
                                        id="newName"
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Name</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <h5 className="card-header">Update Employee Address</h5>
                        <div className="card-body">
                            <form onSubmit={(event) => handleSubmit(event, 'address', newAddress)}>
                                <div className="form-group">
                                    <label htmlFor="newAddress">New Address:</label>
                                    <input
                                        type="text"
                                        id="newAddress"
                                        value={newAddress}
                                        onChange={e => setNewAddress(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Address</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showResponse && (
                <div className="row mt-3">
                    <div className="col">
                        <div className="response">
                            <h5>Response:</h5>
                            <pre>{JSON.stringify(response, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )}
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-primary" onClick={toggleResponse}>
                        {showResponse ? 'Hide Response' : 'Show Response'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmployee;

