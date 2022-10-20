<template>
  <div class="app-table">
    <header v-if="$slots.append" class="app-table__append">
      <slot name="append" />
    </header>
    <table>
      <thead v-if="$slots.header" class="app-table__header">
        <slot name="header" />
      </thead>
      <tbody v-if="$slots.body" class="app-table__body">
        <slot name="body" />
        <tr v-if="loading">
          <td><app-loader /></td>
        </tr>
      </tbody>
      <tfoot v-if="$slots.footer" class="app-table__footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import AppLoader from './AppLoader.vue';
export default {
  name: 'AppTable',
  components: { AppLoader },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.app-table {
  overflow: auto;

  &__append {
    display: flex;
    align-items: center;
    gap: to-rem(20);
    padding: to-rem(20);
  }

  &__header,
  &__body {
    tr {
      display: grid;
      grid-auto-flow: column;
      justify-items: start;
      align-items: center;
      padding: to-rem(20);

      @media screen and (min-width: to-rem(600)) {
        padding: to-rem(20) to-rem(40);
      }
    }

    td,
    th {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 600;
      font-size: to-rem(14);
      line-height: to-rem(17);
      color: $color-brightest-violet;
      width: 100%;

      @media screen and (min-width: to-rem(600)) {
        font-size: to-rem(16);
        line-height: to-rem(19);
      }
    }
  }

  &__header th {
    text-transform: uppercase;
    color: $color-white;
  }

  &__body tr {
    background: rgba($color-violet, 0.15);

    &:nth-child(2n) {
      background: rgba($color-violet, 0.25);
    }

    &:not(:last-child) {
      border-bottom: to-rem(2) solid $color-violet;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.app-table {
  white-space: nowrap;
  border-radius: to-rem(10);
  box-shadow: 0 0 0 to-rem(2) $color-violet;
  filter: drop-shadow(to-rem(0) to-rem(48) to-rem(64) rgba(16, 0, 37, 0.25));

  table {
    width: 100%;
    border-style: hidden;
    border-collapse: collapse;
  }

  &__header {
    background: $color-violet;
  }
}
</style>
