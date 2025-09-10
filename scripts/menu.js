document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos la barra de navegación y el botón
    const nav = document.getElementById('nav-bar');
    const navToggle = document.querySelector('.nav-toggle');

    if (nav && navToggle) {
        navToggle.addEventListener('click', () => {
            // Simplemente alternamos una clase en el 'nav'. CSS hará el resto.
            nav.classList.toggle('menu-abierto');
        });
    }
});