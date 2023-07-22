/* eslint-disable max-len */
/* global taskDisplay categoryDisplay taskCRUD */

const app = {
  // Propriétées
  header: document.querySelector('header'),
  newTaskButton: document.querySelector('.create-task-container'),
  taskList: document.querySelector('ul.tasklist'),
  diplayCreationForm: document.querySelector('.modal-dialog'),
  creationForm: document.querySelector('.modal-dialog form'),
  formClosingButtons: document.querySelectorAll('.close-form'),
  displayUpdateForm: document.querySelector('.modal-edit-form'),
  updateForm: document.querySelector('.task-edit-form'),

  init() {
    taskDisplay.loadTasks();
    categoryDisplay.loadCategories();
    app.manageEvents();
  },

  /**
   * Ajoute les écouteurs d'évènements pour les éléments du DOM
   */
  manageEvents() {
    this.creationForm.addEventListener('submit', taskCRUD.createTask);
    this.newTaskButton.addEventListener('click', () => this.handleOpenForm('create'));
    this.formClosingButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', () => app.handleClosingForm('close'));
    });
    this.updateForm.addEventListener('submit', taskCRUD.updateTask);
  },

  /**
   * Ajoute des classes CSS à des éléments du DOM et définit la propriété hidden de deux autres éléments à true.
   * Plus précisément, elle ajoute la classe "muted" à l'élément app.header, la classe "show" à l'élément app.displayForm, et définit la propriété hidden de app.tasklist et app.newTaskButton à true. Cela permet de masquer lea listes des taches et le bouton d'ajout d'une nouvelle tache lors du clic sur le bouton associé.
   * @param {string} form - Le paramètre peut prendre les valeurs "create" ou "edit".
   */
  handleOpenForm(form) {
    this.header.classList.add('muted');
    if (form === 'create') {
      this.diplayCreationForm.classList.add('show');
    } else if (form === 'edit') {
      this.displayUpdateForm.classList.add('show');
    }
    this.taskList.hidden = true;
    this.newTaskButton.hidden = true;
  },

  /**
   * Retire des classes CSS à des éléments du DOM et définit la propriété hidden de deux autres éléments à true.
   * @param {string} status - Le status de la tâche ('close', 'ok' ou 'error').
   * Plus précisément, elle retire la classe "muted" à l'élément app.header, la classe "show" à l'élément app.displayForm,
   * et définit la propriété hidden de app.tasklist et app.newTaskButton à false.
   * Cela permet d'afficher la liset des taches et le boutton 'nouvelle tache' lorsqu'une tache a ete ajouter.
   * Elle crée également un élément div avec la classe "message" et un texte selon le status si le status = 'close' elle ne crée pas de message,
   * et l'ajoute au body.
   * Elle retire ensuite l'élément de la page après 3 secondes.
   */
  handleClosingForm(status) {
    this.header.classList.remove('muted');
    this.diplayCreationForm.classList.remove('show');
    this.displayUpdateForm.classList.remove('show');
    this.taskList.hidden = false;
    this.newTaskButton.hidden = false;

    if (status === 'close') {
      return;
    }

    const message = document.createElement('div');
    message.classList.add('message');

    if (status === 'ok') {
      message.classList.add('success');
      message.textContent = 'La nouvelle tâche a bien été ajoutée';
    } else if (status === 'error') {
      message.classList.add('danger');
      message.textContent = 'oops, impossible de sauvegarder la tâche';
    }

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
  },

  /**
   * Cette méthode est appelée lorsqu'un utilisateur clique sur l'icône d'édition d'une tâche.
   * Elle permet de pré-remplir le formulaire de modification avec les informations de la tâche sélectionnée. Selectionne la bonne categorie si une categorie est attribué à cette tache.
   * @param {Object} task - L'objet évènement généré par le clic sur l'icône d'édition.
   */
  editFormDetails(task) {
    document.querySelector('.task-edit-form__id').value = task.id;
    document.querySelector('.task-edit-form__title').value = task.title;

    const categoryList = document.querySelector('.task-edit-form__category');

    let selectedOption;
    for (let i = 0; i < categoryList.options.length; i++) {
      if (categoryList.options[i].value === task.categoryId) {
        selectedOption = categoryList.options[i];
        break;
      }
    }

    if (selectedOption) {
      selectedOption.selected = true;
    } else {
      const optionCategory = document.createElement('option');
      optionCategory.selected = true;
      optionCategory.textContent = 'Categorie de la tache...';
      optionCategory.value = '';
      categoryList.prepend(optionCategory);
    }

    app.handleOpenForm('edit');
  },
};

document.addEventListener('DOMContentLoaded', app.init);
