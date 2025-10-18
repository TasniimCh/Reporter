export interface Declaration {
  id: string
  type: "Incident" | "Observation" | "Suggestion"
  status: "En attente" | "En traitement" | "Résolue"
  createdDate: string
  description: string
  location: string
  operator: {
    id: string
    nom: string
    prenom: string
  }
  attachments: Attachment[]
  priority?: "Faible" | "Moyenne" | "Élevée"
  comments?: Comment[]
}

export interface Attachment {
  id: string
  name: string
  type: "image" | "video" | "document"
  url: string
}

export interface Comment {
  id: string
  author: string
  text: string
  date: string
}

export const mockDeclarations: Declaration[] = [
  {
    id: "001",
    type: "Incident",
    status: "En attente",
    createdDate: "2024-10-15",
    description: "Machine A stopped unexpectedly during production",
    location: "Zone 1 - Machine A",
    operator: { id: "OP001", nom: "Dupont", prenom: "Jean" },
    priority:"Élevée",
    attachments: [{ id: "1", name: "photo-machine.jpg", type: "image", url: "/intricate-clockwork-machine.png" }],
    comments: [],
  },
  {
    id: "002",
    type: "Observation",
    status: "En traitement",
    createdDate: "2024-10-14",
    description: "Minor oil leak detected on hydraulic system",
    location: "Zone 2 - Hydraulic System",
    operator: { id: "OP002", nom: "Martin", prenom: "Marie" },
    attachments: [],
    comments: [],
  },
  {
    id: "003",
    type: "Incident",
    status: "Résolue",
    createdDate: "2024-10-13",
    description: "Scheduled maintenance for conveyor belt",
    location: "Zone 3 - Conveyor Belt",
    operator: { id: "OP003", nom: "Bernard", prenom: "Pierre" },
    attachments: [],
    comments: [],
  },
  {
    id: "004",
    type: "Suggestion",
    status: "En attente",
    createdDate: "2024-10-12",
    description: "Improve safety signage in production area",
    location: "Zone 1 - General",
    operator: { id: "OP004", nom: "Leclerc", prenom: "Sophie" },
    attachments: [],
    comments: [],
  },
  {
    id: "005",
    type: "Incident",
    status: "En traitement",
    createdDate: "2024-10-11",
    description: "Safety equipment malfunction detected",
    location: "Zone 4 - Safety Station",
    operator: { id: "OP001", nom: "Dupont", prenom: "Jean" },
    priority: "Élevée",
    attachments: [],
    comments: [],
  },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "En attente":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "En traitement":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Résolue":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "Élevée":
      return "bg-red-10 text-red-80 dark:bg-red-10 dark:text-red-20"
    case "Moyenne":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Faible":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}