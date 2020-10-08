<template>
  <v-row>
    <v-col cols="2" class="sidenav"><SideNav></SideNav></v-col>
    <v-col cols="10" class="signin"><SignIn></SignIn></v-col>
  </v-row>
</template>

<script>
import SignIn from "../components/SignIn";
import SideNav from "../components/SideNav";

export default {
  components: {
    SignIn,
    SideNav,
  },
};
</script>

<style scoped>
.sidenav {
  background-color: #333333;
}
.signin {
  background-color: #555555;
}
</style>