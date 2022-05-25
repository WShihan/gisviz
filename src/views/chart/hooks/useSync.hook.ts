import { onUnmounted } from 'vue';
import { getUUID, httpErrorHandle, fetchRouteParamsLocation } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum, ChartEditStoreEnum, EditCanvasConfigEnum, ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { fetchChartComponent, createComponent } from '@/packages/index'
import { CreateComponentType } from '@/packages/index.d'
import { saveInterval } from '@/settings/designSetting'
// 接口状态
import { ResultEnum } from '@/enums/httpEnum'
// 接口
import { saveProjectApi, fetchProjectApi } from '@/api/path/project'
// 画布枚举
import { SyncEnum } from '@/enums/editPageEnum'

// 请求处理
export const useSync = () => {
  const chartEditStore = useChartEditStore()
  const chartHistoryStore = useChartHistoryStore()

  /**
   * * 组件动态注册
   * @param projectData 项目数据
   * @param isSplace 是否替换数据
   * @returns 
   */
  const updateComponent = async (projectData: ChartEditStorage, isSplace = false) => {
    if (isSplace) {
      // 清除列表
      chartEditStore.componentList = []
      // 清除历史记录
      chartHistoryStore.clearBackStack()
      chartHistoryStore.clearForwardStack()
    }
    // 列表组件注册
    projectData.componentList.forEach(async (e: CreateComponentType) => {
      if (!window['$vue'].component(e.chartConfig.chartKey)) {
        window['$vue'].component(
          e.chartConfig.chartKey,
          fetchChartComponent(e.chartConfig)
        )
      }
    })
    // 数据赋值
    for (const key in projectData) {
      // 组件
      if (key === ChartEditStoreEnum.COMPONENT_LIST) {
        for (const comItem of projectData[key]) {
          // 补充 class 上的方法
          let newComponent: CreateComponentType = await createComponent(
            comItem.chartConfig
          )
          // 不保存到记录
          chartEditStore.addComponentList(
            Object.assign(newComponent, {...comItem, id: getUUID()}),
            false,
            true
          )
        }
      } else {
        // 非组件(顺便排除脏数据)
        if (key !== 'editCanvasConfig' && key !== 'requestGlobalConfig') return
        Object.assign((chartEditStore as any)[key], projectData[key])
      }
    }
  }

  /**
   * * 赋值全局数据
   * @param projectData 项目数据
   * @returns 
   */
  const updateStoreInfo = (projectData: ChartEditStorage) => {
    const { projectName, remarks } = projectData.editCanvasConfig
    chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.PROJECT_NAME, projectName)
    chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.REMARKS, remarks)
  }

  // 数据获取
  const dataSyncFetch = async () => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.START)
    try {
      const res: any = await fetchProjectApi({ projectId: fetchRouteParamsLocation() })
      if (res.code === ResultEnum.SUCCESS) {
        if (res.data) {
          const data = JSON.parse(res.data)
          updateStoreInfo(data)
          // 更新全局数据
          await updateComponent(data)
          return
        }
        setTimeout(() => {
          chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.SUCCESS)
        }, 1000)
        return
      }
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
    } catch (error) {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
      httpErrorHandle()
    }
  }

  // 数据保存
  const dataSyncUpdate = async () => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.START)
    
    let params = new FormData()
    params.append('projectId', fetchRouteParamsLocation())
    params.append('content', JSON.stringify(chartEditStore.getStorageInfo || {}))
    const res: any = await saveProjectApi(params)

    if (res.code === ResultEnum.SUCCESS) {
      // 成功状态
      setTimeout(() => {
        chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.SUCCESS)
      }, 1000)
      return
    }
    // 失败状态
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
  }

  // 定时处理
  const intervalDataSyncUpdate = () => {
    // 定时获取数据
    const syncTiming = setInterval(() => {
      dataSyncUpdate()
    }, saveInterval * 1000)

    // 销毁
    onUnmounted(() => {
      clearInterval(syncTiming)
    })
  }

  return {
    updateComponent,
    updateStoreInfo,
    dataSyncFetch,
    dataSyncUpdate,
    intervalDataSyncUpdate
  }
}