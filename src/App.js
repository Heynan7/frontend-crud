import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const App = () => {
    const [showForm, setShowForm] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [editEmployee, setEditEmployee] = useState(null); // Estado para manejar la edición

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleShowTable = () => {
        setShowForm(false);
    };

    const addEmployee = (employee) => {
        setEmployees((prevEmployees) => [...prevEmployees, employee]);
    };

    const updateEmployee = (updatedEmployee) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => (emp.idempleado === updatedEmployee.idempleado ? updatedEmployee : emp))
        );
        setEditEmployee(null); // Limpiar el estado de edición
    };

    return (
        <div>
            <h1>Empleados</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                {showForm ? (
                    <button onClick={handleShowTable}>Volver a la Tabla</button>
                ) : (
                    <button onClick={handleShowForm}>Agregar Empleado</button>
                )}
            </div>
            {showForm ? (
                <EmployeeForm addEmployee={addEmployee} editEmployee={editEmployee} updateEmployee={updateEmployee} />
            ) : (
                <EmployeeTable employees={employees} setEditEmployee={setEditEmployee} />
            )}
        </div>
    );
};

export default App;
