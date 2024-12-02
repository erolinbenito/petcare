import React, { useState } from 'react';
import { loginUser } from '../servicios/login';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credenciales de prueba
  const TEST_CREDENTIALS = {
    user: {
      email: 'correo@correo.com',
      password: 'pass123',
      userData: {
        id: 1,
        name: 'Usuario Prueba',
        email: 'correo@correo.com',
        role: 'user',
      },
    },
    admin: {
      email: 'admin@admin.com',
      password: 'admin123',
      userData: {
        id: 2,
        name: 'Administrador',
        email: 'admin@admin.com',
        role: 'admin',
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    //setTimeout(() => {
    //  if (formData.email === TEST_CREDENTIALS.user.email &&
    //      formData.password === TEST_CREDENTIALS.user.password) {
    //    onLoginSuccess(TEST_CREDENTIALS.user.userData);
    //  }
    //  else if (formData.email === TEST_CREDENTIALS.admin.email &&
    //           formData.password === TEST_CREDENTIALS.admin.password) {
    //    onLoginSuccess(TEST_CREDENTIALS.admin.userData);
    //  }
    //  else {
    //    setError('Credenciales incorrectas');
    //  }
    //  setLoading(false);
    //}, 1000);

    await loginUser(formData.email, formData.password).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        onLoginSuccess(data);
      }
      setLoading(false);
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`login-button ${loading ? 'disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
