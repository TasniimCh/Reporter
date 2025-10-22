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
import { UploadCloud, PlusCircle, X } from "lucide-react"
import { CATEGORY_LIST, CATEGORIES } from "@/lib/categories"

export function CreateObservationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    subcategory: "",
    description: "",
    location: "",
    improvementProposed: ""
  })
  const [files, setFiles] = useState<File[]>([])
  const [correctionFiles, setCorrectionFiles] = useState<File[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value, subcategory: "" }))
  }

  const handleSubcategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subcategory: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleCorrectionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCorrectionFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.category) {
      alert("Veuillez sélectionner une catégorie.")
      return
    }
    if (!formData.subcategory) {
      alert("Veuillez sélectionner une sous-catégorie.")
      return
    }
    if (files.length === 0) {
      alert("Une photo d'observation est requise.")
      return
    }
    alert("Observation créée avec succès!")
    router.push("/operator/dashboard")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer une nouvelle observation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type de déclaration */}
          <div className="space-y-2 flex flex-col" >
            <Label htmlFor="type">Type d'observation *</Label>
            <Select value={formData.type} onValueChange={handleSelectChange}  >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zone de risque">Zone de risque</SelectItem>
                <SelectItem value="Presque accident">Presque accident</SelectItem>
                <SelectItem value="Accident">Accident</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Catégorie */}
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_LIST.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sous-catégorie */}
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="subcategory">Sous-catégorie *</Label>
            <Select value={formData.subcategory} onValueChange={handleSubcategoryChange} disabled={!formData.category}>
              <SelectTrigger id="subcategory">
                <SelectValue placeholder={formData.category ? "Sélectionner une sous-catégorie" : "Choisissez d'abord une catégorie"} />
              </SelectTrigger>
              <SelectContent>
                {(formData.category ? CATEGORIES[formData.category] : []).map((sub) => (
                  <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
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

          {/* Amélioration proposée (optionnel) */}
          <div className="space-y-2">
            <Label htmlFor="improvementProposed">Amélioration proposée (optionnel)</Label>
            <Textarea
              id="improvementProposed"
              name="improvementProposed"
              placeholder="Décrivez l'amélioration ou la solution proposée..."
              value={formData.improvementProposed}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Localisation exacte *</Label>
            <Input
              id="location"
              name="location"
              placeholder=""
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="files">Photo d'observation *</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition">
              <input
                id="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                capture="environment"
              />
              <label htmlFor="files" className="cursor-pointer flex flex-col items-center">
                <UploadCloud className="h-6 w-6 mb-2 text-muted-foreground" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">
                  Glissez-déposez vos photos ici ou cliquez pour sélectionner
                </div>
                <div className="text-xs text-muted-foreground mt-2">Formats pris en charge: Images uniquement</div>
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">{files.length} photo(s) sélectionnée(s):</p>
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

          {/* Correction apportée (optionnel) */}
          <div className="space-y-2">
            <Label htmlFor="correctionFiles">Correction apportée</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition">
              <input
                id="correctionFiles"
                type="file"
                multiple
                onChange={handleCorrectionFileChange}
                className="hidden"
                accept="image/*"
                capture="environment"
              />
              <label htmlFor="correctionFiles" className="cursor-pointer flex flex-col items-center">
                <UploadCloud className="h-6 w-6 mb-2 text-muted-foreground" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">
                  Glissez-déposez vos photos ici ou cliquez pour sélectionner
                </div>
                <div className="text-xs text-muted-foreground mt-2">Images uniquement</div>
              </label>
            </div>
            {correctionFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">{correctionFiles.length} photo(s) sélectionnée(s):</p>
                <ul className="space-y-1">
                  {correctionFiles.map((file, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">• {file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 gap-2">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Créer l'observation
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 gap-2">
              <X className="h-4 w-4" aria-hidden="true" />
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}