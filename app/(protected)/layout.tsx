import Container from "./_components/container";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";

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
