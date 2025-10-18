import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreateDeclarationForm } from "@/components/create-form"

export default function CreateDeclarationPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/operator/dashboard">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Retour au dashboard
          </Button>
        </Link>

        {/* Page title */}
        <h1 className="text-3xl font-bold mb-6">Créer une nouvelle déclaration</h1>

        {/* Form */}
        <div className="max-w-2xl">
          <CreateDeclarationForm />
        </div>
      </div>
    </main>
  )
}