import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ScaleBarConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: {}
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ScaleBarConfig.key
  public attr = { ...chartInitConfig, w: 150, h: 50, zIndex: -1 }
  public chartConfig = cloneDeep(ScaleBarConfig)
  public option = cloneDeep(option)
}
