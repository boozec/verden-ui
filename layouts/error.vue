<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    section
      h1.text-3xl.font-bold(class="dark:text-white") Oh no, you shall not pass!
      a.cursor-pointer(class="dark:text-white hover:underline" @click="goback") Go back to your path!
</template>

<script>
export default {
  methods: {
    goback() {
      window.history.back();
    },
  },
};
</script>
