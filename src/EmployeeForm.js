import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        salario_base: '',
        idsucursal: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', formData); // Imprime los datos en la consola
        try {
            await axios.post('http://localhost:8800/apiv2/empleado', formData); // Asegúrate de que la URL sea correcta
            alert('Empleado agregado exitosamente.');
            // Resetea el formulario
            setFormData({
                nombres: '',
                apellidos: '',
                telefono: '',
                direccion: '',
                salario_base: '',
                idsucursal: ''
            });
        } catch (error) {
            console.error('Error al agregar empleado:', error.response ? error.response.data : error.message);
            alert('Error al agregar empleado. Por favor, verifica la API.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
            <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
            <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
            <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
            <input name="salario_base" placeholder="Salario Base" value={formData.salario_base} onChange={handleChange} required />
            <input name="idsucursal" placeholder="ID Sucursal" value={formData.idsucursal} onChange={handleChange} required />
            <button type="submit">Agregar Empleado</button>
        </form>
    );
};

export default EmployeeForm;
