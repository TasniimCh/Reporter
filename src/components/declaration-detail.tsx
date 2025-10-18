"use client"

import { type Declaration, getStatusColor, getPriorityColor } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface DeclarationDetailProps {
  declaration: Declaration
}

export function DeclarationDetail({ declaration }: DeclarationDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Déclaration {declaration.id}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Créée le {new Date(declaration.createdDate).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge className={getStatusColor(declaration.status)}>{declaration.status}</Badge>
              {declaration.priority && (
                <Badge className={getPriorityColor(declaration.priority)}>{declaration.priority}</Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Details Tabs */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="attachments">Pièces jointes</TabsTrigger>
          <TabsTrigger value="comments">Commentaires</TabsTrigger>
        </TabsList>

        {/* Information Tab */}
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
                  <p className="text-sm font-medium text-muted-foreground">Type de déclaration</p>
                  <p className="text-lg font-semibold mt-1">{declaration.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <Badge className={getStatusColor(declaration.status)} >
                    {declaration.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Localisation exacte</p>
                <p className="text-lg font-semibold mt-1">{declaration.location}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Description détaillée</p>
                <p className="mt-2 text-base leading-relaxed whitespace-pre-wrap">{declaration.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attachments Tab */}
        <TabsContent value="attachments">
          <Card>
            <CardContent className="pt-6">
              {declaration.attachments.length === 0 ? (
                <p className="text-muted-foreground">Aucune pièce jointe</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {declaration.attachments.map((attachment) => (
                    <div key={attachment.id} className="border rounded-lg overflow-hidden">
                      {attachment.type === "image" && (
                        <div className="relative w-full h-48 bg-muted">
                          <Image
                            src={attachment.url || "/placeholder.svg"}
                            alt={attachment.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      {attachment.type === "video" && (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">Vidéo: {attachment.name}</span>
                        </div>
                      )}
                      {attachment.type === "document" && (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">Document: {attachment.name}</span>
                        </div>
                      )}
                      <div className="p-3 border-t">
                        <p className="text-sm font-medium truncate">{attachment.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments">
          <Card>
            <CardContent className="pt-6">
              {declaration.comments && declaration.comments.length === 0 ? (
                <p className="text-muted-foreground">Aucun commentaire</p>
              ) : (
                <div className="space-y-4">
                  {declaration.comments?.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                      </div>
                      <p className="text-sm mt-2">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}