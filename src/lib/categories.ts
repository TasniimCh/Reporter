export type CategoryMap = Record<string, string[]>;

// Taxonomy: Categories and their subcategories (French labels as provided)
export const CATEGORIES: CategoryMap = {
  "Allés de circulation": [
    "Utilisation des allées pour le stockage temporaire de matériel/Produits",
    "Allées encombrées ou sales",
    "Non-respect du sens de circulation établi",
    "Vitesse excessive",
    "Utilisation d’engins non autorisés ou en mauvais état mécanique",
    "Balisage ou éclairage insuffisant",
  ],

  "Equipement de protection individuel (EPI)": [
    "Non-port total ou partiel des EPI obligatoires",
    "Utilisation d’EPI non conformes ou détériorés",
    "EPI non adaptés aux risques",
    "Refus volontaire de porter les EPI",
    "Absence de vérification régulière ou d’entretien des EPI (Harnais de sécurité …)",
    "Signalétique de port des EPI absente ou illisible",
  ],

  "Moyens de lutte contre incendie": [
    "Extincteurs absents ou non conformes dans des zones à risque.",
    "Équipements non accessibles ",
    "Mauvais emplacement des équipements",
    "Absence d’étiquetage ou de signalisation",
    "Extincteurs ou RIA non vérifiés régulièrement (dates de vérification dépassées).",
    "Équipement défectueux ou vidé",
    "Utilisation d’un type d’extincteur non adapté aux risques présents",
    "Plan d’évacuation ou plan de lutte incendie manquant ou non mis à jour.",
    "Système de détection incendie (détecteurs de fumée, alarme) hors service ou en panne.",
    "Personnel non formé ou mal formé à l’utilisation des moyens de lutte incendie.",
  ],

  "Moyens de levage — Matériel / État technique": [
    "Absence ou dépassement de la date de vérification périodique des ponts roulant (contrôle réglementaire annuel non effectué).",
    "Absence ou dépassement de la date de vérification périodique des accessoires de levage (contrôle réglementaire annuel non effectué).",
    "Palan ou pont roulant présentant des signes de défaillance (bruits anormaux, usure visible, câbles effilochés).",
    "Charge non centrée ou mal équilibrée lors du levage. (Incident (08-04-2025)",
    "Absence ou dysfonctionnement des systèmes de sécurité (à identifier avec maintenance)",
    "Accessoires de levage endommagés (Crochet – élingues - sangles …)",
    "Accessoires de levage endommagés (Praticable – châssis (ADM KAWNEER …))",
    "Étiquettes d’identification/Vérification illisibles ou absentes (capacité de charge, n° d’identification, etc.).",
  ],

  "Moyens de levage — Utilisation / Comportement": [
    "Manœuvre par une personne non autorisée ou non formée.",
    "Non-respect des consignes généraux de manutention",
    "Levage ou déplacement de charge au-dessus de personnes (zone non dégagée ou non balisée).",
    "Dépassement de la charge maximale autorisée (surcharge).",
  ],

  "Moyens de levage — Organisation / Environnement": [
    "Zone de levage encombrée",
    "Manque d’entretien préventif programmé ou registre de suivi inexistant.",
    "Pont roulant ou palan utilisé malgré une alerte ou une anomalie signalée non traitée.",
  ],

  "Gestion des déchets": [
    "Mauvais tri des déchets",
    "Stockage non conforme",
    "Absence de traçabilité",
    "Absence d’étiquetage ou d’identification des déchets stockés.",
  ],

  "Travaux en hauteur": [
    "Absence ou mauvais usage des (EPI) Harnais non porté ou mal attaché.",
    "Harnais attaché à un point d’ancrage non certifié ou non résistant.",
    "Utilisation d'une échelle comme poste de travail au lieu.",
    "Échelle instable, non fixée ou posée sur un sol glissant/irrégulier.",
    "Échafaudage utilisé sans réception ou vérification par une personne compétente.",
    "Éléments manquants (plinthes, planchers incomplets, fixation défectueuse...).",
    "Absence d'autorisation de travail en hauteur",
    "Personnel non formé ou non habilité",
    "Conditions météorologiques ignorées",
    "Travail en toiture ou sur nacelle malgré un vent fort, pluie.",
  ],

  "Stockage produits chimiques": [
    "Produits stockés sans étiquetage clair (nom, pictogrammes de danger, date, etc.)",
    "Incompatibilité de produits stockés ensemble (ex : acides avec bases, oxydants avec matières organiques)",
    "Contenants détériorés, fuyants ou rouillés",
    "Produits chimiques stockés en dehors des armoires ou zones dédiées",
    "Contenants non fermés hermétiquement",
    "Absence de bac de rétention sous les contenants liquides",
    "Stockage au sol sans protection contre les fuites",
    "Équipements d’urgence non disponibles (douche oculaire, douche de sécurité, extincteurs)",
    "Opérateurs manipulant les produits chimiques sans EPI (gants, lunettes, masque, etc.)",
    "Présence de produits chimiques à proximité de canalisations ou bouches d’égout",
  ],

  "Sécurité des machines": [
    "Absence de protection sur les parties en mouvement (ex : poulies, chaînes, lames)",
    "Dispositifs de sécurité (capteurs, arrêts d’urgence) désactivés ou non fonctionnels",
    "Arrêts d'urgence inaccessibles ou mal identifiés",
    "Machines utilisées avec des pièces ou câblages dénudés",
    "Capteurs ou interverrouillages shuntés (court-circuités volontairement)",
    "Machines non verrouillées pendant les opérations de maintenance (absence de LOTO)",
  ],

  "Sol": [
    "Déversement accidentel de produits chimiques ou polluants non contenu immédiatement.",
    "Sol glissant ou déformé entraînant des risques de chute.",
  ],

  "Risques environnementaux": [
    "Stockage de produits chimiques sans bac de rétention",
    "Fuites non signalées ou non contenues rapidement.",
    "Rejets accidentels ou non traités dans le réseau pluvial ou les milieux naturels.",
    "Émissions de poussières ou de fumées toxiques",
  ],

  "Gestion des prestataires": [
    "Non-respect des consignes de sécurité ou environnementales du site.",
    "Utilisation d’équipements non conformes ou non contrôlés (machines, EPI…).",
    "Zone de travail mal balisée ou non sécurisée.",
    "Non-port des EPI obligatoires par les intervenants extérieurs.",
  ],

  "Hygiéne": [
    "Sanitaires insuffisants, sales ou non fonctionnels.",
    "Absence de savon, papier toilette, essuie-mains",
    "Locaux de restauration non nettoyés régulièrement ou mal entretenus.",
    "Manque d’eau potable ou points d’eau inaccessibles.",
    "Accumulation de poussières, saletés ou résidus de production.",
    "Absence ou oubli du nettoyage régulier des outils, machines, ou plans de travail.",
  ],

  "Espace confiné": [
    "Absence d’autorisation de travail spécifique ou de permis d’entrée.",
    "Atmosphère non contrôlée avant l’entrée (absence de détection gaz, O₂, CO, H₂S, etc.).",
    "Personnel non formé à l’intervention en espace confiné.",
    "Absence de procédure d’intervention ou de plan de secours.",
  ],
};

export const CATEGORY_LIST: string[] = Object.keys(CATEGORIES);
