import { Navbar } from "./navbar";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default Container;
