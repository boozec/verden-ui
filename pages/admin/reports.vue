<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Reports
    .grid.grid-cols-6.mt-3
      div
        admin-sidebar
      section#tables.col-span-5
        v-table(
          :keys="['id', 'model_id', 'created', 'updated', 'user', 'resolved', 'note', 'admin_note']"
          :fields="warnings"
        )
        pagination(:page="page" :pages="pages" v-if="count" path="/admin/reports")
</template>

<script>
import { mapGetters } from "vuex";

import AdminSidebar from "@/components/AdminSidebar.vue";
import Pagination from "@/components/Pagination.vue";
import VTable from "@/components/VTable.vue";

export default {
  name: "AdminView",
  head: { title: "Reports · Verden" },
  computed: {
    ...mapGetters("auth", ["isLogged", "me"]),
    ...mapGetters("warnings", ["warnings", "count"]),
  },
  data() {
    return {
      page: 0,
      pages: 0,
    };
  },
  components: {
    AdminSidebar,
    pagination: Pagination,
    "v-table": VTable,
  },
  async mounted() {
    await this.$store.dispatch("auth/findMe");

    if (!(this.isLogged && this.me && this.me.is_staff)) {
      window.location.href = "/";
    }

    this.page = this.$route.query.page ?? 0;
    this.$store.dispatch("warnings/getWarnings", this.page).then(() => {
      this.pages = Math.ceil(this.count / 20);
    });
  },
};
</script>
