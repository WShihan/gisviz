import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const MapFlowHeatmapConfig: ConfigType = {
  key: 'FlowHeatmap',
  chartKey: 'VMapVVFlowHeatmap',
  conKey: 'VCMapVFlowHeatmap',
  title: '热力图',
  category: CesiumCategoryEnum.CESIUM_MAPV,
  categoryName: CesiumCategoryEnumName.CESIUM_MAPV,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'flow-heatmap.png'
}
