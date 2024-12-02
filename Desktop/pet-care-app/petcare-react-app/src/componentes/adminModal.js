// components/AdminModal.jsx
import React, { useState, useEffect } from 'react';
import '../estilos/adminModal.css'; // Crearemos este archivo de estilos
import { obtenerTodosProductos } from '../servicios/obtenerTodosProductos';


const AdminModal = ({ isOpen, onClose }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock:'',
        descripcion: '',
        categoria_id: ''
    });

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const data = await obtenerTodosProductos();
            setProductos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await fetch(`http://localhost:4000/api/productos/${editingItem.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch('http://localhost:4000/api/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }
            fetchProductos();
            setEditingItem(null);
            setFormData({ nombre: '', precio: '', stock:'',descripcion: '', categoria_id: '' });
        } catch (error) {
            setError(error.message);
        }
    };

  

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este item?')) {
            try {
                await fetch(`http://localhost:4000/api/productos/${id}`, {
                    method: 'DELETE'
                });
                fetchProductos();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            nombre: item.nombre,
            precio: item.precio,
            stock: item.stock,
            descripcion: item.descripcion,
            categoria: item.categoria_id
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{editingItem ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                    <button className="close-button" onClick={onClose}>✕</button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <input
                                type="number"
                                value={formData.precio}
                                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Descripción:</label>
                            <textarea
                                value={formData.descripcion}
                                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Categoría:</label>
                            <select
                                value={formData.categoria_id}
                                onChange={(e) => setFormData({...formData, categoria_id: e.target.value})}
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                <option value="1">Productos</option>
                                <option value="2">Servicios</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        {editingItem ? 'Actualizar' : 'Crear'}
                    </button>
                </form>

                {/* Lista de Items */}
                <div className="items-list">
                    <h3>Items Registrados</h3>
                    {loading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="items-grid">
                            {productos.map(item => (
                                <div key={item.id} className="item-card">
                                    <div className="item-details">
                                        <h4>{item.nombre}</h4>
                                        <p className="item-price">${item.precio}</p>
                                        <p className="item-description">{item.descripcion}</p>
                                        <p className="item-description">Stock: {item.stock}</p>
                                        <img src={item.imagen_url} alt={item.name} width="150" height="150" />
                                    </div>
                                    <div className="item-actions">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="delete-button"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminModal;