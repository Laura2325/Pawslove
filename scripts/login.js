document.addEventListener('DOMContentLoaded', () => {
    const USERS_STORAGE_KEY = 'pawsloveUsers'; // Debe ser la misma clave que usaste en registro.js

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return; // Salir si el formulario no existe en la página

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('emailLogin');
        const passwordInput = document.getElementById('passwordLogin');

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // 1. Validación de campos vacíos
        if (!email || !password) {
            alert('Por favor, ingresa tu correo y contraseña.');
            return;
        }

        // 2. Obtener la lista de usuarios de localStorage
        const usuariosJSON = localStorage.getItem(USERS_STORAGE_KEY);
        const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

        // 3. Buscar si el usuario existe y la contraseña coincide
        const usuarioEncontrado = usuarios.find(user => user.correo === email && user.contraseña === password);

        // 4. Validar el resultado del inicio de sesión
        if (usuarioEncontrado) {
            // ¡Inicio de sesión exitoso!
            alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`);
            
            // Opcional: Guardar información del usuario logueado en sessionStorage
            // sessionStorage es como localStorage, pero se borra al cerrar la pestaña.
            sessionStorage.setItem('loggedInUser', JSON.stringify(usuarioEncontrado));

            // Opcional: Redirigir al usuario a una página principal o dashboard
            // window.location.href = 'index.html'; 
        } else {
            // Error en el inicio de sesión
            alert('Correo o contraseña incorrectos. Por favor, verifica tus datos.');
            // Opcional: Limpiar el campo de contraseña para que el usuario reintente
            passwordInput.value = '';
        }
    });
});