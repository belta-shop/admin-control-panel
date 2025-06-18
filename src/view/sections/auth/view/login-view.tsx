'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Stack, Alert, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { yup } from '@/lib/utils/yup';
import { useAuthStore } from '@/lib/store/auth';
import { EMAIL_REGEX } from '@/lib/config/global';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';

export default function LoginView() {
  const t = useTranslations();
  const { login } = useAuthStore();

  const [error, setError] = useState('');

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t('Global.Validation.email_required'))
          .matches(EMAIL_REGEX, t('Global.Validation.email_invalid')),
        password: yup.string().required(t('Global.Validation.password_required')),
      })
    ),
    defaultValues: {
      email: 'imbeltagy@gmail.com',
      password: 'Beltagy#1',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('');
      await login(data);
    } catch (error) {
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

            <RHFTextField name="email" fullWidth label={t('Global.Label.email')} />
            <RHFTextField
              name="password"
              fullWidth
              type="password"
              label={t('Global.Label.password')}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={isSubmitting}
            >
              {t('Global.Action.login')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}
