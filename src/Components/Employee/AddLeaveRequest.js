import React, { useState, useEffect } from 'react';
import './AddLeaveRequest.css'; // Ensure this CSS file includes the new styles

const AddLeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const storedEmployeeId = sessionStorage.getItem('employeeID');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://localhost:7198/api/EmployeeLeaveRequest/request?employeeId=${employeeId}&leaveType=${leaveType}&startDate=${startDate}&endDate=${endDate}`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error);
        }
        setResponse(data);
        setShowResponse(true);
        alert('Leave request submitted successfully!');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const handleFetchRequests = () => {
    fetch(`https://localhost:7198/api/EmployeeLeaveRequest/${employeeId}/leave-requests`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error);
        }
        setResponse(data);
        setShowResponse(true);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div className="employee-update-container">
      <div className="update-sidebar">
        <button onClick={() => setActiveCard('requestLeave')}>Request Leave</button>
        <button onClick={() => setActiveCard('viewRequests')}>View Leave Requests</button>
      </div>
      <div className="update-content">
        {activeCard === 'requestLeave' && (
          <div className="update-card">
            <h5>Request Leave</h5>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Leave Type" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} />
              <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {activeCard === 'viewRequests' && (
          <div className="update-card">
            <h5>Leave Requests</h5>
            <button onClick={handleFetchRequests}>Fetch Leave Requests</button>
            {showResponse && response && response.length > 0 ? (
              <div className="update-response">
                {response.map(request => (
                  <div key={request.leaveRequestID}>
                    <strong>Leave Type:</strong> {request.leaveType}<br />
                    <strong>Start Date:</strong> {request.startDate}<br />
                    <strong>End Date:</strong> {request.endDate}<br />
                    <strong>Status:</strong> {request.status}
                  </div>
                ))}
              </div>
            ) : (
              <p>No leave requests found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLeaveRequest;