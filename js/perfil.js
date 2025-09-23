document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuarioActual) {
    alert("Debes iniciar sesión para ver tu perfil");
    window.location.href = "login.html";
    return;
  }

  // ===== VARIABLES =====
  const fotoPreview = document.querySelector("#fotoPerfilPreview img");
  const opcionesFotos = document.querySelectorAll(".opcion-foto");
  const formPerfil = document.getElementById("formPerfil");
  const nombres = document.getElementById("nombres");
  const apellidos = document.getElementById("apellidos");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  const pais = document.getElementById("pais");
  const listaPedidos = document.getElementById("listaPedidos");
  const editarBtn = document.getElementById("editarBtn");
  const guardarBtn = formPerfil.querySelector("button[type='submit']");

  // ===== Rellenar datos =====
  document.getElementById("rut").value = usuarioActual.rut || "";
  nombres.value = usuarioActual.nombres || "";
  apellidos.value = usuarioActual.apellidos || "";
  email.value = usuarioActual.email || "";
  telefono.value = usuarioActual.telefono || "";
  direccion.value = usuarioActual.direccion || "";
  pais.value = usuarioActual.pais || "";
  fotoPreview.src = usuarioActual.fotoPerfil || "img/pficons/default.png";

  // ===== Cambiar foto de perfil =====
  opcionesFotos.forEach(img => {
    img.addEventListener("click", () => {
      fotoPreview.src = img.src;
      usuarioActual.fotoPerfil = img.src;
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    });
  });

  // ===== Activar edición =====
  editarBtn.addEventListener("click", () => {
    const inputs = formPerfil.querySelectorAll("input");
    inputs.forEach(input => {
      if (!["rut", "nombres", "apellidos", "email"].includes(input.id)) {
        input.disabled = false;
      }
    });
    guardarBtn.classList.remove("d-none");
  });

  // ===== Guardar cambios =====
  formPerfil.addEventListener("submit", (e) => {
    e.preventDefault();
    usuarioActual.telefono = telefono.value;
    usuarioActual.direccion = direccion.value;
    usuarioActual.pais = pais.value;
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

    const inputs = formPerfil.querySelectorAll("input");
    inputs.forEach(input => input.disabled = true);
    guardarBtn.classList.add("d-none");
    alert("Perfil actualizado correctamente");
  });

  // ===== PEDIDOS =====
  if (!localStorage.getItem("pedidos")) {
    localStorage.setItem("pedidos", JSON.stringify([]));
  }
  cargarPedidos();

  // ===== FUNCIONES =====

  function cargarPedidos() {
    listaPedidos.innerHTML = "";
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    // Mostrar solo los pedidos de este usuario
    pedidos.filter(p => p.email === usuarioActual.email).forEach(pedido => {
      const div = document.createElement("div");
      div.classList.add("col-12");
      div.innerHTML = `
        <div class="card p-3 shadow-sm">
          <p><b>ID Pedido:</b> ${pedido.id}</p>
          <ul>
            ${pedido.productos.map(p => `
              <li>
                <img src="${p.img}" width="40" class="me-2">
                ${p.nombre} - $${p.precio} (x${p.cantidad})
              </li>`).join("")}
          </ul>
          <p><b>Total:</b> $${pedido.total}</p>
          <p><b>Estado:</b> ${pedido.estado}</p>
          <button class="btn btn-outline-danger btn-sm" onclick="solicitud('${pedido.id}')">Solicitar cambio</button>
        </div>
      `;
      listaPedidos.appendChild(div);
    });
  }

  window.solicitud = function(idPedido) {
    const razon = prompt(`Escribe tu solicitud para el pedido ${idPedido}:\n(Ej: quiero cancelar mi pedido)`);
    if (razon) {
      alert(`Solicitud enviada: "${razon}"\nSerá revisada por un administrador.`);
      // Se puede guardar en localStorage o enviar a backend
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudes.push({ idPedido, email: usuarioActual.email, mensaje: razon });
      localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
    }
  };

  // Crear pedido de prueba
  window.crearPedidoEjemplo = function() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const nuevoPedido = {
      id: `#${Math.floor(Math.random() * 9000 + 1000)}`,
      email: usuarioActual.email,
      productos: [
        { nombre: "Producto 1", img: "img/producto1.png", precio: 2500, cantidad: 1 },
        { nombre: "Producto 2", img: "img/producto2.png", precio: 1500, cantidad: 2 }
      ],
      total: 2500 + 1500*2 + 5000, // sumando envio
      estado: "iniciado"
    };
    pedidos.push(nuevoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    cargarPedidos();
  };
});
