document.addEventListener('DOMContentLoaded', () => {
  // 🔸 Usuario logueado actualmente
  let currentUser = "Tú"; // Puedes cambiar entre "Tú" y "Laura Gómez" para probar

  // --- Mostrar caja de comentarios ---
  document.addEventListener('click', (e) => {
    if (e.target.textContent === 'Comentar') {
      const post = e.target.closest('.post');
      let commentBox = post.querySelector('.comment-box');

      if (!commentBox) {
        commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');
        commentBox.innerHTML = `
          <textarea placeholder="Escribe un comentario..."></textarea>
          <button class="send-comment">Enviar</button>
        `;
        post.appendChild(commentBox);
      }

      commentBox.querySelector('textarea').focus();
    }
  });

  // --- Enviar comentario ---
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('send-comment')) {
      const commentBox = e.target.closest('.comment-box');
      const textarea = commentBox.querySelector('textarea');
      const text = textarea.value.trim();
      if (!text) return;

      const post = e.target.closest('.post');
      const commentsSection = post.querySelector('.comments');

      const comment = document.createElement('div');
      comment.classList.add('comment');
      comment.setAttribute('data-user', currentUser);

      comment.innerHTML = `
        <strong>${currentUser}:</strong> <span class="comment-text">${text}</span>
        <div class="comment-actions">
          ${
            currentUser
              ? `<button class="edit-comment">Editar</button>
                 <button class="delete-comment">Borrar</button>`
              : ''
          }
        </div>
      `;

      commentsSection.appendChild(comment);
      textarea.value = '';
    }
  });

  // --- Borrar comentario ---
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-comment')) {
      const comment = e.target.closest('.comment');
      const user = comment.getAttribute('data-user');

      if (user === currentUser) {
        comment.remove();
      } else {
        alert('No puedes borrar comentarios de otros usuarios');
      }
    }
  });

  // --- Editar comentario ---
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-comment')) {
      const comment = e.target.closest('.comment');
      const user = comment.getAttribute('data-user');

      if (user !== currentUser) {
        alert('No puedes editar comentarios de otros usuarios');
        return;
      }

      const textSpan = comment.querySelector('.comment-text');
      const oldText = textSpan.textContent;

      const editBox = document.createElement('div');
      editBox.classList.add('edit-box');
      editBox.innerHTML = `
        <textarea>${oldText}</textarea>
        <button class="save-edit">Guardar</button>
        <button class="cancel-edit">Cancelar</button>
      `;
      comment.appendChild(editBox);
      comment.querySelector('textarea').focus();
    }
  });

  // --- Guardar edición ---
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-edit')) {
      const editBox = e.target.closest('.edit-box');
      const newText = editBox.querySelector('textarea').value.trim();
      const comment = e.target.closest('.comment');
      const textSpan = comment.querySelector('.comment-text');
      if (newText) textSpan.textContent = newText;
      editBox.remove();
    }
  });

  // --- Cancelar edición ---
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel-edit')) {
      e.target.closest('.edit-box').remove();
    }
  });

  // 🔸 Cambiar usuario (simulación para probar con Laura Gómez)
  const userSwitcher = document.getElementById('userSwitcher');
  if (userSwitcher) {
    userSwitcher.addEventListener('change', (e) => {
      currentUser = e.target.value;
    });
  }
});

