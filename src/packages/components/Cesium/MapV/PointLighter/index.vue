<template>
  <div id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { initCesium, updateCesium, citys } from '../util'
// @ts-ignore
import * as mapv from 'mapv'

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true
  }
})

const makePoinTime = (viewer: Cesium.Viewer, dataset: any[]) => {
  const data = dataset.map(item => {
    return {
      geometry: {
        type: 'Point',
        coordinates: item.position
      },
      count: item.counr,
      time: item.time
    }
  })
  let dataSet = new mapv.DataSet(data)

  let options = {
    fillStyle: 'rgba(55, 50, 250, 0.2)',
    globalCompositeOperation: 'lighter',
    size: 15,
    animation: {
      type: 'time',
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 10,
      duration: 5
    },
    draw: 'simple'
  }
  let mapvLayer = mapv.cesiumMapLayer(viewer, dataSet, options)
}

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
  makePoinTime(window.viewer, props.chartConfig.option.dataset)
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
