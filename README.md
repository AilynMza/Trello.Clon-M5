# 📂 Trello Clon

Este proyecto es un clon funcional de Trello, creado con **HTML, CSS, JavaScript**, **Bootstrap 5** y **SweetAlert2**, con persistencia de datos mediante [`json-server`](https://github.com/typicode/json-server). Incluye funcionalidades modernas como edición, eliminación, drag-and-drop y filtrado de tarjetas.

## 🎉 Repositorio en Git y GithubPages

[Repositorio en Git](https://github.com/AilynMza/Trello.Clon-M5).

[Deploy en GithubPages](https://ailynmza.github.io/Trello.Clon-M5/).

## 🎯 Funcionalidades principales

- ✅ Crear tareas con título, descripción, autor y URL de imagen.
- ✏️ Editar y eliminar tarjetas desde un modal.
- 🔀 Arrastrar y soltar tarjetas entre columnas (Drag and Drop con [SortableJS](https://github.com/SortableJS/Sortable)).
- 🔎 Filtro por autor y estado de la tarjeta.
- 🌙 Modo oscuro/claro con Bootstrap 5.
- 📂 Persistencia de tareas usando `json-server`.

## 📦 Requisitos

- Node.js y npm instalados en tu sistema.
- Extensión de Live Server o un servidor estático (para evitar errores de CORS si abres `index.html` directamente).

## 🛠️ Instalación y uso

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/trello-clon.git
   cd trello-clon
   ```

2. **Instala `json-server`:**

   ```bash
   npm install -g json-server
   ```

3. **Crea un archivo `db.json`** en la raíz con la estructura base:

   ```json
   {
     "tareas": []
   }
   ```

4. **Levanta el servidor JSON:**

   ```bash
   json-server --watch db.json --port 3000
   ```

5. **Abre `index.html`** en tu navegador (idealmente con Live Server si usas VSCode).

## 🧠 Estructura del proyecto

```
📁 trello-clon/
├── index.html         # Página principal
├── styles.css         # Estilos personalizados
├── app.js             # Lógica de la app
├── db.json            # Base de datos para json-server
└── imgs/              # Imágenes opcionales
```

## 🧹 Tecnologías utilizadas

- **Bootstrap 5** – diseño y componentes UI.
- **SweetAlert2** – alertas visuales elegantes.
- **SortableJS** – arrastrar y soltar tarjetas.
- **json-server** – backend simulado tipo REST.

## 📌 Notas importantes

- El backend simulado debe estar corriendo en `http://localhost:3000/tareas`. Si usas otro puerto, actualiza la constante `API_URL` en `app.js`.
- El drag & drop actualiza el estado (`estado`) de la tarea automáticamente mediante una petición `PATCH`.
- El estado se asigna al crear la tarea según el botón presionado que abre el modal.
- Las tareas se renderizan desde un array filtrado para soportar búsquedas por autor o estado.

## 🔧 Descripción del código (app.js)

- `getTasks()` obtiene las tareas del backend y actualiza `taskArray` y `filteredTaskArray`.
- `renderTasks()` limpia y vuelve a renderizar todas las tarjetas visibles.
- `createTaskDb()` envía la nueva tarea a `json-server` vía `POST`.
- `editTask()` actualiza una tarea existente usando `PUT`.
- `deleteTask()` elimina una tarea por su ID usando `DELETE`.
- `onMoveHandler()` actualiza el estado cuando se arrastra una tarjeta a otra columna (`PATCH`).
- `filterBtn` permite filtrar tareas por autor y estado.
- `clearFilter()` reinicia los filtros y vuelve a cargar las tareas.
- `btnColorMode` alterna entre tema oscuro y claro de Bootstrap.

## ✅ Tareas pendientes

- [ ] Validar formularios para evitar envíos vacíos.
- [ ] Refactorizar nombres de funciones a inglés para mantener consistencia.

## 💡 Autor

Desarrollado por [Ailyn Mza](https://github.com/AilynMza).

---

¡Si este clon de Trello te fue últil, considera dejar una estrella en el repositorio! ⭐
