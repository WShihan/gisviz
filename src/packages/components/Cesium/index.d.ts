export enum CesiumCategoryEnum {
  CESIUM_BASE = 'Base',
  CESIUM_CONTROL = 'Control',
  CESIUM_ANALYSIS = 'Analysis'
}

export enum CesiumCategoryEnumName {
  CESIUM_BASE = '基础',
  CESIUM_CONTROL = '控件',
  CESIUM_ANALYSIS = '分析'
}

export enum CesiumBaseLayerType {
  XYZ = 'XYZ',
  WMTS = 'WMTS',
  WMS = 'WMS',
  ARCGIS_MAP_SERVER = 'ARCGIS_MAP_SERVER'
}

export type CesiumBaseLayerItem = {
  type: CesiumBaseLayerType
  label: string
  url: string
  options?: any
}
