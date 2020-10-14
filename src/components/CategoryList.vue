<template>
  <div>
    <v-app-bar>
      <v-btn @click="showAddNote">新規ノートブックの作成</v-btn>
    </v-app-bar>
    <AddCategoryForm></AddCategoryForm>
    <v-container>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-card
            v-for="category in $store.state.category.categories"
            :key="category.id"
            :class="[activeItem === category ? 'selected' : 'noselected']"
            @mouseover="activeItem = category"
            @mouseout="activeItem = ''"
            @dblclick="findGlossaries(category.id)"
          >
            <v-card-title>
              {{ category.name }}
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-icon color="green">mdi-pencil</v-icon>
                <v-icon color="red" @click="deleted(category.id)">mdi-delete</v-icon>
              </v-card-actions>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddCategoryForm from "../components/AddCategoryForm";

export default {
  name: "categoryList",
  data() {
    return {
      activeItem: "",
      selectedItem: "",
    };
  },
  computed: {
    ...mapState("category", ["categories", "category", "dialog"]),
  },
  components: {
    AddCategoryForm,
  },
  methods: {
    ...mapActions("category", [
      "findCategoryById",
      "editCategory",
      "deleteCategory",
      "toggleDialog",
    ]),
    ...mapActions("glossary", ["fetchGlossaries","findGlossariesByCategoryId"]),
    showAddNote() {
      this.toggleDialog();
    },
    findGlossaries(id) {
      console.log("cate.id=" + id);
      this.findGlossariesByCategoryId(id);
      this.$router.push("/main");
    },
    deleted(id) {
      if (confirm("削除してもよろしいですか？")) {
        this.deleteCategory(id);
        this.fetchGlossaries()
      }
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: #555555;
  color: #ffffff;
}
.noselected {
  background-color: #444444;
  color: #ffffff;
}
</style>