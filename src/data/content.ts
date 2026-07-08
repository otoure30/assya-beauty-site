export type Botanical = {
  name: string;
  latin: string;
  benefit: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  need: string;
  price: string;
  description: string;
  ingredients: string;
  featured?: boolean;
};

export type Service = {
  name: string;
  description: string;
  label: string;
};

export type PriceItem = {
  name: string;
  detail: string;
  price: string;
};

export type PricingGroup = {
  title: string;
  items: PriceItem[];
};

export type Offer = {
  name: string;
  price: string;
  includes: string[];
};

export type Social = {
  name: string;
  handle: string;
  href?: string;
};

export const brand = {
  logo: "AB Cosmebio",
  brand: "Assya Beauty Cosmebio",
  tagline: "Votre Beauté Naturelle",
  centerName: "Centre capillaire",
  centerMission: "Nature & Soin",
  claim: "La nature au service de vos cheveux",
  intro:
    "Assya Beauty Cosmebio est un centre capillaire spécialisé dans les soins naturels et bio. Nous proposons des diagnostics capillaires personnalisés, des traitements contre les pellicules, des soins anti-chute, des soins hydratants et réparateurs, ainsi qu'une gamme de produits capillaires naturels pour des cheveux forts, sains et en pleine santé.",
  mission: "Votre beauté naturelle, notre priorité.",
  taglineSecondary: "Des cheveux sains, une confiance retrouvée !",
  careLine: "Prenez soin de vos cheveux, la nature s'en charge !",
  badgeLine: "NATUREL · SAIN · EFFICACE",
  phone: "625 29 99 98",
  whatsapp: "https://wa.me/224625299998",
  email: "assiab998@gmail.com",
  address: "Enta Mosquée Marocaine",
  locale: "Guinée",
};

export const socials: Social[] = [
  { name: "Facebook", handle: "Assya Beauty Cosmebio" },
  { name: "Instagram", handle: "Assya Beauty Cosmebio / @assiabeauty.cosmebio", href: "https://www.instagram.com/assiabeauty.cosmebio" },
  { name: "WhatsApp", handle: "Assya Beauty Cosmebio", href: brand.whatsapp },
  { name: "TikTok", handle: "Assya Beauty Cosmebio" },
  { name: "Snapchat", handle: "Assya Beauty Cosmebio" },
];

export const botanicals: Botanical[] = [
  {
    name: "Karité",
    latin: "Vitellaria paradoxa",
    benefit: "Nutrition",
    description: "Actif nourrissant utilisé dans les soins réparateurs et le masque capillaire.",
  },
  {
    name: "Gombo",
    latin: "Abelmoschus esculentus",
    benefit: "Hydratation",
    description: "Ingrédient naturel apprécié pour aider à hydrater, adoucir et définir la fibre.",
  },
  {
    name: "Hibiscus",
    latin: "Hibiscus sabdariffa",
    benefit: "Définition",
    description: "Actif végétal associé au karité et au gombo dans le masque capillaire phare.",
  },
  {
    name: "Ricin",
    latin: "Ricinus communis",
    benefit: "Croissance",
    description: "Huile utilisée dans les routines de croissance et de soin du cuir chevelu.",
  },
  {
    name: "Avocat",
    latin: "Persea americana",
    benefit: "Souplesse",
    description: "Huile végétale présente dans la routine de soin et le Sérum Miracle Croissance+.",
  },
  {
    name: "Baobab",
    latin: "Adansonia digitata",
    benefit: "Résistance",
    description: "Actif naturel utilisé pour accompagner les cheveux fragilisés.",
  },
  {
    name: "Moringa",
    latin: "Moringa oleifera",
    benefit: "Vigueur",
    description: "Plante utilisée dans les soins capillaires naturels pour soutenir la fibre.",
  },
  {
    name: "Coco",
    latin: "Cocos nucifera",
    benefit: "Soin",
    description: "Huile végétale présente dans les routines capillaires nourrissantes.",
  },
];

export const products: Product[] = [
  {
    id: "gamme-adulte",
    name: "Gamme Adulte",
    category: "Gammes",
    need: "Routine adulte",
    price: "290 000 GNF",
    description: "Une gamme de produits capillaires naturels et bio pour accompagner la routine adulte.",
    ingredients: "Produits capillaires naturels et bio",
  },
  {
    id: "gamme-kids",
    name: "Gamme Kids",
    category: "Gammes",
    need: "Routine enfant",
    price: "220 000 GNF",
    description: "Une routine douce pour prendre soin des cheveux des enfants.",
    ingredients: "Produits capillaires naturels et bio",
  },
  {
    id: "gommage-capillaire",
    name: "Gommage capillaire",
    category: "Soins",
    need: "Cuir chevelu",
    price: "100 000 GNF",
    description: "Soin destiné à accompagner le nettoyage et l'équilibre du cuir chevelu.",
    ingredients: "Formule capillaire Cosmebio",
  },
  {
    id: "spray-hydratant",
    name: "Spray hydratant",
    category: "Soins",
    need: "Hydratation",
    price: "70 000 GNF",
    description: "Spray pour aider à maintenir l'hydratation dans la routine capillaire.",
    ingredients: "Formule hydratante",
  },
  {
    id: "masque-karite-hibiscus-gombo",
    name: "Masque capillaire Karité Hibiscus Gombo",
    category: "Produits phares",
    need: "Nutrition intense",
    price: "Prix sur demande",
    description: "Masque à base de karité, hibiscus et gombo pour la nutrition intense et la définition.",
    ingredients: "Karité, hibiscus, gombo",
    featured: true,
  },
  {
    id: "serum-miracle-croissance-plus",
    name: "Sérum Miracle Croissance+",
    category: "Produits phares",
    need: "Croissance",
    price: "Prix sur demande",
    description: "Produit capillaire pour accompagner la routine de croissance et de soin des cheveux.",
    ingredients: "Ricin, olive, coco, hibiscus, avocat, baobab, moringa",
    featured: true,
  },
];

export const services: Service[] = [
  {
    name: "Diagnostic capillaire personnalisé",
    description: "Analyse complète de votre cuir chevelu et conseils adaptés à vos besoins.",
    label: "Analyse",
  },
  {
    name: "Traitement pellicules",
    description: "Élimine les pellicules, apaise les démangeaisons et rééquilibre le cuir chevelu.",
    label: "Cuir chevelu",
  },
  {
    name: "Traitement alopécie",
    description: "Stimule la repousse, renforce la fibre capillaire et limite la chute des cheveux.",
    label: "Anti-chute",
  },
  {
    name: "Soins capillaires bio karité & gombo",
    description: "Des soins nourrissants, hydratants et réparateurs à base d'ingrédients naturels.",
    label: "Soin bio",
  },
  {
    name: "Produits capillaires naturels et bio",
    description: "Une gamme de produits sains et efficaces pour des cheveux forts et en pleine santé.",
    label: "Cosmebio",
  },
];

export const pricingGroups: PricingGroup[] = [
  {
    title: "Soins capillaires",
    items: [
      { name: "Diagnostic capillaire", detail: "Analyse complète du cuir chevelu", price: "50 000 GNF" },
      { name: "Diagnostic approfondi", detail: "Diagnostic + plan de traitement", price: "100 000 GNF" },
      { name: "Traitement pellicules", detail: "Séance unique", price: "150 000 GNF" },
      { name: "Traitement pellicules", detail: "Cure de 4 séances", price: "500 000 GNF" },
      { name: "Traitement alopécie", detail: "Séance unique", price: "200 000 GNF" },
      { name: "Traitement alopécie", detail: "Cure de 4 séances", price: "700 000 GNF" },
      { name: "Traitement alopécie", detail: "Cure de 8 séances", price: "1 300 000 GNF" },
      { name: "Soin capillaire bio karité & gombo", detail: "Cheveux courts", price: "150 000 GNF" },
      { name: "Soin capillaire bio karité & gombo", detail: "Cheveux mi-longs", price: "200 000 GNF" },
      { name: "Soin capillaire bio karité & gombo", detail: "Cheveux longs", price: "250 000 GNF" },
      { name: "Bain d'huile + massage du cuir chevelu", detail: "30 min", price: "100 000 GNF" },
      { name: "Bain d'huile + massage du cuir chevelu", detail: "45 min", price: "150 000 GNF" },
      { name: "Soin hydratation intense", detail: "Cheveux naturels", price: "200 000 GNF" },
      { name: "Soin hydratation intense", detail: "Cheveux très secs ou abîmés", price: "250 000 GNF" },
    ],
  },
  {
    title: "Produits Cosmebio",
    items: [
      { name: "Gamme Adulte", detail: "Routine capillaire", price: "290 000 GNF" },
      { name: "Gamme Kids", detail: "Routine enfant", price: "220 000 GNF" },
      { name: "Gommage capillaire", detail: "Soin du cuir chevelu", price: "100 000 GNF" },
      { name: "Spray hydratant", detail: "Hydratation quotidienne", price: "70 000 GNF" },
    ],
  },
  {
    title: "Accessoires",
    items: [
      { name: "Bonnet en satin", detail: "Accessoire", price: "20 000 GNF" },
      { name: "Chouchou en satin", detail: "Accessoire", price: "5 000 GNF" },
      { name: "Applicateur", detail: "Accessoire", price: "25 000 GNF" },
      { name: "Brosse massante", detail: "Accessoire", price: "25 000 GNF" },
      { name: "Serviette microfibre", detail: "Accessoire", price: "20 000 GNF" },
    ],
  },
  {
    title: "Tresses",
    items: [
      { name: "Tresses simples", detail: "À partir de", price: "50 000 GNF" },
      { name: "Tresses stylées", detail: "À partir de", price: "100 000 GNF" },
      { name: "Perles", detail: "Supplément", price: "10 000 GNF" },
    ],
  },
];

export const offers: Offer[] = [
  {
    name: "Pack Croissance",
    price: "800 000 GNF",
    includes: ["Diagnostic", "4 séances anti-chute", "1 Sérum Miracle Croissance+"],
  },
  {
    name: "Pack Cheveux Sains",
    price: "300 000 GNF",
    includes: ["Diagnostic", "Soin Karité Gombo", "Massage du cuir chevelu"],
  },
];

export const collections = [
  ["Pellicules", "Apaiser les démangeaisons et rééquilibrer le cuir chevelu"],
  ["Anti-chute", "Accompagner la repousse et renforcer la fibre"],
  ["Hydratation", "Aider les cheveux naturels, secs ou abîmés"],
  ["Karité & Gombo", "Nourrir, hydrater et réparer avec des ingrédients naturels"],
  ["Kids", "Une routine douce pour les enfants"],
  ["Accessoires", "Satin, microfibre et outils de soin"],
];

export const articles = [
  [
    "Commencer par le diagnostic",
    "Le diagnostic permet de comprendre le cuir chevelu avant de choisir un traitement ou une routine.",
  ],
  [
    "Karité, hibiscus et gombo",
    "Le masque capillaire phare associe ces ingrédients pour la nutrition intense et la définition.",
  ],
  [
    "Confirmer son rendez-vous",
    "La réservation est confirmée après réception de l'acompte fixe de 50 000 FG.",
  ],
];

export const booking = {
  title: "Prise de rendez-vous",
  intro: "Prenez soin de vous, nous prenons le temps pour vous.",
  requiredFields: ["Nom et prénom", "Numéro WhatsApp", "Date souhaitée", "Prestation souhaitée"],
  opening: "Ouvert du mardi au dimanche à partir de 10h00.",
  slots: ["10h00 - 12h00", "12h00 - 14h00", "14h00 - 16h00", "16h00 - 18h00", "18h00 - 20h00"],
  deposit: "50 000 FG",
  depositText:
    "Pour confirmer votre rendez-vous, un acompte fixe de 50 000 FG est demandé. Le rendez-vous est confirmé après réception de l'acompte.",
  depositFields: ["Montant de l'acompte versé", "Mode de paiement"],
  observations: "Allergies, grossesse, état des cheveux, demandes spécifiques, etc.",
  conditions: [
    "Réservation sur rendez-vous uniquement.",
    "Réservation confirmée uniquement après versement de l'acompte.",
    "L'acompte de 50 000 FG n'est pas remboursable en cas d'annulation.",
    "Merci d'arriver à l'heure.",
    "Tout retard de plus de 30 minutes peut entraîner le report ou l'annulation du rendez-vous.",
    "Après 30 minutes de retard sans notification, le créneau pourra être attribué à une autre cliente.",
    "Toute annulation ou report doit être signalé à l'avance.",
  ],
};

export const commitments = ["Bio naturel", "Sans sulfates", "Non testé sur les animaux", "Naturel", "Sain", "Efficace"];
