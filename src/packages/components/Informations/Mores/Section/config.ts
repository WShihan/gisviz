import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { SectionConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  name: '名称',
  nameColor: '#fff',
  nameFontSize: 16,
  nameHeight: 40,
  nameBackgroundImage: '',
  nameBackgroundColor: 'rgba(15, 38, 86, 0.66)',
  bodyBackgroundColor: 'rgba(23, 38, 71, 0.64)',
  bodyBackgroundImage: ''
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = SectionConfig.key
  public chartConfig = cloneDeep(SectionConfig)
  public option = cloneDeep(option)
}
