<template>
  <v-container>
    <v-layout warp>
      <v-flex xs12 class="list">
        <v-row
          align-content="center"
          v-for="(glossary, index) in glossaries"
          :key="index"
        >
          <v-card
            width="200"
            hover
            class="ma-2"
            :color="
              $store.state.selectedGlossary &&
              index === $store.state.selectedIndex
                ? 'black'
                : '#333333'
            "
            dark
            @click="showDetail(glossary, index)"
          >
            <v-card-title>{{ glossary.name }}</v-card-title>
            <v-card-text>
              {{ glossary.description }}
            </v-card-text>
          </v-card>
          <!-- {{ glossary.editTime | moment }} -->
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import moment from "moment";

export default {
  name: "Glossary",
  data() {
    return {
      headers: [
        { text: "用語名", value: "name" },
        { text: "説明", value: "description" },
      ],
    };
  },
  computed: {
    ...mapState(["glossaries"]),
  },
  // filters: {
  //   moment: function (date) {
  //     console.log(date);
  //     return moment(date).format("YYYY/MM/DD HH:mm"); // eslint-disable-line
  //   },
  // },
  methods: {
    ...mapActions(["findById", "deleteGlossary"]),
    showDetail(glossary, index) {
      this.$store.state.selectedGlossary = glossary;
      this.$store.state.selectedIndex = index;
      this.findById(glossary.id);
    },
  },
};
</script>

<style scoped>
.list {
  width: 300px;
  height: 700px;
  overflow: auto;
}
.card{
  background-color:black;
  color: white;
}
</style>