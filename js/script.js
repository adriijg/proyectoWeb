document.addEventListener('DOMContentLoaded', () => {
  // --- Menú desplegable "Yo" ---
  const menuYo = document.querySelector('.menu-yo > a');
  const dropdown = document.querySelector('.menu-yo .dropdown');

  if (menuYo) {
    menuYo.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-yo')) {
        dropdown.classList.remove('show');
      }
    });
  }

  // --- Efecto de "Me gusta" ---
  document.addEventListener('click', (e) => {
    if (e.target.textContent === 'Me gusta') {
      e.target.textContent = '❤️ Te gusta';
    } else if (e.target.textContent === '❤️ Te gusta') {
      e.target.textContent = 'Me gusta';
    }
  });

  // --- Publicar nuevo post ---
  const postButton = document.querySelector('.post-form button');
  const postTextArea = document.querySelector('.post-form textarea');
  const feed = document.querySelector('.feed');

  if (postButton && postTextArea && feed) {
    postButton.addEventListener('click', () => {
      const text = postTextArea.value.trim();
      if (!text) return;

      const newPost = document.createElement('article');
      newPost.classList.add('post');
      newPost.innerHTML = `
        <div class="post-header">
          <img src="files/juanPerez.avif" alt="Usuario">
          <div>
            <h4>Juan Pérez</h4>
            <p>Hace un momento</p>
          </div>
        </div>
        <p>${text}</p>
        <div class="post-actions">
          <button>Me gusta</button>
          <button>Comentar</button>
          <button>Compartir</button>
        </div>
        <div class="comments"></div>
      `;
      feed.prepend(newPost);
      postTextArea.value = '';
    });
  }

  // --- Caja de comentarios y funcionalidad ---
  document.addEventListener('click', (e) => {
    // Mostrar caja de comentarios
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

    // Enviar comentario
    if (e.target.classList.contains('send-comment')) {
      const commentBox = e.target.closest('.comment-box');
      const textarea = commentBox.querySelector('textarea');
      const text = textarea.value.trim();
      if (!text) return;

      const post = e.target.closest('.post');
      const commentsSection = post.querySelector('.comments');

      const comment = document.createElement('div');
      comment.classList.add('comment');
      comment.innerHTML = `
        <strong>Tú:</strong> <span class="comment-text">${text}</span>
        <div class="comment-actions">
          <button class="edit-comment">Editar</button>
          <button class="delete-comment">Borrar</button>
        </div>
      `;
      commentsSection.appendChild(comment);

      textarea.value = '';
    }

    // Borrar comentario
    if (e.target.classList.contains('delete-comment')) {
      const comment = e.target.closest('.comment');
      comment.remove();
    }

    // Editar comentario
    if (e.target.classList.contains('edit-comment')) {
      const comment = e.target.closest('.comment');
      const textSpan = comment.querySelector('.comment-text');
      const oldText = textSpan.textContent;

      // Crear textarea de edición
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

    // Guardar edición
    if (e.target.classList.contains('save-edit')) {
      const editBox = e.target.closest('.edit-box');
      const newText = editBox.querySelector('textarea').value.trim();
      const comment = e.target.closest('.comment');
      const textSpan = comment.querySelector('.comment-text');
      if (newText) textSpan.textContent = newText;
      editBox.remove();
    }

    // Cancelar edición
    if (e.target.classList.contains('cancel-edit')) {
      e.target.closest('.edit-box').remove();
    }
  });
});

  