<template>
  <q-page class="q-pa-md">
    <div class="top-bar">
      <div style="display: flex; gap: 10px">
        <q-input
          v-model="option.dateStart"
          label="開始"
          filled
          readonly
        ></q-input>

        <q-input
          v-model="option.dateEnd"
          label="結束"
          filled
          readonly
        ></q-input>
        <q-btn
          color="white"
          text-color="black"
          label="選擇日期"
          @click="showDatePicker = true"
        ></q-btn>
      </div>
      <div style="display: flex">
        <q-input
          v-model="option.eventLevel"
          label="事件等級"
          filled
          readonly
        ></q-input>
        <q-btn-dropdown color="primary" label="請選擇事件等級" options-dense>
          <q-list>
            <q-item
              v-for="(level, index) in itemLevel"
              :key="index"
              clickable
              v-close-popup
              @click="option.eventLevel = level"
            >
              <q-item-section>
                <q-item-label>{{ level }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <q-btn @click="clearOption">清除所選資料</q-btn>
    </div>
    <q-table
      flat
      bordered
      :rows="filterData"
      :columns="columns"
      row-key="name"
      separator="horizontal"
      style="margin-top: 20px"
    >
    </q-table>
    <q-dialog
      v-model="showDatePicker"
      persistent
      position="top"
      @click="showDatePicker = false"
      dis
    >
      <q-card>
        <q-card-section class="text-center">
          <q-date v-model="selectDate" range></q-date>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="取消"
            color="secondary"
            @click="showDatePicker = false"
          />
          <q-btn label="確認" color="primary" @click="setDate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar/dist/types/api/qtable';
import { computed, ref } from 'vue';
interface EventData {
  id: number;
  level: string;
  date: string;
  state: string;
  group: string;
  location: string;
}
const option = ref({ dateStart: '', dateEnd: '', eventLevel: '' });
const showDatePicker = ref(false);
const selectDate = ref<{ from: string; to: string }>();
const columns: QTableColumn<EventData>[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    format: (val: number) => `${val}`,
    sortable: true,
  },
  {
    name: 'level',
    align: 'center',
    label: '等級',
    field: 'level',
    sortable: true,
  },
  {
    name: 'date',
    label: '日期',
    field: 'date',
    align: 'center',
    sortable: true,
  },
  { name: 'state', label: '狀態', field: 'state' },
  { name: 'group', label: '組別', field: 'group' },
  { name: 'location', label: '位置', field: 'location' },
];

const rows = [
  {
    id: '1',
    level: '5',
    date: '2024-3-1',
    state: '處理完畢',
    group: '設備異常',
    location: 'A棟大樓',
  },
  {
    id: '2',
    level: '1',
    date: '2024-3-1',
    state: '處理中',
    group: '設備異常',
    location: 'A棟大樓',
  },
  {
    id: '3',
    level: '2',
    date: '2024-3-1',
    state: '處理中',
    group: '設備異常',
    location: 'A棟大樓',
  },
  {
    id: '4',
    level: '2',
    date: '2024-3-1',
    state: '未處理',
    group: '設備異常',
    location: 'A棟大樓',
  },
  {
    id: '5',
    level: '3',
    date: '2024-3-1',
    state: '處理完畢',
    group: '設備異常',
    location: 'B棟大樓',
  },
  {
    id: '6',
    level: '3',
    date: '2024-3-1',
    state: '處理完畢',
    group: '設備異常',
    location: 'B棟大樓',
  },
  {
    id: '7',
    level: '4',
    date: '2024-3-1',
    state: '處理完畢',
    group: '設備異常',
    location: 'B棟大樓',
  },
  {
    id: '8',
    level: '4',
    date: '2024-3-1',
    state: '處理完畢',
    group: '設備異常',
    location: 'C棟大樓',
  },
  {
    id: '9',
    level: '1',
    date: '2024-3-2',
    state: '處理完畢',
    group: '設備異常',
    location: 'C棟大樓',
  },
  {
    id: '10',
    level: '2',
    date: '2024-3-3',
    state: '處理完畢',
    group: '設備異常',
    location: 'D棟大樓',
  },
  {
    id: '11',
    level: '5',
    date: '2024-3-4',
    state: '處理完畢',
    group: '設備異常',
    location: 'D棟大樓',
  },
  {
    id: '12',
    level: '5',
    date: '2024-3-5',
    state: '處理完畢',
    group: '設備異常',
    location: 'A棟大樓',
  },
];
const itemLevel = ['', '1', '2', '3', '4', '5'];

function setDate() {
  if (selectDate.value) {
    const start = new Date(selectDate.value.from);
    const end = new Date(selectDate.value.to);
    option.value.dateStart = `${start.getFullYear()}-${
      start.getMonth() + 1
    }-${start.getDate()}`;
    option.value.dateEnd = `${end.getFullYear()}-${
      end.getMonth() + 1
    }-${end.getDate()}`;
  } else {
    option.value.dateStart = '';
    option.value.dateEnd = '';
  }
  showDatePicker.value = false;
}

const filterData = computed(() => {
  if (option.value.dateStart !== '') {
    if (option.value.eventLevel !== '') {
      const data = rows.filter(
        (item) =>
          item.level === option.value.eventLevel &&
          new Date(item.date).getTime() >=
            new Date(option.value.dateStart).getTime() &&
          new Date(item.date).getTime() <=
            new Date(option.value.dateEnd).getTime()
      );
      return data;
    } else {
      const data = rows.filter(
        (item) =>
          new Date(item.date).getTime() >=
            new Date(option.value.dateStart).getTime() &&
          new Date(item.date).getTime() <=
            new Date(option.value.dateEnd).getTime()
      );
      return data;
    }
  } else {
    if (option.value.eventLevel !== '') {
      const data = rows.filter(
        (item) => item.level === option.value.eventLevel
      );
      return data;
    }
    return rows;
  }
});
function clearOption() {
  option.value.dateEnd = '';
  option.value.dateStart = '';
  option.value.eventLevel = '';
}
</script>

<style scoped>
.top-bar {
  width: 100%;
  display: flex;
  gap: 50px;
  padding-left: 50px;
}
</style>
