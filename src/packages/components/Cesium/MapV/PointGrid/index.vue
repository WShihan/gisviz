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

const makePointGrid = (viewer: Cesium.Viewer, dataset: any[]) => {
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
    fillStyle: 'rgba(55, 50, 250, 0.8)',
    shadowColor: 'rgba(255, 250, 50, 1)',
    shadowBlur: 20,
    size: 40,
    globalAlpha: 0.5,
    label: {
      show: true,
      fillStyle: 'white'
      // shadowColor: 'yellow',
      // font: '20px Arial',
      // shadowBlur: 10,
    },
    gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
    draw: 'grid'
  }

  let mapvLayer = new mapv.cesiumMapLayer(viewer, dataSet, options)
}

onMounted(() => {
  initCesium(props.chartConfig.option.viewOptions)
  makePointGrid(window.viewer, props.chartConfig.option.dataset)
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
