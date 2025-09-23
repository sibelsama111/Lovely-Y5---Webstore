let usuariosJSON = [];

// Cargar JSON de usuarios
fetch("data/clientes.json")
  .then(response => response.json())
  .then(data => {
    usuariosJSON = data;
  })
  .catch(err => console.error("Error cargando JSON:", err));

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const correo = document.getElementById('correo').value.trim();
  const password = document.getElementById('password').value;

  // Credenciales por defecto del admin
  const admin = {
    correo: 'ja.torti@duocuc.cl',
    password: 'Security-15200'
  };

  // Revisar si es admin
  if (correo === admin.correo && password === admin.password) {
    alert('¡Bienvenido Admin!');
    window.location.href = 'admin/dashboard.html';
    return;
  }

  // Usuarios normales almacenados en localStorage
  const usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioLS = usuariosLS.find(u => u.correo === correo && u.password === password);

  // Cuando sea cliente
if (usuarioLS && usuarioLS.categoria === "cliente") {
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioLS));
    alert(`¡Bienvenido ${usuarioLS.nombres}!`);
    window.location.href = 'index.html'; // redirige al index
    return;
}


  // Revisar usuarios del JSON
  const usuarioJSON = usuariosJSON.find(u => u.correo === correo && u.password === password);
  if (usuarioJSON) {
    alert(`¡Bienvenido ${usuarioJSON.nombres} ${usuarioJSON.apellidos}!`);
    window.location.href = 'intranet.html';
    return;
  }

  alert('Credenciales incorrectas');
});

