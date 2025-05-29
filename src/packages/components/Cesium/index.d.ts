export enum CesiumCategoryEnum {
  CESIUM_BASE = 'Base',
  CESIUM_CONTROL = 'Control',
  CESIUM_ANALYSIS = 'Analysis',
  CESIUM_MAPV = 'MapV'
}

export enum CesiumCategoryEnumName {
  CESIUM_BASE = '基础',
  CESIUM_CONTROL = '控件',
  CESIUM_ANALYSIS = '分析',
  CESIUM_MAPV = 'MapV'
}

export enum CesiumBaseLayerType {
  XYZ = 'XYZ',
  WMTS = 'WMTS',
  WMS = 'WMS',
  ARCGIS_MAP_SERVER = 'ARCGIS_MAP_SERVER'
}

export interface CesiumBaseLayerItem {
  type: CesiumBaseLayerType
  label: string
  url: string
  options?: any
}

export const cesiumBasicOption = {
  ionToken: null,
  center: {
    lon: 116.404,
    lat: 39.915,
    alt: 30000000
  },
  scene: {
    night: false,
    depthTest: true
  },
  baseLayerSource: {
    label: 'ArcGIS卫星影像',
    options: {
      layer: ''
    },
    url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
    type: CesiumBaseLayerType.ARCGIS_MAP_SERVER
  } as CesiumBaseLayerItem
}
