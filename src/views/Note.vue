<template>
  <div>
    <v-row>
      <v-col cols="2" class="sidenav"><SideNav></SideNav></v-col>
      <v-col cols="10" class="categoryList"><CategoryList></CategoryList></v-col>
    </v-row>
  </div>
</template>

<script>
import SideNav from "../components/SideNav";
import CategoryList from "../components/CategoryList";

export default {
  name: "Note",
  data() {
    return {};
  },
  components: {
    SideNav,
    CategoryList,
  },
};
</script>

<style scoped>
.sidenav{
  background-color:#333333;
  height:730px;
}
.categoryList {
  overflow: auto;
  background-color:#555555
}
</style>