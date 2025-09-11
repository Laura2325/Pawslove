// Funciones de utilidad

//Metodos de fecha y hora segun formato
function obtenerFechaActual() {
    return new Date().toISOString().split('T')[0];
}

function obtenerHoraMinutoActual() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function obtenerHoraActual12Horas() {
    const now = new Date();
    let horas = now.getHours();
    const minutos = now.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';

    horas = horas % 12 || 12; // Convierte 0 a 12 para el formato de 12 horas
    const formattedTime = `${horas}:${minutos.toString().padStart(2, '0')} ${ampm}`;
    
    return formattedTime;
}

export const metodosFechaHora = {
    obtenerFechaActual,
    obtenerHoraMinutoActual,
    obtenerHoraActual12Horas
}

//* Formatos de datos
function formatoPrecio(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

export const formatoPrecios = {
    formatoPrecio
};

//* Formatos de fechas
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

//* Obtener iniciales de un nombre
function getInitials(name) {
    if (!name) return 'NN';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
}

//* Metodos para obtener formato de los formularios
//!Formulario de adopcion
function getDocumentType(type) {
    const types = {
        'cc': 'C.C.',
        'ce': 'C.E.',
        'ti': 'T.I.',
        'pp': 'Pasaporte'
    };
    return types[type] || '';
}

function getIncomeRange(income) {
    const ranges = {
        'menos-1-smmlv': 'Menos de 1 SMMLV',
        '1-3-smmlv': '1 a 3 SMMLV',
        '3-5-smmlv': '3 a 5 SMMLV',
        'mas-5-smmlv': 'Más de 5 SMMLV'
    };
    return ranges[income] || '';
}

function getHousingType(type) {
    const types = {
        'casa': 'Casa Propia',
        'casa-alquilada': 'Casa Alquilada',
        'apartamento': 'Apartamento Propio',
        'apartamento-alquilado': 'Apartamento Alquilado'
    };
    return types[type] || '';
}

function getWorkModality(modality) {
    const modalities = {
        'presencial': 'Presencial',
        'remoto': 'Remoto',
        'mixto': 'Mixto'
    };
    return modalities[modality] || '';
}

function getPetSpace(space) {
    const spaces = {
        'interior': 'Interior de la casa',
        'exterior': 'Exterior de la casa',
        'acceso-libre': 'Acceso Libre',
        'zona': 'En una zona específica de la Casa'
    };
    return spaces[space] || '';
}

function getTimeDedication(time) {
    const times = {
        'menos-2-horas': 'Menos de 2 horas',
        '2-4-horas': '2 a 4 horas',
        '4-6-horas': '4 a 6 horas',
        'mas-6-horas': 'Más de 6 horas'
    };
    return times[time] || '';
}

export const usuariosAdmin = {
    formatDate,
    getInitials,
    getDocumentType,
    getIncomeRange,
    getHousingType,
    getWorkModality,
    getPetSpace,
    getTimeDedication
};