<template lang="pug">
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
        button.inline-flex.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(
          type="submit"
          :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2': true, 'opacity-25 cursor-default': isLoading}"
          :disabled="isLoading"
          :readonly="isLoading"
          @click="save"
        )
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          | Save
        p.text-sm.text-gray-700.mt-2(v-if="!form.id") You will add assets like images and STL/OBJ later.
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModelForm",
  props: ["data"],
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  created() {
    if (this.data) this.form = { ...this.data };
  },
  methods: {
    save(event) {
      const f = this.form;

      if (f.name && f.duration && f.height && f.weight) {
        const action = this.form.id ? "models/editModel" : "models/createModel";
        this.$store.dispatch(action, this.form).then((response) => {
          if (response.status == 201 || response.status == 200) {
            this.$toast.success("Model has been saved");
            setTimeout(() => {
              window.location.href = "/models/" + response.data.id;
            }, 1000);
          } else {
            this.$toast.error(response.data.error);
          }
        });
      }
      event.preventDefault();
    },
  },
};
</script>
