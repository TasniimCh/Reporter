"use client"

import Link from "next/link"
import { type Observation, getStatusColor } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

interface ObservationTableProps {
  declarations: Observation[]
}

function priorityBorder(priority?: Observation["priority"]) {
  switch (priority) {
    case "Élevée":
      return "border-l-4 border-red-500"
    case "Moyenne":
      return "border-l-4 border-yellow-500"
    case "Faible":
      return "border-l-4 border-green-500"
    default:
      return "border-l-4 border-gray-300 dark:border-gray-700"
  }
}

function priorityDot(priority?: Observation["priority"]) {
  switch (priority) {
    case "Élevée":
      return "bg-red-500"
    case "Moyenne":
      return "bg-yellow-500"
    case "Faible":
      return "bg-green-500"
    default:
      return "bg-gray-400"
  }
}

export function ObservationTable({ declarations }: ObservationTableProps) {
  return (
    <div>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {declarations.map((d) => (
          <Card key={d.id} className={`shadow-sm ${priorityBorder(d.priority)}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${priorityDot(d.priority)}`} aria-hidden="true" />
                    <p className="text-xs text-muted-foreground">{d.priority ?? "Normal"}</p>
                  </div>
                  <h3 className="mt-1 text-base font-semibold leading-tight truncate">{d.id} — {d.type}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(d.createdDate).toLocaleDateString("fr-FR")}</p>
                  <p className="mt-1 text-sm text-muted-foreground truncate">{d.location}</p>
                </div>
                <Badge className={getStatusColor(d.status)}>{d.status}</Badge>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <Link href={`/operator/declaration/${d.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Voir détails
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {declarations.map((declaration) => (
              <TableRow key={declaration.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{declaration.id}</TableCell>
                <TableCell>{declaration.type}</TableCell>
                <TableCell>{new Date(declaration.createdDate).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(declaration.status)}>{declaration.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{declaration.location}</TableCell>
                <TableCell>
                  <Link href={`/operator/declaration/${declaration.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Voir détails
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
