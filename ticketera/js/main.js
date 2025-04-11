// Función para cargar eventos desde el localStorage
function cargarEventos() {
    const eventosContainer = document.getElementById('eventos-container');
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    
    if (eventos.length === 0) {
        eventosContainer.innerHTML = '<p>No hay eventos disponibles en este momento.</p>';
        return;
    }
    
    eventosContainer.innerHTML = eventos.map(evento => `
        <div class="evento-card">
            <img src="${evento.imagen}" alt="${evento.titulo}" class="evento-img">
            <div class="evento-info">
                <h3>${evento.titulo}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${evento.lugar}</p>
                <p class="fecha"><i class="far fa-calendar-alt"></i> ${formatearFecha(evento.fecha)} - ${evento.hora}</p>
                <a href="evento-detalle.html?id=${evento.id}" class="btn">Ver detalles</a>
            </div>
        </div>
    `).join('');
}

// Función para formatear la fecha
function formatearFecha(fechaStr) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', opciones);
}

// Función para cargar detalles de un evento específico
function cargarDetalleEvento() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('id');
    
    if (!eventoId) {
        window.location.href = 'index.html';
        return;
    }
    
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const evento = eventos.find(e => e.id === eventoId);
    
    if (!evento) {
        window.location.href = 'index.html';
        return;
    }
    
    document.title = `${evento.titulo} | Ticketera`;
    
    const detalleContainer = document.querySelector('.evento-detalle');
    if (detalleContainer) {
        detalleContainer.innerHTML = `
            <img src="${evento.imagen}" alt="${evento.titulo}" class="evento-detalle-img">
            <div class="evento-detalle-info">
                <h2>${evento.titulo}</h2>
                <div class="evento-detalle-meta">
                    <div><i class="fas fa-map-marker-alt"></i> ${evento.lugar}</div>
                    <div><i class="far fa-calendar-alt"></i> ${formatearFecha(evento.fecha)}</div>
                    <div><i class="far fa-clock"></i> ${evento.hora}</div>
                </div>
                <div class="evento-detalle-descripcion">
                    <p>${evento.descripcion || 'Descripción no disponible.'}</p>
                </div>
                <div class="selector-entradas">
                    <h3>Selecciona tus entradas</h3>
                    ${evento.entradas.map(entrada => `
                        <div class="entrada-item">
                            <div>
                                <h4>${entrada.tipo}</h4>
                                <p>${entrada.descripcion || ''}</p>
                            </div>
                            <div>
                                <span class="entrada-item-precio">$${entrada.precio.toFixed(2)}</span>
                                <div class="cantidad-control">
                                    <button onclick="modificarCantidad('${evento.id}', '${entrada.tipo}', -1)">-</button>
                                    <span id="cantidad-${evento.id}-${entrada.tipo}">0</span>
                                    <button onclick="modificarCantidad('${evento.id}', '${entrada.tipo}', 1)">+</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    <button class="btn btn-accent" onclick="agregarAlCarrito('${evento.id}')">Añadir al carrito</button>
                </div>
            </div>
        `;
    }
}

// Función para modificar la cantidad de entradas
function modificarCantidad(eventoId, tipoEntrada, cambio) {
    const cantidadElement = document.getElementById(`cantidad-${eventoId}-${tipoEntrada}`);
    let cantidad = parseInt(cantidadElement.textContent) || 0;
    cantidad += cambio;
    
    if (cantidad < 0) cantidad = 0;
    
    cantidadElement.textContent = cantidad;
}

// Función para agregar entradas al carrito
function agregarAlCarrito(eventoId) {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const evento = eventos.find(e => e.id === eventoId);
    
    if (!evento) return;
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Buscar si ya existe el evento en el carrito
    let itemCarrito = carrito.find(item => item.eventoId === eventoId);
    
    if (!itemCarrito) {
        itemCarrito = {
            eventoId: eventoId,
            titulo: evento.titulo,
            imagen: evento.imagen,
            fecha: evento.fecha,
            hora: evento.hora,
            lugar: evento.lugar,
            entradas: []
        };
    }
    
    // Procesar cada tipo de entrada
    evento.entradas.forEach(entrada => {
        const cantidadElement = document.getElementById(`cantidad-${eventoId}-${entrada.tipo}`);
        const cantidad = parseInt(cantidadElement.textContent) || 0;
        
        if (cantidad > 0) {
            // Buscar si ya existe este tipo de entrada en el carrito
            const entradaExistente = itemCarrito.entradas.find(e => e.tipo === entrada.tipo);
            
            if (entradaExistente) {
                entradaExistente.cantidad += cantidad;
            } else {
                itemCarrito.entradas.push({
                    tipo: entrada.tipo,
                    precio: entrada.precio,
                    cantidad: cantidad
                });
            }
        }
    });
    
    // Si no hay entradas seleccionadas, no hacer nada
    if (itemCarrito.entradas.length === 0) {
        alert('Por favor, selecciona al menos una entrada.');
        return;
    }
    
    // Eliminar el evento del carrito si ya existía
    carrito = carrito.filter(item => item.eventoId !== eventoId);
    
    // Agregar el nuevo item al carrito
    carrito.push(itemCarrito);
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Mostrar mensaje de éxito
    alert('Entradas añadidas al carrito correctamente.');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Determinar qué página estamos viendo
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        cargarEventos();
    } else if (path === 'evento-detalle.html') {
        cargarDetalleEvento();
    } else if (path === 'carrito.html') {
        cargarCarrito();
    }
    
    // Actualizar contador del carrito en todas las páginas
    actualizarContadorCarrito();
    
    // Datos de ejemplo (solo si no hay eventos)
    if (!localStorage.getItem('eventos') || JSON.parse(localStorage.getItem('eventos')).length === 0) {
        const eventosEjemplo = [
            {
                id: '1',
                titulo: 'Concierto de Rock',
                imagen: 'https://via.placeholder.com/800x500?text=Concierto+de+Rock',
                lugar: 'Estadio Nacional',
                fecha: '2023-12-15',
                hora: '20:00',
                descripcion: 'El mejor concierto de rock del año con las bandas más famosas del momento.',
                entradas: [
                    { tipo: 'General', precio: 50, descripcion: 'Acceso general al evento' },
                    { tipo: 'VIP', precio: 120, descripcion: 'Acceso VIP con beneficios exclusivos' }
                ]
            },
            {
                id: '2',
                titulo: 'Festival de Cine',
                imagen: 'https://via.placeholder.com/800x500?text=Festival+de+Cine',
                lugar: 'Teatro Municipal',
                fecha: '2023-11-20',
                hora: '18:30',
                descripcion: 'Proyección de las mejores películas del año con invitados especiales.',
                entradas: [
                    { tipo: 'Día único', precio: 25, descripcion: 'Acceso para un día del festival' },
                    { tipo: 'Pase completo', precio: 80, descripcion: 'Acceso a todas las proyecciones' }
                ]
            }
        ];
        
        localStorage.setItem('eventos', JSON.stringify(eventosEjemplo));
        
        // Recargar eventos si estamos en la página principal
        if (path === 'index.html' || path === '') {
            cargarEventos();
        }
    }
}); 