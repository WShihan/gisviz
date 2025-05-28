import { type Viewer } from 'cesium'
interface Window {
  $loading: any
  $message: any
  $dialog: any
  // 语言
  $t: any
  $vue: any
  // 键盘按键记录
  $KeyboardActive?: { [T: string]: boolean }
  onKeySpacePressHold?: Function

  // 编辑 JSON 的存储对象
  opener: any
}

declare type Recordable<T = any> = Record<string, T>

declare global {
  /**
   * 自定义Window 的类型提示
   */
  interface Window {
    viewer: Viewer
    Cesium: any
  }
}
