import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../../Cesium/index.d'

export const ZoomConfig: ConfigType = {
  key: 'Zoom',
  chartKey: 'VZoom',
  conKey: 'VCZoom',
  title: '缩放',
  category: CesiumCategoryEnum.CESIUM_CONTROL,
  categoryName: CesiumCategoryEnumName.CESIUM_CONTROL,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'zoom.png'
}
