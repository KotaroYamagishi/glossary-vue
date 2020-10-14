<template>
    <v-list class="list">
      <v-list-item>
        
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-account</v-icon>:   {{ username }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="toLogin">
        <v-list-item-content> アカウント切り替え </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-content> LOGOUT </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$store.state.login_user">
        <AddForm></AddForm>
      </v-list-item>
      <v-list-item @click="toNote">
        <v-list-item-icon>
          <v-icon>mdi-book</v-icon>
        </v-list-item-icon>
        <v-list-item-content> NOTE </v-list-item-content>
      </v-list-item>
      <v-list-item @click="toHome">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content> HOME </v-list-item-content>
      </v-list-item>
    </v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddForm from "../components/AddForm";

export default {
  name: "SideNsav",
  data() {
    return {};
  },
  components: {
    AddForm
  },
  computed: {
    ...mapGetters(["username"]),
  },
  methods: {
    ...mapActions(["logout"]),
    toHome() {
      this.$router.push("/main");
    },
    toLogin(){
      this.$router.push("/");
    },
    toNote(){
      this.$router.push("/note");
    }
  },
};
</script>

<style scoped>
.list{
  background-color:"black"
}
</style>