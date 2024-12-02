// src/components/Services.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import vacunacion from '../imagenes/vacunacion.jpg'
import peluqueria from '../imagenes/peluqueria.jpg'
import consultaVeterinaria from '../imagenes/consulta-veterinaria.jpg'
import { obtenerServicios } from '../servicios/obtenerServicios';

function Services({ addToCart, cartItems, removeFromCart }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
        try {
            setLoading(true);
            const data = await obtenerServicios();
            setServices(data);
        } catch (error) {
            setError(error.message);
            console.error("Error al obtener servicios:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchServicios();
}, []);

  return (
    <section id="servicios">
      <h2>Nuestros Servicios</h2>
      <div className="product-grid">
        {services.map((service, index) => (
          <ProductCard
            key={index}
            service={service}
            buttonText="Reservar"
            onAddToCart={addToCart}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;