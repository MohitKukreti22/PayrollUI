import React, { useState, useEffect } from 'react';

function AdminEmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all employees (simplified example)
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://localhost:7198/api/AdminEmployee');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            setError('Failed to fetch employees');
        }
        setLoading(false);
    };

    const handleSelectEmployee = (employeeId) => {
        const employee = employees.find(emp => emp.employeeId === employeeId);
        setSelectedEmployee(employee);
    };

    const handleUpdateEmployee = async (employee) => {
        try {
            const response = await fetch(`https://localhost:7198/api/AdminEmployee/${employee.employeeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)
            });
            if (!response.ok) throw new Error('Failed to update');
            fetchEmployees();  // Refresh the list
        } catch (error) {
            setError('Failed to update employee');
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(`https://localhost:7198/api/AdminEmployee/${employeeId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete');
            fetchEmployees();  // Refresh the list
        } catch (error) {
            setError('Failed to delete employee');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Employee Management</h1>
            {employees.map(employee => (
                <div key={employee.employeeId}>
                    <span>{employee.name}</span>
                    <button onClick={() => handleSelectEmployee(employee.employeeId)}>Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee.employeeId)}>Delete</button>
                </div>
            ))}
            {selectedEmployee && (
                <div>
                    <h2>Edit Employee</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateEmployee(selectedEmployee);
                    }}>
                        <label>
                            Name:
                            <input type="text" value={selectedEmployee.name} onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})} />
                        </label>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminEmployeePage;