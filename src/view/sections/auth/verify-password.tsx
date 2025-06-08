'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Stack, Alert, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { yup } from '@/lib/utils/yup';
import { useAuthStore } from '@/lib/store/auth';
import { endpoints } from '@/lib/config/endpoints';
import { axiosInstance, ResponseError } from '@/lib/utils/axios';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';

interface Props {
  onSuccess: () => void;
}

export default function VerifyPassword({ onSuccess }: Props) {
  const t = useTranslations();
  const { user } = useAuthStore();
  const [error, setError] = useState('');

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().required(t('Global.Validation.password_required')),
      })
    ),
    defaultValues: {
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('');

      if (!user) {
        throw new Error(t('Global.Error.user_not_found'));
      }

      await axiosInstance.post(endpoints.auth.login, {
        email: user.email,
        password: data.password,
      });

      onSuccess();
    } catch (error) {
      if (error instanceof ResponseError && error.status === 401) {
        setError(t('Pages.Auth.incorrect_password'));
        return;
      }
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <Stack>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <RHFTextField
              name="password"
              fullWidth
              type="password"
              label={t('Global.Label.old_password')}
            />

            <Button type="submit" variant="contained" size="large" loading={isSubmitting}>
              {t('Pages.Auth.verify_password')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}
