import * as Cesium from 'cesium'
import { CesiumBaseLayerType, CesiumBaseLayerItem, cesiumBasicOption } from '../index.d'

const flyTo = (viewer: Cesium.Viewer, position: Cesium.Cartesian3) => {
  viewer.camera.flyTo({
    destination: position
  })
}

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

export const updateCesium = (opt: typeof cesiumBasicOption) => {
  if (!window.viewer) return
  const viewer = window.viewer
  const watchCenter = opt.center
  const watchScene = opt.scene
  // 开启深度检测
  viewer.scene.globe.depthTestAgainstTerrain = watchScene.depthTest
  // 开启光照/夜晚效果
  viewer.scene.globe.enableLighting = watchScene.night
  if (watchCenter) {
    const homePosition = [watchCenter.lon, watchCenter.lat, watchCenter.alt]
    flyTo(viewer, Cesium.Cartesian3.fromDegrees(homePosition[0], homePosition[1], homePosition[2]))
  }
}

export const initCesium = async (opt: typeof cesiumBasicOption) => {
  if (opt.ionToken) {
    Cesium.Ion.defaultAccessToken = opt.ionToken
  }

  const baseLayer = detectBaseLayer(opt.baseLayerSource)
  // 初始化
  const viewer = new Cesium.Viewer('cesiumContainer', {
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
  viewer.scene.globe.depthTestAgainstTerrain = opt.scene.depthTest
  // 开启光照/夜晚效果
  viewer.scene.globe.enableLighting = opt.scene.night

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

  window.viewer = viewer
  if (opt.center) {
    const center = opt.center
    flyTo(viewer, Cesium.Cartesian3.fromDegrees(center.lon, center.lat, center.alt))
  }
}
