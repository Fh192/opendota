<template>
  <the-header v-model:menu-shown="shown" />
  <transition name="dissolve">
    <div v-if="shown" class="side-menu" @mouseleave="close">
      <nav class="side-menu__nav">
        <ul class="side-menu__routes-list">
          <li
            v-for="{ name, to, disabled } in routes"
            :key="to"
            class="side-menu__route"
          >
            <app-button text block :to="to" :disabled="disabled">
              <template #append="{ attrs }">
                <arrow-icon v-bind="attrs" />
              </template>
              {{ name }}
            </app-button>
          </li>
        </ul>
      </nav>
      <app-button to="/login" outlined block>
        <template #prepend="{ attrs }">
          <user-icon v-bind="attrs" />
        </template>
        Вход
      </app-button>
    </div>
  </transition>
</template>

<script lang="ts">
import ArrowIcon from '@/assets/arrow.svg';
import CloseIcon from '@/assets/close.svg';
import MenuIcon from '@/assets/menu.svg';
import UserIcon from '@/assets/user.svg';
import TheHeader from '@/components/TheHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import { defineComponent } from 'vue';

interface Route {
  name: string;
  to: string;
  disabled?: boolean;
}

export default defineComponent({
  name: 'TheSideMenu',
  components: {
    TheHeader,
    AppButton,
    AppLogo,
    UserIcon,
    ArrowIcon,
    MenuIcon,
    CloseIcon,
  },
  data() {
    return {
      shown: false,
      routes: [
        { name: 'Список матчей', to: '/matches' },
        { name: 'Список команд', to: '/teams' },
        { name: 'Сравнение команд', to: '/', disabled: true },
      ] as Route[],
    };
  },
  methods: {
    close(e?: MouseEvent): MouseEvent | undefined {
      this.shown = false;

      return e;
    },
  },
  watch: {
    '$route.fullPath'() {
      this.close();
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: to-rem(16);
  padding: to-rem(20);
  padding-top: to-rem(110);
  background: rgba($color-violet, 0.8);
  backdrop-filter: blur(to-rem(8));
  width: 100%;
  height: 100vh;
  z-index: 1;

  @media screen and (min-width: to-rem(600)) {
    max-width: to-rem(385);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: to-rem(20);
    margin-bottom: to-rem(40);
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);
    flex: 1;
  }

  &__route {
    list-style-type: none;

    &:deep(.button) {
      padding: to-rem(16) 0;
      justify-content: space-between;
    }
  }

  &:deep(.side-menu__open-button) {
    padding: 0;
  }
}
</style>
