export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

export interface NavSection {
  heading?: string;
  items: NavItem[];
}
