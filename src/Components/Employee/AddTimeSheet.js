

import React, { useState, useEffect } from 'react';

function AddTimesheet() {
    // Define state variables for form fields, response, and response visibility
    const [employeeId, setEmployeeId] = useState(1);
    const [weekStartDate, setWeekStartDate] = useState('');
    const [weekEndDate, setWeekEndDate] = useState('');
    const [totalHoursWorked, setTotalHoursWorked] = useState('');
    const [status, setStatus] = useState('');
    const [response, setResponse] = useState(null);
    const [token, setToken] = useState('');
    const [showResponse, setShowResponse] = useState(false); // State to control visibility of response

    useEffect(() => {
        // Fetch employeeID and token from session storage on component mount
        const storedEmployeeId = sessionStorage.getItem('employeeID');
        if (storedEmployeeId) {
            setEmployeeId(parseInt(storedEmployeeId));
        }

        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (totalHoursWorked < 200 || totalHoursWorked > 300) {
            alert('Total hours worked must be between 200 and 300.');
            return;
        }
   
        // Construct the URL with query parameters
        const url = `https://localhost:7198/api/EmployeeTimeSheet/add?employeeId=${employeeId}&weekStartDate=${weekStartDate}&weekEndDate=${weekEndDate}&totalHoursWorked=${totalHoursWorked}&status=${status}`;

        try {
            // Send the POST request
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the headers
                }
            });

            // Parse the response JSON
            const data = await response.json();
            setResponse(data); // Update the response state
            setShowResponse(true); // Show the response section
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="containers">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3 className="text-center">Add Timesheet</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="weekStartDate" className="form-label">Week Start Date:</label>
                                    <input type="date" className="form-control" id="weekStartDate" value={weekStartDate} onChange={(e) => setWeekStartDate(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="weekEndDate" className="form-label">Week End Date:</label>
                                    <input type="date" className="form-control" id="weekEndDate" value={weekEndDate} onChange={(e) => setWeekEndDate(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="totalHoursWorked" className="form-label">Total Hours Worked:</label>
                                    <input type="number" className="form-control" id="totalHoursWorked" value={totalHoursWorked} onChange={(e) => setTotalHoursWorked(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status:</label>
                                    <input type="text" className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            {showResponse && (
                                <div className="mt-3">
                                    <h4>Response:</h4>
                                    <pre>{JSON.stringify(response, null, 2)}</pre>
                                </div>
                            )}
                            <button
                                className="btn btn-secondary mt-3"
                                onClick={() => setShowResponse(prevState => !prevState)}
                            >
                                {showResponse ? 'Hide ' : 'Show Timesheet'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTimesheet;



