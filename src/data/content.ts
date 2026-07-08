export type Botanical = {
  name: string;
  latin: string;
  benefit: string;
  description: string;
};

export const brand = {
  logo: "AB Cosmébio",
  brand: "Assya Beauty Cosmébio",
  tagline: "Votre Beauté Naturelle",
  centerName: "Centre Capillaire",
  centerMission: "Nature & Soin",
  claim: "La nature au service de vos cheveux",
  mission: "Votre beauté naturelle, notre priorité. Merci de votre confiance !",
  taglineSecondary: "Des cheveux sains, une confiance retrouvée !",
  badgeLine: "NATUREL · SAIN · EFFICACE",
  phone: "625 29 99 98",
  whatsapp: "https://wa.me/224625299998",
  locale: "Guinée",
};

export const socials = [
  ["Facebook", "AB Cosmébio", "https://www.facebook.com/share/1E8jPz8zoU/"],
  ["Instagram", "assiabeauty.cosmebio", "https://www.instagram.com/assiabeauty.cosmebio"],
  ["WhatsApp", "625 29 99 98", "https://wa.me/224625299998"],
  ["TikTok", "@abcosmebio998", "https://www.tiktok.com/@abcosmebio998"],
  ["Snapchat", "AB Cosmébio", "#"],
];

export const botanicals: Botanical[] = [
  {
    name: "Karité",
    latin: "Vitellaria paradoxa",
    benefit: "Nutrition",
    description:
      "Beurre africain nourrissant, utilisé pour hydrater, réparer la fibre et redonner de la maniabilité.",
  },
  {
    name: "Gombo",
    latin: "Abelmoschus esculentus",
    benefit: "Hydratation",
    description:
      "Plante mucilagineuse connue pour adoucir la tige capillaire, améliorer la rétention d'eau et stabiliser la texture.",
  },
  {
    name: "Hibiscus",
    latin: "Hibiscus sabdariffa",
    benefit: "Brillance",
    description:
      "Espèce florale utilisée pour apaiser la fibre, soutenir la douceur et aider à l'équilibre du cuir chevelu.",
  },
  {
    name: "Avocat",
    latin: "Persea americana",
    benefit: "Confort",
    description:
      "Huile précieuse à base d'huile d'avocat pour nourrir et réduire l'effet de cassure sur longueurs sèches.",
  },
  {
    name: "Moringa",
    latin: "Moringa oleifera",
    benefit: "Vigueur",
    description:
      "Poudre et extraits d'une plante dense en micronutriments pour renforcer les fibres fragiles.",
  },
  {
    name: "Baobab",
    latin: "Adansonia digitata",
    benefit: "Soin profond",
    description:
      "Riche en matière grasse naturelle, utilisé pour protéger la fibre et améliorer l'élasticité capillaire.",
  },
  {
    name: "Ricin",
    latin: "Ricinus communis",
    benefit: "Renaissance",
    description: "Huile de ricin utilisée pour les soins de pousse, avec un effet fortifiant du cuir chevelu.",
  },
  {
    name: "Touloucouna Gobi",
    latin: "Carapa procera",
    benefit: "Réparateur",
    description: "Essence patrimoniale de tradition locale pour restaurer profondeur et douceur.",
  },
];

export const products = [
  {
    id: "masque-karite-hibiscus-gombo",
    name: "Masque Capillaire Karité Hibiscus Gombo",
    category: "Masques",
    need: "Nutrition",
    price: 29,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    description: "Nutrition intense & définition, à base de karité, hibiscus et gombo.",
    ingredients: "Karité, hibiscus, gombo",
    featured: true,
  },
  {
    id: "serum-miracle-croissance-plus",
    name: "Sérum Miracle Croissance+",
    category: "Sérums",
    need: "Pousse",
    price: 34,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    description: "Sérum concentration 100 ml pour stimuler la pousse et fortifier la fibre.",
    ingredients: "Ricin, olive, coco, hibiscus, avocat, baobab, moringa",
    featured: true,
  },
  {
    id: "elixir-ginseng-regen",
    name: "Élixir Karité Gombo Réparateur",
    category: "Sérums",
    need: "Réparation",
    price: 27,
    image: "https://images.unsplash.com/photo-1512499617640-c2f999098c4a?auto=format&fit=crop&w=900&q=80",
    description: "Formule botanique dédiée aux cheveux déployés après styling fréquent.",
    ingredients: "Karité, gombo, huile végétale apaisante",
  },
  {
    id: "huile-essentielle-centre",
    name: "Huile Énergisante AB Botanica",
    category: "Huiles",
    need: "Rituel centre",
    price: 22,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=900&q=80",
    description: "Huile à diffusion courte pour la phase de massage du cuir chevelu.",
    ingredients: "Ricin, olive, coco, hibiscus",
  },
  {
    id: "coffret-center-rituel",
    name: "Coffret Rituel AB",
    category: "Coffrets",
    need: "Densité",
    price: 79,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
    description: "Complément de base centre : soin capillaire, rinçage doux et huile de finition.",
    ingredients: "Formule botanique mixte",
  },
];

export const articles = [
  [
    "Comprendre la porosité avec méthode",
    "Ajuster l'hydratation de la fibre selon le type de texture et la routine quotidienne.",
  ],
  [
    "Pourquoi le gombo change le toucher des cheveux",
    "Le gombo est valorisé comme actif capillaire pour calmer la fibre et améliorer sa réactivité.",
  ],
  [
    "Routine capillaire du Centre",
    "Les gestes de massage et d'application recommandés selon votre objectif capillaire.",
  ],
];

export const collections = [
  ["Pousse", "Rituels fortifiants"],
  ["Hydratation", "Fibre souple et vivifiante"],
  ["Nutrition", "Nourrir et consolider"],
  ["Anti-chute", "Soutien localisé du cuir chevelu"],
  ["Réparation", "Longueurs restaurées"],
  ["Cheveux crépus", "Définition et confort renforcé"],
  ["Cheveux bouclés", "Boucles nettes et tenues"],
  ["Cheveux défrisés", "Rassurer la structure"],
  ["Enfants", "Douceur quotidienne"],
  ["Homme", "Rythme simple et efficace"],
];

export const services = [
  [
    "Diagnostic capillaire personnalisé",
    "Bilan complet du cuir chevelu et préconisation de routine selon texture, porosité et besoins.",
    "Sur mesure",
  ],
  [
    "Traitement pellicules",
    "Restauration de l'équilibre cutané et traitement ciblé pour limiter des démangeaisons ou tiraillements.",
    "Nettoyage + soin",
  ],
  [
    "Traitement alopécie",
    "Programme de soins pour favoriser densité et renforcer la résistance des longueurs.",
    "Suivi personnalisé",
  ],
  [
    "Soins capillaires bio Karité Gombo",
    "Protocoles nourrissants et hydratants à base d'ingrédients naturels.",
    "Nourrissant",
  ],
  [
    "Produits capillaires naturels et bio",
    "Sélection de solutions naturelles pour le soin quotidien des cheveux et du cuir chevelu.",
    "Naturel · Bio",
  ],
];
