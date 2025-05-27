import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CesiumBaseConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import { CesiumBaseLayerItem, CesiumBaseLayerType } from '../../index.d'

export const option = {
  viewOptions: {
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
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CesiumBaseConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(CesiumBaseConfig)
  public option = cloneDeep(option)
}
