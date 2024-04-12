document.addEventListener('DOMContentLoaded', function () {
  // Récupération des éléments du DOM
  const taskInput = document.getElementById('taskInput');
  const taskDate = document.getElementById('taskDate');
  const taskPriority = document.getElementById('taskPriority');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const allTasksBtn = document.getElementById('allTasksBtn');
  const activeTasksBtn = document.getElementById('activeTasksBtn');
  const completedTasksBtn = document.getElementById('completedTasksBtn');

  // Chargement des tâches depuis le stockage local lors du chargement de la page
  loadTasks();

  // Gestionnaire d'événement pour ajouter une tâche
  addTaskBtn.addEventListener('click', addTask);

  function addTask() {
    // Récupération des valeurs des champs
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;
    const taskPriorityValue = taskPriority.value;
    // Vérification si le champ de texte n'est pas vide
    if (taskText !== '') {
      // Création d'un nouvel objet de tâche
      const task = {
        text: taskText,
        date: taskDateValue,
        priority: taskPriorityValue
      };
      // Ajout de la tâche au stockage local
      saveTask(task);
      // Affichage de la tâche dans l'interface utilisateur
      renderTask(task);
      // Réinitialisation du champ de texte
      taskInput.value = '';
    }
  }

  // Gestionnaire d'événement pour supprimer une tâche
  taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.querySelector('.titre').textContent;
      // Suppression de la tâche du stockage local
      removeTask(taskText);
      // Suppression de la tâche de l'interface utilisateur
      taskItem.remove();
    }
  });

  // Fonction pour charger les tâches depuis le stockage local
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(renderTask);
  }

  // Fonction pour sauvegarder une tâche dans le stockage local
  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Fonction pour supprimer une tâche du stockage local
  function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Fonction pour afficher une tâche dans l'interface utilisateur
  function renderTask(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <span class="titre">${task.text}</span>
      <span class="date">Date: ${task.date}</span>
      <span>Priorité: ${task.priority}</span>
      <button class="delete-btn">Supprimer</button>
      <input type="checkbox">
    `;
    taskList.appendChild(taskItem);
  }
});
