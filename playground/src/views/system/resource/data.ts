import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn } from '#/adapter/vxe-table';
import type { SystemResourcesApi } from '#/api/system/resource';

import { z } from '#/adapter/form';
import { getResourcesList } from '#/api/system/resource';
import { $t } from '#/locales';
import { RESOURCE } from '#/utils/constants';
import { op } from '#/utils/permission';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.resource.resourceName'),
      rules: z
        .string()
        .min(
          2,
          $t('ui.formRules.minLength', [$t('system.resource.resourceName'), 2]),
        )
        .max(
          20,
          $t('ui.formRules.maxLength', [
            $t('system.resource.resourceName'),
            20,
          ]),
        ),
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: getResourcesList,
        class: 'w-full',
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
      },
      fieldName: 'pid',
      label: $t('system.resource.parentResource'),
    },
    // {
    //   component: 'Input',
    //   fieldName: 'method',
    //   label: $t('system.resource.method'),
    // },
    {
      colon: false,
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: 'GET',
            value: 'GET',
          },
          {
            label: 'POST',
            value: 'POST',
          },
          {
            label: 'PUT',
            value: 'PUT',
          },
          {
            label: 'DELETE',
            value: 'DELETE',
          },
          {
            label: 'PATCH',
            value: 'PATCH',
          },
        ],
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'method',
      label: $t('system.resource.method'),
    },
    {
      component: 'Input',
      fieldName: 'path',
      label: $t('system.resource.path'),
    },
    // {
    //   component: 'ApiSelect',
    //   componentProps: {
    //     allowClear: true,
    //     api: getRoutersList,
    //     class: 'w-full',
    //     resultField: 'items',
    //     labelField: 'summary',
    //     valueField: 'path',
    //   },
    //   fieldName: 'path',
    //   label: $t('system.resource.path'),
    // },
    {
      component: 'RadioGroup',
      fieldName: 'type',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('system.resource.typeCatalog'), value: 'DIRECTORY' },
          { label: $t('system.resource.typeAPI'), value: 'API' },
        ],
        optionType: 'button',
      },
      defaultValue: 'DIRECTORY',
      label: $t('system.resource.type'),
    },
    {
      component: 'Input',
      fieldName: 'code',
      label: $t('system.resource.code'),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: $t('system.resource.status'),
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 50,
        rows: 3,
        showCount: true,
      },
      fieldName: 'description',
      label: $t('system.resource.description'),
      rules: z
        .string()
        .max(
          50,
          $t('ui.formRules.maxLength', [$t('system.resource.description'), 50]),
        )
        .optional(),
    },
  ];
}

export function getApiTypeOptions() {
  return [
    {
      color: 'processing',
      label: $t('system.resource.typeCatalog'),
      value: 'DIRECTORY',
    },
    { color: 'success', label: $t('system.resource.typeAPI'), value: 'API' },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
export function useColumns(
  onActionClick?: OnActionClickFn<SystemResourcesApi.SystemResource>,
): VxeTableGridOptions<SystemResourcesApi.SystemResource>['columns'] {
  return [
    {
      align: 'left',
      field: 'name',
      fixed: 'left',
      title: $t('system.resource.resourceName'),
      treeNode: true,
      width: 150,
    },
    {
      field: 'method',
      title: $t('system.resource.method'),
      width: 200,
    },
    {
      field: 'path',
      title: $t('system.resource.path'),
      width: 200,
    },
    {
      field: 'type',
      cellRender: { name: 'CellTag', options: getApiTypeOptions() },
      title: $t('system.resource.type'),
      minWidth: 100,
    },
    {
      field: 'code',
      title: $t('system.resource.code'),
      minWidth: 100,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.resource.status'),
      width: 100,
    },
    {
      field: 'createTime',
      title: $t('system.resource.createTime'),
      width: 180,
    },
    {
      field: 'description',
      title: $t('system.resource.description'),
    },
    {
      align: 'right',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.resource.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          op(RESOURCE.CREATE, {
            code: 'append',
            text: '新增下级',
            disabled: (row: SystemResourcesApi.SystemResource) => {
              return row.type === 'API';
            },
          }),
          op(RESOURCE.UPDATE, 'edit'), // 默认的编辑按钮
          op(RESOURCE.DELETE, {
            code: 'delete', // 默认的删除按钮
            disabled: (row: SystemResourcesApi.SystemResource) => {
              return !!(row.children && row.children.length > 0);
            },
          }),
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.resource.operation'),
      width: 200,
    },
  ];
}
