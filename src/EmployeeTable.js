import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8800/apiv2/empleado/empleadosucursal');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/apiv2/empleado/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setIsEditing(true);
  };

  const handleUpdateEmployee = async () => {
    if (!editEmployee) return;

    try {
      const updatedEmployee = {
        nombres: editEmployee.nombres,
        apellidos: editEmployee.apellidos,
        telefono: editEmployee.telefono,
        direccion: editEmployee.direccion,
        salario_base: editEmployee.salario_base,
        idsucursal: editEmployee.idsucursal,
      };

      await axios.put(`http://localhost:8800/apiv2/empleado/${editEmployee.idempleado}`, updatedEmployee);

      fetchEmployees();
      setEditEmployee(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      {!isEditing ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Sucursal</th>
              <th>Salario Base</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan="8">No employees found.</td></tr>
            ) : (
              employees.slice().reverse().map((employee) => (
                <tr key={employee.idempleado}>
                  <td>{employee.idempleado}</td>
                  <td>{employee.nombres}</td>
                  <td>{employee.apellidos}</td>
                  <td>{employee.telefono}</td>
                  <td>{employee.direccion}</td>
                  <td>{employee.nombre_sucursal}</td>
                  <td>{employee.salario_base}</td>
                  <td>
                    <button className="delete" onClick={() => handleDeleteEmployee(employee.idempleado)}>Delete</button>
                    <button className="edit" onClick={() => handleEditEmployee(employee)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <div>
          <h2>Edit Employee</h2>
          <input
            type="text"
            value={editEmployee.nombres || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, nombres: e.target.value })}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={editEmployee.apellidos || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, apellidos: e.target.value })}
            placeholder="Apellido"
          />
          <input
            type="text"
            value={editEmployee.telefono || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, telefono: e.target.value })}
            placeholder="Teléfono"
          />
          <input
            type="text"
            value={editEmployee.direccion || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, direccion: e.target.value })}
            placeholder="Dirección"
          />
          <input
            type="text"
            value={editEmployee.nombre_sucursal || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, nombre_sucursal: e.target.value })}
            placeholder="Sucursal"
          />
          <input
            type="number"
            value={editEmployee.idsucursal || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, idsucursal: Number(e.target.value) })}
            placeholder="ID Sucursal"
          />
          <input
            type="number"
            value={editEmployee.salario_base || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, salario_base: Number(e.target.value) })}
            placeholder="Salario Base"
          />
          <button className="update" onClick={handleUpdateEmployee}>Actualizar Empleado</button>
          <button className="cancel" onClick={() => { setEditEmployee(null); setIsEditing(false); }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
