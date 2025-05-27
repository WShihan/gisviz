import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../../Cesium/index.d'

export const CesiumBaseConfig: ConfigType = {
  key: 'CesiumBase',
  chartKey: 'VCesiumBase',
  conKey: 'VCCesiumBase',
  title: 'Cesium基础地球',
  category: CesiumCategoryEnum.CESIUM_BASE,
  categoryName: CesiumCategoryEnumName.CESIUM_BASE,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'globe.png',
  redirectComponent: `Cesium/Base/CesiumBase` // 跳转组件路径规则
}
