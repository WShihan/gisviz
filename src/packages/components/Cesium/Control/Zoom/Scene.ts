import * as Cesium from 'cesium'

/**
 * 定位至初始地点
 * **/
export function locateHome(viewer: Cesium.Viewer, position: Cesium.Cartesian3) {
  let homeView = {
    destination: position
  }
  viewer.camera.flyTo(homeView)
}

/**
 * 相机指向北方
 * **/
export function headingNorth(viewer: Cesium.Viewer) {
  const camera = viewer.camera

  // 保留当前的位置
  const currentPosition = camera.position.clone()

  const pitch = camera.pitch // 当前俯仰角
  const roll = camera.roll // 当前滚转角

  // 计算新的偏航角，使其朝向北方
  const newHeading = 0 // 偏航角设置为0，表示朝向北方

  // 更新摄像机位置和方向
  camera.flyTo({
    destination: currentPosition, // 保持当前的位置
    orientation: {
      heading: Cesium.Math.toRadians(newHeading), // 转换为弧度
      pitch: pitch,
      roll: roll
    },
    duration: 1.0 // 动画持续时间，单位为秒
  })
}

/**
 * 缩小&放大
 * **/
export function zoomInOrOut(viewer: Cesium.Viewer, flag: boolean) {
  let center = pickCenter(viewer)
  if (!center) return
  let height: any = getHeight(viewer)
  let boundingSph = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 1000), height)
  let moveRate = 0
  if (flag) {
    switch (height) {
      case height < 0:
        break
      case ((0 <= height) as any) < 100000:
        moveRate = 1.1
        break
      case ((100000 <= height) as any) < 1000000:
        moveRate = 1.3
        break
      default:
        moveRate = 1.5
        break
    }
  } else {
    switch (height) {
      case height < 0:
        break
      case ((0 <= height) as any) < 100000:
        moveRate = 0.9
        break
      case ((100000 <= height) as any) < 1000000:
        moveRate = 0.7
        break
      default:
        moveRate = 0.5
        break
    }
  }
  let zoomParams = {
    duration: 0.8,
    offset: new Cesium.HeadingPitchRange(viewer.camera.heading, viewer.camera.pitch, height * moveRate)
  }
  viewer.camera.flyToBoundingSphere(boundingSph, zoomParams)
}

/**
 * @return {lon:Number, lat:number, height:number}
 * @description 获取视图中心点
 */
function pickCenter(viewer: Cesium.Viewer) {
  let ellipsoid = viewer.camera.pickEllipsoid(
    new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2)
  )
  if (!ellipsoid) return undefined
  let curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(ellipsoid)
  let lon = (curPosition.longitude * 180) / Math.PI
  let lat = (curPosition.latitude * 180) / Math.PI
  return {
    lon: lon,
    lat: lat
  }
}

function getHeight(viewer: Cesium.Viewer) {
  /**@type {Cesium.Camera} */
  const camera = viewer.scene.camera
  return camera.positionCartographic.height
}

type ViewOptions = {
  lon: number
  lat: number
  alt: number
  heading: number
  pitch: number
  roll: number
}

//获取当前的位置和视角
export function getCurrentView(viewer: Cesium.Viewer, name: string | number): ViewOptions {
  //获取当前视角
  const scene = viewer.scene
  const camera = scene.camera
  const position = camera.positionCartographic
  const longitude = Cesium.Math.toDegrees(position.longitude)
  const latitude = Cesium.Math.toDegrees(position.latitude)
  const altitude = camera.positionCartographic.height

  const result = {
    lon: longitude,
    lat: latitude,
    alt: altitude,
    name: name, // 可以根据需要动态设置书签名称
    heading: camera.heading,
    pitch: camera.pitch,
    roll: camera.roll
  }
  return result
}

//改变当前视角
export function changeScreen(viewer: Cesium.Viewer, viewOptions: ViewOptions) {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(viewOptions.lon, viewOptions.lat, viewOptions.alt),
    orientation: {
      heading: viewOptions.heading, // 方向角（0度表示北）
      pitch: viewOptions.pitch, // 俯仰角（-90度表示垂直向下）
      roll: viewOptions.roll // 滚转角
    }
  })
}
