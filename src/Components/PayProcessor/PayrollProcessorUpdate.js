


import React, { useState, useEffect } from 'react';

function PayrollProcessorUpdate() {
  const [payrollProcessors, setPayrollProcessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPayrollProcessors();
  }, []);

  const fetchPayrollProcessors = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch('https://localhost:7198/api/PayrollProcessor/GetAllPayrollProcessor', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setPayrollProcessors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payroll processors:', error);
      setLoading(false);
    }
  };

  const handleChangePhone = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:7198/api/PayrollProcessor/${id}/change-phone?phone=${phone}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      updatePayrollProcessor(id, { phone: data.phone });
      setMessage(`Phone number changed successfully for payroll processor ${id}.`);
    } catch (error) {
      console.error('Error changing phone number:', error);
      setMessage(`Error changing phone number for payroll processor ${id}.`);
    }
  };

  const handleChangeName = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:7198/api/PayrollProcessor/${id}/change-name?name=${name}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      updatePayrollProcessor(id, { name: data.name });
      setMessage(`Name changed successfully for payroll processor ${id}.`);
    } catch (error) {
      console.error('Error changing name:', error);
      setMessage(`Error changing name for payroll processor ${id}.`);
    }
  };

  const updatePayrollProcessor = (id, updatedFields) => {
    setPayrollProcessors(prevProcessors => {
      return prevProcessors.map(processor => {
        if (processor.payrollProcessorID === id) {
          return { ...processor, ...updatedFields };
        }
        return processor;
      });
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containers">
      <h3>Update Employee Information</h3>
      <div className="row">
        {payrollProcessors.map(processor => (
          <div key={processor.payrollProcessorID} className="col-md-4">
            <div className="cards">
              <h5 className="card-header">Update Payroll Processor</h5>
              <div className="card-body">
                <div>
                  <strong>Name:</strong> {processor.name}
                </div>
                <div>
                  <strong>Email:</strong> {processor.email}
                </div>
                <div>
                  <strong>Phone:</strong> {processor.phone}
                </div>
                <div className="form-group mt-3">
                  <input type="text" placeholder="New Phone Number" onChange={(e) => setPhone(e.target.value)} className="form-control" />
                  <button onClick={() => handleChangePhone(processor.payrollProcessorID)} className="btn btn-primary mt-2">Change Phone</button>
                </div>
                <div className="form-group mt-3">
                  <input type="text" placeholder="New Name" onChange={(e) => setName(e.target.value)} className="form-control" />
                  <button onClick={() => handleChangeName(processor.payrollProcessorID)} className="btn btn-primary mt-2">Change Name</button>
                </div>
                {message && (
                  <div className="alert alert-success mt-3" role="alert">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PayrollProcessorUpdate;
