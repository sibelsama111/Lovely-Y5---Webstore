// ===== VARIABLES =====
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
const fotoPreview = document.querySelector("#fotoPerfilPreview img");
const opcionesFotos = document.querySelectorAll(".opcion-foto");
const formPerfil = document.getElementById("formPerfil");
const editarBtn = document.getElementById("editarBtn");
const listaPedidos = document.getElementById("listaPedidos");

// Mostrar info del usuario en perfil
function mostrarInfo() {
  if (!usuarioActual) return;

  fotoPreview.src = usuarioActual.fotoPerfil || "img/pficons/default.png";
  document.getElementById("rut").value = usuarioActual.rut || "";
  document.getElementById("nombres").value = usuarioActual.nombres || "";
  document.getElementById("apellidos").value = usuarioActual.apellidos || "";
  document.getElementById("email").value = usuarioActual.correo || "";
  document.getElementById("telefono").value = usuarioActual.telefono || "";
  document.getElementById("direccion").value = usuarioActual.direccion || "";
  document.getElementById("pais").value = usuarioActual.pais || "";

  // Mostrar pedidos
  cargarPedidos();
}

// ===== FOTO DE PERFIL =====
opcionesFotos.forEach(img => {
  img.addEventListener("click", () => {
    fotoPreview.src = img.src;
    usuarioActual.fotoPerfil = img.src;
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

    // Actualizar en array 'usuarios'
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const idx = usuarios.findIndex(u => u.rut === usuarioActual.rut);
    if (idx !== -1) usuarios[idx].fotoPerfil = img.src;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  });
});

// ===== EDICIÓN DEL PERFIL =====
editarBtn.addEventListener("click", () => {
  const inputs = formPerfil.querySelectorAll("input");
  inputs.forEach(input => {
    if (!["rut", "nombres", "apellidos", "email"].includes(input.id)) {
      input.disabled = false;
    }
  });
  formPerfil.querySelector("button[type='submit']").classList.remove("d-none");
});

// ===== GUARDAR PERFIL =====
formPerfil.addEventListener("submit", e => {
  e.preventDefault();
  usuarioActual.telefono = document.getElementById("telefono").value;
  usuarioActual.direccion = document.getElementById("direccion").value;
  usuarioActual.pais = document.getElementById("pais").value;

  // Actualizar usuarioActual y usuarios
  localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const index = usuarios.findIndex(u => u.rut === usuarioActual.rut);
  if (index !== -1) {
    usuarios[index] = usuarioActual;
  } else {
    usuarios.push(usuarioActual);
  }
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Deshabilitar inputs y ocultar botón guardar
  formPerfil.querySelectorAll("input").forEach(i => i.disabled = true);
  formPerfil.querySelector("button[type='submit']").classList.add("d-none");
  alert("Perfil actualizado correctamente");
  mostrarInfo();
});

// ===== PEDIDOS =====
if (!localStorage.getItem("pedidos")) localStorage.setItem("pedidos", JSON.stringify([]));

function cargarPedidos() {
  listaPedidos.innerHTML = "";
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const pedidosUsuario = pedidos.filter(p => p.correo === usuarioActual.correo);

  pedidosUsuario.forEach(pedido => {
    const div = document.createElement("div");
    div.classList.add("col-12");
    div.innerHTML = `
      <div class="card p-3 shadow-sm">
        <p><b>ID Pedido:</b> ${pedido.id}</p>
        <ul>
          ${pedido.productos.map(prod => `
            <li class="d-flex align-items-center mb-1">
              <img src="${prod.imagenes[0]}" width="40" class="me-2">
              ${prod.nombre} - $${prod.precio} (x${prod.cantidad || 1})
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

// Pedido de prueba
function crearPedidoEjemplo() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const nuevoPedido = {
    id: Math.floor(Math.random() * 10000),
    correo: usuarioActual.correo,
    productos: [{
      nombre: "Cargador inalámbrico",
      precio: 19990,
      cantidad: 1,
      imagenes: ["img/cargadorina.jpg"]
    }],
    total: 19990 + 5000,
    estado: "iniciado",
    fecha: new Date().toLocaleString()
  };
  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  cargarPedidos();
}

// Solicitud personalizada
function solicitud(idPedido) {
  const razon = prompt(`Escribe tu solicitud para el pedido ${idPedido}:\n(Ej: quiero cancelar mi pedido)`);
  if (razon) {
    alert(`Solicitud enviada: "${razon}"\nSerá revisada por un administrador.`);
    let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
    solicitudes.push({ idPedido, correo: usuarioActual.correo, mensaje: razon });
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
  }
}

// ===== INICIO =====
document.addEventListener("DOMContentLoaded", mostrarInfo);
