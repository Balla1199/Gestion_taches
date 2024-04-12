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

  // Gestionnaire d'événement pour ajouter une tâche
  addTaskBtn.addEventListener('click', addTask);

  function addTask() {
    // Récupération des valeurs des champs
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;
    const taskPriorityValue = taskPriority.value;
    // Vérification si le champ de texte n'est pas vide
    if (taskText !== '') {
      // Création d'un nouvel élément de tâche
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      // Insertion du contenu dans l'élément de tâche
      taskItem.innerHTML = `
        <span class="titre">${taskText}</span>
        <span classe= "date">Date: ${taskDateValue}</span>
        <span>Priorité: ${taskPriorityValue}</span>
        <button class="delete-btn">Supprimer</button>
        <input type="checkbox">
      `;
      // Ajout de l'élément de tâche à la liste
      taskList.appendChild(taskItem);
      // Réinitialisation du champ de texte
      taskInput.value = '';
    }
  }

  // Gestionnaire d'événement pour supprimer une tâche
  taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
      event.target.parentElement.remove();
    }
  });

  // Gestionnaires d'événement pour les boutons de filtrage
  allTasksBtn.addEventListener('click', function () {
    toggleActiveButton(allTasksBtn);
    showAllTasks();
  });

  activeTasksBtn.addEventListener('click', function () {
    toggleActiveButton(activeTasksBtn);
    showActiveTasks();
  });

  completedTasksBtn.addEventListener('click', function () {
    toggleActiveButton(completedTasksBtn);
    showCompletedTasks();
  });

  // Fonction pour basculer le bouton actif
  function toggleActiveButton(clickedButton) {
    const buttons = document.querySelectorAll('.footer button');
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
  }

  // Fonction pour afficher toutes les tâches
  function showAllTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => task.style.display = 'block');
  }

  // Fonction pour afficher les tâches actives
  function showActiveTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
      if (!task.querySelector('input[type="checkbox"]').checked) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }

  // Fonction pour afficher les tâches terminées
  function showCompletedTasks() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
      if (task.querySelector('input[type="checkbox"]').checked) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }
});
