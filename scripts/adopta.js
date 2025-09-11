// Filtros
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".bento-card");

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

// Función de adopción
function adoptarMascota(nombre) {
  // Buscar la tarjeta que corresponde al nombre
  const card = Array.from(document.querySelectorAll(".bento-card"))
                    .find(c => c.querySelector("h3").textContent.trim() === nombre);

  // Obtener info de la tarjeta
  const especie = card.dataset.especie || "No definida";
  const edad = card.dataset.edad || "No definida";
  const descripcion = card.querySelector("p") 
                      ? card.querySelector("p").textContent.trim() 
                      : "Sin descripción";

  // Obtener mascotas guardadas
  let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

  // Agregar mascota con la misma estructura que usa adopciones.js
  mascotas.push({
    id: Date.now(),
    nombre,
    especie,
    edad,
    descripcion
  });

  // Guardar en localStorage
  localStorage.setItem("mascotas", JSON.stringify(mascotas));

  alert(`¡Has seleccionado adoptar a ${nombre}!`);
}

// Menu Mobile Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
let mobileMenuOpen = false;

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  if (mobileMenuOpen) {
    mobileMenu.classList.remove("mobile-menu-closed", "max-h-0");
    mobileMenu.classList.add("mobile-menu-open", "max-h-[400px]");
    menuIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
  } else {
    mobileMenu.classList.remove("mobile-menu-open", "max-h-[400px]");
    mobileMenu.classList.add("mobile-menu-closed", "max-h-0");
    menuIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
  }
}

menuToggle.addEventListener("click", toggleMobileMenu);

// Cerrar menú móvil al cambiar a escritorio
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && mobileMenuOpen) {
    toggleMobileMenu();
  }
});

// Inicializar menú cerrado
mobileMenu.classList.add("mobile-menu-closed", "max-h-0");
