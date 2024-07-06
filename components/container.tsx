import { Navbar } from "./navbar";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="flex h-[90%]">{children}</div>
    </div>
  );
};

export default Container;
