// URL de la API REST donde se almacenan las tareas
const API_URL = `http://localhost:3000/tareas`;

// DOM - Mensaje de error
const errorMessage = document.querySelector(`#error-message`);
// Tarjetas de tareas
const pendiente = document.querySelector(`#pendiente`);
const investigacion = document.querySelector(`#investigacion`);
const enProgreso = document.querySelector(`#enProgreso`);
const revision = document.querySelector(`#revision`);
const terminada = document.querySelector(`#terminada`);

// Funcion para mostrar mensajes de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
// Funcion para ocultar el mensaje de errror
function clearError() {
    errorMessage.textContent = ``;
    errorMessage.style.display = `none`;
}

// Funcion para obtener tareas
async function getTareas() {
    try {
        const response = await fetch(API_URL);
        const tareas = await response.json();
        crearTareas(tareas);
    } catch (error) {
        showError(`Error al cargar las tareas`+ error.message)
    }   
}

// Funcion para crear tarea

// Funcion para actualizar tarea
// Funcion para eliminar tarea