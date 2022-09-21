<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    model-loading(v-if="isLoading")
    section(v-else)
      .grid.grid-cols-1.gap-4(class="md:grid-cols-4")
        model-box-card(
          v-for="model in models"
          :key="model.id"
          :model="model"
        )
</template>

<script>
import ModelLoading from "@/components/ModelLoading.vue";
import ModelBoxCard from "@/components/ModelBoxCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  layout: "default",
  head: {
    title: "Verden - Social for 3D artists",
  },
  components: {
    "model-loading": ModelLoading,
    "model-box-card": ModelBoxCard,
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged"]),
    ...mapGetters("models", ["models"]),
  },
  created() {
    this.$store.dispatch("models/getModels");
  },
};
</script>
