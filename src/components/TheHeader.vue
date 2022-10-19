<template>
  <header :class="['header', { 'header--active': menuShown }]" id="header">
    <app-button class="header__open-button" text @click="toggleMenuVisibility">
      <template #prepend="{ attrs }">
        <transition>
          <close-icon v-if="menuShown" v-bind="attrs" />
          <menu-icon v-else v-bind="attrs" />
        </transition>
      </template>
    </app-button>
    <router-link class="header__logo" to="/">
      <app-logo width="192" height="32" />
    </router-link>
  </header>
</template>

<script lang="ts">
import CloseIcon from '@/assets/close.svg';
import MenuIcon from '@/assets/menu.svg';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
  components: { AppLogo, AppButton, MenuIcon, CloseIcon },
  props: {
    menuShown: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    'update:menu-shown': (value: boolean) => value,
  },
  methods: {
    toggleMenuVisibility() {
      this.$emit('update:menu-shown', !this.menuShown);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';

.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: to-rem(20);
  padding: to-rem(14) to-rem(20);
  margin-bottom: to-rem(20);
  z-index: 2;
  background: rgba(32, 0, 80, 0.4);
  backdrop-filter: blur(to-rem(8));
  transition: background 0.25s ease-out, backdrop-filter 0.25s ease-out;

  @media screen and (min-width: to-rem(600)) {
    margin-bottom: to-rem(56);
  }

  &--active {
    background: unset;
    backdrop-filter: unset;
  }

  &:not(&--active) &__logo {
    visibility: hidden;
    opacity: 0;

    @media screen and (min-width: to-rem(600)) {
      visibility: unset;
      opacity: unset;
    }
  }

  &:deep(.header__open-button) {
    padding: 0;
  }

  @media screen and (min-width: to-rem(600)) {
    padding: to-rem(20);
    background: unset;
    backdrop-filter: unset;
  }

  &__logo {
    transition: opacity 0.25s ease-out, visibility 0.25s ease-out;
  }
}

.v-enter-active,
.icon-leave-active {
  transition: opacity 0.25s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0;
}
</style>

<style lang="scss">
body:has(#header.header--active) {
  overflow: hidden;
}
</style>
