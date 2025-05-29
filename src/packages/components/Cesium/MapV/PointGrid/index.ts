import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const MapVPointGridConfig: ConfigType = {
  key: 'PointGrid',
  chartKey: 'VMapVPointGrid',
  conKey: 'VCVMapVPointGrid',
  title: '网格点',
  category: CesiumCategoryEnum.CESIUM_MAPV,
  categoryName: CesiumCategoryEnumName.CESIUM_MAPV,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'point-grid.png'
}
