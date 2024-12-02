export async function loginUser(email, password) {
  const opciones = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }), // Incluye el cuerpo con los datos
  };

  try {
    const response = await fetch(
      'http://localhost:4000/api/usuarios/login',
      opciones
    );

    if (!response.ok) {
      // Manejo de errores HTTP
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Devuelve los datos recibidos del servidor
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { error: error.message }; // Devuelve un objeto de error
  }
}
