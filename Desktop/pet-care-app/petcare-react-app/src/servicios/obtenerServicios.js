export async function obtenerServicios() {
    const opciones = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch("http://localhost:4000/api/productos?categoria=2", opciones);
    const data = await response.json();
    return data;
}