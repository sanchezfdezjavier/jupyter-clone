import AuthForm from "@/components/auth-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="m-8">
        <h1 className="text-2xl font-light">Welcome to Javipyter!</h1>
        <p>Please, login with your account.</p>
      </div>
      <AuthForm />
    </main>
  );
}
