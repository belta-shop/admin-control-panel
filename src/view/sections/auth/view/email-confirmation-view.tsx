'use client';

import { useState } from 'react';
import { Alert } from '@mui/material';
import { useTranslations } from 'next-intl';

import { OTPPurpose } from '@/lib/types/auth';
import { pathAfterLogin } from '@/lib/config/paths';
import RouterLink from '@/view/components/router-link';

import AuthOtp from '../auth-otp';

export default function EmailConfirmationView() {
  const t = useTranslations('Pages.Auth');
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
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
    );
  }

  return <AuthOtp purpose={OTPPurpose.EmailConfirmation} onSuccess={() => setIsSuccess(true)} />;
}
