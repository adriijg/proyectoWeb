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
});

  