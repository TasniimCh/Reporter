"use client"

import Link from "next/link"
import { type Declaration, getStatusColor } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SupportTableProps {
  declarations: Declaration[]
}

export function SupportTable({ declarations }: SupportTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Opérateur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Priorité</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {declarations.map((declaration) => (
            <TableRow key={declaration.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{declaration.id}</TableCell>
              <TableCell>{declaration.type}</TableCell>
              <TableCell>{declaration.operator.nom} {declaration.operator.prenom}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(declaration.status)}>{declaration.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{declaration.location}</TableCell>
              <TableCell>
                {declaration.priority ? (
                  <Badge variant="destructive">{declaration.priority}</Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">Normal</span>
                )}
              </TableCell>
              <TableCell>
                <Link href={`/support/treatment/${declaration.id}`}>
                  <Button variant="outline" size="sm">
                    Traiter
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
