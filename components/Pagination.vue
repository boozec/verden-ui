<template lang="pug">
  .mt-10.text-center
    nav.isolate.inline-flex.-space-x-px.rounded-md.shadow-sm(aria-label="Pagination")
      a.relative.inline-flex.items-center.rounded-l-md.border.border-gray-300.bg-white.px-2.py-2.text-sm.font-medium.text-gray-500(
        :href="(page == 0) ? '#' : '/?page='+incrPage(-1)"
        :class="{'hover:bg-gray-50 focus:z-20': true, 'cursor-not-allowed opacity-20': page < 1}"
      )
        span.sr-only Previous
        svg.h-5.w-5(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
          path(fill-rule="evenodd", d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z", clip-rule="evenodd")
      a.relative.z-10.inline-flex.items-center.border.border-gray-300.px-4.py-2.text-sm.font-medium.text-gray-500.bg-white(
        :href="'/?page='+(i-1)" aria-current="page"
        :class="{'focus:z-20': true, 'bg-green-50 text-green-600 border-green-500': page == (i-1)}"
        v-for="i in pages"
      ) {{ i-1 }}
      a.relative.inline-flex.items-center.rounded-r-md.border.border-gray-300.bg-white.px-2.py-2.text-sm.font-medium.text-gray-500(
        :href="(page == (pages-1)) ? '#' : '/?page='+incrPage(1)"
        :class="{'hover:bg-gray-50 focus:z-20': true, 'cursor-not-allowed opacity-20': page == (pages-1)}"
      )
        span.sr-only Next
        svg.h-5.w-5(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
          path(fill-rule="evenodd", d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clip-rule="evenodd")
  </template>

<script>
export default {
  name: "Pagination",
  props: ["page", "pages"],
  methods: {
    incrPage(value) {
      return Number(this.page) + value;
    },
  },
};
</script>
