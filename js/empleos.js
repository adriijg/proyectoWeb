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

  let resultados = 0;

  jobCards.forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    const empresa = card.querySelector('p strong').textContent.toLowerCase();
    const ubicacion = card.querySelector('p').textContent.toLowerCase();

    const esPractica = card.classList.contains('practica');
    const esEmpleo = !esPractica;

    const coincideTexto =
      titulo.includes(texto) ||
      empresa.includes(texto) ||
      ubicacion.includes(texto);

    const coincideTipo =
      tipo === 'todos' ||
      (tipo === 'empleo' && esEmpleo) ||
      (tipo === 'practica' && esPractica);

    if (coincideTexto && coincideTipo) {
      card.style.display = 'flex';
      resultados++;
    } else {
      card.style.display = 'none';
    }
  });

  // Mostrar mensaje si no hay resultados
  mostrarMensajeNoResultados(resultados === 0);
}

// Mostrar u ocultar mensaje "sin resultados"
function mostrarMensajeNoResultados(sinResultados) {
  let mensaje = document.querySelector('.no-results');
  if (!mensaje) {
    mensaje = document.createElement('p');
    mensaje.className = 'no-results';
    mensaje.textContent = 'No hay empleos que coincidan con tu búsqueda.';
    mensaje.style.textAlign = 'center';
    mensaje.style.marginTop = '20px';
    mensaje.style.color = '#666';
    document.querySelector('.job-list-horizontal').after(mensaje);
  }
  mensaje.style.display = sinResultados ? 'block' : 'none';
}

// ====== EVENTOS ======

// Cuando el usuario cambia el tipo (Todos / Empleo / Prácticas)
jobType.addEventListener('change', filtrarEmpleos);

// Cuando el usuario presiona Enter en el input
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Evita recargar la página
    filtrarEmpleos();
  }
});

// console.log("✅ Script de empleos cargado correctamente — StudentsJobs");
