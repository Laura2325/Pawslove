// Obtiene referencias a los elementos del DOM
const contenidoLogin = document.getElementById('contenidoLogin');
const contenidoRegistro = document.getElementById('contenidoRegistro');
const contenidoResetPassword = document.getElementById('contenidoResetPassword');

const linkToRegister = document.getElementById('linkToRegister');
const linkToLogin = document.getElementById('linkToLogin');
const linkToResetPassword = document.getElementById('linkToResetPassword');

const closeRegister = document.getElementById('closeRegister');
const closeResetPassword = document.getElementById('closeResetPassword');

const loginForm = document.getElementById('loginForm');
const registroForm = document.getElementById('registroForm');
const resetForm = document.getElementById('reset-form');

// Función para mostrar una vista y ocultar las demás
function showView(viewToShow) {
    contenidoLogin.classList.add('hidden');
    contenidoRegistro.classList.add('hidden');
    contenidoResetPassword.classList.add('hidden');
    viewToShow.classList.remove('hidden');
}

// Eventos para cambiar de vista
linkToRegister.addEventListener('click', (event) => {
    event.preventDefault();
    showView(contenidoRegistro);
});

linkToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    showView(contenidoLogin);
});

closeRegister.addEventListener('click', (event) => {
    event.preventDefault();
    showView(contenidoLogin);
});

linkToResetPassword.addEventListener('click', (event) => {
    event.preventDefault();
    showView(contenidoResetPassword);
});

closeResetPassword.addEventListener('click', (event) => {
    event.preventDefault();
    showView(contenidoLogin);
});