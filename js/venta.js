const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const resumenDiv = document.getElementById('resumen-compra');
let total = 0;

// Renderizar resumen de compra
resumenDiv.innerHTML = '<h4>Productos:</h4>' + carrito.map(item => {
  const cantidad = item.cantidad || 1;
  const precioUnitario = parseFloat(item.precio) || 0;
  total += precioUnitario * cantidad;
  return `<div>
      <strong>${item.nombre}</strong> x${cantidad} - $${precioUnitario * cantidad}
    </div>`;
}).join('') + `<h5 class="mt-3">Total: $${total}</h5>`;

// Crear contenedor para el mensaje del sistema
const mensajeDiv = document.getElementById('mensaje-venta');
mensajeDiv.innerHTML = ''; // Limpiar

document.getElementById('form-venta').addEventListener('submit', function(e) {
  e.preventDefault();

  if (!carrito.length) {
    mensajeDiv.innerHTML = `<div class="alert alert-warning">Tu carrito está vacío.</div>`;
    return;
  }

  // Mostrar mensaje de confirmación en HTML
  mensajeDiv.innerHTML = `
    <div class="alert alert-info">
      <p>¿Deseas confirmar la compra por <strong>$${total}</strong>?</p>
      <button id="confirmar-compra" class="btn btn-success btn-sm me-2">Confirmar</button>
      <button id="cancelar-compra" class="btn btn-danger btn-sm">Cancelar</button>
    </div>
  `;

  document.getElementById('confirmar-compra').addEventListener('click', () => {
    const cliente = {
      id: Date.now(),
      rut: document.getElementById('rut').value,
      nombres: document.getElementById('nombres').value,
      apellidos: document.getElementById('apellidos').value,
      email: document.getElementById('correo').value,
      telefono: document.getElementById('telefono').value,
      direccion: document.getElementById('direccion').value,
      direccion: document.getElementById('pais').value,
      productos: carrito,
      total,
      estado: "iniciado",
      fecha: new Date().toLocaleString()
    };

    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(cliente);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    mensajeDiv.innerHTML = `
      <div class="alert alert-success">
        ¡Gracias por tu compra, ${cliente.nombre}! Tu pedido fue registrado con éxito.
      </div>
    `;

    localStorage.removeItem('carrito');
    resumenDiv.innerHTML = ''; // Limpiar carrito visual
  });

  document.getElementById('cancelar-compra').addEventListener('click', () => {
    mensajeDiv.innerHTML = `<div class="alert alert-secondary">Compra cancelada.</div>`;
  });
});

// Cancelar venta global
document.getElementById('btn-cancelar').addEventListener('click', function() {
  if (confirm('¿Deseas cancelar la venta y vaciar el carrito?')) {
    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
  }
});
