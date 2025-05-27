import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const CesiumHeatmapConfig: ConfigType = {
  key: 'CesiumHeatmap',
  chartKey: 'VCesiumHeatmap',
  conKey: 'VCCesiumHeatmap',
  title: 'Cesium热力图地球',
  category: CesiumCategoryEnum.CESIUM_BASE,
  categoryName: CesiumCategoryEnumName.CESIUM_BASE,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'cesium-heatmap.png'
}
