<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 100%; padding: 10px">
      <q-card-section>
        <q-select
          v-model="currentGroup"
          :options="groups"
          @update:model-value="checkGroup"
        ></q-select>
        <q-scroll-area style="height: 400px">
          <q-list>
            <q-item v-for="(device, index) in devices" :key="index">
              <q-checkbox v-model="deviceRefArr[index]"></q-checkbox>
              {{ device.name }}
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="取消" @click="onDialogCancel" />
        <q-btn color="primary" label="確認" @click="onConfirmClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { DeviceData } from 'src/pages/NotifyPage.vue';
import { onMounted, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
defineOptions({
  name: 'EditGroupPanel',
});

export interface EditGroupPanelProps {
  groups: Array<string>;
  devices: Array<DeviceData>;
}

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const props = defineProps<EditGroupPanelProps>();
const currentGroup = ref(props.groups[0] ?? '');
const deviceRefArr = ref<Array<boolean>>([]);

function onConfirmClick() {
  const newDevices = props.devices;
  newDevices.forEach((device, index) => {
    if (device.group === currentGroup.value && !deviceRefArr.value[index])
      device.group = '';
    if (deviceRefArr.value[index]) device.group = currentGroup.value;
  });
  onDialogOK(newDevices);
}

function checkGroup() {
  const { devices } = props;
  for (let index = 0; index < devices.length; index++) {
    if (devices[index].group === currentGroup.value)
      deviceRefArr.value[index] = true;
    else deviceRefArr.value[index] = false;
  }
}

onMounted(() => {
  deviceRefArr.value = Array.from(
    { length: props.devices.length },
    () => false
  );
  checkGroup();
});
</script>
