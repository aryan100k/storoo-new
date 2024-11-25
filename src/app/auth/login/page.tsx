import { LoginForm } from "../components/login-form";

const LoginPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 overflow-auto">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
