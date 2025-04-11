// Verificar autenticación
function verificarAutenticacion() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'index.html';
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

// Mostrar formulario de evento
function mostrarFormularioEvento(evento = null) {
    const formulario = document.getElementById('formulario-evento');
    const formTitulo = document.getElementById('form-titulo');
    
    formulario.style.display = 'block';
    formTitulo.textContent = evento ? 'Editar Evento' : 'Nuevo Evento';
    
    if (evento) {
        document.getElementById('evento-id').value = evento.id;
        document.getElementById('evento-titulo').value = evento.titulo;
        document.getElementById('evento-imagen').value = evento.imagen;
        document.getElementById('evento-lugar').value = evento.lugar;
        document.getElementById('evento-fecha').value = evento.fecha;
        document.getElementById('evento-hora').value = evento.hora;
        document.getElementById('evento-descripcion').value = evento.descripcion;
        
        // Cargar entradas existentes
        const entradasContainer = document.getElementById('entradas-container');
        entradasContainer.innerHTML = '';
        evento.entradas.forEach(entrada => agregarEntrada(entrada));
    } else {
        document.getElementById('evento-form').reset();
        document.getElementById('evento-id').value = '';
        document.getElementById('entradas-container').innerHTML = '';
    }
}

// Ocultar formulario de evento
function ocultarFormularioEvento() {
    document.getElementById('formulario-evento').style.display = 'none';
}

// Agregar entrada al formulario
function agregarEntrada(entrada = null) {
    const container = document.getElementById('entradas-container');
    const entradaDiv = document.createElement('div');
    entradaDiv.className = 'entrada-item';
    
    entradaDiv.innerHTML = `
        <div class="form-group">
            <label>Tipo:</label>
            <input type="text" class="entrada-tipo" value="${entrada ? entrada.tipo : ''}" required>
        </div>
        <div class="form-group">
            <label>Precio:</label>
            <input type="number" class="entrada-precio" value="${entrada ? entrada.precio : ''}" min="0" step="0.01" required>
        </div>
        <div class="form-group">
            <label>Descripción:</label>
            <input type="text" class="entrada-descripcion" value="${entrada ? entrada.descripcion : ''}">
        </div>
        <button type="button" onclick="this.parentElement.remove()">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(entradaDiv);
}

// Guardar evento
function guardarEvento(e) {
    e.preventDefault();
    
    const eventoId = document.getElementById('evento-id').value;
    const esNuevo = !eventoId;
    
    // Recopilar datos del formulario
    const evento = {
        id: esNuevo ? Date.now().toString() : eventoId,
        titulo: document.getElementById('evento-titulo').value,
        imagen: document.getElementById('evento-imagen').value,
        lugar: document.getElementById('evento-lugar').value,
        fecha: document.getElementById('evento-fecha').value,
        hora: document.getElementById('evento-hora').value,
        descripcion: document.getElementById('evento-descripcion').value,
        entradas: []
    };
    
    // Recopilar datos de las entradas
    document.querySelectorAll('.entrada-item').forEach(item => {
        evento.entradas.push({
            tipo: item.querySelector('.entrada-tipo').value,
            precio: parseFloat(item.querySelector('.entrada-precio').value),
            descripcion: item.querySelector('.entrada-descripcion').value
        });
    });
    
    // Guardar en localStorage
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    
    if (esNuevo) {
        eventos.push(evento);
    } else {
        eventos = eventos.map(e => e.id === evento.id ? evento : e);
    }
    
    localStorage.setItem('eventos', JSON.stringify(eventos));
    
    // Actualizar lista y ocultar formulario
    cargarEventos();
    ocultarFormularioEvento();
}

// Eliminar evento
function eliminarEvento(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
        let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos = eventos.filter(e => e.id !== id);
        localStorage.setItem('eventos', JSON.stringify(eventos));
        cargarEventos();
    }
}

// Cargar eventos en la lista
function cargarEventos() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const container = document.getElementById('eventos-container');
    
    if (eventos.length === 0) {
        container.innerHTML = '<p>No hay eventos programados.</p>';
        return;
    }
    
    container.innerHTML = eventos.map(evento => `
        <div class="evento-admin-card">
            <img src="${evento.imagen}" alt="${evento.titulo}" class="evento-admin-img">
            <div class="evento-admin-info">
                <h3>${evento.titulo}</h3>
                <div class="evento-admin-meta">
                    <div><i class="fas fa-map-marker-alt"></i> ${evento.lugar}</div>
                    <div><i class="far fa-calendar-alt"></i> ${evento.fecha}</div>
                    <div><i class="far fa-clock"></i> ${evento.hora}</div>
                </div>
                <div class="evento-admin-actions">
                    <button class="btn" onclick="mostrarFormularioEvento(${JSON.stringify(evento)})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-accent" onclick="eliminarEvento('${evento.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacion();
    
    const eventoForm = document.getElementById('evento-form');
    if (eventoForm) {
        eventoForm.addEventListener('submit', guardarEvento);
        cargarEventos();
    }
}); 