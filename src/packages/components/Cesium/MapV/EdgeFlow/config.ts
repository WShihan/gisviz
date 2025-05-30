import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { MapEdgeFlowConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import { CesiumBaseLayerItem, CesiumBaseLayerType, cesiumBasicOption } from '../../index.d'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  viewOptions: cesiumBasicOption
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MapEdgeFlowConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(MapEdgeFlowConfig)
  public option = cloneDeep(option)
}
