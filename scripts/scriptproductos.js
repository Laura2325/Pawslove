// 🚀 Modal
const modal = document.getElementById("productModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// 🚀 Lógica de productos
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const searchInput = document.getElementById("search");

// ✅ Cargar productos desde localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts(filter = "") {
  productTable.innerHTML = "";
  products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((product, index) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-primary/10 transition-colors";

      row.innerHTML = `
        <td class="p-4 min-w-[100px]">
          ${product.image ? `<img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-custom">` : `<span class="text-gray-400 italic">Sin imagen</span>`}
        </td>
        <td class="p-4 min-w-[150px]">${product.name}</td>
        <td class="p-4 min-w-[120px]">${product.category}</td>
        <td class="p-4 min-w-[80px]">${product.stock}</td>
        <td class="p-4 min-w-[100px]">$${product.price}</td>
        <td class="p-4 min-w-[100px] ${product.status === "Activo" ? "text-green-600" : "text-red-500"}">${product.status}</td>
        <td class="p-4 min-w-[150px] text-center space-x-2">
          <button onclick="editProductInline(${index})" class="px-3 py-1 bg-secondary text-white rounded-custom hover:bg-secondary/80 transition">Editar</button>
          <button onclick="deleteProduct(${index})" class="px-3 py-1 bg-red-500 text-white rounded-custom hover:bg-red-600 transition">Eliminar</button>
        </td>
      `;
      productTable.appendChild(row);
    });
}

// 🚀 Guardar nuevo producto
productForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;
  const imageFile = document.getElementById("image").files[0];

  if (!name || !price || !stock || !category) return;

  const handleSave = (imageUrl = null) => {
    products.push({ name, price, stock, category, status, image: imageUrl });
    saveToLocalStorage(); // ✅ guardar cambios
    renderProducts();
    productForm.reset();
    modal.classList.add("hidden"); // cerrar modal al guardar
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      handleSave(event.target.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    handleSave();
  }
});

// 🚀 Editar producto inline
function editProductInline(index) {
  const row = productTable.rows[index];
  const product = products[index];

  row.innerHTML = `
    <td class="p-4 min-w-[100px]">
      ${product.image ? `<img src="${product.image}" class="w-16 h-16 object-cover rounded-custom">` : `<span class="text-gray-400 italic">Sin imagen</span>`}
      <input type="file" id="image-${index}" class="mt-1 p-1 border rounded-custom focus:ring-2 focus:ring-primary outline-none w-full">
    </td>
    <td class="p-4"><input type="text" id="name-${index}" value="${product.name}" class="p-2 border rounded-custom w-full"></td>
    <td class="p-4"><input type="text" id="category-${index}" value="${product.category}" class="p-2 border rounded-custom w-full"></td>
    <td class="p-4"><input type="number" id="stock-${index}" value="${product.stock}" class="p-2 border rounded-custom w-full"></td>
    <td class="p-4"><input type="number" id="price-${index}" value="${product.price}" class="p-2 border rounded-custom w-full"></td>
    <td class="p-4">
      <select id="status-${index}" class="p-2 border rounded-custom w-full">
        <option value="Activo" ${product.status==="Activo"?"selected":""}>Activo</option>
        <option value="Inactivo" ${product.status==="Inactivo"?"selected":""}>Inactivo</option>
      </select>
    </td>
    <td class="p-4 text-center space-x-2">
      <button onclick="saveProductInline(${index})" class="px-3 py-1 bg-secondary text-white rounded-custom hover:bg-secondary/80 transition">Guardar</button>
      <button onclick="cancelEditInline()" class="px-3 py-1 bg-gray-400 text-white rounded-custom hover:bg-gray-500 transition">Cancelar</button>
    </td>
  `;
}

function saveProductInline(index) {
  const name = document.getElementById(`name-${index}`).value;
  const price = document.getElementById(`price-${index}`).value;
  const stock = document.getElementById(`stock-${index}`).value;
  const category = document.getElementById(`category-${index}`).value;
  const status = document.getElementById(`status-${index}`).value;
  const imageFile = document.getElementById(`image-${index}`).files[0];

  const handleSave = (imageUrl = null) => {
    products[index] = { 
      name, price, stock, category, status, 
      image: imageUrl || products[index].image 
    };
    saveToLocalStorage(); // ✅ guardar cambios
    renderProducts();
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      handleSave(event.target.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    handleSave();
  }
}

function cancelEditInline() {
  renderProducts();
}

// 🚀 Eliminar producto
function deleteProduct(index) {
  products.splice(index, 1);
  saveToLocalStorage(); // ✅ guardar cambios
  renderProducts();
}

// 🚀 Búsqueda
searchInput.addEventListener("input", e => {
  renderProducts(e.target.value);
});

// 🚀 Render inicial con datos guardados
renderProducts();
