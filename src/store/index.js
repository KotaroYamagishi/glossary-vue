import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    glossaries: [],
    detail: {
      id:"", name:"",description:""
    },
    login_user: null,
    selectedGlossary: null,
    selectedIndex: null,
  },
  getters: {
    username: (state) =>
      state.login_user ? state.login_user.displayName : "NO login_user",
    uid: (state) => (state.login_user ? state.login_user.uid : null),
  },
  mutations: {
    emptyGlossaries(state) {
      state.glossaries = [];
    },
    fetchGlossaries(state,glossaryList) {
      state.glossaries =glossaryList
      state.detail = state.glossaries[0];
      state.selectedGlossary = state.glossaries[0];
      state.selectedIndex = 0;
    },
    addGlossary(state, glossary) {
      console.log(glossary)
      state.glossaries.unshift(glossary);
      // 入れれてはおるけど要素として弱い
      console.log(state.glossaries)
      const index = state.glossaries.findIndex(
        (gloss) => gloss.id === glossary.id
      );
      state.detail = state.glossaries[index];
      state.selectedGlossary = glossary;
      state.selectedIndex = index;
    },
    showDetail(state, glossary ) {
      state.detail = glossary;
    },
    deleteGlossary(state, id) {
      const index = state.glossaries.findIndex(
        (glossary) => glossary.id === id
      );
      state.glossaries.splice(index, 1);
      if (state.glossaries[0]) {
        state.detail = state.glossaries[0];
        state.selectedGlossary = state.glossaries[0];
        state.selectedIndex = 0;
      } else {
        state.detail = {};
      }
    },
    editGlossary(state, glossary ) {
      const index = state.glossaries.findIndex(
        (gloss) => gloss.id === glossary.id
      );
      state.glossaries.splice(index, 1);
      state.glossaries.unshift(glossary);
      state.selectedIndex = 0;
    },
    setLoginUser(state, user) {
      console.log(user);
      state.login_user = user;
      console.log(state.login_user);
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    toggleSideNav(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {
    async fetchGlossaries({ commit ,getters}) {
      console.log(getters.uid)
      const res=await axios.get('http://localhost:8080/')
      console.log(res)
      const glossaryList=res.data.glossaryList
      commit('fetchGlossaries',glossaryList)
    },
    async searchGlossaries({ commit }, name) {
      console.log(name)
      const res=await axios.get('http://localhost:8080/search/'+name)
      const glossaryList=res.data.glossaryList
      commit('fetchGlossaries',glossaryList)
    },
    async addGlossary({ commit }, glossary) {
      const res=await axios.post("http://localhost:8080/add",glossary)
      console.log(res)
      commit("addGlossary", glossary );
    },
    async findById({ commit }, id) {
      const res=await axios.get("http://localhost:8080/"+id)
      const glossary=res.data.glossary
      commit("showDetail", glossary)
    },
    async deleteGlossary({ commit }, id) {
      await axios.delete("http://localhost:8080/"+id)
      commit("deleteGlossary", id)
    },
    async editGlossary({ commit },  glossary ) {
      var date=new Date()
      glossary.createAt=date
      await axios.post("http://localhost:8080/edit",glossary)
      commit("editGlossary", glossary)
    },
    createNotebook({getters},{category}){
      firebase
          .firestore()
          .collection(`glossaries/${getters.uid}/${category}`)
          .set()
          .then(() => {
            console.log(category)
          });
    },
    login() {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(googleAuthProvider);
    },
    setLoginUser({ commit }, user) {
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
  modules: {},
});
