<template>
  <TabMenu
    :model="tabs"
    :active-index="activeTabIndex"
    @tab-change="event => updateActiveTabIndex(event.index)"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: 'MoleculesTabMenu'
})
</script>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import TabMenu from 'primevue/tabmenu'

const props = defineProps({
  tabs: Array,
  activeTabIndex: Number
})

const emit = defineEmits(['update:activeTabIndex'])

const updateActiveTabIndex = (index: number): void => {
  emit('update:activeTabIndex', index)
}
</script>

<style lang="scss">
.p-tabmenu .p-tabmenu-nav,
.p-tabmenu .p-tabmenu-nav .p-menuitem-link,
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link,
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link,
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem:not(.p-highlight):not(.p-disabled):hover .p-menuitem-link {
  background: $color-quiet-red-lighter;
  border-bottom-color: $color-red-like-gray;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  color: $color-quiet-red-darker;
  border-color: $color-quiet-red-darker;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-disabled):focus {
  box-shadow: inset 0 0 0 0.2rem $color-quiet-red;
}
.p-tabmenuitem {
  @include link-effect;
}
// タブのCSSが初期表示時に一瞬崩れるのを修正する
.p-tabmenu .p-tabmenu-nav {
  display: flex;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
