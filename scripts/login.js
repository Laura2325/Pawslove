import {alertasLogin} from "./sweetalert2.min.js";

document.addEventListener('DOMContentLoaded', () => {
    const USERS_STORAGE_KEY = 'pawsloveUsers';
    function inicializarAdmin() {
        const usuariosJSON = localStorage.getItem(USERS_STORAGE_KEY);
        let usuarios = [];
        if (usuariosJSON) {
            try {
                usuarios = JSON.parse(usuariosJSON);
            } catch (e) {
                console.error("Error al parsear usuarios desde localStorage", e);
                usuarios = [];
            }
        }

        const adminExists = usuarios.some(user => user.correo === 'admin_pawslove@gmail.com');

        if (!adminExists) {
            const adminUser = {
                nombre: 'admin_pawslove',
                correo: 'admin_pawslove@gmail.com',
                contraseña: 'admin_pawslove',
                tipo: 'Administrador Principal'
            };
            usuarios.unshift(adminUser);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));
        }
    }

    inicializarAdmin();

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
            alertasLogin.loginVacio();
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
            alertasLogin.loginCorrecto(usuarioEncontrado);
            
        } else {
            // Error en el inicio de sesión
            alertasLogin.loginError();
            emailInput.value = '';
            passwordInput.value = '';
        }
    });
});