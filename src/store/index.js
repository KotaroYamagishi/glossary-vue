import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import axios from "axios";
import glossary from "./modules/glossary.js";
import category from "./modules/category.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    category_dialog:false,
    login_user: null,
    user_id:null
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
    setLoginUser(state, {user,userId}) {
      console.log(user);
      console.log(userId);
      state.login_user = user;
      state.user_id=userId
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
      var res=await axios.get("http://localhost:8080/user/"+user.uid)
      var loginUser=res.data.user
      console.log("a"+loginUser)
      if(!loginUser){
        await axios.post("http://localhost:8080/user/"+user.uid)
        console.log("s")
        res=await axios.get("http://localhost:8080/user/"+user.uid)
        loginUser=res.data.user
      }
      console.log(loginUser)
      commit("setLoginUser", {user:user,userId:loginUser.id});
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
