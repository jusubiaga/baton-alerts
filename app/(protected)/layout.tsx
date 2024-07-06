import Container from "@/components/container";

import Sidebar from "@/components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex items-start justify-between">
      <Sidebar />
      <Container>{children}</Container>
    </div>
  );
};

export default ProtectedLayout;
