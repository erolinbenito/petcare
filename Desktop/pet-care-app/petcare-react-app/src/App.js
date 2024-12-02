import React, { useState } from 'react';
import Navigation from './componentes/Navigation';
import Services from './componentes/Services';
import Products from './componentes/Products';
import Cart from './componentes/Cart';
import Footer from './componentes/Footer';
import './App.css';
import Header from './componentes/Header';
import Login from './componentes/Login';
import AdminOrders from './componentes/AdmiOrders';
import AdminModal from './componentes/adminModal';
// Y luego úsalo en tu JSX:

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {       
    setCartItems(cartItems.filter((i) => i.id !== item.id));
  };

  const handleAddQuantity = (item) => {
    const updatedCartItems = cartItems.map((i) => {
      if (i.id === item.id) {
        return {
          ...i,
          cantidad: i.cantidad + 1,
        }
      }
      return i;
    })
    setCartItems(updatedCartItems);
  };

  const handleRemoveQuantity = (item) => {
    const updatedCartItems = cartItems.map((i) => {
      if (i.id === item.id) {
        return {
          ...i,
          cantidad: i.cantidad - 1,
        }
      }
      return i;
    })
    setCartItems(updatedCartItems);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const cleanCart = () => {
    setCartItems([]);
  };

  // Función de login
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Header />
          <Navigation />
          <main>
            <h1>Hola, {currentUser.user.nombre}</h1>
            <Services
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
            <Products
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </main>
          {currentUser?.user.rol_id === 1 && (
            <div style={{ textAlign: 'right', padding: '20px' }}>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  position: 'fixed',
                  top: '1rem',
                  right: '5rem',
                  borderRadius: '50%',
                }}
              >
                Icono
              </button>
              <AdminModal
                isOpen={isAdminModalOpen}
                onClose={() => setIsAdminModalOpen(false)}
              />
            </div>
          )}
          {currentUser?.user.rol_id === 1 ? (
            <AdminOrders
              isOpen={isCartOpen}
              onClose={closeCart}
              openCart={openCart}
            />
          ) : (
            <Cart
              cartItems={cartItems}
              isOpen={isCartOpen}
              openCart={openCart}
              closeCart={closeCart}
              removeFromCart={removeFromCart}
              usuarioActual={currentUser.user}
              handleAddQuantity={handleAddQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
              currentUser={currentUser}
              cleanCart={cleanCart}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
