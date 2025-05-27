import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ZoomConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: {}
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ZoomConfig.key
  public attr = { ...chartInitConfig, w: 100, h: 150, zIndex: -1 }
  public chartConfig = cloneDeep(ZoomConfig)
  public option = cloneDeep(option)
}
