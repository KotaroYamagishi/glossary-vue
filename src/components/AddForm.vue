<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-icon class="add-btn">+</v-icon> 新規用語
          </span>
    </template>
    <v-card>
      <v-card-title> 用語追加 </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="addItem.name" label="単語"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                v-model="addItem.description"
                label="説明"
              ></v-textarea>
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
import { mapActions } from "vuex";

export default {
  name: "AddForm",
  data() {
    return {
      dialog: false,
      addItem: {},
    };
  },
  methods: {
    ...mapActions("glossary",["addGlossary", "firstAddGlossary"]),
    add(item) {
        if (this.$store.state.glossary.glossaries) {
          this.addGlossary(item);
      } else {
        this.firstAddGlossary(item);
      }
      this.addItem = {};
      this.dialog = false;
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