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

// Postulaciones
const postulacionesUl = document.getElementById("postulaciones");

// Obtener postulaciones del LocalStorage
function cargarPostulaciones() {
  postulacionesUl.innerHTML = "";
  const postulaciones = JSON.parse(localStorage.getItem("postulaciones") || "[]");
  if (postulaciones.length === 0) {
    postulacionesUl.innerHTML = "<li>No has postulado a ninguna oferta aún.</li>";
    return;
  }
  postulaciones.forEach(post => {
    const li = document.createElement("li");
    li.textContent = `${post.titulo} — ${post.empresa} (${post.ubicacion})`;
    postulacionesUl.appendChild(li);
  });
}

// Al cargar el perfil
window.addEventListener("DOMContentLoaded", cargarPostulaciones);

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
