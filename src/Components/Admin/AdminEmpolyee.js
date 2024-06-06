import React, { useState, useEffect } from 'react';


const AdminEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [response, setResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleFetchEmployee = () => {
    fetch(`https://localhost:7198/api/AdminEmployee/${employeeId}`, {
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
        setEmployeeDetails(data);
        setShowResponse(true);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const handleUpdateEmployee = () => {
    const url = `https://localhost:7198/api/AdminEmployee/${employeeId}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ EmployeeID: employeeId, Name: name, Address: address, Phone: phone })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error);
        }
        setResponse(data);
        setShowResponse(true);
        alert('Employee details updated successfully!');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const handleDeleteEmployee = () => {
    const url = `https://localhost:7198/api/AdminEmployee/${employeeId}`;
    const requestOptions = {
      method: 'DELETE',
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
        alert('Employee deleted successfully!');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const handleCancel = () => {
    setShowResponse(false);
  };

  return (
    <div className="containers mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Fetch Employee</h3>
              <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">Employee ID:</label>
                <input type="text" className="form-control" id="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
              </div>
              <button onClick={handleFetchEmployee} className="btn btn-primary mb-3">Fetch Employee</button>
              {showResponse && employeeDetails ? (
                <div>
                  <h3>Employee Details:</h3>
                  <p><strong>Name:</strong> {employeeDetails.name}</p>
                  <p><strong>Address:</strong> {employeeDetails.address}</p>
                  <p><strong>Phone:</strong> {employeeDetails.phone}</p>
                  <button onClick={handleCancel} className="btn btn-secondary mt-3">Hide Details</button>
                </div>
              ) : (
                <p>No employee details found.</p>
              )}
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Update Employee</h3>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address:</label>
                <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone:</label>
                <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <button onClick={handleUpdateEmployee} className="btn btn-primary">Update</button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Delete Employee</h3>
              <button onClick={handleDeleteEmployee} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployee;
