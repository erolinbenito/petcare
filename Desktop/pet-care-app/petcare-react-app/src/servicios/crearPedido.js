export async function crearPedido({
  usuario_id,
  productos,
  direccion_envio,
  notas,
}) {
  const opciones = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario_id, productos, direccion_envio, notas }),
  };
  const response = await fetch('http://localhost:4000/api/pedidos', opciones);
  const data = await response.json();
  return data;
}
