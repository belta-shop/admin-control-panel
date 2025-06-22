'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Stack, Alert, Typography } from '@mui/material';

import { OTPPurpose } from '@/lib/types/auth';
import { pathAfterLogin } from '@/lib/config/paths';
import RouterLink from '@/view/components/router-link';

import AuthOtp from '../auth-otp';

export default function EmailConfirmationView() {
  const t = useTranslations('Pages.Auth');
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <Stack>
        <Typography variant="h3" component="h1">
          {t('email_confirmation_success_title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={5}>
          {t('email_confirmation_success_subtitle')}
        </Typography>

        <Alert severity="success" sx={{ textAlign: 'center' }}>
          {t.rich('email_confirmed', {
            link: (chunks) => (
              <RouterLink
                href={pathAfterLogin}
                sx={{
                  display: 'block',
                  width: 'fit-content',
                  mx: 'auto',
                  p: 1,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {chunks}
              </RouterLink>
            ),
          })}
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack>
      <Typography variant="h3" component="h1">
        {t('email_confirmation_title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={5}>
        {t('email_confirmation_subtitle')}
      </Typography>

      <AuthOtp purpose={OTPPurpose.EmailConfirmation} onSuccess={() => setIsSuccess(true)} />
    </Stack>
  );
}
