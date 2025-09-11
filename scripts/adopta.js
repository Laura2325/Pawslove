// Filtros
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".bento-card");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");
    filterCards();
  });
});

function filterCards() {
  cards.forEach(card => {
    let mostrar = true;
    ["especie", "edad", "tamano", "estado"].forEach(cat => {
      const activos = Array.from(document.querySelectorAll(`.chip.active[data-category="${cat}"]`))
                           .map(c => c.dataset.value.toLowerCase());
      if (activos.length > 0 && !activos.includes(card.dataset[cat].toLowerCase())) {
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


// Toggle menú móvil
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('max-h-0');
  mobileMenu.classList.toggle('max-h-96');
});
