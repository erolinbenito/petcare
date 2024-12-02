
export async function obtenerTodosProductos() {
    const opciones = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch("http://localhost:4000/api/productos", opciones);
    const data = await response.json();
    return data;
}