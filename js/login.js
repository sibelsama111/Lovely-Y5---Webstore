// Manejo del formulario de login
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
    window.location.href = 'admin/dashboard.html'; // Redirige al dashboard
    return;
  }

  // Usuarios normales almacenados en localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);

  if (usuario) {
    alert(`¡Bienvenido ${usuario.nombres}!`);
    window.location.href = 'intranet.html'; // Redirige a intranet normal
  } else {
    alert('Credenciales incorrectas');
  }
});
