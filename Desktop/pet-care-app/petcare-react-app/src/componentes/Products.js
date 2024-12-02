// src/components/Products.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import alimentoPremium from '../imagenes/alimento-premium.jpg'
import camaMascota from '../imagenes/cama-mascota.jpg'
import jugueteInteractivo from '../imagenes/juguete-interactivo.jpg'
import { obtenerProductos } from '../servicios/obtenerProductos';

function Products({ addToCart, cartItems, removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
        try {
            setLoading(true);
            const data = await obtenerProductos();
            setProducts(data);
        } catch (error) {
            setError(error.message);
            console.error("Error al obtener productos:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProductos();
}, []);

  return (
    <section id="productos">
      <h2>Productos Destacados</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            service={product}
            buttonText="Comprar"
            onAddToCart={addToCart}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Products;