import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'

// * 项目列表
export const projectListApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.PROJECT}/list`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 新增项目
export const createProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.PROJECT}/create`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 删除项目
export const deleteProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.PROJECT}/delete`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 修改发布状态 [-1未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.PUT)(`${ModuleTypeEnum.PROJECT}/publish`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}