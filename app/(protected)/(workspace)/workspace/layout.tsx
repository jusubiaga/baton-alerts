import Container from "@/components/container";

import Sidebar from "@/components/sidebar";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  return <div className="h-full w-full flex items-start justify-between">{children}</div>;
};

export default WorkspaceLayout;
