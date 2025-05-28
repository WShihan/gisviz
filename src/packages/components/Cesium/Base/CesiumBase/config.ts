import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CesiumBaseConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import { cesiumBasicOption } from '../../index.d'

export const option = {
  viewOptions: cesiumBasicOption
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CesiumBaseConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(CesiumBaseConfig)
  public option = cloneDeep(option)
}
