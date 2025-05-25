// URL de la API REST donde se almacenan las tareas
const API_URL = `http://localhost:3000/tareas`;

// Variables globales
// Para saber que modal se abre
let statusModalBtn = "";

// DOM - Mensaje de error
const errorMessage = document.querySelector(`#error-message`);
const showModal = document.querySelector(`#crearTarjeta`);

// Inputs del formulario del Modal
const modal = new bootstrap.Modal(`#crearTarjeta`);
const inputTitle = document.querySelector(`#create-title`);
const inputOwner = document.querySelector(`#create-owner`);
const inputTaskDescription = document.querySelector(`#task-description`);
const inputImg = document.querySelector(`#task-img`);
const createTaskBtn = document.querySelector(`#createModalBtn`);

// Funcion para obtener tareas
async function getTasks() {
  try {
    const tasksResponse = await fetch(API_URL);
    const tasks = await tasksResponse.json();
    renderTasks(tasks);
  } catch (error) {
    Swal.fire({
      title: error.message,
      text: "Error al cargar tareas",
      icon: "error",
    });
  }
}

function renderTasks(tareas) {
  cleanTasks();
  for (const tarea of tareas) {
    const title = tarea.titulo;
    const description = tarea.descripcion;
    const status = tarea.estado;
    const owner = tarea.responsable;
    const img = tarea.imagen;
    createCard(title, description, status, owner, img);
  }
}

function createCard(title, description, status, owner, img) {
  const contenedor = document.querySelector(`#${status}.task-list`);
  contenedor.insertAdjacentHTML(
    "beforeend",
    `
    <div id="revision" class="task-list">
      <div class="card mb-3">
        <img src="${img == undefined ? "" : img}" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            ${description}
          </p>
          <p class="owner">
            ${owner}
          </p>
        </div>
      </div>
    </div>
  `
  );
}

function cleanTasks() {
  const taskLists = document.querySelectorAll(".task-list");
  taskLists.forEach((taskList) => {
    taskList.innerHTML = "";
  });
}

getTasks();

async function createTaskDb(taskObject) {
  try {
    const taskResponse = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskObject),
    });
    const task = await taskResponse.json();
    modal.hide();
    document.getElementById("modal-form").reset();
    Swal.fire({
      title: "Éxito",
      text: "Se ha registrado una nueva tarea",
      icon: "success",
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: error.message,
      text: "Error al crear tarea",
      icon: "error",
    });
    // showError(`Error al cargar las tareas` + error.message);
  }
}

// Event Listener
showModal.addEventListener(`show.bs.modal`, (event) => {
  const button = event.relatedTarget;
  const statusButton = button.getAttribute("data-status");
  statusModalBtn = statusButton;
});

createTaskBtn.addEventListener(`click`, (event) => {
  event.preventDefault();
  const title = inputTitle.value.trim();
  const description = inputTaskDescription.value.trim();
  const owner = inputOwner.value.trim();
  const img = inputImg.value.trim();
  createCard(title, description, statusModalBtn, owner, img);
  createTaskDb({
    titulo: title,
    descripcion: description,
    estado: statusModalBtn,
    responsable: owner,
    imagen: img,
  });
});

// TODO: Validar formulario
// TODO: cambiar a ingles funciones
// TODO: Funcion para eliminar tarjetas
// TODO: Funcion para editar tarjetas
// TODO: Filtros funcional
// TODO: Drag and drop
// TODO: agregar error obtener tareas
