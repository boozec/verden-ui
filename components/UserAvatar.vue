<template lang="pug">
  div(v-if="data")
    img.h-8.w-8.rounded-full(v-if="data.avatar" :src="baseAPI+''+data.avatar" alt="Avatar")
    span.h-8.w-8.rounded-full.bg-gray-100.text-center.pt-1.block(v-else) {{ data.username[0] }}
</template>

<script>
export default {
  name: "UserAvatar",
  props: ["data"],
  data() {
    return {
      baseAPI: "",
    };
  },
  created() {
    this.baseAPI = this.$config.api;
  },
};
</script>
