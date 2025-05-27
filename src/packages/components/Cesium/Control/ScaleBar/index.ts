import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../../Cesium/index.d'

export const ScaleBarConfig: ConfigType = {
  key: 'ScaleBar',
  chartKey: 'VScaleBar',
  conKey: 'VCScaleBar',
  title: '比例尺',
  category: CesiumCategoryEnum.CESIUM_CONTROL,
  categoryName: CesiumCategoryEnumName.CESIUM_CONTROL,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'scalebar.png'
}
