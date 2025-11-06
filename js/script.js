console.log("Scripts cargado")

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
  // --- Publicar nuevo post ---
const postButton = document.querySelector('.post-form button');
const postTextArea = document.querySelector('.post-form textarea');
const feed = document.querySelector('.feed');

if (postButton && postTextArea && feed) {
  postButton.addEventListener('click', () => {
    const text = postTextArea.value.trim();
    if (!text) return;

    // Obtener el usuario logueado desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuario) {
      alert('Debes iniciar sesión para publicar.');
      return;
    }

    // Crear post dinámicamente con sus datos
    const newPost = document.createElement('article');
    newPost.classList.add('post');

    // Crear elementos de forma segura (sin innerHTML)
    const header = document.createElement('div');
    header.classList.add('post-header');

    const img = document.createElement('img');
    img.src = usuario.foto || 'files/default.png';
    img.alt = usuario.nombre;

    const info = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = usuario.nombre;
    const pTime = document.createElement('p');
    pTime.textContent = 'Hace un momento';

    info.appendChild(h4);
    info.appendChild(pTime);
    header.appendChild(img);
    header.appendChild(info);

    // Contenido del post
    const contenido = document.createElement('p');
    contenido.textContent = text;

    // Botones
    const actions = document.createElement('div');
    actions.classList.add('post-actions');
    ['Me gusta', 'Comentar', 'Compartir'].forEach(txt => {
      const btn = document.createElement('button');
      btn.textContent = txt;
      actions.appendChild(btn);
    });

    // Ensamblar todo
    newPost.appendChild(header);
    newPost.appendChild(contenido);
    newPost.appendChild(actions);
    feed.prepend(newPost);

    postTextArea.value = '';
  });
}
});
