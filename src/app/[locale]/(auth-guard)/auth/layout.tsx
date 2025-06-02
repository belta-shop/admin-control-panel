import AuthLayout from '@/view/layout/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
