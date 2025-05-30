import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const MapEdgeFlowConfig: ConfigType = {
  key: 'EdgeFlow',
  chartKey: 'VMapVEdgeFlow',
  conKey: 'VCMapEdgeFlow',
  title: '流动线',
  category: CesiumCategoryEnum.CESIUM_MAPV,
  categoryName: CesiumCategoryEnumName.CESIUM_MAPV,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'edge-flow.png'
}
