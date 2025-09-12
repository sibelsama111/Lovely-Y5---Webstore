// js/auth.js
// Registro y login usando LocalStorage (simulación sin backend)

// validaciones segun PDF:
// - correos permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
// - contraseña entre 4 y 10 caracteres
// - RUN sin puntos ni guion, min 7 max 9 chars (acepta K)
const dominiosPermitidos = ['@duoc.cl','@profesor.duoc.cl','@gmail.com'];

function correoValido(correo) {
  if (!correo || typeof correo !== 'string') return false;
  return dominiosPermitidos.some(d => correo.endsWith(d));
}

function rutValido(rut) {
  // solo formato: letras/numeros, sin puntos ni guion. longitud 7-9
  if (!rut) return false;
  const r = rut.toString().trim().toUpperCase();
  if (r.length < 7 || r.length > 9) return false;
  return /^[0-9]+[0-9K]$/.test(r);
}

function registrarUsuario(payload) {
  // payload: {rut,nombres,apellidos,correo,telefono,password,confirmPassword}
  if (!rutValido(payload.rut)) return {success:false, message:'RUN inválido. Sin puntos ni guion, 7-9 caracteres.'};
  if (!payload.nombres || payload.nombres.length === 0) return {success:false, message:'Nombres requeridos.'};
  if (!payload.apellidos || payload.apellidos.length === 0) return {success:false, message:'Apellidos requeridos.'};
  if (!correoValido(payload.correo)) return {success:false, message:'Correo inválido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.'};
  if (!payload.password || payload.password.length < 4 || payload.password.length > 10) return {success:false, message:'Contraseña debe tener entre 4 y 10 caracteres.'};
  if (payload.password !== payload.confirmPassword) return {success:false, message:'Las contraseñas no coinciden.'};

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(u => u.correo === payload.correo)) return {success:false, message:'Ya existe un usuario con ese correo.'};

  usuarios.push({
    rut: payload.rut,
    nombres: payload.nombres,
    apellidos: payload.apellidos,
    correo: payload.correo,
    telefono: payload.telefono,
    password: payload.password,
    rol: 'Cliente'
  });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return {success:true, message:'Usuario creado correctamente.'};
}

function loginUsuario(correo, password) {
  if (!correoValido(correo)) return {success:false, message:'Correo inválido.'};
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = usuarios.find(u => u.correo === correo && u.password === password);
  if (!user) return {success:false, message:'Correo o contraseña incorrectos.'};
  // Simular sesión guardando usuario actual
  localStorage.setItem('usuarioActual', JSON.stringify({correo:user.correo, nombres:user.nombres, rol: user.rol}));
  return {success:true, message:'Login OK.'};
}
