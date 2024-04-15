<template>
  <q-page class="row items-center justify-center home">
    <q-card
      v-for="(item, index) in list"
      class="custom-card"
      :key="index"
      @click="handleClick(item.link, item.title)"
    >
      <q-card-section style="text-align: center">{{
        item.title
      }}</q-card-section>
      <q-img
        class="bg"
        :style="{ 'background-image': 'url(' + item.imgSrc + ')' }"
      ></q-img>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineOptions({
  name: 'IndexPage',
});
const emits = defineEmits(['set-title']);
const list = [
  {
    title: '資料與記錄管理系統',
    link: '/data-record-page',
    imgSrc: 'http://datotainc.com/images/data-clean.png',
  },
  {
    title: '監測系統',
    link: '/monitor-page',
    imgSrc:
      'https://www.cisco.com/c/en_uk/solutions/automation/what-is-network-monitoring/jcr:content/Grid/subcategory_atl_copy/layout-subcategory-atl/anchor_info_127c.img.png/1705997024058.png',
  },
  {
    title: '維護保養管理系統',
    link: '/maintain-page',
    imgSrc: 'https://swefc.unm.edu/home/wp-content/uploads/2019/05/CMMS-2.png',
  },
  {
    title: '例行檢查管理系統',
    link: '/routine-check-page',
    imgSrc:
      'https://as1.ftcdn.net/v2/jpg/04/06/72/62/1000_F_406726298_aj7VKdjeHDLn9v6XllWP30oBhGQTvDyL.jpg',
  },
  {
    title: '設備通知管理系統',
    link: '/notify',
    imgSrc:
      'https://images.squarespace-cdn.com/content/v1/57c40acb579fb31c1f9efdad/1585326221474-2QNBLWKFCV05ETEE5624/notifications-icon-lrg-rgb-nb.png',
  },
];
const router = useRouter();
function handleClick(link: string, title: string) {
  router.push(link);
  emits('set-title', title);
}
</script>

<style scoped>
.home {
  gap: 30px;
}
.custom-card {
  width: min(30%, 300px);
  cursor: pointer;
  .q-img {
    height: 250px;
  }
}
.custom-card:hover {
  scale: 1.05;
}
.bg {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
