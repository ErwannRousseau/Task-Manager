/* eslint-disable max-len */
/* global taskCRUD app */
const taskDisplay = {
  /**
   * Charge les tâches à partir de la liste des tâches de l'API et les affiche dans le DOM.
   * Efface l'élément tasklist dans le DOM pour recommencer à partir de zéro.
   * Utilise la fonction getTasks pour récupérer la liste des tâches.
   * Insère chaque tâche dans le DOM en utilisant la fonction insertTaskInDom.
   * @async
   */
  async loadTasks() {
    document.querySelector('.tasklist').textContent = '';

    const tasks = await taskCRUD.getTasks();

    tasks.forEach((task) => {
      taskDisplay.insertTaskInDom(task);
    });
  },

  /**
   * Ajoute une tâche à la page en créant un élément contenant les informations de la tâche (titre, catégorie, boutons de suppression et édition).
   * Ajoute des ecouteurs d'evenements sur les boutons delete et edit.
   * @param {Object} task - La tâche à ajouter, avec ses propriétés (id, titre, catégorie).
   */
  insertTaskInDom(task) {
    // On créé un <li>
    const taskElement = document.createElement('li');
    // On remplit l'attribut data-id de la balise <li>
    taskElement.dataset.id = task.id;

    // On crée un élément <p>
    const titleElement = document.createElement('p');
    // On remplit la balise <p>
    titleElement.textContent = task.title;

    // On crée un element div pour le delete
    const deleteElement = document.createElement('div');
    // On ajoute a deleteElement sa classe delete
    deleteElement.classList.add('delete');

    // On crée un element div pour l'edit
    const editElement = document.createElement('div');
    // On ajoute a deleteElement sa classe edit
    editElement.classList.add('edit');

    // On insère les elements dans le <li>
    taskElement.append(titleElement, deleteElement, editElement);

    if (task.category) {
      // On créé un element <em>
      const categoryElement = document.createElement('em');
      // On remplit la balise <em>
      categoryElement.textContent = task.category;
      // On insert l'element <em> apres le titre
      titleElement.after(categoryElement);
    }

    // On insère ce <li> dans la page, dans le ul.tasklist
    document.querySelector('.tasklist').append(taskElement);

    deleteElement.addEventListener('click', () => {
      const taskId = task.id;
      taskCRUD.deleteTask(taskId, taskElement);
    });

    editElement.addEventListener('click', () => app.editFormDetails(task));
  },
};
