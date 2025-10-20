"use client"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ObservationTable } from "@/components/observation-table"
import { mockDeclarations } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, ListChecks, ShieldAlert, AlertTriangle, AlertOctagon, Star } from "lucide-react"

export default function OperatorDashboard() {
  const [selectedType, setSelectedType] = useState<"ALL" | "Zone de risque" | "Presque accident" | "Accident">("ALL")

  const pendingCount = mockDeclarations.filter((d) => d.status === "En attente").length
  const inProgressCount = mockDeclarations.filter((d) => d.status === "En traitement").length
  const resolvedCount = mockDeclarations.filter((d) => d.status === "Résolue").length

  const typeCounts = useMemo(() => {
    return {
      all: mockDeclarations.length,
      risk: mockDeclarations.filter((d) => d.type === "Zone de risque").length,
      near: mockDeclarations.filter((d) => d.type === "Presque accident").length,
      acc: mockDeclarations.filter((d) => d.type === "Accident").length,
    }
  }, []);

  const filtered = useMemo(() => {
    if (selectedType === "ALL") return mockDeclarations
    return mockDeclarations.filter((d) => d.type === selectedType)
  }, [selectedType])

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-8 pb-28 md:pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Operator Dashboard</h1>
            <p className="text-muted-foreground mt-2">Suivez et gérez vos observations et incidents</p>
          </div>
          <Link href="/operator/create">
            <Button size="lg" className="gap-2">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Créer une nouvelle observation
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card >
            <CardHeader className="pb-1 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Vos points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">29</div>
            </CardContent>
          </Card>
        </div>

        {/* Declarations with Type Tabs */}
        <CardTitle className="mb-3">Mes observations</CardTitle>
        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-full">
          <TabsList className="mb-4 hidden md:flex flex-wrap">
            <TabsTrigger value="ALL" className="gap-2">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              Tous ({typeCounts.all})
            </TabsTrigger>
            <TabsTrigger value="Zone de risque" className="gap-2">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              Zone de risque ({typeCounts.risk})
            </TabsTrigger>
            <TabsTrigger value="Presque accident" className="gap-2">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Presque accident ({typeCounts.near})
            </TabsTrigger>
            <TabsTrigger value="Accident" className="gap-2">
              <AlertOctagon className="h-4 w-4" aria-hidden="true" />
              Accident ({typeCounts.acc})
            </TabsTrigger>
          </TabsList>
          <TabsContent value={selectedType} className="mt-0">
            <ObservationTable declarations={filtered} />
          </TabsContent>
        </Tabs>

        {/* Mobile bottom tabs as menu */}
        <div className="md:hidden">
          <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-screen-md px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+8px)] grid grid-cols-4 gap-2 text-xs">
              <button
                className={`rounded-md px-2 py-2 flex flex-col items-center justify-center ${selectedType === "ALL" ? "text-primary" : "text-muted-foreground"}`}
                aria-current={selectedType === "ALL" ? "page" : undefined}
                onClick={() => setSelectedType("ALL")}
              >
                <ListChecks className="h-5 w-5 mb-1" aria-hidden="true" />
                <span className="font-medium">Tous</span>
                <span className="opacity-80">{typeCounts.all}</span>
              </button>
              <button
                className={`rounded-md px-2 py-2 flex flex-col items-center justify-center ${selectedType === "Zone de risque" ? "text-primary" : "text-muted-foreground"}`}
                aria-current={selectedType === "Zone de risque" ? "page" : undefined}
                onClick={() => setSelectedType("Zone de risque")}
              >
                <ShieldAlert className="h-5 w-5 mb-1" aria-hidden="true" />
                <span className="font-medium text-center">Risque</span>
                <span className="opacity-80">{typeCounts.risk}</span>
              </button>
              <button
                className={`rounded-md px-2 py-2 flex flex-col items-center justify-center ${selectedType === "Presque accident" ? "text-primary" : "text-muted-foreground"}`}
                aria-current={selectedType === "Presque accident" ? "page" : undefined}
                onClick={() => setSelectedType("Presque accident")}
              >
                <AlertTriangle className="h-5 w-5 mb-1" aria-hidden="true" />
                <span className="font-medium text-center">Presque</span>
                <span className="opacity-80">{typeCounts.near}</span>
              </button>
              <button
                className={`rounded-md px-2 py-2 flex flex-col items-center justify-center ${selectedType === "Accident" ? "text-primary" : "text-muted-foreground"}`}
                aria-current={selectedType === "Accident" ? "page" : undefined}
                onClick={() => setSelectedType("Accident")}
              >
                <AlertOctagon className="h-5 w-5 mb-1" aria-hidden="true" />
                <span className="font-medium">Accident</span>
                <span className="opacity-80">{typeCounts.acc}</span>
              </button>
            </div>
          </nav>
        </div>

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
