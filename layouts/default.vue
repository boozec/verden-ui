<template>
  <div :class="$colorMode.preference == 'light' ? 'light' : 'dark'">
    <VHeader />
    <main>
      <Nuxt />
    </main>
  </div>
</template>
