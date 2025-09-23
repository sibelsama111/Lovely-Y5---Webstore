document.addEventListener("DOMContentLoaded", () => {
  let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuarioActual) {
    // Cargar usuario de ejemplo si no existe
    usuarioActual = {
      rut:"20175864-5",
      nombres:"Gino Maximiliano",
      apellidos:"Jofre Hidalgo",
      email:"g.jofre@duocuc.cl",
      telefono:973675321,
      direccion:"Ossandon #401, Valparaiso",
      pais:"Chile",
      categoria:"cliente",
      fotoPerfil:"img/pficons/default.png"
    };
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
  }

  const fotoPreview = document.getElementById("fotoPerfilPreview");
  const nombreCompleto = document.getElementById("nombreCompleto");
  const infoRut = document.getElementById("infoRut");
  const infoEmail = document.getElementById("infoEmail");
  const infoTelefono = document.getElementById("infoTelefono");
  const infoDireccion = document.getElementById("infoDireccion");
  const infoPais = document.getElementById("infoPais");
  const listaPedidos = document.getElementById("listaPedidos");
  const form = document.getElementById("formPerfil");
  const opcionesFotos = document.querySelectorAll(".opcion-foto");

  function mostrarInfo() {
    fotoPreview.src = usuarioActual.fotoPerfil || "img/pficons/default.png";
    nombreCompleto.textContent = `${usuarioActual.nombres} ${usuarioActual.apellidos}`;
    infoRut.textContent = usuarioActual.rut;
    infoEmail.textContent = usuarioActual.email;
    infoTelefono.textContent = usuarioActual.telefono;
    infoDireccion.textContent = usuarioActual.direccion;
    infoPais.textContent = usuarioActual.pais;
  }

  mostrarInfo();

  opcionesFotos.forEach(img => {
    img.addEventListener("click", () => {
      usuarioActual.fotoPerfil = img.src;
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
      mostrarInfo();
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    usuarioActual.telefono = document.getElementById("telefono").value;
    usuarioActual.direccion = document.getElementById("direccion").value;
    usuarioActual.pais = document.getElementById("pais").value;
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    mostrarInfo();
    alert("Perfil actualizado correctamente");
    bootstrap.Modal.getInstance(document.getElementById('editarModal')).hide();
  });

  if (!localStorage.getItem("pedidos")) localStorage.setItem("pedidos", JSON.stringify([]));

  function cargarPedidos() {
    listaPedidos.innerHTML = "";
    const pedidos = JSON.parse(localStorage.getItem("pedidos")).filter(p => p.email === usuarioActual.email);
    pedidos.forEach(pedido => {
      const div = document.createElement("div");
      div.className = "pedido-card";
      div.innerHTML = `
        <p><b>ID Pedido:</b> ${pedido.id}</p>
        <ul class="list-unstyled">
          ${pedido.productos.map(p => `<li><img src="${p.imagenes ? p.imagenes[0] : 'img/pficons/default.png'}" width="30" class="me-2">${p.nombre || p.codigo} - $${p.precio} x${p.cantidad || 1}</li>`).join("")}
        </ul>
        <p><b>Total:</b> $${pedido.total}</p>
        <p><b>Estado:</b> ${pedido.estado}</p>
      `;
      listaPedidos.appendChild(div);
    });
  }

  window.crearPedidoEjemplo = () => {
    const pedidos = JSON.parse(localStorage.getItem("pedidos"));
    const pedido = {
      id: Math.floor(Math.random()*10000),
      email: usuarioActual.email,
      productos: [{
        codigo:"y5chgrwlss",
        nombre:"Cargador inalámbrico",
        precio:19990,
        imagenes:["img/cargadorina.jpg"],
        cantidad:1
      }],
      total: 19990 + 5000,
      estado:"iniciado"
    };
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    cargarPedidos();
  }

  cargarPedidos();
});
