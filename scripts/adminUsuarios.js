const USERS_STORAGE_KEY = 'pawsloveUsers';
const tabla = document.getElementById("user-table-body");

const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];

if (users.length === 0) {    
    const row = document.createElement("tr");
    row.className = "border-t border-t-[#d1e6d9]";    
    row.innerHTML = `
        <td colspan="4" class="h-[72px] px-4 py-2 text-center text-gray-500">
            No hay usuarios registrados.
        </td>
    `;
    tabla.appendChild(row);
} else {    
    users.forEach(user => {
        const row = document.createElement("tr");
        row.className = "border-t border-t-[#d1e6d9]";
        row.innerHTML = `
            <td class="h-[72px] px-4 py-2 w-[400px] text-[#0e1a13] text-sm font-normal leading-normal">${user.nombre}</td>        
            <td class="h-[72px] px-4 py-2 w-[400px] text-[#51946b] text-sm font-normal leading-normal">${user.correo}</td>
            <td class="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e8f2ec] text-[#0e1a13] text-sm font-medium leading-normal w-full">
                    <span class="truncate">Active</span>
                </button>
            </td>
            <td class="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                <div class="flex items-center gap-2 h-full">
                            <!-- Botón de Editar con SVG -->
                            <button class="flex items-center justify-center h-8 w-8 cursor-pointer rounded-full bg-[#e8f2ec] text-[#0e1a13] transition-colors duration-300 hover:bg-[#17b890] hover:text-white" data-action="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <!-- Botón de Eliminar con SVG -->
                            <button class="flex items-center justify-center h-8 w-8 cursor-pointer rounded-full bg-[#fce8ec] text-[#e31a38] transition-colors duration-300 hover:bg-[#e31a38] hover:text-white" data-action="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6l3 15h12l3-15"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                    <path d="M5 6h14"></path>
                                    <path d="M10 3L14 3"></path>
                                </svg>
                            </button>
                        </div>
            </td>
        `;
        tabla.appendChild(row);
    });
}

// Seccion para acciones
const btnEditar = document.getElementById("btn-editar");
const btnEliminar = document.getElementById("btn-eliminar");
const btnActivar = document.getElementById("btn-activar");

btnEditar.addEventListener("click", () => {
    console.log("Editar");
});

btnEliminar.addEventListener("click", () => {
    console.log("Eliminar");
});

btnActivar.addEventListener("click", () => {
    
});