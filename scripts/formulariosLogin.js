document.addEventListener('DOMContentLoaded', () => {
    const contenidoLogin = document.getElementById('contenidoLogin');
    const contenidoRegistro = document.getElementById('contenidoRegistro');
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToLogin = document.getElementById('linkToLogin');
    const closeRegister = document.getElementById('closeRegister');

    // Función para mostrar el formulario de registro
    const mostrarRegistro = (e) => {
        e.preventDefault();
        contenidoLogin.classList.add('hidden');
        contenidoRegistro.classList.remove('hidden');
    };

    // Función para mostrar el formulario de login
    const mostrarLogin = (e) => {
        e.preventDefault();
        contenidoRegistro.classList.add('hidden');
        contenidoLogin.classList.remove('hidden');
    };

    // Asignar eventos a los enlaces y botones
    if (linkToRegister) {
        linkToRegister.addEventListener('click', mostrarRegistro);
    }
    if (linkToLogin) {
        linkToLogin.addEventListener('click', mostrarLogin);
    }
    if (closeRegister) {
        closeRegister.addEventListener('click', mostrarLogin);
    }
});    