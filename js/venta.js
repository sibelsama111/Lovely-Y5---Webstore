const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const resumenDiv = document.getElementById('resumen-compra');
let total = 0;

resumenDiv.innerHTML = '<h4>Productos:</h4>' + carrito.map(item => {
  const cantidad = item.cantidad || 1;
  const precioUnitario = parseFloat(item.precio) || 0;
  total += precioUnitario * cantidad;
  return `<div>
      <strong>${item.nombre}</strong> x${cantidad} - $${precioUnitario * cantidad}
    </div>`;
}).join('') + `<h5 class="mt-3">Total: $${total}</h5>`;

document.getElementById('form-venta').addEventListener('submit', function(e) {
  e.preventDefault();
  const cliente = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    direccion: document.getElementById('direccion').value,
    productos: carrito,
    total
  };
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(cliente);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  document.getElementById('mensaje-venta').innerHTML = '<div class="alert alert-success">¡Gracias por tu compra! Te contactaremos pronto.</div>';
  localStorage.removeItem('carrito');
});

document.getElementById('btn-cancelar').addEventListener('click', function() {
  if(confirm('¿Deseas cancelar la venta y vaciar el carrito?')){
    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
  }
});
