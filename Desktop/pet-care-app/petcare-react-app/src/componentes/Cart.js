import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import qrCode from '../imagenes/qrcode.png';
import { crearPedido } from '../servicios/crearPedido';

function Cart({
  cartItems,
  isOpen,
  openCart,
  closeCart,
  removeFromCart,
  usuarioActual,
  handleAddQuantity,
  handleRemoveQuantity,
  currentUser,
  cleanCart
}) {
  const [showQRModal, setShowQRModal] = useState(false);

  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeCart]);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.precio * item.cantidad),
    0
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Factura', 10, 10);
    doc.text(
      `Cliente: ${currentUser.user.nombre} ${currentUser.user.apellido}`,
      40,
      10
    );
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 10);
    cartItems.forEach((item, index) => {
      doc.text(
        `${item.nombre} (${item.cantidad}) - $${Number(
          item.precio
        ).toLocaleString()}`,
        10,
        20 + index * 10
      );
    });
    doc.text(
      `Total: $${total.toLocaleString()}`,
      10,
      20 + cartItems.length * 10
    );
    doc.text(
      `Direccion de envio: ${direccionEnvio}`,
      10,
      20 + (cartItems.length + 1) * 10
    );
    doc.text(`Notas: ${notas}`, 10, 20 + (cartItems.length + 2) * 10);
    doc.save('Factura.pdf');
  };

  const handlePedido = async () => {
    const items = cartItems.map((item) => ({
      producto_id: item.id,
      cantidad: item.cantidad,
    }));

    const response = await crearPedido({
      usuario_id: usuarioActual.id,
      productos: items,
      direccion_envio: direccionEnvio,
      notas: notas,
    });

    if (response.mensaje==="Pedido creado exitosamente") {
      closeCart();
      cleanCart();
    }
  };

  return (
    <>
      <div id="cart" onClick={openCart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span id="cart-count" className={cartItems.length > 0 ? 'pulse' : ''}>
          {cartItems.length}
        </span>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeCart}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Tu Carrito</h2>
            <button className="close-button" onClick={closeCart}>
              &times;
            </button>
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <div className="cart-items">
                <div
                  className="cart-item"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '10px',
                    fontWeight: 'bold',
                    justifyItems: 'center',
                  }}
                >
                  <p>Item</p>
                  <p>Cantidad</p>
                  <p>Precio unitario</p>
                  <p>Total</p>
                  <p>Acciones</p>
                </div>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="cart-item"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '10px',
                      placeItems:'center'
                      
                    }}
                  >
                    <span style={{textAlign: 'center'}}>{item.nombre}</span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <button
                        style={{
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          background: 'none',
                          color: '#323232',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleAddQuantity(item)}
                        disabled={item.cantidad >= item.stock}
                      >
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {' '}
                            <path
                              opacity="0.1"
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              fill="currentColor"
                            ></path>{' '}
                            <path
                              d="M9 12H15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{' '}
                            <path
                              d="M12 9L12 15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{' '}
                            <path
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            ></path>{' '}
                          </g>
                        </svg>
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        style={{
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'none',
                          background: 'none',
                          color: '#323232',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleRemoveQuantity(item)}
                        disabled={item.cantidad <= 1}
                      >
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {' '}
                            <path
                              opacity="0.1"
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              fill="currentColor"
                            ></path>{' '}
                            <path
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            ></path>{' '}
                            <path
                              d="M9 12H15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{' '}
                          </g>
                        </svg>
                      </button>
                    </div>

                    <span>${Number(item.precio).toLocaleString()}</span>
                    <span>
                      ${(Number(item.precio) * item.cantidad).toLocaleString()}
                    </span>

                    <div className="delete-button-container">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="btn btn-delete"
                      >
                        <div className="delete-button-container">
                          <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {' '}
                              <path
                                d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{' '}
                            </g>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length > 0 && (
              <>
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginTop: 16,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="direccion">Direccion de envío:</label>
                <input
                  type="text"
                  name="direccion"
                  id="direccion"
                  onChange={(e) => setDireccionEnvio(e.target.value)}
                ></input>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="notas">Notas:</label>
                <textarea
                  name="notas"
                  id="notas"
                  rows="1"
                  onChange={(e) => setNotas(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="cart-actions">
              <button onClick={exportToPDF}>
                <p className="pdf">Exportar a PDF</p>
              </button>
              <button onClick={() => handlePedido()}>
                <p className="pdf">Confirmar tu compra</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div
            className="modal-content qr-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Escanea el código QR para pagar</h2>
            <img src={qrCode} alt="QR Code" />
            <button onClick={() => setShowQRModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
