"use client"

import Link from "next/link"
import {useMemo, useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {SupportStats} from "@/components/support-stats"
import {SupportTable} from "@/components/support-table"
import {mockDeclarations, ZONES, type Zone} from "@/lib/mock-data"
import {ZoneMap} from "@/components/zone-map"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { ListChecks, ShieldAlert, AlertTriangle, AlertOctagon, RefreshCcw, BarChart3 } from "lucide-react"

export default function SupportDashboard() {
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
    const [selectedType, setSelectedType] = useState<"ALL" | "Zone de risque" | "Presque accident" | "Accident">("ALL")

    const zoneDeclarations = useMemo(() => {
        if (!selectedZone) return []
        return mockDeclarations.filter((d) => d.zone === selectedZone)
    }, [selectedZone])

    const filteredDeclarations = useMemo(() => {
        if (selectedType === "ALL") return zoneDeclarations
        return zoneDeclarations.filter((d) => d.type === selectedType)
    }, [zoneDeclarations, selectedType])
    const typeCounts = useMemo(() => {
        const base = {
            all: zoneDeclarations.length,
            risk: zoneDeclarations.filter((d) => d.type === "Zone de risque").length,
            near: zoneDeclarations.filter((d) => d.type === "Presque accident").length,
            acc: zoneDeclarations.filter((d) => d.type === "Accident").length,
        }
        return base
    }, [zoneDeclarations])

    if (!selectedZone) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold">Choisissez une zone</h1>
                        <p className="text-muted-foreground mt-2">Sélectionnez une zone pour afficher le tableau de bord
                            correspondant</p>
                    </div>

                    <ZoneMap zones={ZONES} onSelect={(z) => {
                        setSelectedZone(z as Zone);
                        setSelectedType("ALL")
                    }}/>

                    <div className="mt-10 flex justify-center">
                        <Link href="/">
                            <Button variant="outline">Retour à l'accueil</Button>
                        </Link>
                    </div>
                </div>
            </main>
        )
    }


    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-8 pb-28 md:pb-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Support Dashboard</h1>
                        <p className="text-muted-foreground mt-2">
                            Zone: <span className="font-medium">{selectedZone}</span> • HSE & Maintenance - Gestion des
                            observations
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{zoneDeclarations.length} observation(s) dans
                            cette zone</p>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <Button variant="secondary" className="gap-2" onClick={() => {
                            setSelectedZone(null);
                            setSelectedType("ALL")
                        }}>
                            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                            Changer de zone
                        </Button>
                        <Link href="/support/history" className="hidden">
                            <Button variant="outline" size="lg" className="gap-2">
                                <BarChart3 className="h-4 w-4" aria-hidden="true" />
                                Historique et Reporting
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mb-8">
                    <SupportStats declarations={zoneDeclarations}/>
                </div>

                {/* Declarations Tabs + Table */}
                <CardTitle className="mb-3">Observations</CardTitle>
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
                        <CardContent className="px-0">
                            {filteredDeclarations.length > 0 ? (
                                <SupportTable declarations={filteredDeclarations}/>
                            ) : (
                                <div className="text-center text-sm text-muted-foreground py-8">
                                    Aucune observation dans cette zone pour ce type.
                                </div>
                            )}
                        </CardContent>
                    </TabsContent>
                </Tabs>

                {/* Mobile bottom tabs as menu */}
                <div className="md:hidden">
                    <nav
                        className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div
                            className="mx-auto max-w-screen-md px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+8px)] grid grid-cols-4 gap-2 text-xs">
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
