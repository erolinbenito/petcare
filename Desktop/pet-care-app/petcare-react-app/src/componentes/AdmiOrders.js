import React, { useState } from "react";

const AdminOrders = ({ isOpen, onClose, openCart }) => {
  // Datos de prueba para los pedidos
  const [orders, setOrders] = useState([
    {
      id: 1,
      userId: 1,
      userName: "Juan Pérez",
      date: "2024-03-01",
      total: 150.0,
      status: "pendiente",
      items: [
        { id: 1, name: "Producto 1", price: 50.0, quantity: 2 },
        { id: 2, name: "Producto 2", price: 50.0, quantity: 1 },
      ],
    },
    {
      id: 2,
      userId: 3,
      userName: "María García",
      date: "2024-03-02",
      total: 200.0,
      status: "confirmado",
      items: [{ id: 3, name: "Producto 3", price: 100.0, quantity: 2 }],
    },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      <div id="cart" onClick={openCart}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M21 7V6.37006C21 5.17705 21 4.58055 20.842 4.09946C20.5425 3.18719 19.8468 2.47096 18.9606 2.16261C18.4933 2 17.9139 2 16.755 2H7.24502C6.08614 2 5.50671 2 5.03939 2.16261C4.15322 2.47096 3.45748 3.18719 3.15795 4.09946C3 4.58055 3 5.17705 3 6.37006V15M21 11V20.3742C21 21.2324 20.015 21.6878 19.3919 21.1176C19.0258 20.7826 18.4742 20.7826 18.1081 21.1176L17.625 21.5597C16.9834 22.1468 16.0166 22.1468 15.375 21.5597C14.7334 20.9726 13.7666 20.9726 13.125 21.5597C12.4834 22.1468 11.5166 22.1468 10.875 21.5597C10.2334 20.9726 9.26659 20.9726 8.625 21.5597C7.98341 22.1468 7.01659 22.1468 6.375 21.5597L5.8919 21.1176C5.52583 20.7826 4.97417 20.7826 4.6081 21.1176C3.985 21.6878 3 21.2324 3 20.3742V19"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M9.5 10.4L10.9286 12L14.5 8"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M7.5 15.5H9M16.5 15.5H12"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
          </g>
        </svg>
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Gestión de Pedidos</h2>
              <button onClick={onClose} className="close-button">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Pedido #{order.id}</h3>
                    <p>Cliente: {order.userName}</p>
                    <p>Fecha: {order.date}</p>
                    <p>Total: ${order.total.toFixed(2)}</p>
                  </div>
                  <div className="order-items">
                    <h4>Productos:</h4>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} - Cantidad: {item.quantity} - $
                          {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-status">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`status-select status-${order.status}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrders;
