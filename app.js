// URL de la API REST donde se almacenan las tareas
const API_URL = `http://localhost:3000/tareas`;

// Variables globales
// Para saber que modal se abre
let statusModalBtn = "";
let taskArray = [];
let filteredTaskArray = [];
// Para conocer el id de las tarjetas y poder editar
let editTaskId = "";

// DOM -
const columnContainer = document.querySelector(`#column-container`);
const createModal = document.querySelector(`#crearTarjeta`);
const editModal = document.querySelector(`#editarTarjeta`);

// Input para filtrado
const filterBtn = document.querySelector(`#filter-btn`);
const cleanFilterBtn = document.querySelector(`#clean-filter-btn`);
const autorInput = document.querySelector(`#autorSearch`);
const statusInput = document.querySelector(`#statusSelector`);

// Inputs del formulario del Modal
const modal = new bootstrap.Modal(`#crearTarjeta`);
const inputTitle = document.querySelector(`#create-title`);
const inputOwner = document.querySelector(`#create-owner`);
const inputTaskDescription = document.querySelector(`#task-description`);
const inputImg = document.querySelector(`#task-img`);
const createTaskBtn = document.querySelector(`#createModalBtn`);

// Inputs para editar el formulario del Modal
const editModalBS = new bootstrap.Modal(`#editarTarjeta`);
const editInputTitle = document.querySelector(`#edit-title`);
const editInputOwner = document.querySelector(`#edit-owner`);
const editInputTaskDescription = document.querySelector(
  `#edit-task-description`
);
const editInputImg = document.querySelector(`#edit-task-img`);
const saveTaskBtn = document.querySelector(`#saveModalBtn`);
const editStatusInput = document.querySelector(`#status`);

// Funcion para obtener tareas
async function getTasks() {
  try {
    const tasksResponse = await fetch(API_URL);
    const tasks = await tasksResponse.json();
    taskArray = tasks;
    filteredTaskArray = tasks;
    renderTasks();
  } catch (error) {
    Swal.fire({
      title: error.message,
      text: "Error al cargar tareas",
      icon: "error",
    });
  }
}

// Funcion para dibujar las tarjetas
function renderTasks() {
  cleanTasks();
  for (const tarea of filteredTaskArray) {
    const title = tarea.titulo;
    const description = tarea.descripcion;
    const status = tarea.estado;
    const owner = tarea.responsable;
    const img = tarea.imagen;
    const id = tarea.id;
    createCard(title, description, status, owner, img, id);
  }
}

// Funcion para crear la tarjeta final
function createCard(title, description, status, owner, img, id) {
  const contenedor = document.querySelector(`#${status}.task-list`);
  contenedor.insertAdjacentHTML(
    "beforeend",
    `
    <div id="revision" class="task-list">
      <div class="card mb-3">
        <img src="${img == undefined ? "" : img}" class="card-img-top" alt="" />
        <div class="card-body pt-1">
          <div class="dropdown text-end">
            <button class="btn border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots"></i>
            </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editarTarjeta" data-taskId="${id}"> <i class="bi bi-pencil-fill"></i> Editar tarjeta</button></li>

                <li><button class="dropdown-item deleteBtn" data-taskId="${id}"><i class="bi bi-trash-fill text-danger"></i> Eliminar tarjeta</button></li>
              </ul>
          </div>
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

// Funcion para limpiar las tarjetas
function cleanTasks() {
  const taskLists = document.querySelectorAll(".task-list");
  taskLists.forEach((taskList) => {
    taskList.innerHTML = "";
  });
}

getTasks();

// Funcion para crear una tarjeta en la base de datos y validarlo
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
    taskArray.push(task);
    renderTasks();
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: error.message,
      text: "Error al crear tarea.",
      icon: "error",
    });
  }
}

// Funciones para editar y eliminar tarjetas
async function editTask(event) {
  event.preventDefault();
  try {
    const taskObject = {
      titulo: editInputTitle.value,
      responsable: editInputOwner.value,
      descripcion: editInputTaskDescription.value,
      estado: editStatusInput.value,
      imagen: editInputImg.value,
    };
    const editTaskResponse = await fetch(`${API_URL}/${editTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskObject),
    });
    const taskEdited = await editTaskResponse.json();
    editModalBS.hide();

    clearFilter();

    Swal.fire({
      title: "Éxito",
      text: "Tarea guardada correctamente.",
      icon: "success",
    });
  } catch (error) {
    Swal.fire({
      title: error.message,
      text: "Error al editar tarea.",
      icon: "error",
    });
  }
}

async function deleteTask(deleteTaskId) {
  try {
    const deleteTaskResponse = await fetch(`${API_URL}/${deleteTaskId}`, {
      method: "DELETE",
    });
    clearFilter();
    Swal.fire({
      title: "Eliminado",
      text: "Se ha borrado exitosamente la tarea",
      icon: "success",
    });
  } catch (error) {
    Swal.fire({
      title: error.message,
      text: "Error al eliminar tarea.",
      icon: "error",
    });
  }
}

// Funcion para limpiar filtros
function clearFilter() {
  autorInput.value = "";
  statusInput.value = "Busqueda por progreso...";
  filteredTaskArray = taskArray;
  getTasks();
}

// Event Listener
// Evento de crear y editar modal
createModal.addEventListener(`show.bs.modal`, (event) => {
  const button = event.relatedTarget;
  const statusButton = button.getAttribute("data-status");
  statusModalBtn = statusButton;
});

editModal.addEventListener(`show.bs.modal`, (event) => {
  const button = event.relatedTarget;
  const taskId = button.getAttribute("data-taskId");
  editTaskId = taskId;
  const taskEdit = filteredTaskArray.find((task) => {
    return task.id == editTaskId;
  });
  editInputTitle.value = taskEdit.titulo;
  editInputOwner.value = taskEdit.responsable;
  editInputTaskDescription.value = taskEdit.descripcion;
  editInputImg.value = taskEdit.imagen == undefined ? "" : taskEdit.imagen;
  editStatusInput.value = taskEdit.estado;
});

// Evento para enviar el formulario
createTaskBtn.addEventListener(`click`, (event) => {
  event.preventDefault();
  const title = inputTitle.value.trim();
  const description = inputTaskDescription.value.trim();
  const owner = inputOwner.value.trim();
  const img = inputImg.value.trim();
  createTaskDb({
    titulo: title,
    descripcion: description,
    estado: statusModalBtn,
    responsable: owner,
    imagen: img,
  });
});

// Evento para filtrado
filterBtn.addEventListener(`click`, () => {
  const authorValue = autorInput.value;
  const statusValue = statusInput.value;
  if (authorValue == "" && statusValue == "Busqueda por progreso...") {
    Swal.fire({
      text: "No has colocado ningún filtro",
      icon: "warning",
    });
  } else if (authorValue != "" && statusValue != "Busqueda por progreso...") {
    const filterTask = taskArray.filter((task) => {
      return task.responsable == authorValue && task.estado == statusValue;
    });
    filteredTaskArray = filterTask;
    renderTasks();
  } else {
    const filterTask = taskArray.filter((task) => {
      return task.responsable == authorValue || task.estado == statusValue;
    });
    filteredTaskArray = filterTask;
    renderTasks();
  }
});

// Evento para limpiar filtros
cleanFilterBtn.addEventListener(`click`, clearFilter);

// Evento para guardar tarea
saveTaskBtn.addEventListener(`click`, editTask);

// Evento para eliminar tarjeta
columnContainer.addEventListener(`click`, async (event) => {
  const deleteBtn = event.target.closest(".deleteBtn");
  // Le dio clic al boton borrar
  if (deleteBtn) {
    const taskId = deleteBtn.getAttribute("data-taskId");
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Es una acción irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      deleteTask(taskId);
    }
  }
});

// TODO: Validar formulario
// TODO: cambiar a ingles funciones
// TODO: Funcion para eliminar tarjetas
// TODO: Funcion para editar tarjetas
// TODO: Drag and drop
// TODO: agregar error obtener tareas
