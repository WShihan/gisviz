<template>
  <div id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, toRefs, watch, onBeforeUnmount } from 'vue'
import { option } from './config'
import { CesiumBaseLayerItem, CesiumBaseLayerType } from '../../index.d'
import { CesiumHeatmap } from 'cesium-heatmap-es6'
import heatMapData from './data.json'

console.log(typeof heatMapData)

Cesium.Ion.defaultAccessToken = 'xxx'

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true
  }
})
let { center } = toRefs(props.chartConfig.option.viewOptions)

let viewer: Cesium.Viewer | null = null

const stopWatch = watch(
  () => props.chartConfig.option.viewOptions,
  options => {
    init({
      viewOptions: options
    })
  },
  {
    deep: true
  }
)

const detectBaseLayer = (item: CesiumBaseLayerItem) => {
  switch (item.type) {
    case CesiumBaseLayerType.ARCGIS_MAP_SERVER:
      return Cesium.ImageryLayer.fromProviderAsync(Cesium.ArcGisMapServerImageryProvider.fromUrl(item.url), {})
    case CesiumBaseLayerType.XYZ:
      return new Cesium.ImageryLayer(
        new Cesium.UrlTemplateImageryProvider({
          url: item.url,
          ...item.options
        })
      )
    default:
      return new Cesium.ImageryLayer(
        new Cesium.WebMapTileServiceImageryProvider({
          url: item.url,
          layer: item.options.layer,
          style: 'default',
          tileMatrixSetID: 'w',
          format: 'tiles',
          maximumLevel: 20
        })
      )
  }
}
const init = async (opts: typeof option) => {
  if (opts) {
    if (!viewer) return
    // 当配置属性发生变化时触发当前分支
    const watchCenter = opts.viewOptions.center
    const watchScene = opts.viewOptions.scene
    // 开启深度检测
    viewer.scene.globe.depthTestAgainstTerrain = watchScene.depthTest
    // 开启光照/夜晚效果
    viewer.scene.globe.enableLighting = watchScene.night
    if (watchCenter) {
      const homePosition = [watchCenter.lon, watchCenter.lat, watchCenter.alt]
      flyTo(viewer, Cesium.Cartesian3.fromDegrees(homePosition[0], homePosition[1], homePosition[2]))
    }
  } else {
    const opt = props.chartConfig.option as typeof option
    const baseLayer = detectBaseLayer(opt.viewOptions.baseLayerSource)
    // 初始化
    viewer = new Cesium.Viewer('cesiumContainer', {
      // 位置查找工具
      geocoder: false,
      // 视角返回初始位置
      homeButton: false,
      // 选择视角的模式（球体、平铺、斜视平铺）
      sceneModePicker: false,
      // 图层选择器（地形影像服务）
      baseLayerPicker: false,
      // 导航帮助(手势，鼠标)
      navigationHelpButton: false,
      // 左下角仪表盘（动画器件）
      animation: false,
      // 底部时间线
      timeline: false,
      // 点击信息弹窗
      infoBox: false,
      // @ts-ignore
      navigation: false,
      // 全屏
      fullscreenButton: false,
      // VR
      vrButton: false,
      //开启动画
      shouldAnimate: true,
      //启用或禁用距离图例
      enableDistanceLegend: true,
      // 地图点击绿色的提示框
      selectionIndicator: false,
      baseLayer: baseLayer,
      terrainProvider: new Cesium.EllipsoidTerrainProvider()
    })
    // 去除logo
    // @ts-ignore
    viewer.cesiumWidget.creditContainer.style.display = 'none'
    // 显示帧率
    viewer.scene.debugShowFramesPerSecond = false
    // 开启深度检测
    viewer.scene.globe.depthTestAgainstTerrain = opt.viewOptions.scene.depthTest
    // 开启光照/夜晚效果
    viewer.scene.globe.enableLighting = opt.viewOptions.scene.night

    // 地形
    // Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
    //   'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
    //   {}
    // )
    //   .then(terrainProvider => {
    //     if (!viewer) return
    //     viewer.terrainProvider = terrainProvider
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    const defaultDataValue = [1, 110]
    const defaultOpacityValue = [0, 1]
    const earthHeatMap = new CesiumHeatmap(viewer, {
      zoomToLayer: true,
      points: heatMapData,
      heatmapDataOptions: { max: defaultDataValue[1], min: defaultDataValue[0] },
      heatmapOptions: {
        maxOpacity: defaultOpacityValue[1],
        minOpacity: defaultOpacityValue[0]
      }
    })
    window.viewer = viewer
    if (center.value) {
      console.log(typeof center.value)
      flyTo(viewer, Cesium.Cartesian3.fromDegrees(center.value.lon, center.value.lat, center.value.alt))
    }
  }
}

const flyTo = (viewer: Cesium.Viewer, position: Cesium.Cartesian3) => {
  viewer.camera.flyTo({
    destination: position
  })
}

onMounted(() => {
  init(null as any)
})

onBeforeUnmount(() => {
  stopWatch()
  viewer?.destroy()
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
