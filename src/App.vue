<template>
  <div class="app">
    <the-side-menu />
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
    <scroll-button />
    <the-footer />
  </div>
</template>

<script lang="ts">
import ScrollButton from '@/components/ScrollButton.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheSideMenu from '@/components/TheSideMenu.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: { TheFooter, TheSideMenu, ScrollButton },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* background-image: linear-gradient(
      0deg,
      rgba(32, 0, 80, 0) to-rem(650),
      rgba(32, 0, 80, 1) 100%
    ),
    url('@/assets/background.jpg'); */

  /*  background-size: 100%, to-rem(440) cover; */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;

  /* @media screen and (min-width: to-rem(600)) {
    background-size: 100%, to-rem(650), cover;
  } */
}

.main {
  flex: 1;
}

.container {
  display: flex;
  flex-direction: column;
  gap: to-rem(20);
  max-width: to-rem(1100);
  padding: 0 to-rem(20);
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: to-rem(600)) {
    gap: to-rem(50);
  }
}

.scroll-button {
  position: fixed;
  bottom: to-rem(60);
  right: to-rem(50);
}
</style>
