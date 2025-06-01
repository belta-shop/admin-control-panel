import { redirect } from 'next/navigation';

import { paths } from '@/lib/config/paths';
import { restoreSessionCookies } from '@/lib/actions/auth';

export default async function AuthGuardLayout({ children }: { children: React.ReactNode }) {
  const { user, refreshToken } = await restoreSessionCookies();

  if (!user || !refreshToken) redirect(paths.auth.login);

  return <>{children}</>;
}
