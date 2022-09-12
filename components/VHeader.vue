<template lang="pug">
  nav.bg-green-800
    .mx-auto.max-w-7xl.px-2(class="sm:px-6 lg:px-8")
      .relative.flex.h-16.items-center.justify-between
        .absolute.inset-y-0.left-0.flex.items-center(class="sm:hidden")
          button.inline-flex.items-center.justify-center.rounded-md.p-2.text-gray-400(
            type="button" class="hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
            @click="boxInfo = !boxInfo"
          )
            span.sr-only Open main menu
            svg.block.h-6.w-6(xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true")
              path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5")
            svg.hidden.h-6.w-6(xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true")
              path(stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12")
        .flex.flex-1.items-center.justify-center(class="sm:items-stretch sm:justify-start")
          .flex.flex-shrink-0.items-center
            img.block.h-8.w-auto(src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company")
          .hidden(class="sm:ml-6 sm:block")
            .flex.space-x-4
              a.text-white.px-3.py-2.rounded-md.text-sm.font-medium(:class="[routeName == 'index' ? 'bg-green-900': 'text-gray-300']" href="#" aria-current="page") Home
              a.text-white.px-3.py-2.rounded-md.text-sm.font-medium(:class="[routeName == 'models' ? 'bg-green-900': 'text-gray-300']" href="#" aria-current="page") Models
        .absolute.inset-y-0.right-0.flex.items-center.pr-2(class="sm:static sm:inset-auto sm:ml-6 sm:pr-0")
          .relative.ml-3
            div
              button#user-menu-button.flex.rounded-full.bg-green-800.text-sm(
                type="button" class="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800" aria-expanded="false" aria-haspopup="true"
                @click="boxUserInfo = !boxUserInfo"
              )
                span.sr-only Open user menu
                img.h-8.w-8.rounded-full(src="https://avatars.githubusercontent.com/u/20584215" alt="Avatar")
            .absolute.right-0.z-10.mt-2.w-48.origin-top-right.rounded-md.bg-white.py-1.shadow-lg.ring-1.ring-black.ring-opacity-5(class="focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-if="boxUserInfo")
              a#user-menu-item-0.block.px-4.py-2.text-sm.text-gray-700(href="#" role="menuitem" tabindex="-1") Your Profile
              a#user-menu-item-1.block.px-4.py-2.text-sm.text-gray-700(href="#" role="menuitem" tabindex="-1") Settings
              a#user-menu-item-2.block.px-4.py-2.text-sm.text-gray-700(href="#" role="menuitem" tabindex="-1") Sign out
    #mobile-menu(class="sm:hidden" v-if="boxInfo")
      .space-y-1.px-2.pt-2.pb-3
        a.text-white.block.px-3.py-2.rounded-md.text-base.font-medium(:class="[routeName == 'index' ? 'bg-green-900': 'text-gray-300']" href="#" aria-current="page") Home
        a.text-white.block.px-3.py-2.rounded-md.text-base.font-medium(:class="[routeName == 'models' ? 'bg-green-900': 'text-gray-300']" href="#" aria-current="page") Models
</template>

<script>
export default {
  name: "VHeader",
  data() {
    return {
      boxInfo: false,
      boxUserInfo: false,
      routeName: "",
    };
  },
  created() {
    this.routeName = this.$route.name;
  },
};
</script>
