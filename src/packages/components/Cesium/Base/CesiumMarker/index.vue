<template>
  <div id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { initCesium, updateCesium } from '../index'
const pinBuilder = new Cesium.PinBuilder()

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
const updateMarker = (data: any[]) => {
  window.viewer?.entities.removeAll()
  data.forEach(item => {
    window.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(item.x, item.y, item.h || 10),
      billboard: {
        image: pinBuilder.fromText(item.icon, Cesium.Color.fromRandom().withAlpha(1), 80),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: 5000000000
      }
    })
  })
}

onMounted(() => {
  initCesium(props.chartConfig.option.viewOptions)
  const data: any[] = props.chartConfig.option.dataset
  updateMarker(data)
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
