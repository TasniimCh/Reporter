"use client"

import { Button } from "@/components/ui/button"

import type { Declaration } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface HistoryChartsProps {
  declarations: Declaration[]
}

export function HistoryCharts({ declarations }: HistoryChartsProps) {
  // Trend data (last 7 days)
  const trendData = [
    { date: "Oct 11", count: 2 },
    { date: "Oct 12", count: 3 },
    { date: "Oct 13", count: 1 },
    { date: "Oct 14", count: 2 },
    { date: "Oct 15", count: 4 },
    { date: "Oct 16", count: 2 },
    { date: "Oct 17", count: 3 },
  ]

  // Zone risk data
  const zoneData = [
    { zone: "Zone 1", incidents: 5 },
    { zone: "Zone 2", incidents: 3 },
    { zone: "Zone 3", incidents: 2 },
    { zone: "Zone 4", incidents: 4 },
  ]

  // Performance data
  const performanceData = [
    { name: "Résolue", value: 3 },
    { name: "En traitement", value: 2 },
    { name: "En attente", value: 2 },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#fbbf24"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tendances (7 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Zone Risk Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Zones à risques</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="incidents" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance des interventions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle>Exporter les données</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => {
              console.log("[v0] Exporting to PDF")
              alert("Export PDF en cours...")
            }}
            className="w-full"
          >
            Exporter en PDF
          </Button>
          <Button
            onClick={() => {
              console.log("[v0] Exporting to Excel")
              alert("Export Excel en cours...")
            }}
            variant="outline"
            className="w-full"
          >
            Exporter en Excel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
