<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-row>
          <v-col class="namefield">
            <v-text-field dark v-model="detail.name"></v-text-field>
          </v-col>
          <v-col>
            <v-icon color="green" @click="edit(detail)">mdi-pencil</v-icon>
            <v-icon color="red" @click="deleted(detail.id)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-flex>
      <v-flex xs12 class="memo">
        <v-textarea
          dark
          outlined
          v-model="detail.description"
          height="600"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Glossary",
  data() {
    return {
      editDetail: {
        name: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapState(["detail"]),
  },
  updated() {
  },
  methods: {
    ...mapActions(["addGlossary", "editGlossary", "deleteGlossary"]),
    edit(detail) {
      this.editDetail = detail;
      if (detail.id) {
        this.editGlossary(this.editDetail);
      } else {
        this.addGlossary(this.editDetail);
      }
    },
    deleted(id) {
      if (confirm("削除してもよろしいですか？")) {
        this.deleteGlossary(id);
      }
    },
  },
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 650px;
  background-color: red;
}
.namefield {
  font-family: bold;
}
.memo{
overflow: auto;
}
</style>