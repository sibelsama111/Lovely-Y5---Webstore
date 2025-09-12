// js/contacto.js
// Validaciones de contacto según PDF: nombre requerido max 100, correo dominios permitidos, comentario requerido max 500

const dominiosPermitidosContacto = ['@duoc.cl','@profesor.duoc.cl','@gmail.com'];

function correoValidoContacto(email) {
  if (!email) return false;
  return dominiosPermitidosContacto.some(d => email.endsWith(d));
}

document.getElementById('contactoForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const resultado = document.getElementById('resultado');

  if (!nombre || nombre.length > 100) {
    resultado.innerHTML = '<div class="alert alert-danger">Nombre requerido (máx 100 caracteres).</div>';
    return;
  }
  if (!correoValidoContacto(email) || email.length > 100) {
    resultado.innerHTML = '<div class="alert alert-danger">Correo inválido (solo @duoc.cl, @profesor.duoc.cl o @gmail.com).</div>';
    return;
  }
  if (!mensaje || mensaje.length > 500) {
    resultado.innerHTML = '<div class="alert alert-danger">Comentario requerido (máx 500 caracteres).</div>';
    return;
  }

  // Simulación de envío
  resultado.innerHTML = '<div class="alert alert-success">Mensaje enviado correctamente. Gracias.</div>';
  this.reset();
});
