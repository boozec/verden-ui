<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold Settings
    p Change your informations

    form.mt-3(v-if="me")
      .overflow-hidden.shadow(class="sm:rounded-md")
        .space-y-6.bg-white.px-4.py-5(class="sm:p-6")
          div
            label.block.text-sm.font-medium.text-gray-700(for="name") Name
            .mt-1
              input#name.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="name"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="John Doe"
                v-model="form.name"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(for="username") Username
            .mt-1
              input#email.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="username"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="john"
                v-model="form.username"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(for="email") Email
            .mt-1
              input#email.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                type="email"
                name="email"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="john@example.com"
                v-model="form.email"
              )
        .py-3.px-4.text-right(class="sm:px-6")
          button.inline-flex.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(
            type="submit"
            :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2': true, 'opacity-25 cursor-default': isLoading}"
            :disabled="isLoading"
            :readonly="isLoading"
            @click="save"
          )
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            | Save

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SettingsView",
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    if (!this.isLogged) window.location.href = "/signin?ref=/settings";
  },
  watch: {
    me: function (value) {
      this.form = { ...value };
    },
  },
  methods: {
    save(event) {
      const f = this.form;

      if (f.username && f.email) {
        this.$store.dispatch("users/editUser", f).then((response) => {
          if (response.status == 200) {
            this.$toast.success("User has been saved");
            setTimeout(() => {
              window.location.href = "/settings";
            }, 1000);
          } else {
            this.$toast.error(response.data.error);
          }
        });
      }
      event.preventDefault();
    },
  },
};
</script>
