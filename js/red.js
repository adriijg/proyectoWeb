// Funcionalidad básica para los botones de mensaje
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".connection-card button");
  
    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const nombre = e.target.closest(".connection-card").querySelector("h4").textContent;
        alert(`Funcionalidad de mensajes en desarrollo.\nPronto podrás chatear con ${nombre}.`);
      });
    });
  
    // Menú desplegable "Yo"
    const menuYo = document.querySelector(".menu-yo > a");
    const dropdown = document.querySelector(".menu-yo .dropdown");
  
    if (menuYo && dropdown) {
      menuYo.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("show");
      });
  
      // Cerrar menú si se hace clic fuera
      document.addEventListener("click", (e) => {
        if (!menuYo.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove("show");
        }
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".connection-card button");
  
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.parentElement.querySelector("h4").textContent;
        alert(`Iniciar chat con ${name} (funcionalidad próximamente disponible).`);
      });
    });
  });
  