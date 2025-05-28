<template>
  <div id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { initCesium, updateCesium } from '../index'

Cesium.Ion.defaultAccessToken = 'xxx'

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true
  }
})

const stopWatch = watch(
  () => props.chartConfig.option.viewOptions,
  viewOptions => {
    if (!window.viewer) return
    updateCesium(viewOptions)
  },
  {
    deep: true
  }
)

onMounted(() => {
  initCesium(props.chartConfig.option.viewOptions)
})

onBeforeUnmount(() => {
  stopWatch()
  window.viewer?.destroy()
  // @ts-ignore
  window.viewer = undefined
})
</script>
<style lang="scss" scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
