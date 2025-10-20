export const ZONES = [
  "Filage",
  "Filière",
  "Transvasement",
  "Barretage",
  "Emballage",
  "Expédition",
  "AMG",
  "Parachèvement",
  "Agences BS",
  "Plateforme",
] as const

export type Zone = typeof ZONES[number]

export interface Observation {
  id: string
  type: "Zone de risque" | "Presque accident" | "Accident"
  status: "En attente" | "En traitement" | "Résolue"
  createdDate: string
  description: string
  location: string
  zone: Zone
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

export const mockDeclarations: Observation[] = [
  {
    id: "OBS-001",
    type: "Accident",
    status: "En attente",
    createdDate: "2025-10-15T08:30:00Z",
    description: "Arrêt d'urgence de la bobineuse suite à un bruit anormal",
    location: "Ligne 2 - Bobineuse",
    zone: "Filage",
    operator: { id: "OP001", nom: "Dupont", prenom: "Jean" },
    priority: "Élevée",
    attachments: [{ id: "1", name: "bobineuse.jpg", type: "image", url: "/intricate-clockwork-machine.png" }],
    comments: [],
  },
  {
    id: "OBS-002",
    type: "Presque accident",
    status: "En traitement",
    createdDate: "2025-10-14T12:10:00Z",
    description: "Fuite d'huile mineure repérée sur le circuit hydraulique",
    location: "Pompe H3",
    zone: "Filière",
    operator: { id: "OP002", nom: "Martin", prenom: "Marie" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-003",
    type: "Zone de risque",
    status: "En attente",
    createdDate: "2025-10-13T09:05:00Z",
    description: "Absence de capotage sur la courroie d'entraînement",
    location: "Poste T-01",
    zone: "Transvasement",
    operator: { id: "OP003", nom: "Bernard", prenom: "Pierre" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-004",
    type: "Accident",
    status: "Résolue",
    createdDate: "2025-10-12T15:20:00Z",
    description: "Coupure légère lors du changement de barres",
    location: "Atelier B-2",
    zone: "Barretage",
    operator: { id: "OP004", nom: "Leclerc", prenom: "Sophie" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-005",
    type: "Presque accident",
    status: "En traitement",
    createdDate: "2025-10-11T10:00:00Z",
    description: "Colis mal cerclé risquant de tomber du convoyeur",
    location: "Zone d'emballage C",
    zone: "Emballage",
    operator: { id: "OP005", nom: "Morel", prenom: "Amine" },
    priority: "Moyenne",
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-006",
    type: "Zone de risque",
    status: "En attente",
    createdDate: "2025-10-10T07:55:00Z",
    description: "Chemin piéton obstrué par palettes",
    location: "Quai 3",
    zone: "Expédition",
    operator: { id: "OP006", nom: "Diallo", prenom: "Aïcha" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-007",
    type: "Accident",
    status: "En traitement",
    createdDate: "2025-10-09T14:40:00Z",
    description: "Court-circuit détecté sur armoire de commande",
    location: "Local technique A",
    zone: "AMG",
    operator: { id: "OP007", nom: "Nguyen", prenom: "Thi" },
    priority: "Élevée",
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-008",
    type: "Zone de risque",
    status: "Résolue",
    createdDate: "2025-10-08T11:15:00Z",
    description: "Eclairage insuffisant en fin de ligne",
    location: "Poste F-7",
    zone: "Parachèvement",
    operator: { id: "OP008", nom: "Rossi", prenom: "Lucia" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-009",
    type: "Presque accident",
    status: "En attente",
    createdDate: "2025-10-07T16:25:00Z",
    description: "Glissade évitée de justesse près de l'entrée",
    location: "Accueil",
    zone: "Agences BS",
    operator: { id: "OP009", nom: "Bensaïd", prenom: "Youssef" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-010",
    type: "Accident",
    status: "En attente",
    createdDate: "2025-10-06T06:30:00Z",
    description: "Chute d'un bac lors du déplacement par chariot",
    location: "Allée P-2",
    zone: "Plateforme",
    operator: { id: "OP010", nom: "Haddad", prenom: "Nora" },
    priority: "Faible",
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-011",
    type: "Zone de risque",
    status: "En traitement",
    createdDate: "2025-10-05T13:20:00Z",
    description: "Extincteur manquant à proximité du four",
    location: "Four 1",
    zone: "Filage",
    operator: { id: "OP011", nom: "Garnier", prenom: "Paul" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-012",
    type: "Presque accident",
    status: "Résolue",
    createdDate: "2025-10-04T09:50:00Z",
    description: "Gants inadaptés détectés au poste",
    location: "Extrusion E4",
    zone: "Filière",
    operator: { id: "OP012", nom: "López", prenom: "Ana" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-013",
    type: "Accident",
    status: "En traitement",
    createdDate: "2025-10-03T18:10:00Z",
    description: "Entorse lors du déplacement de charges",
    location: "Zone T-3",
    zone: "Transvasement",
    operator: { id: "OP013", nom: "Silva", prenom: "Carlos" },
    priority: "Moyenne",
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-014",
    type: "Zone de risque",
    status: "En attente",
    createdDate: "2025-10-02T07:00:00Z",
    description: "Protection anti-chute absente sur passerelle",
    location: "Mezzanine",
    zone: "Barretage",
    operator: { id: "OP014", nom: "Kim", prenom: "Min" },
    attachments: [],
    comments: [],
  },
  {
    id: "OBS-015",
    type: "Presque accident",
    status: "En traitement",
    createdDate: "2025-10-01T10:30:00Z",
    description: "Erreur de scannage provoquant une fausse expédition",
    location: "Quai 1",
    zone: "Expédition",
    operator: { id: "OP015", nom: "Petit", prenom: "Laura" },
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