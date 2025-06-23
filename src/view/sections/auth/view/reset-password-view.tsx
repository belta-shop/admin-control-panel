'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Stack, Typography } from '@mui/material';

import { OTPPurpose } from '@/lib/types/auth';

import AuthOtp from '../auth-otp';
import NewPassword from '../new-password';
import VerifyPassword from '../verify-password';

export default function ResetPasswordView() {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <VerifyPassword onSuccess={() => setCurrentStep(1)} />,
    <AuthOtp
      purpose={OTPPurpose.ResetPassword}
      onSuccess={() => setCurrentStep(2)}
      sendInitialOtp
    />,
    <NewPassword onSuccess={() => {}} />,
  ];

  return (
    <Stack>
      <Typography variant="h3" component="h1">
        {t('Pages.Auth.reset_password_title')}
      </Typography>

      {steps[currentStep]}
    </Stack>
  );
}
