<template lang="pug">
  .mx-auto.max-w-7xl.py-6(class="sm:px-6 lg:px-8")
    model-loading(v-if="isLoading")

</template>

<script>
import ModelLoading from "@/components/ModelLoading.vue";

import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  layout: "default",
  head: {
    title: "Verden - Social for 3D artists",
  },
  components: {
    "model-loading": ModelLoading,
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged"]),
  },
  created() {
    this.$store.dispatch("models/getModels");
  },
};
</script>
