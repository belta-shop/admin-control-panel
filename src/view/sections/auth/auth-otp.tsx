'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Alert, Button, Typography } from '@mui/material';

import { yup } from '@/lib/utils/yup';
import { OTPPurpose } from '@/lib/types/auth';
import { axiosInstance } from '@/lib/utils/axios';
import { endpoints } from '@/lib/config/endpoints';
import { updateAccessToken } from '@/lib/actions/auth';
import RHFOTP from '@/view/components/rhf-hooks/rhf-otp';

interface Props {
  purpose: OTPPurpose;
  onSuccess: () => void;
  sendInitialOtp?: boolean;
}

interface FormValues {
  otp: string[];
}

const schema = yup.object().shape({
  otp: yup.array().of(yup.string().required()).length(4).required(),
});

export default function AuthOtp({ purpose, onSuccess, sendInitialOtp = false }: Props) {
  const t = useTranslations();
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (sendInitialOtp) {
        handleResendOTP();
      }
    }, 1500);
    return () => clearTimeout(timeOut);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: ['', '', '', ''],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('');
      const res = await axiosInstance.post(endpoints.auth.verifyOtp, {
        purpose,
        otp: data.otp.join(''),
      });

      if ('resetPasswordToken' in res.data) {
        await updateAccessToken(res.data.resetPasswordToken);
      }

      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  });

  const handleResendOTP = async () => {
    try {
      setError('');

      await axiosInstance.post(endpoints.auth.sendOtp, {
        purpose,
      });

      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Stack>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}

            <Typography variant="body1" color="text.secondary">
              {t('Pages.Auth.otp_sent')}
            </Typography>

            <RHFOTP name="otp" label={t('Global.Label.otp')} />

            <Button
              variant="text"
              color="primary"
              onClick={handleResendOTP}
              disabled={!canResend}
              sx={{ alignSelf: 'flex-end' }}
            >
              {canResend
                ? t('Global.Action.resend_otp')
                : t('Global.Action.resend_otp_countdown', { seconds: countdown })}
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={isSubmitting}
            >
              {t('Global.Action.verify')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
}
