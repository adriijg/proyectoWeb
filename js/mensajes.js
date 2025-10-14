// Simulación de cambio de conversación
const conversaciones = document.querySelectorAll('.conversacion');
const chatHeader = document.querySelector('.chat-header h3');
const chatMensajes = document.querySelector('.chat-mensajes');

conversaciones.forEach(conv => {
  conv.addEventListener('click', () => {
    document.querySelector('.conversacion.activa')?.classList.remove('activa');
    conv.classList.add('activa');

    // Cambiar nombre en el header
    chatHeader.textContent = conv.querySelector('h3').textContent;

    // Aquí podrías cargar mensajes dinámicamente de un JSON o backend simulado
    chatMensajes.innerHTML = `
      <div class="mensaje empresa">
        <p>Hola, esta es la conversación con ${conv.querySelector('h3').textContent}.</p>
        <span class="hora">10:00</span>
      </div>
    `;
  });
});

// Envío de mensajes
const form = document.querySelector('.chat-input');
const input = form.querySelector('input');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim() === '') return;

  const nuevoMensaje = document.createElement('div');
  nuevoMensaje.classList.add('mensaje', 'usuario');
  nuevoMensaje.innerHTML = `<p>${input.value}</p><span class="hora">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;

  chatMensajes.appendChild(nuevoMensaje);
  input.value = '';
  chatMensajes.scrollTop = chatMensajes.scrollHeight;
});
