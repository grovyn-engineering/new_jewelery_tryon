// Aurevya catalogue data using local high-resolution imagery.

export type Category = {
  id: string
  name: string
  descriptor: string
  image: string
  count: number
}

export type Product = {
  id: string
  name: string
  category: string
  categoryLabel: string
  descriptor: string
  price: string // "Price on Request" or "₹..."
  material: string
  stone: string
  image: string // product still-life
  worn: string // editorial worn / try-on preview reference
  tryOn: boolean
}

export type JournalEntry = {
  id: string
  kicker: string
  title: string
  excerpt: string
  image: string
  read: string
}

export const categories: Category[] = [
  {
    id: 'necklaces',
    name: 'Necklaces',
    descriptor: 'Collars, rivières and pendants worn close to the skin.',
    image: '/Images/necklace_new_emerald.jpg',
    count: 3,
  },
  {
    id: 'earrings',
    name: 'Earrings',
    descriptor: 'Studs, drops and créoles that catch the light.',
    image: '/Images/earinings1.jpg',
    count: 31,
  },
  {
    id: 'rings',
    name: 'Rings',
    descriptor: 'Solitaires and signets, set by hand.',
    image: '/Images/diamond2.jpg',
    count: 28,
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    descriptor: 'Bangles and chains that trace the wrist.',
    image: '/Images/bangles1.webp',
    count: 17,
  },
  {
    id: 'high-jewellery',
    name: 'High Jewellery',
    descriptor: 'One-of-one pieces from the atelier.',
    image: '/Images/diamond4.avif',
    count: 9,
  },
]

export const products: Product[] = [
  {
    id: 'emerald-royale',
    name: 'Émeraude Royale Pendant',
    category: 'necklaces',
    categoryLabel: 'Necklace',
    descriptor: 'Vintage filigree emerald pendant',
    price: '₹ 5,80,000',
    material: '18k yellow gold',
    stone: 'Zambian emerald & diamond halo',
    image: '/Images/necklace_new_emerald.jpg',
    worn: '/Images/model1.jpg',
    tryOn: true,
  },
  {
    id: 'diamond-riviere',
    name: 'Eternité Rivière Collar',
    category: 'necklaces',
    categoryLabel: 'Collar',
    descriptor: 'Graduated brilliant diamond rivière',
    price: 'Price on Request',
    material: 'Platinum',
    stone: 'Round brilliant diamonds, 8.5ct total',
    image: '/Images/necklace_riviere.jpg',
    worn: '/Images/model1.jpg',
    tryOn: true,
  },
  {
    id: 'vesper-pendant',
    name: 'Vesper Diamond Pendant',
    category: 'necklaces',
    categoryLabel: 'Pendant',
    descriptor: 'Fine gold chain with drop pendant',
    price: '₹ 2,60,000',
    material: '18k yellow gold',
    stone: 'Champagne diamond drop',
    image: '/Images/necklace2.jpg',
    worn: '/Images/model1.jpg',
    tryOn: true,
  },
  {
    id: 'lumiere-drops',
    name: 'Lumière Drops',
    category: 'earrings',
    categoryLabel: 'Earrings',
    descriptor: 'Elongated drop earrings in yellow gold',
    price: 'Price on Request',
    material: '18k yellow gold',
    stone: 'Pear-cut white topaz',
    image: '/Images/earinings1.jpg',
    worn: '/Images/model2.jpg',
    tryOn: false,
  },
  {
    id: 'aurelia-solitaire',
    name: 'Aurélia Solitaire',
    category: 'rings',
    categoryLabel: 'Ring',
    descriptor: 'Six-claw solitaire on a fine band',
    price: '₹ 4,20,000',
    material: 'Platinum',
    stone: 'Round brilliant diamond, 0.9ct',
    image: '/Images/diamond2.jpg',
    worn: '/Images/model2.jpg',
    tryOn: false,
  },
  {
    id: 'saphir-nocturne',
    name: 'Saphir Nocturne',
    category: 'rings',
    categoryLabel: 'Ring',
    descriptor: 'Sapphire halo cocktail ring',
    price: 'Price on Request',
    material: '18k white gold',
    stone: 'Ceylon sapphire with diamond halo',
    image: '/Images/diamond3.jpeg',
    worn: '/Images/model2.jpg',
    tryOn: false,
  },
  {
    id: 'colette-studs',
    name: 'Colette Studs',
    category: 'earrings',
    categoryLabel: 'Earrings',
    descriptor: 'Everyday brilliant-cut studs',
    price: '₹ 1,15,000',
    material: '18k yellow gold',
    stone: 'Brilliant-cut diamonds, 0.5ct pair',
    image: '/Images/earings2.jpg',
    worn: '/Images/model2.jpg',
    tryOn: false,
  },
  {
    id: 'pearl-elegance',
    name: 'Pearl Élégance Drops',
    category: 'earrings',
    categoryLabel: 'Earrings',
    descriptor: 'South Sea pearls set with diamond studs',
    price: '₹ 2,85,000',
    material: '18k white gold',
    stone: 'South Sea pearl & round brilliant diamonds',
    image: '/Images/earings3.jpg',
    worn: '/Images/model2.jpg',
    tryOn: false,
  },
  {
    id: 'ondine-bangle',
    name: 'Ondine Bangle',
    category: 'bracelets',
    categoryLabel: 'Bracelet',
    descriptor: 'Slim pavé-set bangle',
    price: 'Price on Request',
    material: '18k rose gold',
    stone: 'Pavé diamonds',
    image: '/Images/bangles1.webp',
    worn: '/Images/bangles2.jpeg',
    tryOn: false,
  },
  {
    id: 'solstice-cuff',
    name: 'Solstice Rose Cuff',
    category: 'bracelets',
    categoryLabel: 'Bracelet',
    descriptor: 'Polished rose gold architectural cuff',
    price: '₹ 3,40,000',
    material: '18k rose gold',
    stone: 'Single accent diamond',
    image: '/Images/bangles3.jpeg',
    worn: '/Images/bangles1.webp',
    tryOn: false,
  },
  {
    id: 'royal-crest',
    name: 'Royal Diamond Crest',
    category: 'high-jewellery',
    categoryLabel: 'High Jewellery',
    descriptor: 'Masterpiece pendant with flawless brilliance',
    price: 'Price on Request',
    material: 'Platinum & 18k yellow gold',
    stone: 'VVS1 D-color diamond solitaire',
    image: '/Images/diamond5.jpg',
    worn: '/Images/model1.jpg',
    tryOn: false,
  },
]

export const journal: JournalEntry[] = [
  {
    id: 'j1',
    kicker: 'Atelier',
    title: 'The quiet art of the claw setting',
    excerpt: 'How a single stone is held by six points of gold, and why the negative space matters as much as the metal.',
    image: '/Images/diamond5.jpg',
    read: '6 min',
  },
  {
    id: 'j2',
    kicker: 'Perspective',
    title: 'Seeing a piece before it becomes yours',
    excerpt: 'On the difference between imagining jewellery on yourself and actually seeing it — and why that changes the choice.',
    image: '/Images/model1.jpg',
    read: '4 min',
  },
  {
    id: 'j3',
    kicker: 'Materials',
    title: 'Reading the colour of gold',
    excerpt: 'Yellow, rose, white — the alloy is a decision, not a default. A short guide to choosing your metal.',
    image: '/Images/necklace3.jpg',
    read: '5 min',
  },
]

// Sample portraits offered inside the try-on flow ("use a sample photo").
export const samplePortraits: string[] = [
  '/Images/model1.jpg',
  '/Images/model2.jpg',
]
