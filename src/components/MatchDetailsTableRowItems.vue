<template>
  <div class="items">
    <div class="items__row">
      <ul class="items__list">
        <li v-for="(_, i) in 6" class="items__list-item">
          <img alt="" :src="slotImages[i]" />
        </li>
      </ul>
      <ul class="items__list items__list--backpack">
        <li class="items__list-item">
          <backpack-icon width="20" height="20" fill="#BBDD00" />
        </li>
        <li v-for="(_, i) in 3" class="items__list-item">
          <img alt="" :src="backpackImages[i]" />
        </li>
      </ul>
    </div>
    <div class="items__list-item items__list-item--neutral">
      <img alt="" :src="neutralImage" />
    </div>
    <div class="items__shard">
      <img alt="" :src="scepterImage" />
      <img alt="" :src="shardImage" />
    </div>
    <div class="items__list-item items__list-item--buff">
      <img :src="buffImage" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import BackpackIcon from '@/assets/backpack.svg';
import scepter1 from '@/assets/scepter_1.png';
import scepter2 from '@/assets/scepter_2.png';
import shard1 from '@/assets/shard_1.png';
import shard2 from '@/assets/shard_2.png';
import { Item } from '@/types';
import { Player } from '@/types/matches';
import {
  ASSETS_URL,
  ITEMS,
  ITEM_IDS,
  PERMANENT_BUFFS,
} from '@/utils/constants';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MatchDetailsTableRowItems',
  components: { BackpackIcon },
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true,
      default: () => [],
    },
  },
  computed: {
    buffs(): string[] {
      return (this.player.permanent_buffs ?? []).map(({ permanent_buff }) => {
        return PERMANENT_BUFFS[permanent_buff];
      });
    },
    backpackImages(): string[] {
      return this.getItemsImages([
        this.player.backpack_0,
        this.player.backpack_1,
        this.player.backpack_2,
      ]);
    },
    slotImages(): string[] {
      return this.getItemsImages([
        this.player.item_0,
        this.player.item_1,
        this.player.item_2,
        this.player.item_3,
        this.player.item_4,
        this.player.item_5,
      ]);
    },
    shardImage(): string {
      const hasShard = this.buffs.includes('aghanims_shard');
      return hasShard ? shard2 : shard1;
    },
    scepterImage(): string {
      const hasScepter = this.buffs.includes('ultimate_scepter');
      return hasScepter ? scepter2 : scepter1;
    },
    neutralImage(): string {
      return this.getItemImage(this.player.item_neutral);
    },
    buffImage(): string {
      const buffName = this.buffs.find((buff) => {
        return buff !== 'aghanims_shard' && buff !== 'ultimate_scepter';
      });

      if (!buffName) return '';

      const buff = ITEMS[buffName];
      return `${ASSETS_URL}${buff?.img}`;
    },
  },
  methods: {
    getItemById(id: string | number): Item | undefined {
      return ITEMS[ITEM_IDS[id]];
    },
    getItemImage(id: string | number): string {
      const item = this.getItemById(id);
      if (!item) return '';

      return `${ASSETS_URL}${item.img}`;
    },
    getItemsImages(itemsIds: number[]): string[] {
      return itemsIds.filter((id) => !!id).map((id) => this.getItemImage(id));
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/functions.scss';
@import '@/scss/variables.scss';

.items {
  display: grid;
  grid-template-columns: 1fr to-rem(22) repeat(2, to-rem(20));
  align-items: center;
  gap: to-rem(8);

  &__row {
    display: flex;
    flex-direction: column;
    gap: to-rem(4);
  }

  &__list {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, to-rem(30));
    gap: to-rem(2);

    &--backpack {
      grid-template-columns: to-rem(24) repeat(4, to-rem(22));

      & .items__list-item {
        height: to-rem(16);

        &:first-child {
          background: none;
          margin: to-rem(2);
          height: to-rem(20);
        }
      }
    }
  }

  &__list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: to-rem(4);
    background: rgba($color-shade-violet, 0.5);
    list-style-type: none;
    height: to-rem(22);
    overflow: hidden;

    &--neutral {
      border-radius: 50%;
    }

    &--buff {
      height: to-rem(20);
    }

    img {
      height: inherit;
      object-fit: cover;
    }
  }

  &__shard {
    display: flex;
    flex-direction: column;
    width: to-rem(20);
  }
}
</style>
