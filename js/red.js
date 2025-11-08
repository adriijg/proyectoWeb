console.log("Red script cargado");

// Funcionalidad básica para los botones de mensaje
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".connection-card button");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const nombre = e.target.closest(".connection-card").querySelector("h4").textContent;
    });
  });
});
