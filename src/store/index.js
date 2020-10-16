import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import glossary from "./modules/glossary.js";
import category from "./modules/category.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    category_dialog:false,
    login_user: null,
  },
  getters: {
    username: (state) =>
      state.login_user ? state.login_user.displayName : "NO login_user",
    uid: (state) => (state.login_user ? state.login_user.uid : null),
  },
  mutations: {
    toggleCategoryDialog(state){
      state.category_dialog=!state.category_dialog;
    },
    setLoginUser(state, user) {
      console.log(user);
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    toggleSideNav(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {
    toggleCategoryDialog({commit}){
      commit("toggleCategoryDialog")
    },
    login() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(googleAuthProvider);
    },
    async setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    logout({ commit }) {
      commit("deleteLoginUser");
      firebase.auth().signOut();
    },
    toggleSideNav({ commit }) {
      commit("toggleSideNav");
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
  },
  modules: {
    glossary:glossary,
    category:category
  },
});
