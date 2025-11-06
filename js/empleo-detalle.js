// =============================
// empleo-detalle.js — StudentsJobs
// =============================

const JOBS = {
  "java-junior": {
    titulo: "Desarrollador Java Junior",
    empresa: "TechWave",
    ubicacion: "Madrid",
    modalidad: "Híbrido",
    descripcion: "En TechWave buscamos un desarrollador Java junior con ganas de aprender y crecer en un entorno colaborativo. Te integrarás en un equipo ágil encargado del mantenimiento y mejora de aplicaciones backend en Java y Spring Boot.",
    requisitos: [
      "Conocimientos básicos de Java y SQL",
      "Motivación por aprender nuevas tecnologías",
      "Trabajo en equipo y comunicación"
    ]
  },
  "diseñador-web": {
    titulo: "Diseñador Web",
    empresa: "CreativeStudio",
    ubicacion: "Barcelona",
    modalidad: "Presencial",
    descripcion: "Responsable de diseño UX/UI y mantenimiento de sitios web responsivos, colaborando con equipos multifuncionales.",
    requisitos: [
      "Conocimientos en HTML, CSS y JavaScript",
      "Experiencia con herramientas de diseño (Figma, Adobe XD)",
      "Creatividad y atención al detalle"
    ]
  },
  "analista-datos": {
    titulo: "Analista de Datos",
    empresa: "DataVision",
    ubicacion: "Valencia",
    modalidad: "Híbrido",
    descripcion: "Análisis de datos con Python, SQL y Power BI en proyectos de transformación digital.",
    requisitos: [
      "Experiencia con bases de datos y BI",
      "Capacidad analítica",
      "Trabajo en equipo"
    ]
  },
  "marketing-intern": {
    titulo: "Prácticas en Marketing Digital",
    empresa: "GrowthLab",
    ubicacion: "Madrid",
    modalidad: "Remoto",
    descripcion: "Apoyo en campañas de redes sociales y análisis de métricas para optimizar estrategias digitales.",
    requisitos: [
      "Estudios en Marketing, Publicidad o afines",
      "Manejo básico de herramientas de análisis",
      "Interés por tendencias digitales"
    ]
  }
};

// Obtener parámetro de la URL
const params = new URLSearchParams(window.location.search);
const jobKey = params.get("job");

// Mostrar la info si existe el empleo
if (jobKey && JOBS[jobKey]) {
  const info = JOBS[jobKey];
  document.querySelector('.job-detail-card').innerHTML = `
    <h2>${info.titulo}</h2>
    <p><strong>Empresa:</strong> ${info.empresa}</p>
    <p><strong>Ubicación:</strong> ${info.ubicacion}</p>
    <p><strong>Modalidad:</strong> ${info.modalidad}</p>
    <hr>
    <p><strong>Descripción del puesto:</strong></p>
    <p>${info.descripcion}</p>
    <p><strong>Requisitos:</strong></p>
    <ul>
      ${info.requisitos.map(r => `<li>${r}</li>`).join('')}
    </ul>
    <button class="apply-full">Postular</button>
  `;

  // Postulaciones
  const btnPostular = document.querySelector(".apply-full");
  if (btnPostular) {
    btnPostular.addEventListener("click", () => {
      let postulaciones = JSON.parse(localStorage.getItem("postulaciones") || "[]");
      if (!postulaciones.some(post => post.titulo === info.titulo && post.empresa === info.empresa && post.ubicacion === info.ubicacion)) {
        postulaciones.push({
          titulo: info.titulo,
          empresa: info.empresa,
          ubicacion: info.ubicacion
        });
        localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
        btnPostular.textContent = "¡Postulado!";
        btnPostular.disabled = true;
        btnPostular.style.background = "#bbb";
      }
    });

    // Si ya está postulado, deshabilitar botón
    let postulaciones = JSON.parse(localStorage.getItem("postulaciones") || "[]");
    if (postulaciones.some(post => post.titulo === info.titulo && post.empresa === info.empresa && post.ubicacion === info.ubicacion)) {
      btnPostular.textContent = "¡Postulado!";
      btnPostular.disabled = true;
      btnPostular.style.background = "#bbb";
    }
  }
} else {
  document.querySelector('.job-detail-card').innerHTML = `
    <h2>Empleo no encontrado</h2>
    <p>La oferta solicitada no existe o ha sido eliminada.</p>
  `;
}
