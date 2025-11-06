// =======================
// Inicializar datos si no existen
// =======================
if (!localStorage.getItem('usuarios')) {
  const usuarios = [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@example.com",
      password: "1234",
      tipo_usuario: "estudiante",
      profesion: "Desarrollador Web",
      foto: "files/usuario2.png"
    },
    {
      id: 2,
      nombre: "Maria López",
      email: "maria@example.com",
      password: "abcd",
      tipo_usuario: "estudiante",
      profesion: "Diseñadora Gráfica",
      foto: "files/usuario1.png"
    },
    {
      id: 3,
      nombre: "Empresa ABC",
      email: "contacto@empresaabc.com",
      password: "admin",
      tipo_usuario: "empresa",
      profesion: "RRHH",
      foto: "files/empresa.png"
    }
  ];
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

if (!localStorage.getItem('publicaciones')) {
  const publicaciones = [
    {
      id: 1,
      usuario_id: 2,
      contenido: "¡Empezando un nuevo proyecto en JavaScript!",
      fecha: new Date("2025-10-27T10:00:00").toISOString()
    }
  ];
  localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

// =======================
// Función para formatear fecha
// =======================
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = ahora - fecha;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHoras = Math.floor(diffMin / 60);

  if (diffMin < 1) return "Hace un momento";
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffHoras < 24) return `Hace ${diffHoras} h`;
  return fecha.toLocaleDateString() + " " + fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


// =======================
// Mostrar publicaciones
// =======================
function cargarFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  const publicaciones = JSON.parse(localStorage.getItem("publicaciones") || "[]");
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  publicaciones.forEach(p => {
    const usuario = usuarios.find(u => u.id === p.usuario_id) || { nombre: "Usuario desconocido", foto: "files/unknown.png" };
    
    // Verificamos si el post es del usuario logueado
    const esAutor = usuarioLogueado && usuarioLogueado.id === p.usuario_id;

    const article = document.createElement("article");
    article.classList.add("post");
    article.innerHTML = `
      <div class="post-header">
        <img src="${usuario.foto}" alt="${usuario.nombre}">
        <div>
          <h4>${usuario.nombre}</h4>
          <p>${formatearFecha(p.fecha)}</p>
        </div>
      </div>
      <p>${p.contenido}</p>
      <div class="post-actions">
        <button class="btn-like">Me gusta</button>
        <button class="btn-comentar">Comentar</button>
        <button>Compartir</button>
        ${esAutor ? `<button class="btn-eliminar" data-id="${p.id}">Eliminar</button>` : ""}
      </div>
      <div class="comments" id="comments-${p.id}"></div>
      <div class="comment-box" style="display:none;">
        <textarea placeholder="Escribe un comentario..."></textarea>
        <button class="btn-enviar-comentario" data-id="${p.id}">Enviar</button>
      </div>
    `;
    feed.prepend(article);
  });

  // Activar eventos de botones
  activarEventosFeed();
}


// =======================
// Publicar nuevo post
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const publicarBtn = document.getElementById("btnPublicar");
  const textarea = document.getElementById("nuevaPublicacion");

  if (publicarBtn && textarea) {
    publicarBtn.addEventListener("click", () => {
      const contenido = textarea.value.trim();
      if (!contenido) return;

      const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
      if (!usuarioLogueado) {
        alert("Debes iniciar sesión antes de publicar.");
        return;
      }

      const publicaciones = JSON.parse(localStorage.getItem("publicaciones") || "[]");
      const nueva = {
        id: publicaciones.length + 1,
        usuario_id: usuarioLogueado.id,
        contenido,
        fecha: new Date().toISOString()
      };

      publicaciones.push(nueva);
      localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
      textarea.value = "";
      cargarFeed();
    });
  }

  // Evento de “Me gusta” global
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
      e.target.textContent = e.target.textContent === 'Me gusta' ? '❤️ Te gusta' : 'Me gusta';
    }
  });

  cargarFeed();
});

// =======================
// Eliminar publicación
// =======================
function eliminarPublicacion(id) {
  let publicaciones = JSON.parse(localStorage.getItem("publicaciones") || "[]");
  publicaciones = publicaciones.filter(p => p.id !== id);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  cargarFeed();
}

// =======================
// Activar eventos del feed
// =======================
function activarEventosFeed() {
  // Mostrar caja de comentarios
  document.querySelectorAll(".btn-comentar").forEach(btn => {
    btn.addEventListener("click", e => {
      const commentBox = e.target.closest(".post").querySelector(".comment-box");
      commentBox.style.display = commentBox.style.display === "none" ? "block" : "none";
    });
  });

  // Enviar comentario
  document.querySelectorAll(".btn-enviar-comentario").forEach(btn => {
    btn.addEventListener("click", e => {
      const postId = parseInt(btn.dataset.id);
      const textarea = btn.previousElementSibling;
      const texto = textarea.value.trim();

      if (!texto) return;

      const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
      const publicaciones = JSON.parse(localStorage.getItem("publicaciones") || "[]");
      const post = publicaciones.find(p => p.id === postId);

      if (!post.comentarios) post.comentarios = [];
      post.comentarios.push({
        usuario: usuario.nombre,
        texto,
        fecha: new Date().toLocaleString()
      });

      localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
      textarea.value = "";
      cargarFeed(); // Recarga el feed para mostrar el nuevo comentario
    });
  });

  // Eliminar publicación (solo el autor tiene el botón)
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.id);
      eliminarPublicacion(id);
    });
  });
}


// =======================
// Mostrar datos del usuario logueado en el sidebar
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (usuario) {
    const fotoPerfil = document.getElementById("fotoPerfil");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const profesionUsuario = document.querySelector(".profile-card p");

    if (fotoPerfil) fotoPerfil.src = usuario.foto || "files/default.png";
    if (nombreUsuario) nombreUsuario.textContent = usuario.nombre;
    if (profesionUsuario) profesionUsuario.textContent = usuario.profesion || "";
  }
});
