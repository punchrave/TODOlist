// Функция для проверки условий перед добавлением задачи
function conditions(taskText) {
  if (typeof taskText !== 'string') {
    throw new Error('Ошибка:значение не является строкой');
  }
  if (taskText.length < 3) {
    throw new Error('Строка слишком короткая');
  }
  if (taskText.length > 50) {
    throw new Error('Строка слишком длинная');
  }
}

// Обработчик для формы задачи HIGH
document.addEventListener('DOMContentLoaded', function () {
  const highTaskForm = document.getElementById('highTaskForm');
  highTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newHighTaskInput = document.getElementById('addHigh');
    const newHighTaskText = newHighTaskInput.value.trim();
    try {
      conditions(newHighTaskText);
      addTask(newHighTaskText, 'HIGH');
    } catch (error) {
      console.error("Ошибка валидации задачи:", error);
      alert(error.message);
    } finally {
      newHighTaskInput.value = '';
      updateDOM();
    }
  });

  // Обработчик для формы задачи LOW
  const lowTasksForm = document.getElementById('lowTaskForm');
  lowTasksForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newLowTaskInput = document.getElementById('addLow');
    const newLowTaskText = newLowTaskInput.value.trim();
    try {
      conditions(newLowTaskText);
      addTask(newLowTaskText, 'LOW');
    } catch (error) {
      console.error("Ошибка валидации задачи:", error);
      alert(error.message);
    } finally {
      newLowTaskInput.value = '';
      updateDOM();
    }
  });

  loadTasksFromJSON();
  updateDOM(); // Инициализация DOM при загрузке страницы
});