<template>
  <div class="scaleline-wrapper" :style="{ width: state.scaleBarWidth * 1.5 + 'px' }">
    <slot :data="state">
      <div
        class="scale-info"
        :style="{
          width: state.scaleBarWidth + 'px',
          height: props.scalelineHeight + 'px',
          borderWidth: props.scalelineWidth + 'px',
          borderTop: 'none'
        }"
      >
        <div v-show="state.scaleBarWidth != 0" class="scale-line" id="scale-line">
          <span class="scale-line-label">{{ state.scaleBarLabel }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import * as Cesium from 'cesium'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'cesium-scalebar'
})

const props = defineProps({
  duration: {
    type: [Number, String],
    default: () => 2
  },
  scalelineHeight: {
    type: [Number, String],
    default: () => 20
  },
  scalelineWidth: {
    type: [Number],
    default: () => 1
  }
})

const state = reactive({
  scaleBarLabel: '-',
  scaleBarWidth: 10,
  height: 0
})

const emits = defineEmits(['scale-change'])

const calcMapScale = async () => {
  //@ts-ignore
  let viewer = window.viewer
  let scene = viewer.scene
  let globe = scene.globe
  let geodesic = new Cesium.EllipsoidGeodesic()
  let width = scene.canvas.clientWidth
  let height = scene.canvas.clientHeight
  let distArr = [
    1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, 200000,
    300000, 500000, 1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000
  ]

  let left = scene.camera.getPickRay(new Cesium.Cartesian2((width / 2) | 0, height - 1))
  let right = scene.camera.getPickRay(new Cesium.Cartesian2((1 + width / 2) | 0, height - 1))

  let leftPosition = globe.pick(left, scene)
  let rightPosition = globe.pick(right, scene)
  if (!leftPosition && !rightPosition) return {}

  let leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition)
  let rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition)

  geodesic.setEndPoints(leftCartographic, rightCartographic)
  let pixelDistance = geodesic.surfaceDistance
  let maxBarWidth = 100
  let distance: number | undefined
  let label
  for (let i = distArr.length - 1; !Cesium.defined(distance) && i >= 0; --i) {
    if (distArr[i] / pixelDistance < maxBarWidth) {
      distance = distArr[i]
    }
  }
  if (!distance) return {}
  if (distance >= 1000) {
    label = (distance / 1000).toString() + ' km'
  } else {
    label = distance.toString() + ' m'
  }
  return {
    label,
    value: distance / pixelDistance
  }
}

const cameraMoveEndHandler = debounce(async () => {
  let scaleObj = await calcMapScale()
  state.scaleBarLabel = scaleObj.label || '-'
  state.scaleBarWidth = scaleObj.value || 0
  emits('scale-change', scaleObj)
}, 1 * 1000)

const enableCaptureScale = async () => {
  //@ts-ignore
  const viewer = window.viewer
  if (!viewer) return
  viewer.camera.moveEnd.addEventListener(cameraMoveEndHandler)
}

onMounted(async () => {
  console.log('scalebar mounted')

  setTimeout(async () => {
    enableCaptureScale()
  }, Number(props.duration) * 1000)
})
</script>

<style scoped lang="scss">
.scaleline-wrapper {
  padding: 0.5em;
}
.scale-info {
  position: relative;
  color: #fff;
  text-align: center;
  border: 1px solid #fff;
  .scale-line {
    width: 100%;
    height: 100%;
    font-size: 0.7em;
    border-top: none;
  }
  .scale-line-label {
    position: relative;
  }
}
</style>
