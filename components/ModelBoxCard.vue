<template lang="pug">
  .model.shadow-sm.rounded-lg.bg-white.p-4.w-full.h-80.duration-300(
    class="hover:ease-out hover:shadow-md"
  )
    a(:href="'/models/'+model.id")
      .image.bg-gray-900.rounded-xl.w-full.h-48
        img(
          v-if="coverImage >= 0"
          :src="baseAPI + '' + model.uploads[coverImage].filepath"
        )

    .space-y-3.mt-5
      h1.truncate.text-xl.font-medium 
        a(:href="'/models/'+model.id" class="hover:underline") {{ model.name }}
      div
        .mr-3.float-left
          user-avatar(:data="model.author")
        p.leading-8
          a.text-green-800(class="hover:text-green-700" :href="'/users/'+model.author.username")
            | @
            span.underline {{ model.author.username }}

</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "ModelBoxCard",
  props: ["model"],
  components: {
    "user-avatar": UserAvatar,
  },
  data() {
    return {
      coverImage: -1,
      baseAPI: "",
    };
  },
  methods: {
    imageIndex(uploads) {
      if (!uploads) return -1;

      for (const i in uploads) {
        if (
          uploads[i].filepath.indexOf(".png") ||
          uploads[i].filepath.indexOf(".jpg") ||
          uploads[i].filepath.indexOf(".jpeg") ||
          uploads[i].filepath.indexOf(".webp")
        )
          return i;
      }

      return -1;
    },
  },
  created() {
    this.coverImage = this.imageIndex(this.model.uploads);
    this.baseAPI = this.$config.api;
  },
};
</script>
