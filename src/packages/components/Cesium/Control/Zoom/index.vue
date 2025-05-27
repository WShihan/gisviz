<template>
  <div class="map-toolbar">
    <div class="zooms">
      <div class="tool-item">
        <el-tooltip effect="customized" content="放大" :show-arrow="false" placement="left">
          <button class="tool" @click="zoomIn">
            <svg
              t="1739843436653"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3046"
              width="200"
              height="200"
            >
              <path
                d="M469.333333 469.333333V234.666667a21.333333 21.333333 0 0 1 21.333334-21.333334h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333334V469.333333h234.666666a21.333333 21.333333 0 0 1 21.333334 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333334 21.333334H554.666667v234.666666a21.333333 21.333333 0 0 1-21.333334 21.333334h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333334V554.666667H234.666667a21.333333 21.333333 0 0 1-21.333334-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333334-21.333334H469.333333z"
                fill="#bfbfbf"
                p-id="3047"
              ></path>
            </svg>
          </button>
        </el-tooltip>
        <el-tooltip effect="customized" content="缩小" :show-arrow="false" placement="left">
          <button class="tool" @click="zoomOut">
            <svg
              t="1739843447578"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3253"
              width="200"
              height="200"
            >
              <path
                d="M128 512m32 0l704 0q32 0 32 32l0 0q0 32-32 32l-704 0q-32 0-32-32l0 0q0-32 32-32Z"
                p-id="3254"
                fill="#bfbfbf"
              ></path>
            </svg>
          </button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'
import { ElTooltip } from 'element-plus'
import { locateHome, headingNorth, zoomInOrOut } from './Scene'
import { onMounted } from 'vue'

defineOptions({
  name: 'cesium-zoom'
})

const props = defineProps({
  homePosition: {
    type: Array,
    default: () => [] as number[]
  }
})

// @ts-ignore
let viewer: Cesium.Viewer | undefined
// 定位至初始地点
const locate2home = () => {
  if (viewer && props.homePosition)
    locateHome(
      viewer,
      Cesium.Cartesian3.fromDegrees(props.homePosition[0], props.homePosition[1], props.homePosition[2])
    )
}

// 相机朝向北方
const setView = () => {
  if (viewer) headingNorth(viewer)
}

//正射视角
const zhengsheView = () => {
  //@ts-ignore
  const camera = viewer.camera

  // 获取当前相机的位置和方向
  const position = camera.position
  const heading = camera.heading
  const roll = camera.roll

  // 将当前位置转换为地理坐标
  const cartographic = Cesium.Cartographic.fromCartesian(position)

  // 获取当前高度
  const currentHeight = cartographic.height

  // 设置新的相机高度
  const newHeight = currentHeight // 保持当前高度不变
  cartographic.height = newHeight
  const newPositionCartesian = Cesium.Ellipsoid.WGS84.cartographicToCartesian(cartographic)

  // 设置正射视角
  camera.setView({
    destination: newPositionCartesian,
    orientation: {
      heading: heading,
      pitch: Cesium.Math.toRadians(-90), // 俯仰角设置为 -90 度，表示垂直向下
      roll: roll
    }
  })
}

const fullScreen = () => {
  const elem = document.documentElement // 获取文档的根元素

  if (!document.fullscreenElement) {
    // 请求全屏
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
      // @ts-ignore
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      // @ts-ignore
      elem.mozRequestFullScreen()
      // @ts-ignore
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      // @ts-ignore
      elem.webkitRequestFullscreen()
      // @ts-ignore
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      // @ts-ignore
      elem.msRequestFullscreen()
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // Firefox
      // @ts-ignore
      document.mozCancelFullScreen()
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      // @ts-ignore
      document.webkitExitFullscreen()
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // IE/Edge
      // @ts-ignore
      document.msExitFullscreen()
    }
  }
}

// 缩小
const zoomIn = () => {
  if (viewer) zoomInOrOut(viewer, false)
}

// 放大
const zoomOut = () => {
  if (viewer) zoomInOrOut(viewer, true)
}

const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(',')
  const match = arr[0].match(/:(.*?);/)
  const mime = match?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// 场景出图
const exportMap = () => {
  if (!viewer) return
  //@ts-ignore
  viewer.render()
  let canvas = viewer.scene.canvas
  let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  let blob = dataURLtoBlob(image)
  let fileName = `场景截图-${Cesium.createGuid()}.png`
  let file = new File([blob], fileName, { type: 'image/png' })
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(file)
  downloadElement.href = href
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}

onMounted(() => {
  // @ts-ignore
  viewer = window.viewer
  if (viewer) locate2home()
})
</script>

<style scoped lang="scss">
$--icon-size: 1.5em;
$--bg-color: rgba(27, 26, 26, 0.8);
.map-toolbar {
  position: absolute;
  right: 1em;
  bottom: 3em;
}

.text:hover {
  color: #4a4a4a;
}
.tool-item {
  margin-top: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding: 0.5em;
  button {
    svg {
      width: $--icon-size;
      height: $--icon-size;
    }
  }
}

.tools,
.zooms {
  background: $--bg-color;
  border-radius: 0.2em;

  & > div {
    margin-top: -1px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tool {
    line-height: 0.55rem;
    padding: 0;
    border: solid 1px transparent;
    border-radius: 0.025rem;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: radial-gradient(50% 50% at 50% 50%, rgba(18, 131, 251, 0) 0%, rgba(18, 131, 251, 0.3) 100%);
      border: 1px solid #1283fb;
      box-shadow: inset 0px 0px 0.1rem #1283fb;
    }
  }
}
.zooms {
  margin-top: 1em;
}
</style>
