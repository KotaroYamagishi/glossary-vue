<template>
  <v-dialog v-model="$store.state.category.dialog" width="500">
    <v-card>
      <v-card-title> カテゴリー追加 </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="addItem.name" label="カテゴリー名"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="add(addItem)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState,mapActions } from "vuex";

export default {
  name: "AddCategoryForm",
  data() {
    return {
      addItem:{
          id:undefined,
          name:undefined
      },
    };
  },
  computed: {
      ...mapState("category",["dialog"])
  },
  methods: {
    ...mapActions("category",["addCategory","toggleDialog"]),
    add(addItem) {
      this.addCategory(addItem)
      this.addItem = {};
      this.toggleDialog()
      }
    },
};
</script>

<style scoped>
.add-btn{
  background-color:green;
  color:white;
  border-radius:10px
}
</style>