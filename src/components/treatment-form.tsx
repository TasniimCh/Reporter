"use client"

import { useState } from "react"
import { type Observation, getStatusColor, getPriorityColor } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { UploadCloud } from "lucide-react"

interface ObservationDetailProps {
  declaration: Observation
}

export function TreatmentForm({ declaration }: ObservationDetailProps) {
  const [status, setStatus] = useState(declaration.status)
  const [priority, setPriority] = useState(declaration.priority || "Medium")
  const [comment, setComment] = useState("")
  const [correctionFiles, setCorrectionFiles] = useState<File[]>([])

  const handleCorrectionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCorrectionFiles(Array.from(e.target.files))
    }
  }

  const handleValidate = () => {
    console.log("Mise à jour:", { status, priority, comment })
    alert("Observation mise à jour avec succès !")
    setComment("")
  }

  const handleCancel = () => {
    setStatus(declaration.status)
    setPriority(declaration.priority || "Medium")
    setComment("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Observation {declaration.id}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Créée le {new Date(declaration.createdDate).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap md:items-center">
            <Select value={status} onValueChange={(value: string) => setStatus(value as "En attente" | "En traitement" | "Résolue")}>
              <SelectTrigger className="min-w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="En traitement">En traitement</SelectItem>
                <SelectItem value="Résolue">Résolue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priority} onValueChange={(value: string) => setPriority(value as "Low" | "Medium" | "High" | "Urgent")}>
              <SelectTrigger className="min-w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleValidate}>Valider</Button>
            <Button variant="outline" className="bg-transparent" onClick={handleCancel}>Annuler</Button>
          </div>
        </CardHeader>
      </Card>


      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="attachments">Photo d'observation</TabsTrigger>
          <TabsTrigger value="comments">Commentaires</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID/Matricule</p>
                  <p className="text-lg font-semibold mt-1">{declaration.operator.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nom</p>
                  <p className="text-lg font-semibold mt-1">{declaration.operator.nom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prénom</p>
                  <p className="text-lg font-semibold mt-1">{declaration.operator.prenom}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="text-lg font-semibold mt-1">{declaration.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Localisation</p>
                  <p className="text-lg font-semibold mt-1">{declaration.location}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="mt-2 text-base leading-relaxed whitespace-pre-wrap">{declaration.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="attachments">
          <Card>
            <CardContent className="pt-6 space-y-6">
              {declaration.attachments.length === 0 ? (
                <p className="text-muted-foreground">Aucune pièce jointe</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {declaration.attachments.map(att => (
                    <div key={att.id} className="border rounded-lg overflow-hidden">
                      {att.type === "image" && (
                        <div className="relative w-full h-48 bg-muted">
                          <Image src={att.url || "/placeholder.svg"} alt={att.name} fill className="object-cover" />
                        </div>
                      )}
                      {["video","document"].includes(att.type) && (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">
                            {att.type === "video" ? `Vidéo: ${att.name}` : `Document: ${att.name}`}
                          </span>
                        </div>
                      )}
                      <div className="p-3 border-t">
                        <p className="text-sm font-medium truncate">{att.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="correctionFiles" className="text-sm font-medium">Correction apportée</label>
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
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-medium">{correctionFiles.length} photo(s) sélectionnée(s):</p>
                    <ul className="space-y-1">
                      {correctionFiles.map((file, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {declaration.comments?.length === 0 ? (
                <p className="text-muted-foreground">Aucun commentaire</p>
              ) : (
                declaration.comments?.map(comment => (
                  <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.date}</p>
                    </div>
                    <p className="text-sm mt-2">{comment.text}</p>
                  </div>
                ))
              )}

              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Ajouter un commentaire..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
                <Button variant="outline" className="w-full bg-transparent" onClick={() => { if(comment.trim()) { alert("Commentaire ajouté !"); setComment("") } }}>
                  Ajouter le commentaire
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
