<template lang="pug">
  .mx-auto.max-w-7xl.py-6#modelpage(class="sm:px-6 lg:px-8")
    .images.shadow-sm.rounded-lg.bg-white.p-4.w-full.w-full
      .block.gap-4.h-full(class="md:flex")
        .w-full(class="md:w-4/5")
          .image.bg-gray-900.border-2.rounded-xl.w-full.h-full.overflow-hidden(v-if="model.uploads && model.uploads[selectedUpload]")
            img.h-full.block.mx-auto(
              v-if="isImage(model.uploads[selectedUpload].filepath)"
              :src="baseAPI + '' + model.uploads[selectedUpload].filepath"
            )
            model-stl(
              v-else
              :rotate="rotate"
              :src="baseAPI + '' + model.uploads[selectedUpload].filepath"
              :backgroundColor="'#111827'"
            )
        .w-full.mt-8(class="md:w-1/5 md:mt-0" v-if="model")
          .grid.grid-cols-3.gap-4.h-full.overflow-y-auto.grid-mini(class="md:grid-cols-2")
            .border-2.border-gray-300.bg-gray-300.w-24.h-24.rounded-xl.grid.items-center.justify-items-center.overflow-hidden.cursor-pointer(
              v-for="upload, i in model.uploads"
              :key="upload.id"
              :class="{'border-green-700 shadow-md': selectedUpload == i}"
              @click="selectedUpload = i"
            )
              img(
                v-if="isImage(upload.filepath)"
                :src="baseAPI + '' + upload.filepath"
              )
              model-stl(
                v-else
                :rotate="rotate"
                :src="baseAPI + '' + upload.filepath"
                :backgroundColor="'#D1D5DB'"
                :controlsOptions="{'enablePan': false, 'enableZoom': false, 'enableRotate': false}"
              )
</template>

<script>
import { ModelStl } from "vue-3d-model";

export default {
  name: "ModelView",
  layout: "default",
  data() {
    return {
      id: 0,
      model: {},
      selectedUpload: -1,
      baseAPI: "",
      rotate: {
        x: -Math.PI / 2,
        y: 0,
        z: 0,
      },
    };
  },
  components: {
    ModelStl,
  },
  created() {
    this.id = this.$route.params.id;
    this.baseAPI = this.$config.api;

    this.$store.dispatch("models/findModal", this.id).then((response) => {
      if (response.status != 200) {
        window.location.href = "/models";
      } else {
        this.model = response.data;
        if (this.model.uploads) {
          this.selectedUpload = 0;
        }
      }
    });
  },
  methods: {
    isImage(path) {
      return (
        path.indexOf(".png") > 0 ||
        path.indexOf(".jpg") > 0 ||
        path.indexOf(".jpeg") > 0 ||
        path.indexOf(".webp") > 0
      );
    },
  },
};
</script>
