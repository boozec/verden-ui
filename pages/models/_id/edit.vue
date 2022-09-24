<template lang="pug">
  .mx-auto.w-90p.py-6#modelpage(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold Edit {{ model.name }}
    model-form(:data="model" v-if="model.id")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModelEditView",
  layout: "default",
  data() {
    return {
      model: {},
    };
  },
  head() {
    return {
      title: "Edit " + this.model.name + " · Verden",
    };
  },
  components: {},
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
  },
  async created() {
    this.id = this.$route.params.id;
    this.baseAPI = this.$config.api;

    if (!this.isLogged) {
      window.location.href = "/models/" + this.id;
    } else {
      await this.$store.dispatch("auth/findMe");
      this.$store.dispatch("models/findModel", this.id).then((response) => {
        if (response.status != 200) {
          window.location.href = "/models";
        } else {
          this.model = response.data;
          if (!(this.model.author_id == this.me.id || this.me.is_staff)) {
            window.location.href = "/models/" + this.id;
          }
        }
      });
    }
  },
  methods: {},
};
</script>
