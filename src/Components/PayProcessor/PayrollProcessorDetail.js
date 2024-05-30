
import React, { useState, useEffect } from 'react';

function PayrollProcessorDetail() {
  const [payrollProcessor, setPayrollProcessor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve email and token from session storage
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('token');

    const fetchPayrollProcessorByEmail = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/PayrollProcessor/by-email/${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        const data = await response.json();
        setPayrollProcessor(data);
        setLoading(false);

        // Store payrollProcessorID and userType in session storage
        sessionStorage.setItem('payrollProcessorID', data.payrollProcessorID);
        sessionStorage.setItem('userType', data.validation.userType);
      } catch (error) {
        console.error('Error fetching payroll processor:', error);
        setLoading(false);
      }
    };

    fetchPayrollProcessorByEmail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containers mt-5">
      <h3 className="mb-4">Payroll Processor Information</h3>
      {payrollProcessor && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Name: {payrollProcessor.name}</h5>
            <p className="card-text">Email: {payrollProcessor.email}</p>
            <p className="card-text">Phone: {payrollProcessor.phone}</p>
            <p className="card-text">Status: {payrollProcessor.validation.status}</p>
            {/* You can display other relevant information from the payroll processor object */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PayrollProcessorDetail;
