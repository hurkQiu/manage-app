<template>
  <q-expansion-item expand-separator :label="title" v-if="hasTree(sub ?? [])">
    <q-item
      v-for="(item, index) in sub"
      :key="index"
      clickable
      @click="goToPage(item.link, item.label)"
      v-bind:class="{ selected: isSelected(item.label) }"
    >
      <q-item-section>
        <q-item-label>{{ item.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="goToPage(link, title)"
    v-bind:class="{ selected: isSelected(title) }"
    v-else
  >
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { usePageStore } from 'src/stores/store';
import { useRouter } from 'vue-router';
defineOptions({
  name: 'EssentialLink',
});
const store = usePageStore();
const router = useRouter();
const emits = defineEmits(['set-title']);
const goToPage = (route: string, title: string) => {
  store.setPage(title);
  router.push(route);
  emits('set-title', title);
};
function hasTree(sub: Array<{ label: string; link: string }>) {
  if (sub && sub.length > 0) return true;
  return false;
}
function isSelected(page: string) {
  if (store.page === page) return true;
  return false;
}

export interface EssentialLinkProps {
  title: string;
  link?: string;
  sub?: Array<{ label: string; link: string }>;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: '',
});
</script>

<style scoped>
.selected {
  background-color: #f0f0f0;
}
</style>
