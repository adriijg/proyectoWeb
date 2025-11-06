// script.js
console.log("script.js cargado");

// Se ejecuta al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {

  // --- Menú desplegable "Yo" ---
  const menuYo = document.querySelector('.menu-yo > a');
  const dropdown = document.querySelector('.menu-yo .dropdown');

  if (menuYo && dropdown) {
    menuYo.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-yo')) {
        dropdown.classList.remove('show');
      }
    });
  }

  // --- Cargar datos del usuario logueado en el header ---
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  if (usuario) {
    const menuYoText = document.querySelector('.menu-yo > a');
    if (menuYoText) {
      menuYoText.innerHTML = `
        <img src="${usuario.foto || 'files/default.png'}" 
             alt="${usuario.nombre}" 
             class="mini-foto"> 
        ${usuario.nombre.split(" ")[0]} ▾
      `;
    }
  }

});
