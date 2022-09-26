<template lang="pug">
  .shadow-sm.rounded-lg.bg-white.p-4.w-full.mb-5(v-if="warnings.length")
    h2.text-xl.font-bold(v-if="me && me.is_staff") Reports 
    h2.text-xl.font-bold(v-else) My reports

    ul.divide-y.divide-gray-200.rounded-md.border.border-gray-200.mt-3(role="list" v-if="me && !me.is_staff")
      li.py-3.pl-3.pr-4.text-sm(v-for="warning in warnings" :key="warning.id")
        h3.flex.leading-6.mb-2.float-right
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          | {{ warning.created|moment("DD/MM/YYYY HH:mm") }}
        p {{ warning.note }}
    ul.divide-y.divide-gray-200.rounded-md.border.border-gray-200.mt-3(role="list" v-else-if="me && me.is_staff")
      li.py-3.pl-3.pr-4.text-sm(v-for="warning in warnings" :key="warning.id")
        h3.flex.leading-6.mb-2.float-right
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          | {{ warning.created|moment("DD/MM/YYYY HH:mm") }}
        p {{ warning.note }}

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModelReportsList",
  props: ["model"],
  computed: {
    ...mapGetters("auth", ["me"]),
    ...mapGetters("warnings", ["warnings"]),
  },
  mounted() {
    this.$store.dispatch("warnings/filterWarnings", { model_id: this.model });
  },
};
</script>
