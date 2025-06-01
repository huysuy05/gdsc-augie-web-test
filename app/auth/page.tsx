import { AuthForm } from "@/components/auth/auth-form"

export default function AuthPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to GDG Augustana</h1>
        <p className="text-gray-600">Sign in or create an account to join our community</p>
      </div>
      <AuthForm />
    </div>
  )
}
