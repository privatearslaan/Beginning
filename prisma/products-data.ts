export type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: "FOOD" | "TOYS" | "ACCESSORIES" | "HEALTH" | "GROOMING";
  petType: "DOG" | "CAT" | "BIRD" | "FISH" | "SMALL_PET" | "ALL";
  images: string[];
  featured: boolean;
};

const img = (path: string) => `https://thehappytails.co.in/assets/img/${path}`;

export const INDIAN_PET_PRODUCTS: SeedProduct[] = [
  {
    name: "Me O Creamy Crab Cat Treats",
    slug: "me-o-creamy-crab-cat-treats",
    description:
      "Creamy lickable cat treat with crab flavour. Ideal as a snack or reward for adult cats.",
    price: 425,
    stock: 19,
    category: "FOOD",
    petType: "CAT",
    images: [img("ACCESSORIES/Me%20O%20Creamy%20Crab%20Cat%20Treats.png")],
    featured: true,
  },
  {
    name: "Drools Cat Treat Biscuits Real Chicken Flavor 400g Jar",
    slug: "drools-cat-treat-biscuits-real-chicken-flavor-400g-jar",
    description:
      "Crunchy chicken-flavour cat treats in a 400 g jar. Suitable for everyday rewarding.",
    price: 240,
    stock: 17,
    category: "FOOD",
    petType: "CAT",
    images: [
      img(
        "ACCESSORIES/Drools%20Cat%20Treat%20Biscuits%20Real%20Chicken%20Flavor%20400g%20Jar.jpg",
      ),
    ],
    featured: true,
  },
  {
    name: "Pedigree Puppy Wet Dog Food, Chicken in Gravy with Vegetables, 15 Pouches (15 x 70g)",
    slug: "pedigree-puppy-wet-dog-food-chicken-in-gravy-with-vegetables-15-pouches-15-x-70g",
    description:
      "Complete wet food for puppies with chicken in gravy and vegetables. Pack of 15 pouches.",
    price: 675,
    stock: 24,
    category: "FOOD",
    petType: "DOG",
    images: [
      img(
        "DOG%20PRODUCTS/Pedigree%20Puppy%20Wet%20Dog%20Food,%20Chicken%20in%20Gravy%20with%20Vegetables,%2015%20Pouches%20(15%20x%2070g).jpg",
      ),
    ],
    featured: true,
  },
  {
    name: "Me-O Kitten Persian Dry Cat Food - (1.2 Kg, Chicken Flavour), Pack of 1",
    slug: "me-o-kitten-persian-dry-cat-food-1-2-kg-chicken-flavour-pack-of-1",
    description:
      "Dry kitten food for Persian cats with chicken flavour. 1.2 kg pack.",
    price: 382,
    stock: 15,
    category: "FOOD",
    petType: "CAT",
    images: [
      img(
        "CAT%20PRODUCTS/Heads%20Up%20For%20Tails%20Me-O%20Kitten%20Persian%20Dry%20Cat%20Food%20-%20(%206.8%20Kg,%20Chicken%20Flavour),Pack%20of%201.jpg",
      ),
    ],
    featured: true,
  },
  {
    name: "Me-O Kitten Persian Dry Cat Food - (6.8 Kg, Chicken Flavour), Pack of 1",
    slug: "me-o-kitten-persian-dry-cat-food-6-8-kg-chicken-flavour-pack-of-1",
    description:
      "Economy pack dry kitten food for Persian cats. Chicken flavour, 6.8 kg.",
    price: 1935,
    stock: 20,
    category: "FOOD",
    petType: "CAT",
    images: [
      img(
        "CAT%20PRODUCTS/Heads%20Up%20For%20Tails%20Me-O%20Kitten%20Persian%20Dry%20Cat%20Food%20-%20(%206.8%20Kg,%20Chicken%20Flavour),Pack%20of%201.jpg",
      ),
    ],
    featured: true,
  },
  {
    name: "Me-O Pouch Kitten Wet Food Tuna in Jelly 80 G, (Pack of 12)",
    slug: "me-o-pouch-kitten-wet-food-tuna-in-jelly-80-g-pack-of-12",
    description:
      "Wet kitten food pouches with tuna in jelly. Pack of 12 x 80 g.",
    price: 540,
    stock: 28,
    category: "FOOD",
    petType: "CAT",
    images: [
      img(
        "CAT%20PRODUCTS/Me-O%20Pouch%20Kitten%20Wet%20Food%20Tuna%20in%20Jelly%2080%20G,%20(Pack%20of%2012,%20960g).jpg",
      ),
    ],
    featured: true,
  },
  {
    name: "Drools Adult Dry Dog Food Chicken & Egg 3 kg",
    slug: "drools-adult-dry-dog-food-chicken-egg-3kg",
    description:
      "Balanced dry food for adult dogs with chicken and egg protein. 3 kg bag.",
    price: 699,
    stock: 30,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: true,
  },
  {
    name: "Drools Focus Puppy Super Premium Dog Food 4 kg",
    slug: "drools-focus-puppy-super-premium-dog-food-4kg",
    description:
      "Super premium puppy formula supporting growth, immunity and digestion. 4 kg.",
    price: 1499,
    stock: 18,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: true,
  },
  {
    name: "Pedigree Adult Dry Dog Food Meat & Rice 3 kg",
    slug: "pedigree-adult-dry-dog-food-meat-rice-3kg",
    description:
      "Complete and balanced dry dog food with meat and rice for adult dogs.",
    price: 749,
    stock: 35,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Pedigree Adult Wet Dog Food Chicken & Liver 70 g (Pack of 12)",
    slug: "pedigree-adult-wet-dog-food-chicken-liver-12-pack",
    description:
      "Adult wet dog food with chicken and liver in gravy. Pack of 12 pouches.",
    price: 480,
    stock: 40,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Royal Canin Maxi Adult Dry Dog Food 4 kg",
    slug: "royal-canin-maxi-adult-dry-dog-food-4kg",
    description:
      "Premium nutrition for large breed adult dogs. Supports bones and joints.",
    price: 2899,
    stock: 12,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: true,
  },
  {
    name: "Royal Canin Persian Adult Dry Cat Food 2 kg",
    slug: "royal-canin-persian-adult-dry-cat-food-2kg",
    description:
      "Specialized kibble for Persian cats supporting coat health and digestion.",
    price: 2199,
    stock: 14,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: true,
  },
  {
    name: "Whiskas Adult Wet Cat Food Tuna 85 g (Pack of 12)",
    slug: "whiskas-adult-wet-cat-food-tuna-12-pack",
    description:
      "Wet cat food with tuna in jelly. Complete meal for adult cats.",
    price: 420,
    stock: 45,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Whiskas Kitten Dry Cat Food Ocean Fish 1.1 kg",
    slug: "whiskas-kitten-dry-cat-food-ocean-fish-1-1kg",
    description:
      "Dry kitten food with ocean fish flavour and essential nutrients.",
    price: 399,
    stock: 32,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Farmina N&D Pumpkin Lamb & Blueberry Adult Mini Dog Food 2.5 kg",
    slug: "farmina-nd-pumpkin-lamb-blueberry-mini-dog-2-5kg",
    description:
      "Grain-free mini breed formula with lamb, pumpkin and blueberry.",
    price: 2499,
    stock: 10,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: true,
  },
  {
    name: "Farmina N&D Quinoa Digestion Lamb Adult Cat Food 1.5 kg",
    slug: "farmina-nd-quinoa-digestion-lamb-cat-1-5kg",
    description:
      "Functional cat food for digestive sensitivity with lamb and quinoa.",
    price: 1899,
    stock: 11,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Purepet Adult Dry Dog Food Meat & Rice 3 kg",
    slug: "purepet-adult-dry-dog-food-meat-rice-3kg",
    description:
      "Affordable complete dry food for adult dogs with meat and rice.",
    price: 549,
    stock: 50,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "SmartHeart Adult Dry Dog Food Chicken & Egg 3 kg",
    slug: "smartheart-adult-dry-dog-food-chicken-egg-3kg",
    description:
      "Adult dog food enriched with chicken, egg and omega fatty acids.",
    price: 899,
    stock: 28,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "SmartHeart Gold Puppy Dry Dog Food 3 kg",
    slug: "smartheart-gold-puppy-dry-dog-food-3kg",
    description: "Puppy formula with DHA for brain development. 3 kg pack.",
    price: 999,
    stock: 22,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Friskies Surfin' & Turfin' Favourites Dry Cat Food 1.2 kg",
    slug: "friskies-surfin-turfin-dry-cat-food-1-2kg",
    description:
      "Popular dry cat food with seafood and poultry flavours.",
    price: 499,
    stock: 36,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Grain Zero Adult Dry Dog Food Grain Free 2 kg",
    slug: "grain-zero-adult-grain-free-dog-food-2kg",
    description:
      "Grain-free adult dog food with real meat protein and no fillers.",
    price: 1199,
    stock: 16,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Drools Absolute Calcium Bone For Dogs (Pack of 4)",
    slug: "drools-absolute-calcium-bone-dogs-4-pack",
    description:
      "Calcium-enriched chew bones that support dental health and satisfy chewing.",
    price: 320,
    stock: 40,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Me-O Adult Dry Cat Food Mackerel 1.2 kg",
    slug: "me-o-adult-dry-cat-food-mackerel-1-2kg",
    description:
      "Adult cat dry food with mackerel flavour and balanced nutrition.",
    price: 365,
    stock: 25,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Me-O Adult Dry Cat Food Salmon 7 kg",
    slug: "me-o-adult-dry-cat-food-salmon-7kg",
    description: "Value pack adult cat food with salmon flavour. 7 kg bag.",
    price: 1799,
    stock: 12,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Pedigree Dentastix Oral Care Dog Treats Medium 7 Sticks",
    slug: "pedigree-dentastix-medium-7-sticks",
    description:
      "Daily oral care treats that reduce tartar buildup for medium dogs.",
    price: 210,
    stock: 55,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Himalaya Healthy Pet Food Adult Dog Chicken & Rice 3 kg",
    slug: "himalaya-healthy-pet-food-adult-dog-3kg",
    description:
      "Herbal-enriched dry dog food with chicken and rice for adult dogs.",
    price: 849,
    stock: 20,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Emily Pets Clumping Cat Litter 5 kg",
    slug: "emily-pets-clumping-cat-litter-5kg",
    description:
      "Clumping cat litter with odour control. Suitable for indoor cats.",
    price: 399,
    stock: 30,
    category: "ACCESSORIES",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Drools Chicken Jerky Dog Treats 400 g",
    slug: "drools-chicken-jerky-dog-treats-400g",
    description:
      "High-protein chicken jerky strips for training and rewarding dogs.",
    price: 299,
    stock: 38,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Royal Canin Kitten Dry Cat Food 2 kg",
    slug: "royal-canin-kitten-dry-cat-food-2kg",
    description:
      "Premium kitten food supporting immune system and healthy growth.",
    price: 2099,
    stock: 15,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: true,
  },
  {
    name: "Aimil Pharmazyme Pet Digestive Supplement 200 ml",
    slug: "aimil-pharmazyme-pet-digestive-supplement-200ml",
    description:
      "Digestive tonic for dogs and cats to support appetite and gut health.",
    price: 275,
    stock: 24,
    category: "HEALTH",
    petType: "ALL",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Goofy Tails Natural Peanut Butter for Dogs 340 g",
    slug: "goofy-tails-natural-peanut-butter-dogs-340g",
    description:
      "Xylitol-free peanut butter spread for dogs. Great for Kong stuffing.",
    price: 349,
    stock: 26,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Purepet Cat Adult Ocean Fish Dry Food 1 kg",
    slug: "purepet-cat-adult-ocean-fish-dry-food-1kg",
    description:
      "Economical dry cat food with ocean fish flavour and taurine.",
    price: 199,
    stock: 42,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Drools Real Chicken & Chicken Liver Gravy Adult Dog Food 150 g (Pack of 6)",
    slug: "drools-chicken-liver-gravy-adult-dog-6-pack",
    description:
      "Adult wet dog food with real chicken and liver in gravy. Pack of 6.",
    price: 360,
    stock: 33,
    category: "FOOD",
    petType: "DOG",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
  {
    name: "Whiskas Adult Dry Cat Food Tuna 1.1 kg",
    slug: "whiskas-adult-dry-cat-food-tuna-1-1kg",
    description:
      "Complete dry cat food with tuna flavour for everyday feeding.",
    price: 389,
    stock: 34,
    category: "FOOD",
    petType: "CAT",
    images: ["/placeholder-product.svg"],
    featured: false,
  },
];
