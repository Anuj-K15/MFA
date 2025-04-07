import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user?.email}</span>
            <Link href="/auth/signout">
              <Button variant="outline" size="sm">Sign Out</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container flex-1 px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">Welcome, {session.user?.name || "User"}!</h2>
            <p className="mt-2 text-gray-600">This is your dashboard. You can manage your account and view your data here.</p>
          </div>
          
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">Statistics</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-md bg-blue-50 p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600">Projects</p>
              </div>
              <div className="rounded-md bg-green-50 p-4 text-center">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600">Tasks</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">Quick Actions</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full justify-start" variant="outline">
                Create New Project
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Add New Task
              </Button>
              <Button className="w-full justify-start" variant="outline">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}