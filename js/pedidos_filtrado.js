document.addEventListener('DOMContentLoaded', () => {

  const filtroEstado = document.getElementById('filtro-estado');
  const ordenFecha = document.getElementById('orden-fecha');
  const ordenPrecio = document.getElementById('orden-precio');
  const buscarCorreo = document.getElementById('buscar-correo');

  const secciones = {
    iniciado: document.getElementById('iniciados-list'),
    confirmado: document.getElementById('confirmados-list'),
    enviado: document.getElementById('enviados-list'),
    recibido: document.getElementById('recibidos-list'),
    cancelado: document.getElementById('cancelados-list'),
    reembolsado: document.getElementById('reembolsados-list')
  };

  const getPedidos = () => JSON.parse(localStorage.getItem('pedidos')) || [];

  function calcularEnvio(direccion) {
    if (!direccion) return 5000;
    const dirLower = direccion.toLowerCase();
    if (dirLower.includes('valparaíso')) {
      return 0;
    }
    return 5000;
  }

  function procesarPedidos() {
    let pedidos = getPedidos();

    // Añadir estado por defecto si no tiene
    pedidos = pedidos.map(p => {
      if (!p.estado) p.estado = 'iniciado';
      // Si no tiene los datos completos, se podrían asignar vacíos o defaults
      return p;
    });

    // FILTRO: por estado
    const estadoSel = filtroEstado.value;
    if (estadoSel) {
      pedidos = pedidos.filter(p => p.estado === estadoSel);
    }

    // BÚSQUEDA: por correo
    const correoBuscar = buscarCorreo.value.trim().toLowerCase();
    if (correoBuscar) {
      pedidos = pedidos.filter(p => (p.correo || p.email || '').toLowerCase().includes(correoBuscar));
    }

    // ORDEN: por fecha
    // Suponiendo que p.fecha existe y es formato reconocible
    if (ordenFecha.value === 'masReciente') {
      pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    } else if (ordenFecha.value === 'masAntiguo') {
      pedidos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    // ORDEN: por precio
    if (ordenPrecio.value === 'precioDesc') {
      pedidos.sort((a, b) => (b.total + calcularEnvio(b.direccion)) - (a.total + calcularEnvio(a.direccion)));
    } else if (ordenPrecio.value === 'precioAsc') {
      pedidos.sort((a, b) => (a.total + calcularEnvio(a.direccion)) - (b.total + calcularEnvio(b.direccion)));
    }

    return pedidos;
  }

  function renderTodosPedidos() {
    const pedidosProcesados = procesarPedidos();

    // Limpiar secciones
    Object.values(secciones).forEach(sec => sec.innerHTML = '');

    // Renderizar cada pedido en su sección
    pedidosProcesados.forEach((p, index) => {
      const envio = calcularEnvio(p.direccion);
      const totalConEnvio = (parseFloat(p.total) || 0) + envio;

      // Crear descripción productos
      const productosHtml = (p.productos || []).map(prod => {
        return `${prod.nombre} (x${prod.cantidad || 1})`;
      }).join(', ');

      const div = document.createElement('div');
      div.className = 'card p-2 mb-2';
      div.innerHTML = `
        <div>
          <strong>RUT:</strong> ${p.rut || '-'}<br>
          <strong>Nombre:</strong> ${p.nombres || '-'} ${p.apellidos || '-'}<br>
          <strong>Correo:</strong> ${p.email || p.correo || '-'}<br>
          <strong>Teléfono:</strong> ${p.telefono || '-'}<br>
          <strong>Dirección:</strong> ${p.direccion || '-'}<br>
          <strong>Fecha:</strong> ${p.fecha || '-'}<br>
          <strong>Enviar:</strong> $${envio.toLocaleString()} CLP<br>
          <strong>Total:</strong> $${totalConEnvio.toLocaleString()} CLP<br>
          <strong>Productos:</strong> ${productosHtml}<br>
        </div>
      `;

      const estado = p.estado || 'iniciado';
      if (secciones[estado]) {
        secciones[estado].appendChild(div);
      }
    });
  }

  // Event listeners para controles
  filtroEstado.addEventListener('change', () => renderTodosPedidos());
  ordenFecha.addEventListener('change', () => renderTodosPedidos());
  ordenPrecio.addEventListener('change', () => renderTodosPedidos());
  buscarCorreo.addEventListener('input', () => renderTodosPedidos());

  // Inicializar
  renderTodosPedidos();
});
