"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateDeclarationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    operatorId: "",
    type: "",
    description: "",
    location: ""
  })
  const [files, setFiles] = useState<File[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.operatorId.trim()) {
      alert("Veuillez entrer votre ID/Matricule")
      return
    }
    console.log("[v0] Form submitted:", { formData, files })
    alert("Déclaration créée avec succès!")
    router.push("/operator/dashboard")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer une nouvelle déclaration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="operatorId">ID/Matricule de l'opérateur *</Label>
            <Input
              id="operatorId"
              name="operatorId"
              placeholder="Ex: OP001"
              value={formData.operatorId}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Type de déclaration */}
          <div className="space-y-2">
            <Label htmlFor="type">Type de déclaration *</Label>
            <Select value={formData.type} onValueChange={handleSelectChange}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Incident">Incident</SelectItem>
                <SelectItem value="Observation">Observation</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Suggestion">Suggestion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description détaillée *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Décrivez le problème ou l'observation en détail..."
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Localisation exacte *</Label>
            <Input
              id="location"
              name="location"
              placeholder="Zone/Machine (ex: Zone 1 - Machine A)"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="files">Pièces jointes (optionnel)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition">
              <input
                id="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              <label htmlFor="files" className="cursor-pointer">
                <div className="text-sm text-muted-foreground">
                  Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                </div>
                <div className="text-xs text-muted-foreground mt-2">Photos, vidéos, documents (PDF, DOC, DOCX)</div>
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">{files.length} fichier(s) sélectionné(s):</p>
                <ul className="space-y-1">
                  {files.map((file, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Créer la déclaration
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}