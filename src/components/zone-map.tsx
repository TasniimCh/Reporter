"use client"

import React from "react"

type ZoneMapProps = {
  zones: readonly string[]
  onSelect: (zone: string) => void
  className?: string
}

// A lightweight, responsive SVG-based industrial site map.
// Each zone is represented by a clickable area. Layout is intentionally schematic.
export function ZoneMap({ zones, onSelect, className }: ZoneMapProps) {
  // Map the provided zones to fixed positions in the schematic.
  // The order is important; it mirrors the visual positions defined below.
  const [
    zFilage,
    zFiliere,
    zTransvasement,
    zBarretage,
    zEmballage,
    zExpedition,
    zAMG,
    zParachevement,
    zAgencesBS,
    zPlateforme,
  ] = zones

  // Helper to render an accessible button-like SVG group
  const zoneBtn = (
    key: string,
    label: string,
    pathEl: React.ReactNode,
    x: number,
    y: number,
    labelAnchor: "start" | "middle" | "end" = "middle",
  ) => (
    <g
      key={key}
      role="button"
      tabIndex={0}
      aria-label={`Sélectionner la zone ${label}`}
      onClick={() => onSelect(label)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(label)
      }}
      className="cursor-pointer outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background"
    >
      {pathEl}
      <text
        x={x}
        y={y}
        textAnchor={labelAnchor}
        className="select-none pointer-events-none fill-foreground"
        fontSize={12}
        fontWeight={600}
      >
        {label}
      </text>
    </g>
  )

  return (
    <div className={className}>
      <div className="mb-4 text-center">
        <p className="text-sm text-muted-foreground">Cliquez sur une zone pour accéder au tableau de bord</p>
      </div>
      <div className="w-full rounded-xl border bg-card p-2 shadow-sm">
        <svg
          viewBox="0 0 900 520"
          className="h-[420px] w-full md:h-[520px]"
          role="img"
          aria-labelledby="siteMapTitle siteMapDesc"
        >
          <title id="siteMapTitle">Plan du site industriel</title>
          <desc id="siteMapDesc">Schéma interactif des zones de l'usine</desc>

          {/* Background grid/hint */}
          <rect x="0" y="0" width="900" height="520" className="fill-muted" rx="14" />

          {/* Roads / paths */}
          <rect x="20" y="250" width="860" height="20" className="fill-background" opacity="0.7" />
          <rect x="430" y="20" width="20" height="480" className="fill-background" opacity="0.7" />

          {/* Zones - rectangles/polygons with hover/active styles */}
          {zoneBtn(
            "filage",
            zFilage,
            <rect x="40" y="40" width="170" height="110" rx="10" className="fill-primary/10 stroke-primary/40 hover:fill-primary/20" />, 
            125,
            100
          )}

          {zoneBtn(
            "filiere",
            zFiliere,
            <rect x="230" y="40" width="170" height="110" rx="10" className="fill-blue-500/10 stroke-blue-500/40 hover:fill-blue-500/20" />, 
            315,
            100
          )}

          {zoneBtn(
            "transvasement",
            zTransvasement,
            <rect x="40" y="170" width="360" height="70" rx="10" className="fill-amber-500/10 stroke-amber-500/40 hover:fill-amber-500/20" />, 
            220,
            210
          )}

          {zoneBtn(
            "barretage",
            zBarretage,
            <rect x="40" y="290" width="170" height="110" rx="10" className="fill-emerald-500/10 stroke-emerald-500/40 hover:fill-emerald-500/20" />, 
            125,
            350
          )}

          {zoneBtn(
            "emballage",
            zEmballage,
            <rect x="230" y="290" width="170" height="110" rx="10" className="fill-fuchsia-500/10 stroke-fuchsia-500/40 hover:fill-fuchsia-500/20" />, 
            315,
            350
          )}

          {zoneBtn(
            "expedition",
            zExpedition,
            <rect x="480" y="40" width="170" height="160" rx="10" className="fill-cyan-500/10 stroke-cyan-500/40 hover:fill-cyan-500/20" />, 
            565,
            120
          )}

          {zoneBtn(
            "amg",
            zAMG,
            <rect x="670" y="40" width="190" height="110" rx="10" className="fill-rose-500/10 stroke-rose-500/40 hover:fill-rose-500/20" />, 
            765,
            100
          )}

          {zoneBtn(
            "parachevement",
            zParachevement,
            <rect x="480" y="230" width="380" height="90" rx="10" className="fill-lime-500/10 stroke-lime-500/40 hover:fill-lime-500/20" />, 
            670,
            285
          )}

          {zoneBtn(
            "agences-bs",
            zAgencesBS,
            <rect x="480" y="340" width="170" height="120" rx="10" className="fill-orange-500/10 stroke-orange-500/40 hover:fill-orange-500/20" />, 
            565,
            400
          )}

          {zoneBtn(
            "plateforme",
            zPlateforme,
            <rect x="670" y="340" width="190" height="120" rx="10" className="fill-violet-500/10 stroke-violet-500/40 hover:fill-violet-500/20" />, 
            765,
            400
          )}

          {/* Legend */}
          <g>
            <rect x="24" y="470" width="220" height="30" rx="8" className="fill-background/80 stroke-muted-foreground/20" />
            <text x="134" y="489" textAnchor="middle" className="fill-muted-foreground" fontSize={12}>
              Schéma simplifié — non à l'échelle
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
