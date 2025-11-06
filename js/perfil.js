// Selección de elementos
const modal = document.getElementById("modalEditar");
const btnEditar = document.getElementById("editarPerfil");
const btnGuardar = document.getElementById("guardarCambios");
const btnCancelar = document.getElementById("cancelarCambios");

// Campos del perfil
const nombre = document.getElementById("nombre");
const titular = document.getElementById("titular");
const acerca = document.getElementById("acerca");

// Inputs del modal
const inputNombre = document.getElementById("inputNombre");
const inputTitular = document.getElementById("inputTitular");
const inputAcerca = document.getElementById("inputAcerca");

// Abrir modal con los valores actuales
btnEditar.addEventListener("click", () => {
  inputNombre.value = nombre.textContent;
  inputTitular.value = titular.textContent;
  inputAcerca.value = acerca.textContent;
  modal.style.display = "flex";
});

// Guardar cambios
btnGuardar.addEventListener("click", () => {
  nombre.textContent = inputNombre.value;
  titular.textContent = inputTitular.value;
  acerca.textContent = inputAcerca.value;
  modal.style.display = "none";
});

// Cancelar
btnCancelar.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
