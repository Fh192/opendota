<template>
  <footer class="footer">
    <span class="footer__text" lang="en">2022© OpenDota</span>
    <div class="footer__links">
      <router-link class="footer__text" to="/">О нас</router-link>
      <router-link class="footer__text" to="/">
        Политика конфидициальности
      </router-link>
      <a class="footer__text" href="https://docs.opendota.com/" target="_blank">
        Документация API
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheFooter',
});
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
@import '@/scss/functions.scss';

.footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: to-rem(10);
  background-color: rgba($color-shade-violet, 0.25);
  gap: to-rem(20);
  margin-top: to-rem(54);

  @media screen and (min-width: to-rem(600)) {
    padding: to-rem(25.5) to-rem(80);
    flex-direction: row;
  }

  &__text {
    color: $color-brightest-violet;
    text-decoration: none;
    white-space: nowrap;
  }

  &__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: to-rem(5);

    @media screen and (min-width: to-rem(600)) {
      flex-direction: row;
      gap: to-rem(40);
    }
  }
}
</style>
