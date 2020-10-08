import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    glossaries: [],
    detail: {},
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
    addGlossary(state, { id, glossary }) {
      glossary.id = id;
      state.glossaries.unshift(glossary);
      const index = state.glossaries.findIndex(
        (glossary) => glossary.id === id
      );
      state.detail = state.glossaries[index];
      state.selectedGlossary = glossary;
      state.selectedIndex = index;
    },
    searchGlossary(state, { id, glossary }) {
      glossary.id = id;
      state.glossaries = [];
      state.glossaries.push(glossary);
      state.detail = glossary;
    },
    showDetail(state, { id, glossary }) {
      glossary.id = id;
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
    editGlossary(state, { id, glossary }) {
      const index = state.glossaries.findIndex(
        (glossary) => glossary.id === id
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
    fetchGlossaries({ commit, getters }) {
      commit("emptyGlossaries");
      firebase
        .firestore()
        .collection(`glossaries/${getters.uid}/glossary`)
        .orderBy("editTime")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) =>
            commit("addGlossary", { id: doc.id, glossary: doc.data() })
          );
        });
    },
    searchGlossaries({ commit, getters }, name) {
      console.log(name);
      firebase
        .firestore()
        .collection(`glossaries/${getters.uid}/glossary`)
        .where("name", "==", name)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            commit("searchGlossary", { id: doc.id, glossary: doc.data() });
            console.log(doc.data());
          });
        });
    },
    firstAddGlossary({ commit, getters }, glossary) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`glossaries/${getters.uid}/glossary`)
          .set(glossary, { merge: true })
          .then((doc) => {
            commit("addGlossary", { id: doc.id, glossary: glossary });
          });
      }
    },
    addGlossary({ commit, getters }, glossary) {
      var date = new Date();
      glossary.editTime = date;
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`glossaries/${getters.uid}/glossary`)
          .add(glossary)
          .then((doc) => {
            commit("addGlossary", { id: doc.id, glossary: glossary });
          });
      }
    },
    findById({ commit, getters }, id) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`glossaries/${getters.uid}/glossary`)
          .doc(id)
          .get()
          .then((doc) => {
            commit("showDetail", { id: id, glossary: doc.data() });
          });
      }
    },
    deleteGlossary({ commit, getters }, id) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`glossaries/${getters.uid}/glossary`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteGlossary", id);
          });
      }
    },
    editGlossary({ commit, getters }, { id, glossary }) {
      glossary.id = id;
      var date = new Date();
      glossary.editTime = date;
      console.log(glossary);
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`glossaries/${getters.uid}/glossary`)
          .doc(id)
          .update({
            name: glossary.name,
            description: glossary.description,
            editTime: glossary.editTime,
          })
          .then(() => {
            commit("editGlossary", { id: id, glossary: glossary });
          });
      }
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
