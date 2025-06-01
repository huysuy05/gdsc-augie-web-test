export default function VerifyPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Check your email</h1>
        <p className="text-gray-600 mb-8">
          We've sent you a verification link. Please check your email and click the link to verify your account.
        </p>
        <p className="text-sm text-gray-500">
          If you don't see the email, check your spam folder or{" "}
          <a href="/auth" className="text-blue-600 hover:underline">
            try again
          </a>
          .
        </p>
      </div>
    </div>
  )
}
