import { metodosMascotas } from "../manejoLocalStorage.js";
// Selecciones del DOM
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const petModal = document.getElementById('petModal');
const petForm = document.getElementById('petForm');
const petTable = document.getElementById('petTable');
const searchInput = document.getElementById('search');

// Array para guardar las mascotas
let pets = [];
let editPetId = null;

// Cargar y renderizar mascotas
function loadAndRenderPets() {
  pets = metodosMascotas.obtenerMascotas();
  renderTable(pets);
}

// Carga inicial
loadAndRenderPets();

// Abrir modal
openModalBtn.addEventListener('click', () => {
  petForm.reset(); // Limpiar el formulario para asegurar un estado limpio.
  editPetId = null; // Salir del modo de edición.
  petModal.classList.remove('hidden');
});

// Cerrar modal
closeModalBtn.addEventListener('click', () => {
  petModal.classList.add('hidden');
  petForm.reset();
  editPetId = null;
});

// Guardar mascota (crear o editar)
petForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const petData = {
    name: document.getElementById('name').value,
    species: document.getElementById('species').value,
    age: document.getElementById('age').value,
    size: document.getElementById('size').value,
    status: document.getElementById('status').value,
    description: document.getElementById('description').value,
    // La imagen se manejará de forma asíncrona
  };

  const imageFile = document.getElementById('image').files[0];

  const onSave = (imageDataUrl) => {
    // Solo agregamos la imagen a los datos si se seleccionó una nueva.
    if (imageDataUrl !== undefined) {
      petData.image = imageDataUrl;
    }

    if (editPetId !== null) {
      // Editando: si no se selecciona una nueva imagen, la existente se conservará.
      metodosMascotas.actualizarMascota(editPetId, petData);
      editPetId = null;
    } else {
      // Creando: si no hay imagen, se guarda un string vacío.
      if (!petData.image) {
        petData.image = '';
      }
      metodosMascotas.agregarMascota(petData);
    }

    petForm.reset();
    petModal.classList.add('hidden');
    loadAndRenderPets();
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      onSave(event.target.result); // Pasamos la imagen como Data URL (Base64)
    };
    reader.readAsDataURL(imageFile);
  } else {
    onSave(undefined); // No se seleccionó un archivo nuevo
  }
});

// Renderizar tabla
function renderTable(petsToRender) {
  petTable.innerHTML = '';
  petsToRender.forEach(pet => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="p-4"><img src="${pet.image || 'https://via.placeholder.com/150/ECF0F1/34252F?text=Sin+Foto'}" class="w-16 h-16 object-cover rounded-lg" alt="Foto de ${pet.name}"></td>
      <td class="p-4">${pet.name}</td>
      <td class="p-4">${pet.species}</td>
      <td class="p-4">${pet.age}</td>
      <td class="p-4">${pet.size}</td>
      <td class="p-4">${pet.status}</td>
      <td class="p-4 flex justify-center gap-2">
        <button class="editBtn bg-primary text-white px-3 py-1 rounded hover:opacity-90">Editar</button>
        <button class="deleteBtn bg-red-500 text-white px-3 py-1 rounded hover:opacity-90">Eliminar</button>
      </td>
    `;

    // Editar mascota
    tr.querySelector('.editBtn').addEventListener('click', () => {
      document.getElementById('name').value = pet.name;
      document.getElementById('species').value = pet.species;
      document.getElementById('age').value = pet.age;
      document.getElementById('size').value = pet.size;
      document.getElementById('status').value = pet.status;
      document.getElementById('description').value = pet.description;
      petModal.classList.remove('hidden');
      editPetId = pet.id;
    });

    // Eliminar mascota
    tr.querySelector('.deleteBtn').addEventListener('click', () => {
      Swal.fire({
        title: `¿Estás seguro de eliminar a ${pet.name}?`,
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6c40d1', // Color primario de tu tema
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          metodosMascotas.eliminarMascota(pet.id);
          loadAndRenderPets(); // Recargar y renderizar
          Swal.fire(
            '¡Eliminado!',
            `${pet.name} ha sido eliminado correctamente.`,
            'success'
          );
        }
      });
    });

    petTable.appendChild(tr);
  });
}

// Buscador
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = pets.filter(pet => pet.name.toLowerCase().includes(term) || pet.species.toLowerCase().includes(term));
  renderTable(filtered);
});
