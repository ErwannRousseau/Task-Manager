/* eslint-disable max-len */
/* global app taskDisplay */

const taskCRUD = {
  urlApi: 'http://127.0.0.1:8001/api/tasks',

  /**
   * Définit une fonction asynchrone qui crée une nouvelle tâche en envoyant une requête HTTP POST au point de terminaison API du serveur.
   * @param {Event} event - L'objet événement qui a déclenché l'appel de la fonction.
   */
  async createTask(event) {
    event.preventDefault();
    // console.log(event);
    const createTaskForm = event.currentTarget;
    const newTask = new FormData(createTaskForm);
    // console.log(newTask.get("title"));
    // console.log(newTask.get("category_id"));

    const response = await fetch(taskCRUD.urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTask.get('title'),
        category_id: newTask.get('category_id'),
      }),
    });

    if (response.ok) {
      app.handleClosingForm('ok');
      taskDisplay.loadTasks();
      createTaskForm.reset();
    } else {
      app.handleClosingForm('error');
    }
  },

  /**
   * Récupère une liste de tâches depuis une API au format JSON.
   * @async
   * @function
   * @returns {Promise<Array>} - Un tableau d'objets JavaScript contenant la liste des tâches avec les propriétés "title" et "id".
   */
  async getTasks() {
    const response = await fetch(taskCRUD.urlApi);

    const data = await response.json();
    const taskList = [];
    data.forEach((taskFromAPI) => {
      const task = {
        id: taskFromAPI.id,
        title: taskFromAPI.title,
        category: taskFromAPI.category ? taskFromAPI.category.name : null,
        categoryId: taskFromAPI.category_id ? taskFromAPI.category_id : null,
      };
      taskList.push(task);
    });
    return taskList;
  },

  /**
   * Une fonction qui exécute une requête API pour mettre à jour une tâche.
   * @async
   * @param {Event} event - L'événement qui déclenche la fonction.
   */
  async updateTask(event) {
    event.preventDefault();
    const updateTaskForm = event.currentTarget;
    const updatedTask = new FormData(updateTaskForm);

    const taskId = updatedTask.get('id');
    const response = await fetch(`${taskCRUD.urlApi}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updatedTask.get('title'),
        category_id: updatedTask.get('category_id'),
      }),
    });

    if (response.ok) {
      app.handleClosingForm('ok');
      taskDisplay.loadTasks();
    } else {
      app.handleClosingForm('error');
    }
  },

  /**
   * Envoyer une demande DELETE à l'API pour supprimer une tâche avec l'ID spécifié.
   * @async
   * @param {number} taskId - L'ID de la tâche à supprimer.
   * @param {Element} taskElement - L'élément HTML de la tâche à supprimer.
   */
  async deleteTask(taskId, taskElement) {
    const response = await fetch(`${taskCRUD.urlApi}/${taskId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      taskElement.remove();
    } else {
      alert("ça c'est mal passé");
    }
  },
};
