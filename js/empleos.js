// ============================
// Empleos.js — StudentsJobs
// ============================

// Referencias del DOM
const searchInput = document.getElementById('searchInput');
const jobType = document.getElementById('jobType');
const jobCards = document.querySelectorAll('.job-card');

// Función principal: filtrar empleos
function filtrarEmpleos() {
  const texto = searchInput.value.toLowerCase();
  const tipo = jobType.value;

  jobCards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    const empresa = card.querySelector('p strong').textContent.toLowerCase();
    const ubicacion = card.querySelector('p').textContent.toLowerCase();

    // Clasificación de empleo o práctica (añade class="practica" en tu HTML cuando corresponda)
    const esPractica = card.classList.contains('practica');
    const esEmpleo = !esPractica;

    // Coincidencia por texto y tipo
    const coincideTexto =
      titulo.includes(texto) ||
      empresa.includes(texto) ||
      ubicacion.includes(texto);

    const coincideTipo =
      tipo === 'todos' ||
      (tipo === 'empleo' && esEmpleo) ||
      (tipo === 'practica' && esPractica);

    // Mostrar u ocultar tarjeta
    if (coincideTexto && coincideTipo) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Eventos para actualizar el filtrado en tiempo real
if (searchInput && jobType) {
  searchInput.addEventListener('input', filtrarEmpleos);
  jobType.addEventListener('change', filtrarEmpleos);
}

// Mensaje de depuración (opcional)
console.log("✅ Script de empleos cargado correctamente — StudentsJobs");
