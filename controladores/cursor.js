const pawTrail = [];
const MAX_PAWS = 1; // Máximo de 3 huellas en pantalla
const THROTTLE_DELAY_MS = 100; // Crear una nueva huella cada 100ms
const FADE_DURATION_MS = 500; // Duración de la animación de desaparición (debe coincidir con el CSS)
const IDLE_TIMEOUT_MS = 200; // Tiempo de inactividad para limpiar las huellas

let isThrottled = false;
let idleTimeout; // Variable para el temporizador de inactividad

// Función para eliminar una huella con animación
function removePaw(paw) {
    // Le damos estilos para que desaparezca con una animación suave
    paw.style.opacity = '0';
    paw.style.transform = 'translate(-50%, -150%) scale(1.5)';
    
    // La eliminamos del DOM después de que termine la transición
    setTimeout(() => {
        paw.remove();
    }, FADE_DURATION_MS);
}

document.addEventListener('mousemove', e => {
    // Limpiamos el temporizador de inactividad anterior para reiniciarlo
    clearTimeout(idleTimeout);

    // "Throttle": Evita que se ejecute el código en cada micromovimiento del ratón
    if (isThrottled) {
        return;
    }
    isThrottled = true;
    setTimeout(() => {
        isThrottled = false;
    }, THROTTLE_DELAY_MS);

    // 1. Crear el elemento de la huella
    const paw = document.createElement("div");
    paw.className = "humo"; // Reutilizamos la clase para los estilos base
    paw.textContent = "🐶";
    paw.style.left = e.clientX + "px";
    paw.style.top = e.clientY + "px";
    
    // Desactivamos la animación de CSS para controlarla por JS
    paw.style.animation = 'none';

    document.body.appendChild(paw);
    pawTrail.push(paw);

    // 2. Si hay más huellas que el máximo, eliminamos la más antigua
    if (pawTrail.length > MAX_PAWS) {
        const oldestPaw = pawTrail.shift(); // Saca el primer elemento (el más viejo)
        removePaw(oldestPaw);
    }

    // 3. Actualizamos la opacidad de todas las huellas en la estela
    pawTrail.forEach((p, index) => {
        // La opacidad aumenta para las huellas más nuevas
        const lifeRatio = (index + 1) / pawTrail.length;
        p.style.opacity = lifeRatio * 0.8; // Opacidad máxima de 0.8
    });

    // 4. Configuramos un nuevo temporizador de inactividad.
    // Si el mouse no se mueve en IDLE_TIMEOUT_MS, se limpiarán las huellas restantes.
    idleTimeout = setTimeout(() => {
        pawTrail.forEach(removePaw);
        pawTrail.length = 0; // Vacía el array
    }, IDLE_TIMEOUT_MS);
});