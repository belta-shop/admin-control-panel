import { paths } from '@/lib/config/paths';
import { redirect } from 'next/navigation';

export default function AuthGuardLayout({ children }: { children: React.ReactNode }) {
  redirect(paths.auth.login);

  return <>{children}</>;
}
