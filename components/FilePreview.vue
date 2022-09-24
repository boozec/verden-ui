<template lang="pug">
  .file-preview.h-full.overflow-hidden
    img.h-full.block.mx-auto(
      v-if="isImage(path)"
      :src="baseAPI + '' + path"
    )
    model-stl(
      v-else-if="isStl(path)"
      :rotate="rotate"
      :src="baseAPI + '' + path"
      :backgroundColor="bg ? bg : '#D1D5DB'"
      :controlsOptions="{'enablePan': controls ? true : false, 'enableZoom': controls ? true : false, 'enableRotate': controls ? true : false}"
    )
    model-obj(
      v-else-if="isObj(path)"
      :src="baseAPI + '' + path"
      :backgroundColor="bg ? bg : '#D1D5DB'"
      :controlsOptions="{'enablePan': controls ? true : false, 'enableZoom': controls ? true : false, 'enableRotate': controls ? true : false}"
    )
</template>

<script>
import { ModelStl, ModelObj } from "vue-3d-model";

export default {
  name: "FilePreview",
  props: ["path", "bg", "controls"],
  data() {
    return {
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
    ModelObj,
  },
  created() {
    this.baseAPI = this.$config.api;
  },
  methods: {
    checkExt(path, ext) {
      return path.indexOf("." + ext) > 0;
    },
    isImage(path) {
      return (
        this.checkExt(path, "png") ||
        this.checkExt(path, "jpg") ||
        this.checkExt(path, "jpeg") ||
        this.checkExt(path, "webp")
      );
    },
    isStl(path) {
      return this.checkExt(path, "stl") || this.checkExt(path, "sla");
    },
    isObj(path) {
      return this.checkExt(path, "obj") || this.checkExt(path, "octet-stream");
    },
  },
};
</script>
