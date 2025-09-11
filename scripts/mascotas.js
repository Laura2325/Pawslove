// Selecciones del DOM
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const petModal = document.getElementById('petModal');
const petForm = document.getElementById('petForm');
const petTable = document.getElementById('petTable');
const searchInput = document.getElementById('search');

// Array para guardar las mascotas
let pets = [];
let editIndex = null;

// Cargar mascotas desde localStorage
const storedPets = localStorage.getItem('pets');
if (storedPets) {
  pets = JSON.parse(storedPets);
  renderTable();
}

// Abrir modal
openModalBtn.addEventListener('click', () => {
  petModal.classList.remove('hidden');
});

// Cerrar modal
closeModalBtn.addEventListener('click', () => {
  petModal.classList.add('hidden');
  petForm.reset();
  editIndex = null;
});

// Guardar mascota (crear o editar)
petForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPet = {
    name: document.getElementById('name').value,
    species: document.getElementById('species').value,
    age: document.getElementById('age').value,
    size: document.getElementById('size').value,
    status: document.getElementById('status').value,
    description: document.getElementById('description').value,
    image: document.getElementById('image').files[0] ? URL.createObjectURL(document.getElementById('image').files[0]) : ''
  };

  if (editIndex !== null) {
    pets[editIndex] = newPet;
    editIndex = null;
  } else {
    pets.push(newPet);
  }

  // Guardar en localStorage
  localStorage.setItem('pets', JSON.stringify(pets));

  petForm.reset();
  petModal.classList.add('hidden');
  renderTable();
});

// Renderizar tabla
function renderTable() {
  petTable.innerHTML = '';

  pets.forEach((pet, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="p-4"><img src="${pet.image}" class="w-16 h-16 object-cover rounded-lg" alt="Mascota"></td>
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
      editIndex = index;
    });

    // Eliminar mascota
    tr.querySelector('.deleteBtn').addEventListener('click', () => {
      if (confirm(`¿Eliminar a ${pet.name}?`)) {
        pets.splice(index, 1);
        // Guardar cambios en localStorage
        localStorage.setItem('pets', JSON.stringify(pets));
        renderTable();
      }
    });

    petTable.appendChild(tr);
  });
}

// Buscador
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = pets.filter(pet => pet.name.toLowerCase().includes(term) || pet.species.toLowerCase().includes(term));
  petTable.innerHTML = '';

  filtered.forEach((pet, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-4"><img src="${pet.image}" class="w-16 h-16 object-cover rounded-lg" alt="Mascota"></td>
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

    tr.querySelector('.editBtn').addEventListener('click', () => {
      const realIndex = pets.indexOf(filtered[index]);
      document.getElementById('name').value = pet.name;
      document.getElementById('species').value = pet.species;
      document.getElementById('age').value = pet.age;
      document.getElementById('size').value = pet.size;
      document.getElementById('status').value = pet.status;
      document.getElementById('description').value = pet.description;
      petModal.classList.remove('hidden');
      editIndex = realIndex;
    });

    tr.querySelector('.deleteBtn').addEventListener('click', () => {
      const realIndex = pets.indexOf(filtered[index]);
      if (confirm(`¿Eliminar a ${pet.name}?`)) {
        pets.splice(realIndex, 1);
        // Guardar cambios en localStorage
        localStorage.setItem('pets', JSON.stringify(pets));
        renderTable();
      }
    });

    petTable.appendChild(tr);
  });
});
