import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';
import { MENU, OPERATION, ROLE, USER, DEPART } from '#/utils/constants';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ion:settings-outline',
      order: 9997,
      title: $t('system.title'),
    },
    name: 'System',
    path: '/system',
    children: [
      {
        path: '/system/user',
        name: 'SystemUser',
        meta: {
          icon: 'charm:organisation',
          title: $t('system.user.title'),
          permission: USER.READ,
        },
        component: () => import('#/views/system/user/list.vue'),
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: {
          icon: 'mdi:account-group',
          title: $t('system.role.title'),
          permission: ROLE.READ,
        },
        component: () => import('#/views/system/role/list.vue'),
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        meta: {
          icon: 'mdi:menu',
          title: $t('system.menu.title'),
          permission: MENU.READ,
        },
        component: () => import('#/views/system/menu/list.vue'),
      },
      {
        path: '/system/operation',
        name: 'SystemOperation',
        meta: {
          icon: 'ant-design:history-outlined',
          title: $t('system.operation.name'),
          permission: OPERATION.READ,
        },
        component: () => import('#/views/system/operation/list.vue'),
      },
    ],
  },
];

export default routes;
