import { requestClient } from '#/api/request';

export namespace SystemResourcesApi {
  export interface SystemResource {
    [key: string]: any;
    active: boolean;
    code: string;
    id: string;
    method: string;
    path: string;
    title: string;
    type: string;
  }
}

/**
 * 获取API列表数据
 */
async function getResourcesList() {
  return requestClient.get<Array<SystemResourcesApi.SystemResource>>(
    '/v1/rbac/resources',
  );
}

/**
 * 创建API
 * @param data API数据
 */
async function createResource(
  data: Omit<SystemResourcesApi.SystemResource, 'id'>,
) {
  return requestClient.post('/v1/rbac/resources', data);
}

/**
 * 更新API
 *
 * @param id API ID
 * @param data API数据
 */
async function updateResource(
  id: string,
  data: Omit<SystemResourcesApi.SystemResource, 'id'>,
) {
  return requestClient.put(`/v1/rbac/resources/${id}`, data);
}

/**
 * 删除API
 * @param id API ID
 */
async function deleteResource(id: string) {
  return requestClient.delete(`/v1/rbac/resources/${id}`);
}

async function getRoutersList() {
  return requestClient.get('/v1/routers');
}

export {
  createResource,
  deleteResource,
  getResourcesList,
  getRoutersList,
  updateResource,
};
