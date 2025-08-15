import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemUsersApi {
  export interface SystemUser {
    [key: string]: any;
    active: boolean;
    id: string;
    username: string;
  }
}

/**
 * 获取用户列表数据
 */
async function getUsersList(params: Recordable<any>) {
  return requestClient.get<Array<SystemUsersApi.SystemUser>>('/v1/auth/users', {
    params,
  });
}

/**
 * 创建用户
 * @param data 用户数据
 */
async function createUser(data: Omit<SystemUsersApi.SystemUser, 'id'>) {
  return requestClient.post('/v1/auth/users', data);
}

/**
 * 更新用户
 *
 * @param id 用户 ID
 * @param data 用户数据
 */
async function updateUser(
  id: string,
  data: Omit<SystemUsersApi.SystemUser, 'id'>,
) {
  return requestClient.put(`/v1/auth/users/${id}`, data);
}

/**
 * 更新用户密码
 *
 * @param id 用户 ID
 * @param data 用户数据
 */
async function updateUserPassword(id: string, data: Recordable<any>) {
  return requestClient.put(`/v1/auth/users/${id}/reset_password`, data);
}

/**
 * 删除用户
 * @param id 用户 ID
 */
async function deleteUser(id: string) {
  return requestClient.delete(`/v1/auth/users/${id}`);
}

export { createUser, deleteUser, getUsersList, updateUser, updateUserPassword };
