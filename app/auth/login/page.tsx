import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div style={{ minHeight: '100vh' }} className="flex w-full h-screen">
      <div className="flex items-center justify-center w-full md:w-[40%] bg-white z-10">
        <LoginForm />
      </div>
      <div className="hidden md:block w-[60%] h-full relative">
        <img
          src="/cald-starry-night.jpg"
          alt="Starry Night"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoginPage;