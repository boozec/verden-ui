<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Users
    .grid.grid-cols-6.mt-3
      div
        admin-sidebar
      section#tables.col-span-5
        v-table(
          :keys="['id', 'avatar', 'username', 'email', 'is_staff', 'name']"
          :fields="users"
          path="/users/"
        )
</template>

<script>
import { mapGetters } from "vuex";

import AdminSidebar from "@/components/AdminSidebar.vue";
import VTable from "@/components/VTable.vue";

export default {
  name: "AdminView",
  head: { title: "Admin panel · Verden" },
  computed: {
    ...mapGetters("auth", ["isLogged", "me"]),
    ...mapGetters("users", ["users"]),
  },
  components: { AdminSidebar, "v-table": VTable },
  async mounted() {
    await this.$store.dispatch("auth/findMe");

    if (!(this.isLogged && this.me && this.me.is_staff)) {
      window.location.href = "/";
    }

    this.$store.dispatch("users/getUsers", { page: 0 });
  },
};
</script>
