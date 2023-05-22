const categoryCRUD = {
  urlApi: "http://127.0.0.1:8001/api/categories",

  /**
   * Cette fonction effectue un appel asynchrone à une API en utilisant la méthode `fetch()`
   * et renvoie un tableau `categoryList` contenant toutes les catégories extraites de
   * l'API, avec les propriétés "id", "name" et "tasks".
   *
   * @async
   * @function getCategories
   * @returns {Promise<Array>} Un tableau `categoryList` contenant toutes les catégories extraites de
   * l'API, avec les propriétés "id", "name" et "tasks".
   */
  getCategories: async function () {
    const response = await fetch(categoryCRUD.urlApi);


    const data = await response.json();
    let categoryList = [];

    for (const categoryFromAPI of data) {
      const category = {
        id: categoryFromAPI.id,
        name: categoryFromAPI.name,
        tasks: categoryFromAPI.tasks ? categoryFromAPI.tasks.title : null,
      };
      categoryList.push(category);
    }
    return categoryList;
  },
};
