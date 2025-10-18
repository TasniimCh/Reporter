"use client"

import type { Declaration } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SupportStatsProps {
  declarations: Declaration[]
}

export function SupportStats({ declarations }: SupportStatsProps) {
  const typeStats = {
    Incident: declarations.filter((d) => d.type === "Incident").length,
    Observation: declarations.filter((d) => d.type === "Observation").length,
    Maintenance: declarations.filter((d) => d.type === "Maintenance").length,
    Suggestion: declarations.filter((d) => d.type === "Suggestion").length,
  }

  const urgentCount = declarations.filter((d) => d.priority === "Urgent").length

  return (
    <div className="space-y-4">
      {/* Urgent Alert */}
      {urgentCount > 0 && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            ⚠️ {urgentCount} déclaration(s) urgente(s) en attente de traitement
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(typeStats).map(([type, count]) => (
          <Card key={type} className="h-30">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">{type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
