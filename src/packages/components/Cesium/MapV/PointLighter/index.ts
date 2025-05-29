import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const MapVPointLighterConfig: ConfigType = {
  key: 'PointLighter',
  chartKey: 'VMapVPointLighter',
  conKey: 'VCMapVPointLighter',
  title: '闪光点',
  category: CesiumCategoryEnum.CESIUM_MAPV,
  categoryName: CesiumCategoryEnumName.CESIUM_MAPV,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'point-lighter.png'
}
