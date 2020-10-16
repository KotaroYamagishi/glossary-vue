import axios from "axios";

export default {
  namespaced: true,
  state: {
    glossaries: [],
    detail: {
      id: "",
      name: "",
      description: "",
      categoryId: "",
    },
    selectedGlossary: null,
    selectedIndex: null,
  },
  getters: {},
  mutations: {
    changeSelectedGlossaryAndIndex(state, { glossary, index }) {
      console.log(glossary);
      state.selectedGlossary = glossary;
      state.selectedIndex = index;
      console.log(state.selectedGlossary);
    },
    fetchGlossaries(state, glossaryList) {
      state.glossaries = glossaryList;
      console.log(state.glossaries);
      state.detail = state.glossaries[0];
      state.selectedGlossary = state.glossaries[0];
      state.selectedIndex = 0;
    },
    addGlossary(state, glossary) {
      console.log(glossary);
      state.glossaries.unshift(glossary);
      // 入れれてはおるけど要素として弱い
      console.log(state.glossaries);
      const index = state.glossaries.findIndex(
        (gloss) => gloss.id === glossary.id
      );
      state.detail = state.glossaries[index];
      state.selectedGlossary = glossary;
      state.selectedIndex = index;
    },
    findGlossariesByCategoryId(state, glossaryList) {
      state.glossaries = glossaryList;
      state.detail = state.glossaries[0];
      state.selectedGlossary = state.glossaries[0];
      state.selectedIndex = 0;
    },
    showDetail(state, glossary) {
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
    editGlossary(state, glossary) {
      const index = state.glossaries.findIndex(
        (gloss) => gloss.id === glossary.id
      );
      state.glossaries.splice(index, 1);
      state.glossaries.unshift(glossary);
      state.selectedIndex = 0;
    },
  },
  actions: {
    async fetchGlossaries({ commit, rootGetters }) {
      var root = rootGetters;
      console.log(root.uid);
      const res = await axios.get("http://localhost:8080/" + root.uid);
      console.log(res);
      const glossaryList = res.data.glossaryList;
      commit("fetchGlossaries", glossaryList);
    },
    async searchGlossaries({ commit, rootGetters }, name) {
      console.log(name);
      var root = rootGetters;
      const res = await axios.get(
        "http://localhost:8080/" + root.uid + "/search/" + name
      );
      const glossaryList = res.data.glossaryList;
      commit("fetchGlossaries", glossaryList);
    },
    async findGlossariesByCategoryId({ commit }, categoryId) {
      console.log(categoryId);
      const res = await axios.get("http://localhost:8080/cate/" + categoryId);
      const glossaryList = res.data.glossaryList;
      console.log(glossaryList.length);
      if (glossaryList.length !== 0) {
        commit("findGlossariesByCategoryId", glossaryList);
      } else {
        const res2 = await axios.get("http://localhost:8080/");
        commit("fetchGlossaries", res2.data.glossaryList);
      }
    },
    async addGlossary({ commit, rootGetters }, glossary) {
      glossary.userId = rootGetters.uid;
      const res = await axios.post("http://localhost:8080/add", glossary);
      glossary.id=res.data.glossaryId
      console.log(res.data.glossaryId)
      commit("addGlossary", glossary);
    },
    async findById({ commit, rootGetters }, id) {
      const root = rootGetters;
      const res = await axios.get(
        "http://localhost:8080/" + root.uid + "/" + id
      );
      const glossary = res.data.glossary;
      commit("showDetail", glossary);
    },
    async deleteGlossary({ commit }, id) {
      await axios.delete("http://localhost:8080/" + id);
      commit("deleteGlossary", id);
    },
    async editGlossary({ commit }, glossary) {
      await axios.post("http://localhost:8080/edit", glossary);
      commit("editGlossary", glossary);
    },
  },
};
