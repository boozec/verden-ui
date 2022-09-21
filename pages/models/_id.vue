<template lang="pug">
  .mx-auto.max-w-7xl.py-6#modelpage(class="sm:px-6 lg:px-8")
    section.mb-5
      h1.text-3xl.font-bold.border-green-500.border-b-2.pb-3.w-max {{ model.name }}

    .images.shadow-sm.rounded-lg.bg-white.p-4.w-full
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
              :class="{'border-green-700 drop-md': selectedUpload == i}"
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

    section.mt-5
      .grid.grid-cols-6.gap-5.mb-5
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full
          h3.font-bold Created: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          p(:title="model.created|moment('DD/MM/YYYY HH:mm')") {{ model.created|moment("DD/MM/YYYY") }}
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full
          h3.font-bold Duration: 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
          </svg>
          p {{ model.duration }}m
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full
          h3.font-bold Height: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
          p {{ model.height }}mm
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full
          h3.font-bold Weight: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
          </svg>
          p {{ model.weight }}g
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(v-if="model.printer")
          h3.font-bold Printer: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
          p {{ model.printer }}
        .card.shadow-sm.rounded-lg.bg-white.p-4.w-full(v-if="model.material")
          h3.font-bold Material: 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          p {{ model.material }}

    button.card.shadow-sm.rounded-lg.bg-green-700.text-white.p-4.w-full.duration-200(
      :class="{'hover:shadow-lg hover:bg-green-800': true, 'rounded-b-none': boxFilesToDownload}"
      v-if="model.uploads"
      @click="boxFilesToDownload = !boxFilesToDownload"
    )
      span(v-if="!boxFilesToDownload") Show files ({{ model.uploads.length }})
      span(v-else) Close files box ({{ model.uploads.length }})
    .bg-green-50(v-if="boxFilesToDownload")
      ul.divide-y.divide-gray-200.rounded-b-md.border.border-gray-200(role="list")
        li.flex.items-center.justify-between.py-3.pl-3.pr-4.text-sm(v-for="upload in model.uploads" :key="upload.id")
          .flex.w-0.flex-1.items-center
            svg.h-5.w-5.flex-shrink-0.text-gray-400(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
              path(fill-rule="evenodd", d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z", clip-rule="evenodd")
            span.ml-2.w-0.flex-1.truncate {{ getFileName(upload.filepath) }}
          .ml-4.flex-shrink-0
            a.font-medium.text-black-700(:href="baseAPI + '' + upload.filepath" target="_new" download class="hover:underline") Download


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
      boxFilesToDownload: false,
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
    getFileName(path) {
      return path.split("/").at(-1);
    },
  },
};
</script>
