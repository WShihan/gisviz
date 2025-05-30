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

const makeHeatmap = (viewer: Cesium.Viewer, dataset: any[]) => {
  const data = dataset.map(item => {
    return {
      geometry: {
        type: 'Point',
        coordinates: item.position
      },
      count: item.count
    }
  })

  let dataSet = new mapv.DataSet(data)

  let options = {
    gradient: {
      0: 'blue',
      0.5: 'yellow',
      1: 'red'
    },
    max: 30,
    draw: 'intensity'
  }
  let mapvLayer = mapv.cesiumMapLayer(viewer, dataSet, options)
}

onMounted(() => {
  initCesium(props.chartConfig.option.viewOptions)
  makeHeatmap(window.viewer, props.chartConfig.option.dataset)
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
