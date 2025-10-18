import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Declaration Management System</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Manage declarations and incidents across your organization
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/operator/dashboard">
              <Button size="lg" className="w-full h-24 text-lg">
                Operator Dashboard
              </Button>
            </Link>
            <Link href="/support/dashboard">
              <Button size="lg" variant="outline" className="w-full h-24 text-lg bg-transparent">
                Support Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
