console.log("Header cargado");

(function () {
  function initHeaderMenu() {
    const menuYo = document.querySelector(".menu-yo > a");
    const dropdown = document.querySelector(".menu-yo .dropdown");
    if (!menuYo || !dropdown) return;

    // Evitar múltiples listeners duplicados
    menuYo.replaceWith(menuYo.cloneNode(true));
    const newMenuYo = document.querySelector(".menu-yo > a");

    // Abrir / cerrar menú
    newMenuYo.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!newMenuYo.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });
  }

  // Esperar que el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeaderMenu);
  } else {
    initHeaderMenu();
  }
})();
