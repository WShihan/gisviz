import { Viewer } from 'cesium'
import { CesiumHeatmap } from 'cesium-heatmap-es6'

export type HeatmapDataRow = {
  x: number
  y: number
  value: number
}
export const useHeatmap = () => {
  const defaultDataValue = [1, 110]
  const defaultOpacityValue = [0, 1]
  let earthHeatMap: CesiumHeatmap | undefined

  const removeHeatmap = () => {
    earthHeatMap?.remove()
    earthHeatMap = undefined
  }

  const createHeatmap = (viewer: Viewer, dataset: HeatmapDataRow[]) => {
    removeHeatmap()
    earthHeatMap = new CesiumHeatmap(window.viewer, {
      zoomToLayer: true,
      points: dataset,
      heatmapDataOptions: { max: defaultDataValue[1], min: defaultDataValue[0] },
      heatmapOptions: {
        maxOpacity: defaultOpacityValue[1],
        minOpacity: defaultOpacityValue[0]
      }
    })
  }

  return {
    createHeatmap,
    removeHeatmap
  }
}

export default useHeatmap
