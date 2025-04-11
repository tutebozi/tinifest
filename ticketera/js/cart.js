// Función para actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalItems = 0;
    
    carrito.forEach(item => {
        item.entradas.forEach(entrada => {
            totalItems += entrada.cantidad;
        });
    });
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Función para cargar el carrito de compras
function cargarCarrito() {
    const carritoContainer = document.querySelector('.carrito-container');
    if (!carritoContainer) return;
    
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>Tu carrito está vacío. <a href="index.html">Explora nuestros eventos</a></p>';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrito.forEach(item => {
        let subtotal = 0;
        
        const entradasHtml = item.entradas.map(entrada => {
            const precioEntrada = entrada.precio * entrada.cantidad;
            subtotal += precioEntrada;
            
            return `
                <div class="carrito-entrada-item">
                    <p>${entrada.cantidad} x ${entrada.tipo}</p>
                    <p class="carrito-item-precio">$${precioEntrada.toFixed(2)}</p>
                </div>
            `;
        }).join('');
        
        total += subtotal;
        
        html += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.titulo}" class="carrito-item-img">
                <div class="carrito-item-info">
                    <h3>${item.titulo}</h3>
                    <p><i class="far fa-calendar-alt"></i> ${formatearFecha(item.fecha)} - ${item.hora}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${item.lugar}</p>
                    ${entradasHtml}
                </div>
                <button class="btn btn-accent" onclick="eliminarDelCarrito('${item.eventoId}')">Eliminar</button>
            </div>
        `;
    });
    
    html += `
        <div class="carrito-total">
            <p>Total: $${total.toFixed(2)}</p>
        </div>
        <div class="carrito-acciones">
            <button class="btn" onclick="vaciarCarrito()">Vaciar carrito</button>
            <button class="btn btn-accent" onclick="procederAlPago()">Proceder al pago</button>
        </div>
    `;
    
    carritoContainer.innerHTML = html;
}

// Función para eliminar un item del carrito
function eliminarDelCarrito(eventoId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.eventoId !== eventoId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
        localStorage.removeItem('carrito');
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

// Función para proceder al pago (simulada)
function procederAlPago() {
    alert('Redirigiendo al proceso de pago... (esto es una simulación)');
    // En una aplicación real, aquí redirigirías a la pasarela de pago
}

// Inicializar el contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito); 