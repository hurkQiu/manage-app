<template>
  <q-page class="q-px-lg q-pb-md">
    <div style="display: flex; gap: 50px">
      <q-space />
      <q-btn @click="confirmDialog">創立群組</q-btn>
      <q-btn @click="editGroupDialog">編輯群組</q-btn>
      <q-select
        v-model="select"
        :options="groups"
        label="選擇群組"
        style="min-width: 150px"
      ></q-select>
    </div>
    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="horizontal"
      style="margin-top: 20px"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                @keyup.enter="handleEnterKey(scope)"
                :rules="nameRule"
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="state" :props="props">
            {{ props.row.state }}
          </q-td>
          <q-td key="group" :props="props">
            {{ props.row.group }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import EditGroupPanel from 'src/components/EditGroupPanel.vue';
import { onMounted, ref } from 'vue';
export interface DeviceData {
  id: number;
  name: string;
  state: string;
  group: string;
}

const columns: QTableColumn<DeviceData>[] = [
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
    name: 'name',
    required: true,
    label: '名稱',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  { name: 'state', label: '狀態', field: 'state' },
  { name: 'group', label: '組別', field: 'group', align: 'center' },
];

const rows = ref<Array<DeviceData>>([]);
const groups = ref<Array<string>>(['全部', '火警群組', '電梯群組', '門禁群組']);
const select = ref(null);
const nameRule = [(val: string) => !!val || '不得空白'];
const $q = useQuasar();

function handleEnterKey(scope: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (value: any) => boolean;
  set: () => void;
  cancel: () => void;
  updatePosition: () => void;
}) {
  if (scope.value) {
    scope.set();
  }
}
function confirmDialog() {
  $q.dialog({
    title: '創建群組',
    message: '請輸入群組名稱',
    prompt: {
      model: '',
      isValid: (val) => val.length > 0,
      type: 'text',
      rules: nameRule,
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    groups.value.push(data);
  });
}

function editGroupDialog() {
  $q.dialog({
    component: EditGroupPanel,
    componentProps: {
      groups: groups.value.slice(1, groups.value.length),
      devices: rows.value,
    },
  }).onOk((data) => {
    rows.value = data;
  });
}

onMounted(() => {
  for (let index = 0; index < 20; index++) {
    const random = Math.floor(Math.random() * 3);
    const device: DeviceData = {
      id: index + 1,
      name: `設備${index + 1}`,
      state: random > 0 ? '正常' : '異常',
      group: random > 0 ? groups.value[random] : '',
    };
    rows.value.push(device);
  }
});
</script>
