<template>
  <div>
    <v-row>
      <v-col cols="2" class="sidenav"><SideNav></SideNav></v-col>
      <v-col cols="2" class="glossaryList"><GlossaryList></GlossaryList></v-col>
      <v-col cols="8" class="detail"><Glossary></Glossary></v-col>
    </v-row>
    <v-dialog v-model="category_dialog" max-width="290">
      <v-container class="category-dialog">
        <v-layout wrap>
          <v-row>
            ノートの移動
          </v-row>
          <v-row>
            <v-list>
              <v-list-item v-for="category in categories" :key="category.id" @click="editCategoryGlossary(category.id)">
                <v-icon>mdi-book</v-icon>{{category.name}}
              </v-list-item>
            </v-list>
          </v-row>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import GlossaryList from "../components/GlossaryList";
import Glossary from "../components/Glossary";
import SideNav from "../components/SideNav";
import {mapState,mapActions} from "vuex"

export default {
  components: {
    GlossaryList,
    Glossary,
    SideNav,
  },
  computed: {
    ...mapState(["category_dialog"]),
    ...mapState("category",["categories"]),
    ...mapState("glossary",["detail"])
  },
  methods:{
    ...mapActions(["toggleCategoryDialog"]),
    ...mapActions("glossary",["editGlossary"]),
    editCategoryGlossary(categoryId){
      this.detail.categoryId= categoryId
      console.log(this.detail)
      this.editGlossary(this.detail)
      this.toggleCategoryDialog()
    }
  }
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
.category-dialog{
  background-color:white
}
</style>