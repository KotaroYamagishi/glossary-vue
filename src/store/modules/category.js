import axios from "axios";

export default {
  namespaced: true,
  state: {
    dialog: false,
    categories: [],
    category: {
      id: undefined,
      name: undefined,
    },
  },
  getters: {},
  mutations: {
    toggleDialog(state) {
      state.dialog = !state.dialog;
    },
    findAll(state, categories) {
      state.categories = categories;
    },
    findById(state, category) {
      state.category = category;
      console.log(category.id);
    },
    addCategory(state, category) {
      console.log(category);
      state.categories.unshift(category);
    },
    editCategory(state, category) {
      var index = state.categories.findIndex((cate) => {
        cate.id === category.id;
      });
      state.categories.splice(index, 1);
      state.categories.unshift(category);
    },
    deleteCategory(state, id) {
      var index = state.categories.findIndex((cate) => cate.id === id);
      state.categories.splice(index, 1);
    },
  },
  actions: {
    async fetchCategories({ commit ,rootGetters}) {
      const res = await axios.get("http://localhost:8080/category/"+rootGetters.uid);
      const categoryList = res.data.categoryList;
      commit("findAll", categoryList);
    },
    async findCategoryById({ commit }, id) {
      var res = await axios.get("http://localhost:8080/category/find/" + id);
      console.log(res.data.category);
      commit("findById", res.data.category);
    },
    async addCategory({ commit ,rootGetters}, category) {
      category.userId= rootGetters.uid
      const res = await axios.post(
        "http://localhost:8080/category/insert",
        category
      );
      category.id=res.data.categoryId;
      console.log(category)
      commit("addCategory", category);
    },
    async editCategory({ commit }, category) {
      await axios.post("http://localhost:8080/category/edit", category);
      commit("editCategory", category);
    },
    async deleteCategory({ commit }, id) {
      await axios.delete("http://localhost:8080/category/" + id);
      commit("deleteCategory", id);
    },
    toggleDialog({ commit }) {
      commit("toggleDialog");
    },
  },
};
