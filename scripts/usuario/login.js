import { alertasLogin } from "../sweetalert2.min.js";
import { metodosUsuarios } from "../manejoLocalStorage.js";

document.addEventListener('DOMContentLoaded', () => {
    metodosUsuarios.inicializarAdmin();

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
        const usuarios = metodosUsuarios.obtenerUsuarios();

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

    //! Metodo para acceder desde la API desarrollada
    // async function obtenerDatos() {
    //     try {
    //         const response = await fetch('https://api.example.com/data');
    //         if (!response.ok) {
    //             throw new Error('Error en la solicitud');
    //         }
    //         const data = await response.json();
    //         console.log(data); // Procesar los datos
    //     } catch (error) {
    //         console.error('Hubo un problema con la solicitud:', error);
    //     }
    // }

    // obtenerDatos();

});