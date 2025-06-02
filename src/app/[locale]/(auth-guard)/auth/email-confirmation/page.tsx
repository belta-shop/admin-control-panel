'use server';

import { Alert } from '@mui/material';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { fetchUserByToken } from '@/lib/actions/auth';
import RouterLink from '@/view/components/router-link';
import { paths, pathAfterLogin } from '@/lib/config/paths';
import EmailConfirmationView from '@/view/sections/auth/view/email-confirmation-view';

export default async function EmailConfirmationPage() {
  const t = await getTranslations('Pages.Auth');

  const res = await fetchUserByToken();

  if ('error' in res) {
    redirect(paths.auth.login);
  }

  const { confirmed } = res;

  if (confirmed)
    return (
      <Alert severity="success" sx={{ textAlign: 'center' }}>
        {t.rich('email_already_confirmed', {
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

  return <EmailConfirmationView />;
}
