const btnAdivinar = document.getElementById("btn-adivinar");
const numeroInput = document.getElementById("numeroUsuario");
const resultado = document.getElementById("resultado");

btnAdivinar.addEventListener("click", () => {
  const numeroUsuario = parseInt(numeroInput.value);
  
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
    resultado.textContent = "Ingresa un número válido entre 1 y 10";
    resultado.className = "text-danger";
    return;
  }

  // Número secreto se genera al azar cada intento
  const numeroSecreto = Math.floor(Math.random() * 10) + 1;

  // Nunca gana
  if (numeroUsuario === numeroSecreto) {
    // Solo para que el usuario sienta que adivinó
    resultado.textContent = `Casi! El número era ${numeroSecreto} pero cambiamos la suerte 😎`;
    resultado.className = "text-warning";
  } else {
    resultado.textContent = `Lo sentimos 😢. Tu número: ${numeroUsuario}, número secreto: ${numeroSecreto}`;
    resultado.className = "text-primary";
  }

  numeroInput.value = "";
});
