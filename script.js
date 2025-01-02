document.addEventListener('DOMContentLoaded', () => {
    const pruebas = [
        {
            id: 1,
            titulo: "Infraestructura; Hardware",
            descripcion: "Verificar la existencia de documentación donde se describa la infraestructura del sistema computarizado.",
            evidencia: true
        },
        {
            id: 2,
            titulo: "Infraestructura; Hardware",
            descripcion: "Verificar que el servidor del sistema computarizado está ubicado en un entorno seguro.",
            evidencia: true
        },
        // Agrega más pruebas aquí...
    ];

    const listaPruebas = document.getElementById('lista-pruebas');
    const listaOcultas = document.getElementById('lista-ocultas');

    pruebas.forEach(prueba => {
        const pruebaDiv = crearPrueba(prueba);
        listaPruebas.appendChild(pruebaDiv);
    });
});

function crearPrueba(prueba) {
    const pruebaDiv = document.createElement('div');
    pruebaDiv.className = 'prueba';
    pruebaDiv.dataset.id = prueba.id;

    pruebaDiv.innerHTML = `
        <h3>${prueba.titulo}</h3>
        <p><strong>Descripción:</strong> ${prueba.descripcion}</p>
        <label>
            <input type="checkbox" class="ocultar-prueba" onchange="ocultarPrueba(${prueba.id})"> Ocultar esta prueba
        </label>
        ${prueba.evidencia ? `
        <label for="evidencia-${prueba.id}">Evidencia:</label>
        <input type="file" id="evidencia-${prueba.id}" name="evidencia-${prueba.id}" accept="image/*" onchange="mostrarImagen(event, ${prueba.id})">
        <div id="imagen-preview-${prueba.id}" class="imagen-preview"></div>` : ''}
    `;

    return pruebaDiv;
}

function mostrarImagen(event, id) {
    const previewDiv = document.getElementById(`imagen-preview-${id}`);
    previewDiv.innerHTML = '';

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = `Evidencia para prueba ${id}`;
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function ocultarPrueba(id) {
    const pruebaDiv = document.querySelector(`.prueba[data-id="${id}"]`);
    const listaOcultas = document.getElementById('lista-ocultas');

    pruebaDiv.style.display = 'none';

    const pruebaOculta = pruebaDiv.cloneNode(true);
    pruebaOculta.querySelector('.ocultar-prueba').checked = false;
    pruebaOculta.querySelector('.ocultar-prueba').onchange = () => mostrarPrueba(id);

    const mostrarBtn = document.createElement('button');
    mostrarBtn.className = 'mostrar-btn';
    mostrarBtn.textContent = 'Mostrar esta prueba';
    mostrarBtn.onclick = () => mostrarPrueba(id);

    pruebaOculta.appendChild(mostrarBtn);
    listaOcultas.appendChild(pruebaOculta);
}

function mostrarPrueba(id) {
    const pruebaDiv = document.querySelector(`.prueba[data-id="${id}"]`);
    pruebaDiv.style.display = 'block';

    const pruebaOculta = document.querySelector(`#lista-ocultas .prueba[data-id="${id}"]`);
    if (pruebaOculta) pruebaOculta.remove();
}

function imprimirPagina() {
    window.print();
}
