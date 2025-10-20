import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TreatmentForm } from "@/components/treatment-form"
import { mockDeclarations } from "@/lib/mock-data"

interface TreatmentPageProps {
  params: Promise<{ id: string }>
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { id } = await params
  const declaration = mockDeclarations.find((d) => d.id === id)

  if (!declaration) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Observation non trouvée</h1>
          <Link href="/support/dashboard">
            <Button>Retour au dashboard</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/support/dashboard">
          <Button variant="outline" className="mb-6 bg-transparent">
            ← Retour au dashboard
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Traitement de l'observation {declaration.id}</h1>
        </div>

        <TreatmentForm declaration={declaration} />
      </div>
    </main>
  )
}
