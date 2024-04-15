<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ title }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> 功能列表 </q-item-label>

        <EssentialLink
          v-for="item in itemList"
          :key="item.title"
          v-bind="item"
          @set-title="handleTitleChange"
        >
        </EssentialLink>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view @set-title="handleTitleChange" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout',
});

const itemList: EssentialLinkProps[] = [
  {
    title: '首頁',
    link: '/',
  },
  {
    title: '資料與記錄管理系統',
    link: '/data-record-page',
  },
  {
    title: '能源管理系統',
    link: '/energy-page',
    sub: [
      { label: 'A棟大樓', link: '/energy-page' },
      { label: 'B棟大樓', link: '/energy-page' },
      { label: 'C棟大樓', link: '/energy-page' },
    ],
  },
  {
    title: '維護保養管理系統',
    link: '/maintain-page',
  },
  {
    title: '設備通知管理',
    link: '/notify',
  },
  {
    title: '例行檢查紀錄',
    link: '/routine-check-page',
  },
];

const leftDrawerOpen = ref(false);
const title = ref('首頁');
function handleTitleChange(data: string) {
  title.value = data;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style scoped>
.selected {
  background-color: #f0f0f0;
}
</style>
