<template>
  <div id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import { onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { initCesium, updateCesium } from '../index'
import { useHeatmap, HeatmapDataRow } from './useHeatmap'

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true
  }
})

const { createHeatmap } = useHeatmap()

const formatData = (dataset: any): HeatmapDataRow[] => {
  if (!dataset) return []
  const data = []
  for (let k of Object.keys(dataset)) {
    data.push(dataset[k])
  }
  return data
}

const stopWatch = watch(
  () => props.chartConfig.option.viewOptions,
  options => {
    updateCesium(options)
  },
  {
    deep: true
  }
)

const stopWatchDataset = watch(
  () => props.chartConfig.option.dataset,
  () => {
    if (!window.viewer) return
    createHeatmap(window.viewer, formatData(props.chartConfig.option.dataset))
  },
  {
    deep: true
  }
)

onMounted(() => {
  console.log(props.chartConfig.option)
  initCesium(props.chartConfig.option.viewOptions)
  createHeatmap(window.viewer, formatData(props.chartConfig.option.dataset))
})

onBeforeUnmount(() => {
  stopWatch()
  stopWatchDataset()
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
