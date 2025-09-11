document.addEventListener("DOMContentLoaded", () => {
  const petForm = document.getElementById("petForm");
  const petIdField = document.getElementById("petId");
  const nombre = document.getElementById("nombre");
  const especie = document.getElementById("especie");
  const edad = document.getElementById("edad");
  const descripcion = document.getElementById("descripcion");
  const petListAdmin = document.getElementById("petListAdmin");

  const STORAGE_KEY = "mascotas";

  // Obtener mascotas del localStorage
  function obtenerMascotas() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  // Guardar mascotas en localStorage
  function guardarMascotas(mascotas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mascotas));
  }

  // Renderizar la lista de mascotas en admin
  function renderMascotas() {
    const mascotas = obtenerMascotas();
    petListAdmin.innerHTML = "";

    if (mascotas.length === 0) {
      petListAdmin.innerHTML = "<p>No hay mascotas registradas.</p>";
      return;
    }

    mascotas.forEach((pet) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${pet.nombre}</h3>
        <p><b>Especie:</b> ${pet.especie}</p>
        <p><b>Edad:</b> ${pet.edad}</p>
        <p><b>Descripción:</b> ${pet.descripcion}</p>
        <button onclick="editarMascota(${pet.id})">Editar</button>
        <button onclick="eliminarMascota(${pet.id})">Eliminar</button>
        <hr>
      `;
      petListAdmin.appendChild(div);
    });
  }

  // Evento guardar mascota (crear o editar)
  petForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mascotas = obtenerMascotas();

    if (petIdField.value) {
      // Editar
      const petId = parseInt(petIdField.value);
      const index = mascotas.findIndex((p) => p.id === petId);
      mascotas[index] = {
        id: petId,
        nombre: nombre.value,
        especie: especie.value,
        edad: edad.value,
        descripcion: descripcion.value,
      };
    } else {
      // Crear nueva
      const nuevaMascota = {
        id: Date.now(),
        nombre: nombre.value,
        especie: especie.value,
        edad: edad.value,
        descripcion: descripcion.value,
      };
      mascotas.push(nuevaMascota);
    }

    guardarMascotas(mascotas);
    petForm.reset();
    petIdField.value = "";
    renderMascotas();
  });

  // Hacer accesibles las funciones desde el HTML
  window.editarMascota = (id) => {
    const mascotas = obtenerMascotas();
    const pet = mascotas.find((p) => p.id === id);
    if (!pet) return;

    petIdField.value = pet.id;
    nombre.value = pet.nombre;
    especie.value = pet.especie;
    edad.value = pet.edad;
    descripcion.value = pet.descripcion;
  };

  window.eliminarMascota = (id) => {
    let mascotas = obtenerMascotas();
    mascotas = mascotas.filter((p) => p.id !== id);
    guardarMascotas(mascotas);
    renderMascotas();
  };

  // Render inicial
  renderMascotas();
});
