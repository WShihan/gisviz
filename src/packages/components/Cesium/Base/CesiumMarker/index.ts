import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const CesiumMarkderConfig: ConfigType = {
  key: 'CesiumMarker',
  chartKey: 'VCesiumMarker',
  conKey: 'VCCesiumMarker',
  title: '区域发光',
  category: CesiumCategoryEnum.CESIUM_BASE,
  categoryName: CesiumCategoryEnumName.CESIUM_BASE,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'cesium-marker.png'
}
