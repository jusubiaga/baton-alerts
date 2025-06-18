"use client";
import Container from "@/components/container";
import Sidebar from "@/components/sidebar";
import { WorkspaceProvider } from "./workspaceProvider";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: {
    id: string; // workspaceId
  };
}

const ProtectedLayout = ({ children, params }: ProtectedLayoutProps) => {
  const workspaceId = params.id;
  return (
    <WorkspaceProvider initialWorkspaceId={workspaceId}>
      <div className="h-full w-full flex items-start justify-between">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </WorkspaceProvider>
  );
};

export default ProtectedLayout;
