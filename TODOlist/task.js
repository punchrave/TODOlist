// Конструктор задачи
class Task {
  constructor(text, type) {
    this.id = nextId++; // Уникальный идентификатор
    this.text = text;
    this.completed = false;
    this.type = type;
  }
}

let tasks = []; // Массив для хранения задач
let nextId = 1; // Уникальный идентификатор для каждой задачи

// Функция для добавления задачи
function addTask(taskText, taskType) {
  const task = new Task(taskText, taskType); // Используем класс Task
  tasks.push(task);
  updateDOM(); // Обновление DOM после добавления задачи
}

// Функция для изменения статуса задачи
function changeTaskStatus(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    updateDOM(); // Обновление DOM после изменения статуса
  }
}

// Функция для удаления задачи
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  updateDOM(); // Обновление DOM после удаления задачи
}

// Функция для создания нового элемента задачи
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add(
    task.type === "HIGH" ? "taskH_new" : "taskL_new"
  );
  taskElement.classList.add(task.type === "HIGH" ? "taskH" : "taskL");
  taskElement.dataset.taskId = task.id; // Сохраняем ID задачи в data-атрибуте
  taskElement.innerHTML = ` 
        <button class="circleButton ${task.completed ? "active" : ""}"></button>
        <button class="deleteButton">x</button>
        ${task.text}
    `;
  addTaskHandlers(taskElement);
  return taskElement;
}

// Функция для добавления обработчиков задачи
function addTaskHandlers(taskElement) {
  const taskId = parseInt(taskElement.dataset.taskId);

  taskElement.querySelector(".circleButton").addEventListener("click", () => {
    changeTaskStatus(taskId); // Обновляем статус задачи в массиве
  });
  
  taskElement
    .querySelector(".deleteButton")
    .addEventListener("click", () => {
      if (
        taskElement.querySelector(".circleButton").classList.contains("active")
      ) {
        removeTask(taskId); // Удаляем задачу из массива
      } else {
        console.log("Не удалено, так как задача не выполнена");
      }
    });
}

// Функция для загрузки задач из JSON
async function loadTasksFromJSON() {
  try {
    const response = await fetch('tasks.json'); // Получаем JSON файл
    const taskData = await response.json(); // Преобразуем в JavaScript-объект

    // Переопределяем nextId в зависимости от максимального ID в JSON
    nextId = (taskData.length > 0 ? Math.max(...taskData.map(task => task.id)) + 1 : 1);

    // Преобразуем данные из JSON в объекты Task
    tasks = taskData.map(taskData => new Task(taskData.text, taskData.type));

    updateDOM(); // Обновляем DOM
  } catch (error) {
    console.error('Произошла ошибка при загрузке задач:', error);
  }
}

// Функция для обновления DOM
function updateDOM() {
  const highTasksContainer = document.querySelector(".HighTasks");
  const lowTasksContainer = document.querySelector(".LowTasks");

  highTasksContainer.innerHTML = "";
  lowTasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    if (task.type === "HIGH") {
      highTasksContainer.appendChild(taskElement);
    } else if (task.type === "LOW") {
      lowTasksContainer.appendChild(taskElement);
    }
  });
}