import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';

import { $t } from '#/locales';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'user_name',
      label: $t('system.operation.user_name'),
      rules: 'required',
    },
  ];
}

/**
 * 获取表格列配置
 */
export function useColumns(): VxeTableGridOptions<SystemOperationsApi.SystemOperation>['columns'] {
  return [
    {
      field: 'id',
      title: $t('system.operation.id'),
      width: 200,
    },
    {
      field: 'method',
      title: $t('system.operation.method'),
      width: 200,
    },
    {
      field: 'path',
      title: $t('system.operation.path'),
      width: 200,
    },
    {
      field: 'status_code',
      title: $t('system.operation.statusCode'),
      width: 200,
    },
    {
      field: 'message',
      title: $t('system.operation.message'),
      width: 200,
    },
    {
      field: 'ip',
      title: $t('system.operation.ip'),
      width: 200,
    },
    {
      field: 'user_agent',
      title: $t('system.operation.userAgent'),
      width: 200,
    },
    {
      field: 'user_name',
      title: $t('system.operation.userName'),
      width: 200,
    },
    {
      field: 'createTime',
      title: $t('system.operation.createTime'),
      width: 200,
    },
  ];
}

// 添加搜索表单的字段配置
export function useSearchSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'user_name',
      label: $t('system.operation.userName'),
    },
    {
      component: 'Input',
      fieldName: 'status_code',
      label: $t('system.operation.statusCode'),
    },
  ];
}
