// js/juego.js
document.getElementById('btn-adivinar')?.addEventListener('click', () => {
  const input = document.getElementById('numeroUsuario');
  const resultado = document.getElementById('resultado');
  let num = parseInt(input.value,10);
  if (!num || num < 1 || num > 10) {
    resultado.innerHTML = '<span class="text-danger">Ingresa un número entre 1 y 10.</span>';
    return;
  }
  const secreto = Math.floor(Math.random()*10)+1;
  if (num === secreto) {
    resultado.innerHTML = `<span class="text-success">¡Increíble! Adivinaste (${secreto}).</span>`;
  } else {
    resultado.innerHTML = `<span class="text-muted">Fallaste. El número era ${secreto}. Mejor suerte la próxima.</span>`;
  }
});
