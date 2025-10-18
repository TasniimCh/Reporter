"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HistoryFiltersProps {
  onFilter: (filters: any) => void
}

export function HistoryFilters({ onFilter }: HistoryFiltersProps) {
  const [filters, setFilters] = useState({
    type: "all",
    zone: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
    operator: "",
  })

  const handleChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleReset = () => {
    const emptyFilters = {
      type: "all",
      zone: "",
      status: "all",
      dateFrom: "",
      dateTo: "",
      operator: "",
    }
    setFilters(emptyFilters)
    onFilter(emptyFilters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres avancés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="type">Type de déclaration</Label>
            <Select value={filters.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Incident">Incident</SelectItem>
                <SelectItem value="Observation">Observation</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Suggestion">Suggestion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Zone Filter */}
          <div className="space-y-2">
            <Label htmlFor="zone">Zone</Label>
            <Input
              id="zone"
              placeholder="Filtrer par zone..."
              value={filters.zone}
              onChange={(e) => handleChange("zone", e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="En traitement">En traitement</SelectItem>
                <SelectItem value="Résolue">Résolue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date de début</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleChange("dateFrom", e.target.value)}
            />
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <Label htmlFor="dateTo">Date de fin</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleChange("dateTo", e.target.value)}
            />
          </div>

          {/* Operator Filter */}
          <div className="space-y-2">
            <Label htmlFor="operator">Opérateur</Label>
            <Input
              id="operator"
              placeholder="Filtrer par opérateur..."
              value={filters.operator}
              onChange={(e) => handleChange("operator", e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleReset} variant="outline" className="mt-4 w-full bg-transparent">
          Réinitialiser les filtres
        </Button>
      </CardContent>
    </Card>
  )
}
