<script lang="ts" setup>
import type { SystemUsersApi } from '#/api/system/user';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { updateUserPassword } from '#/api/system/user';
import { $t } from '#/locales';

const emit = defineEmits(['success']);
const formData = ref<SystemUsersApi.SystemUser>();

interface ResetPasswordData {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: [
    {
      component: 'InputPassword',
      fieldName: 'oldPassword',
      label: $t('system.user.oldPassword'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.user.enterOldPassword'),
      },
    },
    {
      component: 'InputPassword',
      fieldName: 'newPassword',
      label: $t('system.user.newPassword'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.user.enterNewPassword'),
      },
    },
    {
      component: 'InputPassword',
      fieldName: 'confirmPassword',
      label: $t('system.user.confirmPassword'),
      rules: 'required',
      componentProps: {
        placeholder: $t('system.user.enterConfirmPassword'),
      },
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data = (await formApi.getValues()) as ResetPasswordData;
      // 验证新密码和确认密码是否一致
      if (data.newPassword !== data.confirmPassword) {
        modalApi.lock(false);
        throw new Error($t('system.user.passwordNotMatch'));
      }

      try {
        // 确保用户ID存在
        if (!formData.value || !formData.value.id) {
          throw new Error('User not selected');
        }
        await updateUserPassword(formData.value.id, {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        });
        modalApi.close();
        formApi.resetForm();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SystemUsersApi.SystemUser>();
      if (data) {
        if (data.pid === 0) {
          data.pid = undefined;
        }
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
});
</script>

<template>
  <Modal :title="$t('system.user.resetPassword')">
    <Form class="mx-4" />
  </Modal>
</template>
