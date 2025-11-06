const markAllBtn = document.getElementById("markAll");
const filterSelect = document.getElementById("filterSelect");
const notifications = document.querySelectorAll(".notification");

// Marcar todas como leídas
markAllBtn.addEventListener("click", () => {
  notifications.forEach(n => n.classList.remove("unread"));
});

// Marcar una sola notificación como leída
notifications.forEach(n => {
  n.querySelector(".mark-read").addEventListener("click", () => {
    n.classList.remove("unread");
  });
});

// Filtrar por tipo
filterSelect.addEventListener("change", e => {
  const filter = e.target.value;
  notifications.forEach(n => {
    if (filter === "todas") {
      n.style.display = "flex";
    } else if (filter === "noleidas") {
      n.style.display = n.classList.contains("unread") ? "flex" : "none";
    } else {
      n.style.display = n.dataset.type === filter ? "flex" : "none";
    }
  });
});
