import { SignupForm } from "../components/signup-form";

const SignupPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 overflow-auto">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
