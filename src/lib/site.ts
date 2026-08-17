export const SITE = {
  name: "The Happy Tails",
  shortName: "Happy Tails",
  tagline:
    "The pet shop for premium food, treats, accessories and expert grooming in Anantnag.",
  description:
    "Pet shop in anantnag, Premium pet products, grooming bookings, doorstep support and delivery service areas for The Happy Tails in Anantnag, Jammu and Kashmir.",
  founded: "2020",
  freeDeliveryMin: 599,
  promoCode: "HAPP10",
  promoDiscount: 10,
  whatsapp: "919596404899",
  whatsappMessage: "Hi Happy Tails, I want to ask about products and grooming.",
  whatsappSupport: "Hi Happy Tails, I need support.",
  whatsappLiveAgent: "Hi Happy Tails, I want to speak to a live agent.",
  whatsappProducts: "Hi Happy Tails, I need help with pet products.",
  whatsappServices: "Hi Happy Tails, I want to know more about your services.",
  instagram: "https://www.instagram.com/thehappytails0",
  developer: { name: "SuperDevs", url: "https://superdevs.co.in/" },
  address: {
    line: "Nai Basti, Anantnag, Jammu & Kashmir 192101",
    street: "Nai Basti",
    city: "Anantnag",
    state: "Jammu & Kashmir",
    pincode: "192101",
  },
  emails: {
    primary: "thehappytails24@gmail.com",
    support: "suhan@thehappytails.co.in",
  },
  serviceAreas: ["Anantnag", "Bijbehara", "Khanabal", "Achabal"],
  stats: [
    { value: "50K+", label: "Pet parents reached" },
    { value: "7+", label: "Core categories" },
    { value: "2", label: "Grooming modes" },
  ],
  searchPlaceholder: "Search for products, brands and more...",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Grooming", badge: "New" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const FOOTER_SHOP_LINKS = [
  { href: "/shop", label: "Products" },
  { href: "/services", label: "Grooming" },
  { href: "/cart", label: "Cart" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/blog", label: "Blog" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help & Support" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/track-order", label: "Track Order" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

export const SEARCH_CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "dog-food", label: "Dog Food", href: "/shop?category=FOOD&petType=DOG" },
  { value: "cat-food", label: "Cat Food", href: "/shop?category=FOOD&petType=CAT" },
  { value: "treats", label: "Treats", href: "/shop?category=FOOD" },
  { value: "toys", label: "Toys", href: "/shop?category=TOYS" },
  { value: "accessories", label: "Accessories", href: "/shop?category=ACCESSORIES" },
  { value: "grooming", label: "Grooming", href: "/services" },
  { value: "health-wellness", label: "Health & Wellness", href: "/shop?category=HEALTH" },
] as const;

export const SHOP_CATEGORIES = [
  {
    label: "Dog Food",
    href: "/shop?category=FOOD&petType=DOG",
    image: "https://thehappytails.co.in/assets/img/index/dog%20category.avif",
  },
  {
    label: "Cat Food",
    href: "/shop?category=FOOD&petType=CAT",
    image: "https://thehappytails.co.in/assets/img/index/cat%20category.avif",
  },
  {
    label: "Treats",
    href: "/shop?category=FOOD",
    image: "https://thehappytails.co.in/assets/img/index/playfulkittens.jpg",
  },
  {
    label: "Toys",
    href: "/shop?category=TOYS",
    image: "https://thehappytails.co.in/assets/img/index/toys.avif",
  },
  {
    label: "Accessories",
    href: "/shop?category=ACCESSORIES",
    image: "https://thehappytails.co.in/assets/img/index/everything.jpg",
  },
  {
    label: "Grooming",
    href: "/services",
    image: "https://thehappytails.co.in/assets/img/index/grooming.jpg",
  },
  {
    label: "Health & Wellness",
    href: "/shop?category=HEALTH",
    image: "https://thehappytails.co.in/assets/img/index/signature.jpg",
  },
] as const;

export const TOP_BRANDS = [
  { slug: "aimil", label: "Aimil" },
  { slug: "drools", label: "Drools" },
  { slug: "emily-pets", label: "Emily Pets" },
  { slug: "farmina", label: "Farmina" },
  { slug: "friskies", label: "Friskies" },
  { slug: "futurekart", label: "Futurekart" },
  { slug: "goofy-tails", label: "Goofy Tails" },
  { slug: "grain-zero", label: "Grain Zero" },
] as const;

export const FEATURE_STRIP = [
  { title: "Free Delivery", text: "On orders above Rs. 599" },
  { title: "Genuine Products", text: "100% authentic items" },
  { title: "Easy Returns", text: "Hassle-free returns" },
  { title: "Secure Payments", text: "100% secure checkout" },
  { title: "Grooming Experts", text: "Professional pet care" },
] as const;

export const HERO_SLIDES = [
  {
    eyebrow: "All Your Pet Needs, All in One Place",
    title: "Happy Pets,",
    accent: "Happy Hearts",
    text: "Premium pet products and expert care to keep your furry friends happy and healthy.",
    image:
      "https://images.pexels.com/photos/7329892/pexels-photo-7329892.jpeg?auto=compress&cs=tinysrgb&w=1500",
    primaryHref: "/shop",
    primaryLabel: "Shop Now",
    secondaryHref: "/services",
    secondaryLabel: "Book Grooming",
  },
  {
    eyebrow: "All Your Pet Needs, All in One Place",
    title: "Fresh Food,",
    accent: "Fast Delivery",
    text: "Find trusted food, treats and wellness picks delivered across supported Anantnag areas.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1500&q=88",
    primaryHref: "/shop?category=FOOD&petType=DOG",
    primaryLabel: "Shop Food",
    secondaryHref: "/service-areas",
    secondaryLabel: "Check Areas",
  },
  {
    eyebrow: "All Your Pet Needs, All in One Place",
    title: "Gentle Grooming,",
    accent: "Clear Slots",
    text: "Book salon or home grooming with live slot availability and admin confirmation.",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1500&q=88",
    primaryHref: "/services",
    primaryLabel: "Book Now",
    secondaryHref: "/services",
    secondaryLabel: "View Services",
  },
] as const;

export const BEST_SELLERS = [
  {
    name: "Me O Creamy Crab Cat Treats",
    slug: "me-o-creamy-crab-cat-treats",
    price: 425,
    mrp: 425,
    rating: 4.8,
    reviews: 570,
    variant: "Standard",
    image:
      "https://thehappytails.co.in/assets/img/ACCESSORIES/Me%20O%20Creamy%20Crab%20Cat%20Treats.png",
  },
  {
    name: "Drools Cat Treat Biscuits Real Chicken Flavor 400g Jar",
    slug: "drools-cat-treat-biscuits-real-chicken-flavor-400g-jar",
    price: 240,
    mrp: 240,
    rating: 4.4,
    reviews: 510,
    variant: "400 g",
    image:
      "https://thehappytails.co.in/assets/img/ACCESSORIES/Drools%20Cat%20Treat%20Biscuits%20Real%20Chicken%20Flavor%20400g%20Jar.jpg",
  },
  {
    name: "Pedigree Puppy Wet Dog Food, Chicken in Gravy with Vegetables, 15 Pouches (15 x 70g)",
    slug: "pedigree-puppy-wet-dog-food-chicken-in-gravy-with-vegetables-15-pouches-15-x-70g",
    price: 675,
    mrp: 750,
    rating: 4.9,
    reviews: 720,
    variant: "15 x 70 g",
    discount: 10,
    image:
      "https://thehappytails.co.in/assets/img/DOG%20PRODUCTS/Pedigree%20Puppy%20Wet%20Dog%20Food,%20Chicken%20in%20Gravy%20with%20Vegetables,%2015%20Pouches%20(15%20x%2070g).jpg",
  },
  {
    name: "Me-O Kitten Persian Dry Cat Food - (1.2 Kg, Chicken Flavour), Pack of 1",
    slug: "me-o-kitten-persian-dry-cat-food-1-2-kg-chicken-flavour-pack-of-1",
    price: 382,
    mrp: 425,
    rating: 4.7,
    reviews: 450,
    variant: "1.2 kg",
    discount: 10,
    image:
      "https://thehappytails.co.in/assets/img/CAT%20PRODUCTS/Heads%20Up%20For%20Tails%20Me-O%20Kitten%20Persian%20Dry%20Cat%20Food%20-%20(%206.8%20Kg,%20Chicken%20Flavour),Pack%20of%201.jpg",
  },
  {
    name: "Me-O Kitten Persian Dry Cat Food - (6.8 Kg, Chicken Flavour), Pack of 1",
    slug: "me-o-kitten-persian-dry-cat-food-6-8-kg-chicken-flavour-pack-of-1",
    price: 1935,
    mrp: 2150,
    rating: 4.8,
    reviews: 600,
    variant: "6.8 kg",
    discount: 10,
    image:
      "https://thehappytails.co.in/assets/img/CAT%20PRODUCTS/Heads%20Up%20For%20Tails%20Me-O%20Kitten%20Persian%20Dry%20Cat%20Food%20-%20(%206.8%20Kg,%20Chicken%20Flavour),Pack%20of%201.jpg",
  },
  {
    name: "Me-O Pouch Kitten Wet Food Tuna in Jelly 80 G, (Pack of 12)",
    slug: "me-o-pouch-kitten-wet-food-tuna-in-jelly-80-g-pack-of-12",
    price: 540,
    mrp: 600,
    rating: 4.5,
    reviews: 840,
    variant: "12 x 80 g",
    discount: 10,
    image:
      "https://thehappytails.co.in/assets/img/CAT%20PRODUCTS/Me-O%20Pouch%20Kitten%20Wet%20Food%20Tuna%20in%20Jelly%2080%20G,%20(Pack%20of%2012,%20960g).jpg",
  },
] as const;

export const GROOMING_HOME = {
  title: "Book Pet Grooming",
  text: "Professional grooming at your doorstep. Safe, hygienic and stress-free.",
  cta: "Book Grooming Now",
  image:
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80",
  steps: [
    { step: 1, title: "Choose Service", text: "Bath & Brush" },
    { step: 2, title: "Pick Slot", text: "Select date and time" },
    { step: 3, title: "Confirm Booking", text: "We handle the rest" },
  ],
} as const;

export const REVIEWS = [
  {
    author: "Happy Tails Customer",
    quote: "Grooming team handled my pet gently.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80",
  },
  {
    author: "Priya Sharma",
    quote:
      "Great quality products and super fast delivery. My dog loves the food.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80",
  },
  {
    author: "Rohit Mehta",
    quote:
      "Booked grooming for my cat. Very professional and hassle-free experience.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80",
  },
] as const;

export const BLOG_POSTS = [
  {
    slug: "complete-cat-grooming-guide",
    category: "Pet Care Tips",
    title: "Complete Cat Grooming Guide for Healthy Skin and Fur",
    excerpt:
      "Learn how regular grooming helps keep your cat's coat healthy, reduces shedding, and prevents common skin problems.",
    image:
      "https://thehappytails.co.in/assets/img/blog/blog-complete-cat-grooming-guide-for-healthy-skin-and-fur.jpg",
  },
  {
    slug: "essential-puppy-care-guide",
    category: "Pet Care Tips",
    title: "Essential Puppy Care Guide for First-Time Pet Parents",
    excerpt:
      "Bringing home a new puppy is exciting. Learn the essential care tips every first-time pet parent should know to keep their puppy healthy and happy.",
    image:
      "https://thehappytails.co.in/assets/img/blog/blog-essential-puppy-care-guide-for-first-time-pet-parents.jpg",
  },
  {
    slug: "when-does-your-pet-need-grooming",
    category: "Grooming Advice",
    title: "When Does Your Pet Need Grooming?",
    excerpt: "Coat, skin and hygiene signs that mean it is time for grooming.",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "how-to-pick-the-right-food-for-your-pet",
    category: "Nutrition and Diet",
    title: "How to Pick the Right Food for Your Pet",
    excerpt:
      "A simple guide to choosing age, breed and lifestyle appropriate nutrition.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "why-anantnag-trusts-happy-tails",
    category: "Pet Care & Community",
    title: "Why Pet Owners in Anantnag Trust The Happy Tails for Their Pets",
    excerpt:
      "Discover why The Happy Tails has become a trusted destination for pet parents in Anantnag, offering premium pet products, professional grooming, home grooming services, and expert pet care guidance.",
    image:
      "https://thehappytails.co.in/assets/img/blog/blog-why-pet-owners-in-anantnag-trust-the-happy-tails-for-their-pets.jpg",
  },
  {
    slug: "cat-nutrition-guide",
    category: "Pet Care Tips",
    title: "What Should You Feed Your Cat? A Complete Nutrition Guide",
    excerpt:
      "Discover the essentials of feline nutrition and learn how to choose the best food for your cat's health and wellbeing.",
    image:
      "https://thehappytails.co.in/assets/img/blog/blog-what-should-you-feed-your-cat-a-complete-nutrition-guide.jpg",
  },
] as const;

export const ABOUT_PAGE = {
  hero: {
    eyebrow: "Founded in 2020",
    title: "Pet care with genuine products, gentle grooming and clear local service.",
    description:
      "The Happy Tails is a pet shop and grooming destination in Nai Basti, Anantnag, built for pet parents who want trustworthy products and practical care guidance.",
  },
  story: {
    title: "Our Story",
    paragraphs: [
      "Happy Tails began with a simple idea: pet parents in Anantnag should not have to guess where to find genuine food, treats, accessories, supplements and grooming support. The shop grew around real conversations with families, first-time pet parents and customers who needed clear advice before buying.",
      "This redesign turns that store experience into a proper ecommerce and booking platform. Products, grooming slots, service areas, orders and blogs are connected to the database, so customers see current information and admin can keep everything aligned.",
    ],
  },
  team: {
    title: "The Happy Tails Team",
    text: "Local pet-care guidance for food, grooming, wellness, accessories and delivery support.",
    cta: "Talk to Us",
  },
  values: [
    {
      title: "Genuine products",
      text: "We focus on trusted brands and carefully selected local picks across food, treats, wellness and accessories.",
    },
    {
      title: "Gentle grooming",
      text: "Salon and home-service grooming requests include pet notes and stay pending until the team confirms.",
    },
    {
      title: "Clear service areas",
      text: "Delivery and home grooming areas are admin-managed to avoid confusion during checkout or booking.",
    },
  ],
  services: [
    {
      title: "Food & treats",
      text: "Age, breed, appetite and lifestyle guidance for daily nutrition.",
      href: "/shop?category=FOOD&petType=DOG",
      linkLabel: "Shop food",
    },
    {
      title: "Accessories",
      text: "Collars, leashes, bowls, toys and everyday essentials with size/color options.",
      href: "/shop?category=ACCESSORIES",
      linkLabel: "Shop accessories",
    },
    {
      title: "Grooming",
      text: "Bath, brushing, hygiene trim and full package requests with available slots.",
      href: "/services",
      linkLabel: "Book grooming",
    },
  ],
  social: {
    title: "Social media",
    text: "Follow for offers, grooming updates and pet-care tips.",
  },
} as const;

export const HELP_PAGE = {
  hero: {
    eyebrow: "Help & Support",
    title: "How can we help?",
    description:
      "Find answers about delivery, grooming, payments, returns and service areas. Live support is still one tap away.",
  },
  topics: [
    {
      title: "Delivery areas",
      text: "Delivery is currently focused on selected Anantnag, J&K areas. Admin can update villages, pincodes and charges from Service Areas.",
    },
    {
      title: "Grooming bookings",
      text: "Submit a grooming request with pet details, area and slot. The team confirms availability to avoid conflicts.",
    },
    {
      title: "Email verification",
      text: "You can log in after registering, but account pages show verification pending until email is verified.",
    },
    {
      title: "Returns",
      text: "Returns depend on sealed condition and product category. Contact support quickly if there is an issue.",
    },
    {
      title: "Payments",
      text: "Checkout creates a pending order now. Pay cash on delivery when your order arrives.",
    },
    {
      title: "Live agent",
      text: "Choose live agent in the floating help bot or use the WhatsApp button below.",
    },
  ],
} as const;

export const SUPPORT_BOT_ANSWERS = [
  {
    label: "Delivery areas",
    answer:
      "Delivery is available in selected Anantnag areas. Check Service Areas for pincode support.",
  },
  {
    label: "Grooming booking",
    answer:
      "Grooming bookings are confirmed by our team after you select service, area and slot.",
  },
  {
    label: "Free delivery",
    answer: "Orders above Rs. 599 qualify for free delivery where service is available.",
  },
] as const;

export const PAGE_COPY = {
  cart: {
    title: "Your Cart",
    description: "Review quantities, remove items and continue to checkout.",
    empty: "No items in cart.",
  },
  wishlist: {
    title: "Your Wishlist",
    description: "Saved favourites can be moved to cart whenever you are ready.",
    empty: "No items yet. Explore the shop and add your favourites.",
  },
  account: {
    eyebrow: "Customer Account",
    title: "Login or register",
    description:
      "Use email or phone to access orders, grooming bookings, wishlist and verification status.",
    registerNote:
      "Email verification is sent after registration and expires in 10 minutes. You can still login while pending.",
  },
  blog: {
    eyebrow: "Pet care guides",
    title: "Happy Tails Blog",
    description:
      "Nutrition, grooming, delivery and everyday care tips for pet parents.",
  },
} as const;

export function whatsappUrl(message?: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message ?? SITE.whatsappMessage)}`;
}

export function formatRs(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}
