import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CesiumHeatmapConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import { cesiumBasicOption } from '../../index.d'
import dataJson from './data.json'

export const option = {
  viewOptions: cesiumBasicOption,
  dataset: dataJson
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CesiumHeatmapConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(CesiumHeatmapConfig)
  public option = cloneDeep(option)
}
