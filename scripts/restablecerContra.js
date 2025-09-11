import { alertRestablecerContrasena } from "./sweetalert2.min.js";
import { alertasRegistro } from "./sweetalert2.min.js";
import { metodosUsuarios } from "./manejoLocalStorage.js";
// Obtiene referencias a los elementos del DOM
const resetForm = document.getElementById('reset-form');

// Escucha el evento de envío del formulario
resetForm.addEventListener('submit', (event) => {
    // Evita que el formulario se envíe de forma predeterminada
    event.preventDefault();

    const emailInput = document.getElementById('emailReset');
    const email = emailInput.value.trim();

    // Validación para asegurar que el campo no esté vacío
    if (!email) {
        alertasRegistro.camposIncompletos();
        return;
    }

    // Verificamos si el usuario existe antes de simular el envío.
    const usuarios = metodosUsuarios.obtenerUsuarios();
    const usuarioExiste = usuarios.some(user => user.correo === email);

    // Por seguridad, siempre mostramos el mismo mensaje, pero internamente
    // podríamos condicionar el envío de un correo real a si 'usuarioExiste' es true.
    console.log(`Solicitud de restablecimiento para: ${email}. ¿Usuario existe? ${usuarioExiste}`);

    // Muestra un mensaje de éxito con SweetAlert2
    alertRestablecerContrasena.alertRestablecerContra();

    // Limpia el campo de correo electrónico
    emailInput.value = '';
});