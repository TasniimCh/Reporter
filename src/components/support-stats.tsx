"use client"

import type { Observation } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SupportStatsProps {
  declarations: Observation[]
}

export function SupportStats({ declarations }: SupportStatsProps) {
  const typeStats = {
    "Zone de risque": declarations.filter((d) => d.type === "Zone de risque").length,
    "Presque accident": declarations.filter((d) => d.type === "Presque accident").length,
    "Accident": declarations.filter((d) => d.type === "Accident").length,
  }

  const urgentCount = declarations.filter((d) => d.priority === "Élevée").length

  return (
    <div className="space-y-4">
      {/* Urgent Alert */}
      {urgentCount > 0 && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            ⚠️ {urgentCount} observation(s) urgente(s) en attente de traitement
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
