// import { createClient } from "@supabase/supabase-js"
// import type { User } from "@/lib/types"

// // Create a singleton instance for client-side
// let clientInstance: ReturnType<typeof createClient> | null = null

// export function createClientSupabase() {
//   if (clientInstance) return clientInstance

//   clientInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

//   return clientInstance
// }

// // Server-side supabase client (for server components and API routes)
// // export function createServerSupabase() {
// //   return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
// //     auth: {
// //       autoRefreshToken: false,
// //       persistSession: false,
// //     },
// //   })
// // }

// export async function getCurrentUser(): Promise<User | null> {
//   const supabase = createClientSupabase()

//   try {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession()

//     if (!session?.user) {
//       return null
//     }

//     const { data } = await supabase.from("users").select("*").eq("id", session.user.id).single()

//     return data
//   } catch (error) {
//     console.error("Error getting current user:", error)
//     return null
//   }
// }

// export async function isExecOrAdmin(): Promise<boolean> {
//   const user = await getCurrentUser()
//   return user?.role === "exec" || user?.role === "admin"
// }
