<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemUsersApi } from '#/api/system/user';

import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Tooltip } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteUser, getUsersList } from '#/api/system/user';
import { $t } from '#/locales';
import { USER } from '#/utils/constants';
import ResetPasswordForm from '#/views/system/user/modules/reset-password-form.vue';

import { useColumns, useSearchSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [ResetPasswordModal, resetPasswordModalApi] = useVbenModal({
  connectedComponent: ResetPasswordForm,
  destroyOnClose: true,
});

/**
 * 编辑用户
 * @param row
 */
function onEdit(row: SystemUsersApi.SystemUser) {
  formModalApi.setData(row).open();
}

/**
 * 创建用户
 */
function onCreate() {
  formModalApi.setData(null).open();
}

/**
 * 删除用户
 * @param row
 */
function onDelete(row: SystemUsersApi.SystemUser) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteUser(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      refreshGrid();
    })
    .catch(() => {
      hideLoading();
    });
}

/**
 * 重置密码
 * @param row
 */
function onResetPassword(row: SystemUsersApi.SystemUser) {
  // 使用 setData 设置用户数据并打开重置密码模态框
  resetPasswordModalApi.setData(row).open();
}

/**
 * 表格操作按钮的回调函数
 */
function onActionClick({
  code,
  row,
}: OnActionClickParams<SystemUsersApi.SystemUser>) {
  switch (code) {
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
    case 'resetPassword': {
      onResetPassword(row);
      break;
    }
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {},
  formOptions: {
    schema: useSearchSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: true,
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getUsersList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },

    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<SystemUsersApi.SystemUser>,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <ResetPasswordModal
      @success="() => message.success($t('system.user.resetPasswordSuccess'))"
    />
    <Grid :table-title="$t('system.user.list')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate" v-permission="USER.CREATE">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.user.name')]) }}
        </Button>
      </template>
      <!-- 添加用户名列的自定义插槽 -->
      <template #username_default="{ row }">
        <div class="flex items-center justify-center">
          <span>{{ row.username }}</span>
          <Tooltip
            :title="
              row.online ? $t('system.user.online') : $t('system.user.offline')
            "
            placement="top"
          >
            <span
              class="ml-2 inline-block h-2 w-2 rounded-full"
              :class="row.online ? 'bg-green-500' : 'bg-gray-400'"
            ></span>
          </Tooltip>
        </div>
      </template>
    </Grid>
  </Page>
</template>
