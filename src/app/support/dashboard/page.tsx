import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SupportStats } from "@/components/support-stats"
import { SupportTable } from "@/components/support-table"
import { mockDeclarations } from "@/lib/mock-data"

export default function SupportDashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Support Dashboard</h1>
            <p className="text-muted-foreground mt-2">HSE & Maintenance - Manage all declarations</p>
          </div>
          <Link href="/support/history">
            <Button variant="outline" size="lg">Historique et Reporting</Button>
        </Link>
        </div>
      

        {/* Stats Section */}
        <div className="mb-8">
          <SupportStats declarations={mockDeclarations} />
        </div>

        {/* Declarations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Déclarations assignées</CardTitle>
          </CardHeader>
          <CardContent>
            <SupportTable declarations={mockDeclarations} />
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
