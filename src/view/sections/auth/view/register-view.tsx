'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, Stack, Alert, Button, Typography } from '@mui/material';

import { yup } from '@/lib/utils/yup';
import { paths } from '@/lib/config/paths';
import { useAuthStore } from '@/lib/store/auth';
import { EMAIL_REGEX } from '@/lib/config/global';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';

export default function RegisterView() {
  const t = useTranslations();
  const router = useRouter();
  const { register: registerUser } = useAuthStore();

  const [error, setError] = useState('');

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t('Global.Validation.email_required'))
          .matches(EMAIL_REGEX, t('Global.Validation.email_invalid')),
        fullName: yup.string().required(t('Global.Validation.fullName_required')),
        password: yup
          .string()
          .min(8, t('Global.Validation.password_length', { length: 8 }))
          .minLowercase(1, t('Global.Validation.password_lowercase'))
          .minUppercase(1, t('Global.Validation.password_uppercase'))
          .minNumbers(1, t('Global.Validation.password_number'))
          .minSymbols(1, t('Global.Validation.password_special'))
          .required(t('Global.Validation.password_required')),
        confirmPassword: yup
          .string()
          .required(t('Global.Validation.confirm_password_required'))
          .oneOf([yup.ref('password')], t('Global.Validation.passwords_must_match')),
      })
    ),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('');
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        role: 'admin',
      });
      router.push(paths.auth.login);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  return (
    <Stack>
      <Typography variant="h3" component="h1">
        {t('Pages.Auth.register_title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={5}>
        {t('Pages.Auth.register_subtitle')}
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <RHFTextField name="email" fullWidth label={t('Global.Label.email')} />
            <RHFTextField name="fullName" fullWidth label={t('Global.Label.fullName')} />
            <RHFTextField
              name="password"
              fullWidth
              type="password"
              label={t('Global.Label.password')}
            />
            <RHFTextField
              name="confirmPassword"
              fullWidth
              type="password"
              label={t('Global.Label.confirm_password')}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={isSubmitting}
            >
              {t('Global.Action.register')}
            </Button>

            <Typography variant="body2" textAlign="center">
              {t('Pages.Auth.have_account')}{' '}
              <Link href={paths.auth.login} underline="hover">
                {t('Global.Action.login')}
              </Link>
            </Typography>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}
