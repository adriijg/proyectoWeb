// Objeto para almacenar mensajes por conversación
const mensajesPorConversacion = {
  "Empresa Tech": [
    { tipo: 'empresa', texto: "Hola, hemos visto tu CV y nos gustaría agendar una entrevista.", hora: "10:15" },
    { tipo: 'usuario', texto: "¡Hola! Perfecto, estaré disponible mañana.", hora: "10:17" }
  ],
  "María López": [
    { tipo: 'empresa', texto: "Hola, vi tu perfil...", hora: "09:45" }
  ]
};

const conversaciones = document.querySelectorAll('.conversacion');
const chatHeader = document.querySelector('.chat-header h3');
const chatMensajes = document.querySelector('.chat-mensajes');
const form = document.querySelector('.chat-input');
const input = form.querySelector('input');

// Función para renderizar mensajes
function renderMensajes(nombre) {
  chatMensajes.innerHTML = '';
  if (mensajesPorConversacion[nombre]) {
    mensajesPorConversacion[nombre].forEach(m => {
      const div = document.createElement('div');
      div.classList.add('mensaje', m.tipo);
      div.innerHTML = `<p>${m.texto}</p><span class="hora">${m.hora}</span>`;
      chatMensajes.appendChild(div);
    });
  }
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

// Cambio de conversación
conversaciones.forEach(conv => {
  const nombre = conv.querySelector('h3').textContent;

  conv.addEventListener('click', () => {
    // Marcar activa
    document.querySelector('.conversacion.activa')?.classList.remove('activa');
    conv.classList.add('activa');
    // Cambiar header
    chatHeader.textContent = nombre;
    // Renderizar mensajes
    renderMensajes(nombre);
  });
});

// Envío de mensajes
form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  const conversacionActiva = document.querySelector('.conversacion.activa');
  if (!conversacionActiva) return;
  const nombre = conversacionActiva.querySelector('h3').textContent;
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Inserta el mensaje nuevo
  if (!mensajesPorConversacion[nombre]) mensajesPorConversacion[nombre] = [];
  mensajesPorConversacion[nombre].push({ tipo: 'usuario', texto, hora });

  renderMensajes(nombre);
  input.value = '';
});

// Render inicial (primera conversación activa)
document.addEventListener('DOMContentLoaded', () => {
  const activa = document.querySelector('.conversacion.activa');
  if (activa) {
    const nombre = activa.querySelector('h3').textContent;
    renderMensajes(nombre);
  }
});
