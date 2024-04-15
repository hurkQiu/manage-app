<template>
  <q-page>
    <div class="q-pa-md">
      <q-select v-model="model" :options="options" label="設備狀態"></q-select>
      <q-list bordered>
        <q-item
          v-for="(device, index) in getDevice()"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="device.icon" :color="device.color"></q-icon>
          </q-item-section>
          <q-item-section>{{ device.name }}</q-item-section>
          <q-btn push
            >詳細資料<q-popup-proxy>
              <q-banner>
                <template v-slot:avatar>
                  <q-icon name="signal_wifi_off" color="primary"></q-icon>
                </template>
                {{ `名稱:${device.name}` }}
                &nbsp;位置: XXXXXXXXX &nbsp; 負責人員: XXX
              </q-banner>
            </q-popup-proxy></q-btn
          >
        </q-item>
        <q-separator></q-separator>
      </q-list>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface DeviceAttr {
  name: string;
  icon: string;
  color: string;
}
const devices = ref<Array<DeviceAttr>>([]);
const model = ref(null);
const options = ['all', 'normal', 'warning', 'error'];
const icons = ['circle', 'warning', 'error'];

function getDevice() {
  if (model.value && model.value !== 'all') {
    if (model.value === 'normal')
      return devices.value.filter((device) => device.icon === 'circle');
    return devices.value.filter((device) => device.icon === model.value);
  }
  return devices.value;
}

onMounted(() => {
  for (let index = 0; index < 20; index++) {
    const device: DeviceAttr = { name: '', icon: '', color: '' };
    const random = Math.floor(Math.random() * 3);
    if (random === 0) device.color = 'green';
    else if (random === 1) device.color = 'yellow';
    else device.color = 'red';
    device.icon = icons[random];
    device.name = `設備${index + 1}`;
    devices.value.push(device);
  }
});
</script>
