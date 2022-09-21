<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold Create a new model
    p Fill all the required fieds to upload your 3D model into Verden!
    form.mt-3
      .shadow(class="sm:overflow-hidden sm:rounded-md")
        .space-y-6.bg-white.px-4.py-5(class="sm:p-6")
          div
            label.block.text-sm.font-medium.text-gray-700(for="name") Name
            .mt-1
              input#name.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="name"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="My super project"
                required
                v-model="form.name"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(for="description") Description 
              span.text-gray-300 (Optional)
            .mt-1
              textarea#description.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="description" rows="3"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Now this is the story all about how, My life got flipped-turned upside down... "
                v-model="form.description"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(for="duration") Duration
            .mt-1
              input#duration.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="duration"
                type="number"
                step="0.01"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
                v-model="form.duration"
              )
            p.text-sm.text-gray-500 Print duration in minutes
          div
            label.block.text-sm.font-medium.text-gray-700(for="height") Height
            .mt-1
              input#height.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="height"
                type="number"
                step="0.01"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
                v-model="form.height"
              )
            p.text-sm.text-gray-500 Height in mm
          div
            label.block.text-sm.font-medium.text-gray-700(for="weight") Weight
            .mt-1
              input#weight.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="weight"
                type="number"
                step="0.01"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
                v-model="form.weight"
              )
            p.text-sm.text-gray-500 Weight in g
          div
            label.block.text-sm.font-medium.text-gray-700(for="printer") Printer 
              span.text-gray-300 (Optional)
            .mt-1
              input#printer.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="printer"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Formlabs Form 3BL"
                v-model="form.printer"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(for="material") Material 
              span.text-gray-300 (Optional)
            .mt-1
              input#material.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="material"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="PLA"
                v-model="form.material"
              )
        .py-3.text-right(class="sm:px-6")
          button.inline-flex.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(type="submit", class="hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" @click="save") Save
          p.text-sm.text-gray-700.mt-2 You will add assets like images and STL/OBJ later.
</template>

<script>
import ModelLoading from "@/components/ModelLoading.vue";
import ModelBoxCard from "@/components/ModelBoxCard.vue";

import { mapGetters } from "vuex";

export default {
  name: "CreateModelView",
  layout: "default",
  head: {
    title: "Create a new model · Verden",
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged"]),
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    if (!this.isLogged) window.location.href = "/signin?ref=/create";
  },
  methods: {
    save(event) {
      const f = this.form;

      if (f.name && f.duration && f.height && f.weight) {
        this.$store
          .dispatch("models/createModel", this.form)
          .then((response) => {
            console.log(response);
          });
      }
      event.preventDefault();
    },
  },
};
</script>
