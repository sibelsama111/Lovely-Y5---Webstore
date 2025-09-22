document.addEventListener('DOMContentLoaded', () => {
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  // ---------- DASHBOARD ----------
  const dashboardDiv = document.getElementById('dashboard-pedidos');
  if (dashboardDiv) {
    dashboardDiv.innerHTML = '';
    pedidos.slice(-5).reverse().forEach(p => {
      const div = document.createElement('div');
      div.className = 'col-12';
      div.innerHTML = `
        <div class="card p-2 mb-2">
          <strong>${p.nombres} ${p.apellidos}</strong> - $${p.total} - <em>${p.email}</em>
          <ul class="list-unstyled mb-0">
            ${p.productos.map(prod => `<li>${prod.nombre} x${prod.cantidad || 1}</li>`).join('')}
          </ul>
        </div>
      `;
      dashboardDiv.appendChild(div);
    });
  }

  // ---------- PEDIDOS.HTML ----------
  const secciones = {
    iniciado: document.getElementById('iniciados-list'),
    confirmado: document.getElementById('confirmados-list'),
    enviado: document.getElementById('enviados-list'),
    recibido: document.getElementById('recibidos-list'),
    cancelado: document.getElementById('cancelados-list'),
    reembolsado: document.getElementById('reembolsados-list')
  };

  // Limpiar secciones
  Object.values(secciones).forEach(sec => {
    if(sec) sec.innerHTML = '';
  });

  pedidos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card p-2 mb-2';
    div.innerHTML = `
      <strong>${p.nombres} ${p.apellidos}</strong> - $${p.total} - <em>${p.email}</em>
      <ul class="list-unstyled mb-0">
        ${p.productos.map(prod => `<li>${prod.nombre} x${prod.cantidad || 1}</li>`).join('')}
      </ul>
      <div class="mt-2">
        ${crearBotones(p.estado)}
      </div>
    `;

    if (secciones[p.estado]) {
      secciones[p.estado].appendChild(div);
    }
  });

  // ---------- FUNCIONES ----------
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

  // Función global para cambiar estado
  window.cambiarEstado = (estadoActual, nuevoEstado) => {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const index = pedidos.findIndex(p => p.estado === estadoActual);
    if (index !== -1) {
      pedidos[index].estado = nuevoEstado;
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      location.reload(); // refresca la página para actualizar la vista
    }
  };
});
