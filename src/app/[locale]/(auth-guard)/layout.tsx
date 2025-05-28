import { redirect } from 'next/navigation';

import { paths } from '@/lib/config/paths';

export default function AuthGuardLayout({ children }: { children: React.ReactNode }) {
  redirect(paths.auth.login);

  return <>{children}</>;
}
