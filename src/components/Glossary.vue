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
            <v-menu
              v-model="showMenu"
              absolute
              offset-y
              style="max-width: 600px"
            >
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" dark> mdi-menu </v-icon>
              </template>
              <v-list dark dense>
                <!-- ダイアログみたいなものを表示、クリックしたカテゴリーを追加 -->
                <v-list-item @click="toggleCategoryDialog">
                  <v-icon>mdi-book</v-icon>ノートを移動する
                </v-list-item>
                <v-list-item @click="deleted(detail.id)">
                  <v-icon color="red">mdi-delete</v-icon>メモを削除する
                </v-list-item>
              </v-list>
            </v-menu>
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
      showMenu: false,
    };
  },
  computed: {
    ...mapState("glossary", ["detail"]),
  },
  updated() {},
  methods: {
    ...mapActions(["toggleCategoryDialog"]),
    ...mapActions("glossary", [
      "addGlossary",
      "editGlossary",
      "deleteGlossary",
    ]),
    edit(detail) {
      if (detail.id) {
        this.editGlossary(detail);
      } else {
        this.addGlossary(detail);
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
.memo {
  overflow: auto;
}
</style>