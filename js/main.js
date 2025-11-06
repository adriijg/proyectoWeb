// =======================
// Inicializar datos si no existen
// =======================
if (!localStorage.getItem('usuarios')) {
    const usuarios = [
<<<<<<< HEAD
        {id: 1, nombre: "Juan Pérez", email: "juan@example.com", tipo_usuario: "estudiante", profesion: "Desarrollador Web"},
        {id: 2, nombre: "Maria López", email: "maria@example.com", tipo_usuario: "estudiante", profesion: "Diseñadora Gráfica"},
        {id: 3, nombre: "Empresa ABC", email: "contacto@empresaabc.com", tipo_usuario: "empresa", profesion: "RRHH"}
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

if (!localStorage.getItem('publicaciones')) {
    const publicaciones = [
        {id: 1, usuario_id: 1, contenido: "¡Empezando un nuevo proyecto en JavaScript!", fecha: "2025-10-27 10:00"},
        {id: 2, usuario_id: 2, contenido: "Hoy aprendí a crear interfaces increíbles en CSS.", fecha: "2025-10-27 12:00"}
    ];
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

// =======================
// Función para mostrar publicaciones en el feed
// =======================
function cargarFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = ""; // Limpiar feed
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    publicaciones.forEach(p => {
        const usuario = usuarios.find(u => u.id === p.usuario_id) || {nombre: "Usuario desconocido"};
        const article = document.createElement('article');
        article.classList.add('post');
        article.innerHTML = `
            <div class="post-header">
                <img src="files/usuario1.png" alt="Usuario">
                <div>
                    <h4>${usuario.nombre}</h4>
                    <p>${p.fecha}</p>
                </div>
            </div>
            <p>${p.contenido}</p>
            <div class="post-actions">
                <button>Me gusta</button>
                <button>Comentar</button>
                <button>Compartir</button>
                <button onclick="eliminarPublicacion(${p.id})">Eliminar</button>
            </div>
        `;
        feed.appendChild(article);
    });
}

// =======================
// Función para agregar nueva publicación
// =======================
function agregarPublicacion(usuario_id, contenido) {
    if (!contenido.trim()) return;
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
    const nueva = {
        id: publicaciones.length + 1,
        usuario_id,
        contenido,
        fecha: new Date().toLocaleString()
    };
    publicaciones.push(nueva);
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
    cargarFeed();
}

// =======================
// Función para eliminar publicación
// =======================
function eliminarPublicacion(id) {
    let publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
    publicaciones = publicaciones.filter(p => p.id !== id);
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
    cargarFeed();
}

// =======================
// Configurar evento del botón de publicar
// =======================
document.getElementById('btnPublicar').addEventListener('click', () => {
    const textarea = document.getElementById('nuevaPublicacion');
    const contenido = textarea.value;
    agregarPublicacion(1, contenido); // 1 = usuario logueado por defecto
    textarea.value = "";
});

// =======================
// Cargar feed al iniciar
// =======================
cargarFeed();
=======
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
        fecha: "2025-10-27 10:00"
      }
    ];
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
  }
  
  // =======================
  // Mostrar publicaciones
  // =======================
  function cargarFeed() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
  
    const publicaciones = JSON.parse(localStorage.getItem("publicaciones") || "[]");
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  
    publicaciones.forEach(p => {
      const usuario = usuarios.find(u => u.id === p.usuario_id) || { nombre: "Usuario desconocido", foto: "files/default.png" };
  
      const article = document.createElement("article");
      article.classList.add("post");
      article.innerHTML = `
        <div class="post-header">
          <img src="${usuario.foto}" alt="${usuario.nombre}">
          <div>
            <h4>${usuario.nombre}</h4>
            <p>${p.fecha}</p>
          </div>
        </div>
        <p>${p.contenido}</p>
        <div class="post-actions">
          <button>Me gusta</button>
          <button>Comentar</button>
          <button>Compartir</button>
          <button onclick="eliminarPublicacion(${p.id})">Eliminar</button>
        </div>
      `;
      feed.prepend(article);
    });
  }
  
  // =======================
  // Publicar nuevo post
  // =======================
  document.getElementById("btnPublicar").addEventListener("click", () => {
    const textarea = document.getElementById("nuevaPublicacion");
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
      fecha: new Date().toLocaleString()
    };
  
    publicaciones.push(nueva);
    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
    textarea.value = "";
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
  // Cargar feed al iniciar
  // =======================
  cargarFeed();
  
>>>>>>> main
