<template>
  <div :class="$colorMode.preference">
    <VHeader />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      const dark = document.querySelector("#__layout .dark");
      console.log(dark);
      if (dark) {
        document.querySelector("body").className = "dark";
      } else {
        document.querySelector("body").className = "";
      }
    }, 1000);
  },
};
</script>
