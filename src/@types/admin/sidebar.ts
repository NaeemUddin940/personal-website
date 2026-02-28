export interface MenuItem {
  id: string;
  title: string;
  link?: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}

export interface SidebarItemProps {
  item: MenuItem;
  activePath?: string;
  sidebarExpanded?: boolean;
  globalCollapseSignal?: number;
  depth?: number;
  onNavigate?: () => void;
}

export interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  onExpandChange?: (expanded: boolean) => void;
  className?: string;
}
