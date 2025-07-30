import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn } from '#/adapter/vxe-table';
import type { SystemUsersApi } from '#/api/system/user';

import { getRoleList } from '#/api/system/role';
import { $t } from '#/locales';
import { USER } from '#/utils/constants';
import { op } from '#/utils/permission';

/**
 * 获取创建表单的字段配置
 */
export function useCreateSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('system.user.username'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'password',
      label: $t('system.user.password'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'nickName',
      label: $t('system.user.nickName'),
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: $t('system.user.email'),
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.user.phone'),
    },
    {
      component: 'RadioGroup',
      fieldName: 'active',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      label: $t('system.user.active'),
    },
    {
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        multiple: true, // 允许多选
        mode: 'multiple', // 允许多选
        api: getRoleList,
        class: 'w-full',
        resultField: 'items',
        labelField: 'name',
        valueField: 'id',
      },
      fieldName: 'role',
      label: $t('system.role.name'),
    },
  ];
}

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('system.user.username'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'nickName',
      label: $t('system.user.nickName'),
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: $t('system.user.email'),
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.user.phone'),
    },
    {
      component: 'RadioGroup',
      fieldName: 'active',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      label: $t('system.user.active'),
    },
    {
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        multiple: true, // 允许多选
        mode: 'multiple', // 允许多选
        api: getRoleList,
        class: 'w-full',
        resultField: 'items',
        labelField: 'name',
        valueField: 'id',
      },
      fieldName: 'role',
      label: $t('system.role.name'),
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
export function useColumns(
  onActionClick?: OnActionClickFn<SystemUsersApi.SystemUser>,
): VxeTableGridOptions<SystemUsersApi.SystemUser>['columns'] {
  return [
    {
      field: 'username',
      title: $t('system.user.username'),
      width: 200,
    },
    {
      field: 'nickName',
      title: $t('system.user.nickName'),
      width: 200,
    },
    {
      field: 'id',
      title: $t('system.user.id'),
      width: 200,
    },
    {
      field: 'phone',
      title: $t('system.user.phone'),
      width: 200,
    },
    {
      field: 'email',
      title: $t('system.user.email'),
      minWidth: 100,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'active',
      title: $t('system.user.active'),
      width: 100,
    },
    {
      field: 'roles',
      title: $t('system.role.name'),
      width: 150,
    },
    {
      field: 'createTime',
      title: $t('system.user.createTime'),
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.user.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          op(USER.UPDATE, 'edit'), // 默认的编辑按钮
          op(USER.UPDATE, {
            code: 'resetPassword',
            text: $t('system.user.resetPassword'),
          }),
          op(USER.DELETE, 'delete'), // 默认的删除按钮
        ],
      },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.user.operation'),
      width: 200,
    },
  ];
}

// 添加搜索表单的字段配置
export function useSearchSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('system.user.username'),
    },
    {
      component: 'Input',
      fieldName: 'nickName',
      label: $t('system.user.nickName'),
    },
  ];
}
