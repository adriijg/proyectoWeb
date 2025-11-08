console.log("login.js cargado correctamente");

// Simulación de base de datos local (puedes reemplazar esto con datos reales o backend)
const usuarios = [
  {
    email: "juan@example.com",
    password: "1234",
    nombre: "Juan Pérez",
    profesion: "Desarrollador Web",
    foto: "files/usuario2.png"
  },
  {
    email: "maria@example.com",
    password: "abcd",
    nombre: "María López",
    profesion: "Diseñadora UX/UI",
    foto: "files/usuario1.png"
  },
  {
    email: "contacto@empresaabc.com",
    password: "admin",
    nombre: "Empresa ABC",
    profesion: "RRHH",
    foto: "files/empresa.png"
  }
];

// Escuchar el evento del formulario de login
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");
  if (!form) {
    console.error("No se encontró el formulario de login (#loginForm)");
    return;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Buscar el usuario
    const usuarioEncontrado = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      // Guardar sesión en localStorage
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

      // (Opcional) inicializar su configuración si no existe aún
      const storageKey = `config_${usuarioEncontrado.email}`;
      if (!localStorage.getItem(storageKey)) {
        const configInicial = {
          tema: "claro",
          idioma: "es",
          notifEmail: true,
          notifApp: true,
          perfilPublico: true
        };
        localStorage.setItem(storageKey, JSON.stringify(configInicial));
      }

      alert(`Bienvenido, ${usuarioEncontrado.nombre}`);
      window.location.href = "index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});
