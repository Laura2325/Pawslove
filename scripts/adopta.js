import { metodosMascotas } from "./manejoLocalStorage.js";
import { alertasAdopcion } from "./sweetalert2.min.js";

function renderPetCards() {
  const container = document.getElementById('petsList');
  if (!container) {
    console.error('El contenedor de tarjetas "petsList" no fue encontrado.');
    return;
  }

  const mascotas = metodosMascotas.obtenerMascotas();
  const mascotasDisponibles = mascotas.filter(pet => pet.status === 'Disponible');

  container.innerHTML = ''; // Limpiar contenido estático

  if (mascotasDisponibles.length === 0) {
    container.innerHTML = `
    <div class="col-span-full text-center bg-white rounded-custom shadow-lg p-8 md:p-12">
        <img src="../assets/img/marca/Isotipo_2.svg" alt="Pawslove" class="mx-auto h-20 w-20 opacity-40 mb-6">
        <h3 class="text-2xl font-bold font-fredoka text-primary mb-3">¡Vuelve pronto!</h3>
        <p class="text-gray-600 max-w-lg mx-auto">Actualmente no tenemos mascotas disponibles para adopción, pero nuestro equipo trabaja sin descanso para rescatar a más amigos peludos.</p>
        <p class="text-gray-500 mt-4">¡Gracias por considerar la adopción!</p>
    </div>`;
    return;
  }

  container.innerHTML = mascotasDisponibles.map(pet => `
    <div class="bento-card bg-white rounded-custom shadow-lg overflow-hidden animate-fadeInUp"
         data-especie="${(pet.species || '').toLowerCase()}" data-edad="${(pet.age || '').toLowerCase()}" data-tamano="${(pet.size || '').toLowerCase()}" data-estado="${(pet.status || '').toLowerCase()}">
      <img src="${pet.image || 'https://via.placeholder.com/600x450.png?text=Sin+Foto'}" alt="${pet.name}" class="w-full h-64 sm:h-72 md:h-80 lg:h-80 object-cover rounded-t-custom">
      <div class="p-6">
        <h3 class="text-2xl font-bold text-dark mb-3">${pet.name}</h3>
        <p class="text-lg text-gray-600"><strong>Edad:</strong> ${pet.age}</p>
        <p class="text-lg text-gray-600"><strong>Tamaño:</strong> ${pet.size}</p>
        <span class="inline-block mb-4 px-5 py-1.5 text-base rounded-full bg-gradient-to-r from-accent to-secondary text-white w-fit shadow-md">${pet.status}</span>
      </div>
      <div class="overlay">
        <h3 class="text-xl font-bold mb-2 text-white">${pet.name} 🐾</h3>
        <p class="text-sm mb-3 text-white">${pet.description || 'Una mascota adorable esperando un hogar.'}</p>
        <button data-pet-name="${pet.name}" class="adopt-button px-4 py-2 rounded-full bg-primary hover:bg-secondary text-white">Adoptar 💜</button>
      </div>
    </div>
  `).join('');

  // Actualizar la lista de tarjetas para que los filtros funcionen
  cards = document.querySelectorAll(".bento-card");
}

// --- Lógica de Filtros ---
const chips = document.querySelectorAll(".chip");
let cards = []; // Se inicializa vacío y se llena después de renderizar

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");
    filterCards();
  });
});

function filterCards() {
  cards.forEach((card) => {
    let mostrar = true;
    ["especie", "edad", "tamano", "estado"].forEach((cat) => {
      const activos = Array.from(
        document.querySelectorAll(`.chip.active[data-category="${cat}"]`)
      ).map((c) => c.dataset.value.toLowerCase());
      if (
        activos.length > 0 &&
        !activos.includes(card.dataset[cat].toLowerCase())
      ) {
        mostrar = false;
      }
    });
    card.style.display = mostrar ? "block" : "none";
  });
}

// --- Inicialización y Eventos ---
document.addEventListener('DOMContentLoaded', () => {
  renderPetCards();
  
  // Delegación de eventos para los botones de adoptar
  const container = document.getElementById('petsList');
  if (container) {
    container.addEventListener('click', (e) => {
      const adoptButton = e.target.closest('.adopt-button');
      if (adoptButton) {
        const petName = adoptButton.dataset.petName;
        alertasAdopcion.seleccionAdopcion(petName);
      }
    });
  }
  
  // Toggle menú móvil
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('max-h-0');
      mobileMenu.classList.toggle('max-h-96');
    });
  }
});
