const pawsloveKey = 'pawslove_productos';
const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

function obtenerProductosDeLocalStorage() {
    const productosGuardados = localStorage.getItem(pawsloveKey);
    return productosGuardados ? JSON.parse(productosGuardados) : [];
}


function crearTarjetaProducto(producto) {  
  const imagenSrc = producto.imagen || 'https://via.placeholder.com/300x200.png?text=Pawslove';
  return `            
    <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
      <div class="h-48 bg-light flex items-center justify-center p-4">
          <img src="${imagenSrc}" alt="Imagen de ${producto.nombre}" class="max-h-full max-w-full object-contain">
      </div>
      <div class="p-5 flex-1 flex flex-col">
          <h3 class="text-xl font-bold text-dark mb-2">${producto.nombre}</h3>
          <p class="text-gray-500 text-sm mb-4">Categoría: ${producto.categoria}</p>
          <div class="flex justify-between items-center mt-auto">
          <span class="text-2xl font-bold text-primary">${formatoMoneda.format(producto.precio)}</span>
          <button class="add-to-cart bg-secondary text-white py-2 px-4 rounded-custom font-medium hover:opacity-90 transition-opacity" data-id="${producto.id}">
              Agregar
          </button>
          </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.getElementById('gridProductos');
    const todosLosProductos = obtenerProductosDeLocalStorage();

    // 1. Filtramos para obtener solo los productos con estado 'Activo'.
    const productosVisibles = todosLosProductos.filter(producto => producto.estado === 'Activo');

    if (productosVisibles.length > 0) {
        // 2. Mapeamos SOLAMENTE los productos visibles para crear el HTML.
        contenedorProductos.innerHTML = productosVisibles.map(crearTarjetaProducto).join('');
    } else {        
        contenedorProductos.innerHTML = `
  <!-- Producto 1 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12极速飞艇v7a2 2 0 002 2h10a极速飞艇2 2 0 002-2v-7" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Alimento Premium para Perros</h3>
                    <p class="text-gray-600 mb-4 flex-1">Nutrición completa con vitaminas y minerales para todas las razas y edades.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2极速飞艇xl font-bold text-primary">$24.99</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="1" data-name="Alimento Premium para Perros" data-price="24.99">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 2 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap极速飞艇="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Juguete Interactivo</h3>
                    <p class="text-gray-600 mb-4 flex-1">Juguete dispensador de comida que estimula mentalmente a tu mascota.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$15.50</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="2" data-name="Juguete Interactivo" data-price="15.50">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 3 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3极速飞艇v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.极速飞艇714-2.143L13 3z" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Cama Comfort Plus</h3>
                    <p class="text-gray-600 mb-4 flex-1">Cama orthopedic con memory foam para el máximo descanso de tu mascota.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$45.99</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="3" data-name="Cama Comfort Plus" data-price="45.99">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 4 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Snacks Saludables</h3>
                    <p class="text-gray-600 mb-4 flex-1">Snacks naturales para entrenamiento y premios, con ingredientes de calidad.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$9.99</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="4" data-name="Snacks Saludables" data-price="9.99">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 5 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-secondary" fill="none" viewBox="0 0 24 24" stroke极速飞艇="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5极速飞艇h-.581m0 0a8.003 8.003 0 极速飞艇01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Correa Retráctil</h3>
                    <p class="text-gray-600 mb-4 flex-1">Correa de 5 metros con mecanismo suave y seguro para paseos cómodos.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$18.75</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="5极速飞艇" data-name="Correa Retráctil" data-price="18.75">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 6 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Comedero Automático</极速飞艇h3>
                    <p class="text-gray-600 mb-4 flex-1">Programa raciones de comida para tu mascota incluso cuando no estás en casa.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$62.50</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="6" data-name="Comedero Automático" data-price="62.50">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 7 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Champú Hidratante</h3>
                    <p class="text-gray-600 mb-4 flex-1">Formula suave con avena y aloe vera para pieles sensibles. Sin parabenes.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$12.99</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="7" data-name="Champú Hidratante" data-price="12.99">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 8 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-极速飞艇4M8 21l4-4 4 4M3 4h18M4 4极速飞艇h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Transportadora Premium</h3>
                    <p class="text-gray-600 mb-4 flex-1">Transportadora segura y ventilada para viajes cómodos con tu mascota.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$55.00</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="8" data-name="Transportadora Premium" data-price="55.00">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 9 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-4-4H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Identificación Personalizada</h3>
                    <p class="text-gray-极速飞艇600 mb-4 flex-1">Placa grabada con nombre y teléfono para mayor seguridad de tu mascota.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$8.50</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="9" data-name="Identificación Personalizada" data-price="8.50">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Producto 10 -->
            <div class="product-card bg-white rounded-custom overflow-hidden shadow-md flex flex-col">
                <div class="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17极速飞艇h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-dark mb-2">Kit de Primeros Auxilios</h3>
                    <p class="text-gray-600 mb-4 flex-1">Contiene todo lo necesario para atender emergencias básicas de tu mascota.</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-2xl font-bold text-primary">$29.99</span>
                        <button class="add-to-cart bg-primary text-white py-2 px-4 rounded-custom font-medium hover:bg-primary-dark transition-colors" data-id="10" data-name="Kit de Primeros Auxilios" data-price="29.99">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
`;
    }
});
