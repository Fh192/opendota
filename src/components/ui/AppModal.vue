<template>
  <slot v-bind="activatorProps" name="activator" />
  <teleport to="body">
    <transition name="dissolve">
      <div
        v-if="shown"
        class="app-modal"
        aria-modal="true"
        role="dialog"
        @click="onClose"
      >
        <div
          class="app-modal__content"
          ref="modal"
          tabindex="0"
          @click.stop
          @keydown.esc="onClose"
        >
          <header>
            <h2 v-if="title" class="app-modal__title" v-text="title" />
            <app-button
              class="app-modal__close-button"
              color="black"
              text
              @click="onClose"
            >
              <template #prepend="{ attrs }">
                <close-icon v-bind="attrs" />
              </template>
            </app-button>
          </header>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import CloseIcon from '@/assets/close.svg';
import AppButton from '@/components/ui/AppButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppModal',
  components: { AppButton, CloseIcon },
  props: {
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (value: boolean) => true,
    close: null,
    open: null,
  },
  data() {
    return {
      shown: this.modelValue,
    };
  },
  computed: {
    activatorProps() {
      return {
        attrs: {},
        on: { click: this.onOpen },
      };
    },
  },
  methods: {
    onClose() {
      this.shown = false;
      this.$emit('update:modelValue', false);
      this.$emit('close');
    },
    onOpen() {
      this.shown = true;
      this.$emit('update:modelValue', true);
      this.$emit('open');
    },
  },
  watch: {
    modelValue(value: boolean) {
      this.shown = value;
    },
    async shown(value: boolean) {
      if (!value) return undefined;

      await this.$nextTick();

      const modal = this.$refs.modal as HTMLElement;
      modal.focus();
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba($color-violet, 80%);
  z-index: 100;

  &__content {
    position: relative;
    background: $color-white;
    padding: to-rem(40) to-rem(80);
    border-radius: to-rem(10);
    box-shadow: to-rem(0) to-rem(32) to-rem(28) to-rem(-48)
      rgba(16, 0, 37, 0.25);
    outline: none;
  }

  &__title {
    font-weight: 700;
    font-size: to-rem(48);
    line-height: to-rem(58);
    background: linear-gradient(88.92deg, #7540f0 0.38%, #7b61ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: to-rem(36);
  }

  &__close-button {
    position: absolute;
    top: to-rem(20);
    right: to-rem(20);
    padding: 0 !important;
  }
}
</style>
