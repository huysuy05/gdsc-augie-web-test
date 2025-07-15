"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { createClientSupabase } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { adminLogin } from "@/lib/auth"


export function AuthForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const {login} = useAuth();
  // const supabase = createClientSupabase()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null)

    try {
        // call the adminLogin function with the passed username, password
        const data = await adminLogin(username, password);
        login(data.access_token);
        alert("Log in successfully")
        router.push("/");
    } catch (e: any) {
        console.error("Error in admin sign in:", e)
        setError(e.message || "Failed to sign in");
    } finally {
        setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="signin">
        <CardHeader>
          Admin Sign In!!! Only Sign in if you are in the GDG's Eboard Team
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="signin">
            <form onSubmit={handleSignIn}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="Type in your admin username here"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>

                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign In
                </Button>
              </div>
            </form>
          </TabsContent>

        
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-600">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </CardFooter>
      </Tabs>
    </Card>
  )
}
