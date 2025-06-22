'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Stack, Alert, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { yup } from '@/lib/utils/yup';
import { EMAIL_REGEX } from '@/lib/config/global';
import { endpoints } from '@/lib/config/endpoints';
import { axiosInstance } from '@/lib/utils/axios';
import RHFTextField from '@/view/components/rhf-hooks/rhf-textField';
import { OTPPurpose } from '@/lib/types/auth';

interface Props {
  onSuccess: (email: string) => void;
}

interface FormValues {
  email: string;
}

export default function ForgotPasswordEmail({ onSuccess }: Props) {
  const t = useTranslations();
  const [error, setError] = useState('');

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required(t('Global.Validation.email_required'))
          .matches(EMAIL_REGEX, t('Global.Validation.email_invalid')),
      })
    ),
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('');
      await axiosInstance.post(endpoints.auth.sendGuestOtp, {
        email: data.email,
        purpose: OTPPurpose.ResetPassword,
      });
      onSuccess(data.email);
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

            <RHFTextField name="email" fullWidth type="email" label={t('Global.Label.email')} />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={isSubmitting}
            >
              {t('Global.Action.send_otp')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}
