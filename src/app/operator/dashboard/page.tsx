import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeclarationTable } from "@/components/declaration-table"
import { mockDeclarations } from "@/lib/mock-data"

export default function OperatorDashboard() {
  const pendingCount = mockDeclarations.filter((d) => d.status === "En attente").length
  const inProgressCount = mockDeclarations.filter((d) => d.status === "En traitement").length
  const resolvedCount = mockDeclarations.filter((d) => d.status === "Résolue").length

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Operator Dashboard</h1>
            <p className="text-muted-foreground mt-2">Suivez et gérez vos déclarations et incidents</p>
          </div>
          <Link href="/operator/create">
            <Button size="lg">Créer une nouvelle déclaration</Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-yellow-50 h-30">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 h-30">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">En traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 h-30">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">Résolue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Declarations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Mes déclarations</CardTitle>
          </CardHeader>
          <CardContent>
            <DeclarationTable declarations={mockDeclarations} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
