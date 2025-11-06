// =======================
// Usuarios simulados
// =======================
if (!localStorage.getItem('usuarios')) {
    const usuarios = [
        {id: 1, nombre: "Juan Pérez", email: "juan@example.com", password: "1234", tipo_usuario: "estudiante", foto: "files/usuario1.png"},
        {id: 2, nombre: "Maria López", email: "maria@example.com", password: "abcd", tipo_usuario: "estudiante", foto: "files/usuario2.png"},
        {id: 3, nombre: "Empresa ABC", email: "contacto@empresaabc.com", password: "admin", tipo_usuario: "empresa", foto: "files/empresa.png"}
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}


// =======================
// Login
// =======================
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        // Guardamos usuario logueado
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

        // Redirigir al feed principal
        window.location.href = "index.html";
    } else {
        errorMsg.textContent = "Email o contraseña incorrectos.";
    }
});
