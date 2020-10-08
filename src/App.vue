<template class="app">
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{  text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-app-bar app dark>
      <v-toolbar-title>用語集</v-toolbar-title>
      <v-spacer />
      <v-btn color="black" dark @click="reset" v-if="$store.state.login_user">
        <v-icon>reset</v-icon>
      </v-btn>
      <v-btn icon @click="searchName(search)" v-if="$store.state.login_user">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field label="search for..." v-model="search" v-if="$store.state.login_user"></v-text-field>
      <v-spacer />
    </v-app-bar>
    <v-content fluid fill-height align-start> 
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase"

export default {
  name: "App",
  data(){
    return{
      search: "",
      snackbar: false,
      text:""
    }
  },
  created(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setLoginUser(user);
        if(this.$router.currentRoute.name==="LoginForm"){
          this.$router.push({name:"Main"},()=>{})
          }
          this.text="ログイン成功"
          this.snackbar=true
          this.fetchGlossaries();
      }else{
        this.deleteLoginUser();
        this.$router.push("/", () => {});
        this.text="ログアウト"
          this.snackbar=true
      }
    })
  },
  components: {
  },
  methods: {
    ...mapActions(["fetchGlossaries","searchGlossaries","toggleSideNav","setLoginUser","deleteLoginUser"]),
    searchName(name){
      if(name){
        this.searchGlossaries(name)
      }else{
        this.fetchGlossaries()
      }
    },
    reset(){
      this.search=""
      this.fetchGlossaries()
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.app{
  overflow-y: hidden;
}
</style>