import { alertasRegistro } from "./sweetalert2.min.js";

document.addEventListener('DOMContentLoaded', () => {

    const USERS_STORAGE_KEY = 'pawsloveUsers';
    const nombreUsuario = document.getElementById('nombreRegistro');
    const correo = document.getElementById('emailRegistro');
    const contraseña = document.getElementById('passwordRegistro');
    const confirmarContraseña = document.getElementById('confirmarPassword');
    const btnRegistrarse = document.getElementById('btnRegistrarse');
    const passwordLengthError = document.getElementById('passwordLengthError');
    const passwordMatchError = document.getElementById('passwordMatchError');

    // Función para obtener los usuarios existentes del localStorage
    function obtenerUsuarios() {
        const usuariosJSON = localStorage.getItem(USERS_STORAGE_KEY);
        try {
            return usuariosJSON ? JSON.parse(usuariosJSON) : [];
        } catch (e) {
            console.error("Error al parsear usuarios de localStorage", e);
            return [];
        }
    }

    function guardarUsuarios(usuarios) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));
    }   

    btnRegistrarse.addEventListener('click', (e) => {
        e.preventDefault();

        if (!nombreUsuario.value.trim() || !correo.value.trim() || !contraseña.value.trim()) {
            alertasRegistro.camposIncompletos();
            return;
        }

        if (contraseña.value.length < 8) {
            alertasRegistro.contrasenaCorta();
            return;
        }

        // Validación de la política de contraseñas usando expresiones regulares
        const tieneMayuscula = /[A-Z]/.test(contraseña.value);
        const tieneMinuscula = /[a-z]/.test(contraseña.value);
        const tieneNumero = /[0-9]/.test(contraseña.value);
        const tieneSimbolo = /[^A-Za-z0-9]/.test(contraseña.value);

        if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneSimbolo) {
            alertasRegistro.contrasenaInvalida();
            return;
        }

        // Nueva validación para excluir símbolos que podrían ser problemáticos.
        const tieneSimbolosProhibidos = /[<>"'&]/.test(contraseña.value);
        if (tieneSimbolosProhibidos) {
            alertasRegistro.simbolosNoPermitidos();
            return;
        }

        if (contraseña.value !== confirmarContraseña.value) {
            alertasRegistro.contrasenasNoCoinciden();
            return;
        }

        const usuarios = obtenerUsuarios();
        if (usuarios.some(user => user.correo === correo.value)) {
            alertasRegistro.usuarioExistente();
            return;
        }
        const usuario = {
            nombre: nombreUsuario.value.trim(),
            correo: correo.value.trim(),
            contraseña: contraseña.value,
            tipo: 'Cliente'
        };

        usuarios.push(usuario);
        guardarUsuarios(usuarios);

        alertasRegistro.usuarioRegistrado();
        const btnClose = document.getElementById('closeRegister');
        btnClose.click();
    });

});