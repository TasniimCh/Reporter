"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HistoryFilters } from "@/components/history-filters"
import { HistoryCharts } from "@/components/history-charts"
import { SupportTable } from "@/components/support-table"
import { mockDeclarations } from "@/lib/mock-data"

export default function HistoryPage() {
  const [filteredDeclarations, setFilteredDeclarations] = useState(mockDeclarations)

  const handleFilter = (filters: any) => {
    let filtered = mockDeclarations

    if (filters.type) {
      filtered = filtered.filter((d) => d.type === filters.type)
    }
    if (filters.zone) {
      filtered = filtered.filter((d) => d.location.toLowerCase().includes(filters.zone.toLowerCase()))
    }
    if (filters.status) {
      filtered = filtered.filter((d) => d.status === filters.status)
    }
    if (filters.operator) {
      filtered = filtered.filter((d) => d.operator.toLowerCase().includes(filters.operator.toLowerCase()))
    }

    console.log("[v0] Filtered declarations:", filtered)
    setFilteredDeclarations(filtered)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Historique et Reporting</h1>
          <p className="text-muted-foreground mt-2">Analyse et export des observations</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <HistoryFilters onFilter={handleFilter} />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <HistoryCharts declarations={filteredDeclarations} />
        </div>

        {/* Filtered Table */}
        <Card>
          <CardHeader>
            <CardTitle>Observations filtrées ({filteredDeclarations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <SupportTable declarations={filteredDeclarations} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/support/dashboard">
            <Button variant="outline">Retour au dashboard</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
