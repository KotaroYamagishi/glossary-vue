<template>
  <v-container class="signin">
    <v-layout wrap>
      <v-flex xs12>
        <h2>SignIn</h2>
      </v-flex>
      <v-flex xs12>
        <v-btn color="black" dark @click="login"
          >googleアカウントでログイン</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      snackbar: false,
    };
  },
  components: {},
  methods: {
    ...mapActions(["login"]),
  },
};
</script>

<style scoped>
.sidenav {
  background-color: #333333;
}
.signin{
  height:710px
}
h2{
  color: #ffffff;
}
</style>