const categoryDisplay = {
  /**
   * Supprime toutes les options de l'élément select sauf la première.
   * Récupère toutes les catégories en utilisant la méthode await pour la fonction asynchrone getCategories de l'objet categoryCRUD.
   * Pour chaque catégorie récupérée, appelle la fonction insertCategoryInDom de l'objet categoryDisplay pour l'ajouter dans le DOM.
   * @async
   */
  loadCategories: async function () {
    const options = document.querySelectorAll("#category option");
    for (let i = 1; i < options.length; i++) {
      options[i].remove();
    }

    const categories = await categoryCRUD.getCategories();

    for (const category of categories) {
      categoryDisplay.insertCategoryInDom(category);
    }
  },

  /**
   * @function insertCategoryInDom
   * @param {Object} category - Un objet représentant une catégorie avec les propriétés "id" et "name".
   */
  insertCategoryInDom: function (category) {
    // On créé un <option>
    const categorySelectCreate = document.createElement("option");
    const categorySelectUpdate = document.createElement("option");
    // On remplit l'attribut value de la balise <option>
    categorySelectCreate.value = category.id;
    categorySelectCreate.textContent = category.name;
    categorySelectUpdate.value = category.id;
    categorySelectUpdate.textContent = category.name;
    // On les insert dans le DOM
    document
      .querySelector(".task-edit-form__category")
      .appendChild(categorySelectCreate);
    document
      .querySelector(".form__select-category")
      .appendChild(categorySelectUpdate);
  },
};
