import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemOperationsApi {
  export interface SystemOperation {
    [key: string]: any;
    ip: string;
    latency: number;
    message: string;
    method: string;
    path: string;
    status_code: number;
    user_agent: string;
    user_id: number;
    user_name: string;
  }
}

/**
 * 获取操作日志列表数据
 */
async function getOperationsList(params: Recordable<any>) {
  return requestClient.get<Array<SystemOperationsApi.SystemOperation>>(
    '/v1/operation_logs',
    {
      params,
    },
  );
}

export { getOperationsList };
