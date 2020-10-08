<template>
  <div>
    <v-row>
      <v-col cols="2" class="sidenav"><SideNav></SideNav></v-col>
      <v-col cols="2" class="glossaryList"><GlossaryList></GlossaryList></v-col>
      <v-col cols="8" class="detail"><Glossary></Glossary></v-col>
    </v-row>
  </div>
</template>

<script>
import GlossaryList from "../components/GlossaryList";
import Glossary from "../components/Glossary";
import SideNav from "../components/SideNav";

export default {
  components: {
    GlossaryList,
    Glossary,
    SideNav,
  },
};
</script>

<style scoped>
.detail {
  overflow: auto;
  background-color:#555555
}
.glossaryList{
  background-color:#444444
}
.sidenav{
  background-color:#333333
}
</style>