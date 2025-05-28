import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CesiumMarkderConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import { cesiumBasicOption } from '../../index.d'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  viewOptions: { markerSize: 40, ...cesiumBasicOption }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CesiumMarkderConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(CesiumMarkderConfig)
  public option = cloneDeep(option)
}
