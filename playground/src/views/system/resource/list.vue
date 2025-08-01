<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemResourcesApi } from '#/api/system/resource';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteResource, getResourcesList } from '#/api/system/resource';
import { $t } from '#/locales';
import { RESOURCE } from '#/utils/constants';

import { useColumns } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/**
 * 编辑API
 * @param row
 */
function onEdit(row: SystemResourcesApi.SystemResource) {
  formModalApi.setData(row).open();
}

/**
 * 添加下级API
 * @param row
 */
function onAppend(row: SystemResourcesApi.SystemResource) {
  formModalApi.setData({ pid: row.id }).open();
}

/**
 * 创建新API
 */
function onCreate() {
  formModalApi.setData(null).open();
}

/**
 * 删除API
 * @param row
 */
function onDelete(row: SystemResourcesApi.SystemResource) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteResource(row.id)
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
 * 表格操作按钮的回调函数
 */
function onActionClick({
  code,
  row,
}: OnActionClickParams<SystemResourcesApi.SystemResource>) {
  switch (code) {
    case 'append': {
      onAppend(row);
      break;
    }
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {},
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async (_params) => {
          return await getResourcesList();
        },
      },
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      zoom: true,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: false,
    },
  } as VxeTableGridOptions,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

// 添加状态来跟踪是否全部展开
const isAllExpanded = ref(false);

// 创建切换函数
const toggleExpandCollapse = () => {
  if (isAllExpanded.value) {
    gridApi.grid?.setAllTreeExpand(false);
    isAllExpanded.value = false;
  } else {
    gridApi.grid?.setAllTreeExpand(true);
    isAllExpanded.value = true;
  }
};
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid table-title="API列表">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="toggleExpandCollapse">
          {{ isAllExpanded ? '折叠全部' : '展开全部' }}
        </Button>
        <Button type="primary" @click="onCreate" v-permission="RESOURCE.CREATE">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.resource.name')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
