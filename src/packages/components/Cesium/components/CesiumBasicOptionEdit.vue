<template>
  <setting-item-box name="初始视图" :alone="true">
    <setting-item name="经度">
      <n-input-number placeholder="例如 120.36," v-model:value="optionState.center.lon" size="small"></n-input-number>
    </setting-item>
    <setting-item name="纬度">
      <n-input-number placeholder="例如 36," v-model:value="optionState.center.lat" size="small"></n-input-number>
    </setting-item>
    <setting-item name="高度">
      <n-input-number placeholder="例如 500000," v-model:value="optionState.center.alt" size="small"></n-input-number>
    </setting-item>
  </setting-item-box>
  <setting-item-box name="场景">
    <setting-item name="深度检测">
      <n-switch v-model:value="optionState.scene.depthTest" size="small" />
    </setting-item>
    <setting-item name="昼夜交替">
      <n-switch v-model:value="optionState.scene.night" size="small" />
    </setting-item>
  </setting-item-box>
  <setting-item-box name="底图" :alone="true">
    <setting-item name="名称">
      <n-input v-model:value="optionState.baseLayerSource.label" size="small" />
    </setting-item>
    <setting-item name="类型">
      <n-select v-model:value="optionState.baseLayerSource.type" size="small" :options="baseLyrTypes" />
    </setting-item>
    <setting-item name="地址">
      <n-input v-model:value="optionState.baseLayerSource.url" size="small" />
    </setting-item>
    <setting-item name="图层" v-if="optionState.baseLayerSource.type === CesiumBaseLayerType.WMTS">
      <n-input
        v-model:value="optionState.baseLayerSource.options.layer"
        size="small"
        placeholder="WMTS服务需指定图层"
      />
    </setting-item>
  </setting-item-box>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import cloneDeep from 'lodash/cloneDeep'
import { CesiumBaseLayerType } from '../index.d'

const props = defineProps({
  basicOption: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update'])

const baseLyrTypes = [
  {
    label: 'ArcGIS MapServer服务',
    value: CesiumBaseLayerType.ARCGIS_MAP_SERVER
  },
  {
    label: 'WMTS服务',
    value: CesiumBaseLayerType.WMTS
  },
  {
    label: 'XYZ瓦片',
    value: CesiumBaseLayerType.XYZ
  }
]

const optionState = reactive(cloneDeep(props.basicOption))

watch(
  () => optionState,
  val => {
    emits('update', val)
  },
  { deep: true }
)
</script>

<style scoped lang="scss"></style>
