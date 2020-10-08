import firebase from 'firebase'

var docRef=firebase.firestore().collection("glossaries").doc("NxBqXUsYVeKwy3pos0Wm")

export default{
    namespaced:true,
    state: {
        glossaries:[]
    },
    getters:{
        
    },
    mutations: {
        addGlossaries(state,{id,glossary}){
            glossary.id=id
            state.glossaries.push(glossary)
        }
    },
    actions: {
        fetchGlossaries({commit}){
            docRef.get().then(snapshot => {
                snapshot.forEach(doc=>commit("addGlossaries",{id:doc.id,glossary:doc.data()}))
            })
        }
    },
}