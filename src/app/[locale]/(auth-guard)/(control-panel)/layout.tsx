import ControlPanelLayout from '@/view/layout/control-panel';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ControlPanelLayout>{children}</ControlPanelLayout>;
}
