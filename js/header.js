console.log("Header cargado")
document.addEventListener("DOMContentLoaded", function() {
    const menuYo = document.querySelector(".menu-yo > a");
    const dropdown = document.querySelector(".menu-yo .dropdown");
  
    menuYo.addEventListener("click", function(e) {
      e.preventDefault(); // evita que haga scroll al top
      dropdown.classList.toggle("show");
    });
  
    // Opcional: cerrar dropdown al hacer click fuera
    document.addEventListener("click", function(e) {
      if (!menuYo.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });
  });
  