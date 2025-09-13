document.addEventListener('DOMContentLoaded', () => {
  // Obtener pedidos desde localStorage
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  // Definir secciones
  const secciones = {
    iniciado: document.getElementById('iniciados-list'),
    confirmado: document.getElementById('confirmados-list'),
    enviado: document.getElementById('enviados-list'),
    recibido: document.getElementById('recibidos-list'),
    cancelado: document.getElementById('cancelados-list'),
    reembolsado: document.getElementById('reembolsados-list')
  };

  // Limpiar todas las secciones
  Object.values(secciones).forEach(sec => sec.innerHTML = '');

  // Renderizar pedidos en la sección correspondiente
  pedidos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card p-2 mb-2';
    div.innerHTML = `
      <strong>${p.nombre}</strong> - $${p.total} - <em>${p.email}</em>
      <ul class="list-unstyled mb-0">
        ${p.productos.map(prod => `<li>${prod.nombre} x${prod.cantidad}</li>`).join('')}
      </ul>
      <div class="mt-2">
        ${crearBotones(p.estado)}
      </div>
    `;

    // Verificar que el estado exista en el objeto secciones
    if (secciones[p.estado]) {
      secciones[p.estado].appendChild(div);
    }
  });

  // Función para crear botones según estado
  function crearBotones(estado) {
    switch (estado) {
      case 'iniciado':
        return `<button class="btn btn-sm btn-success me-2" onclick="cambiarEstado('${estado}','confirmado')">Confirmar</button>
                <button class="btn btn-sm btn-danger" onclick="cambiarEstado('${estado}','cancelado')">Cancelar</button>`;
      case 'confirmado':
        return `<button class="btn btn-sm btn-primary" onclick="cambiarEstado('${estado}','enviado')">Marcar como enviado</button>`;
      case 'enviado':
        return `<button class="btn btn-sm btn-info" onclick="cambiarEstado('${estado}','recibido')">Marcar como recibido</button>`;
      case 'recibido':
        return `<button class="btn btn-sm btn-warning" onclick="cambiarEstado('${estado}','reembolsado')">Reembolsar</button>`;
      default:
        return '';
    }
  }

  // Hacer que la función esté disponible globalmente
  window.cambiarEstado = (estadoActual, nuevoEstado) => {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const index = pedidos.findIndex(p => p.estado === estadoActual);
    if (index !== -1) {
      pedidos[index].estado = nuevoEstado;
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      location.reload(); // refresca la página para actualizar la vista
    }
  };
});

