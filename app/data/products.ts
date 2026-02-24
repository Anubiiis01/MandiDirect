// data/inventory.ts

export const MOCK_PRODUCE = [
  { 
    id: 1, 
    name: 'Red Onions', 
    variety: 'Nashik', 
    price: 28, 
    retailPrice: 42,
    grade: 'A', 
    tags: ['Organic', 'Export Quality'], 
    farmer: 'Suresh Kendrick', 
    location: 'Kalwan, Nashik',
    image: '🧅',
    harvestDate: "22 Feb 2026",
    stock: "450 kg",
    description: "Grown using zero-budget spiritual farming. High pungency and 4+ month shelf life.",
    gallery: [
      "https://images.immediate.co.uk/production/volatile/sites/30/2019/08/Onion-72ea178.jpg?resize=1366,1503",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      { bold: "FARM FRESH:", text: "Harvested within 24 hours of your order." },
      { bold: "NO MIDDLEMEN:", text: "Sourced directly from the Kalwan farm belt." },
      { bold: "LONG SHELF LIFE:", text: "Naturally cured for better storage at home." },
      { bold: "LAB TESTED:", text: "Certified pesticide-free and organic." }
    ],
    specs: {
      "Variety": "Nasik Red (Gavran)",
      "Size": "55mm - 65mm",
      "Packaging": "Mesh Bags",
      "Origin": "Maharashtra"
    }
  },
 
  

   { 
    id: 2, 
    name: 'Hybrid Tomatoes', 
    variety: 'Bangalore', 
    price: 32, 
    retailPrice: 50,
    grade: 'A', 
    tags: ['Pesticide Free'], 
    farmer: 'Ramesh G.', 
    location: 'Chikkaballapur, Karnataka',
    image: '🍅',
    harvestDate: "24 Feb 2026",
    stock: "1200 kg",
    description: "Deep red, firm tomatoes ideal for retail and long-distance transport.",
    gallery: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800"],
    highlights: [
      { bold: "HYDROPONIC:", text: "Controlled environment growth." },
      { bold: "RICH LYCOPENE:", text: "Deep red pigment for health." }
    ],
    specs: { "Type": "Hybrid", "Shelf Life": "10 Days" }
    },


    {
    id: 3,
    name: 'Table Potatoes',
    variety: 'Jyoti',
    price: 18,
    retailPrice: 28,
    grade: 'A',
    tags: ['Bulk Buy', 'Low Sugar'],
    farmer: 'Harpreet Singh',
    location: 'Jalandhar, Punjab',
    image: '🥔',
    harvestDate: "18 Feb 2026",
    stock: "2500 kg",
    description: "Sun-dried to remove excess moisture. Perfect for mashing and frying.",
    gallery: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800"],
    highlights: [
        { bold: "LOW MOISTURE:", text: "Great for making crispy snacks." },
        { bold: "COLD STORAGE:", text: "Maintained at optimum temp for freshness." }
    ],
    specs: { "Variety": "Jyoti / Pukhraj", "Soil": "Alluvial", "Shape": "Oval" }
  },
  {
    id: 4,
    name: 'Green Chillies',
    variety: 'G4 Hot',
    price: 45,
    retailPrice: 70,
    grade: 'A+',
    tags: ['Spicy', 'Export Grade'],
    farmer: 'Venkat Rao',
    location: 'Guntur, Andhra Pradesh',
    image: '🌶️',
    harvestDate: "25 Feb 2026",
    stock: "200 kg",
    description: "Extremely spicy G4 variety chillies with a vibrant green color and thin skin.",
    gallery: ["https://images.unsplash.com/photo-1588252391482-446ec3975d41?q=80&w=800"],
    highlights: [
        { bold: "CAPSAICIN RICH:", text: "High heat index (SHU)." },
        { bold: "SELECTED:", text: "Hand-picked to ensure uniform size." }
    ],
    specs: { "Variety": "G4", "Length": "8cm - 12cm", "Pungency": "High" }
  },
  {
    id: 5,
    name: 'Alphanso Mangoes',
    variety: 'Hapus',
    price: 850,
    retailPrice: 1200,
    grade: 'Premium',
    tags: ['GI Tagged', 'Seasonal'],
    farmer: 'Anant Desai',
    location: 'Ratnagiri, Maharashtra',
    image: '🥭',
    harvestDate: "23 Feb 2026",
    stock: "50 Dozens",
    description: "The King of Mangoes. Creamy, non-fibrous pulp with a distinct aroma.",
    gallery: ["https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800"],
    highlights: [
        { bold: "GI TAGGED:", text: "Authentic Ratnagiri Hapus." },
        { bold: "CARBIDE FREE:", text: "Naturally ripened in hay stacks." }
    ],
    specs: { "Weight": "250g - 300g per piece", "Brix Level": "18%+", "Ripening": "Natural" }
  },
  {
    id: 6,
    name: 'Baby Spinach',
    variety: 'Palak',
    price: 15,
    retailPrice: 25,
    grade: 'A',
    tags: ['Hydroponic', 'Superfood'],
    farmer: 'Megha Sharma',
    location: 'Gurugram, Haryana',
    image: '🥬',
    harvestDate: "25 Feb 2026",
    stock: "80 kg",
    description: "Tender, dirt-free baby spinach leaves grown in nutrient-rich water.",
    gallery: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800"],
    highlights: [
        { bold: "READY TO EAT:", text: "Pre-washed and ozone treated." },
        { bold: "IRON RICH:", text: "No chemical fertilizers used." }
    ],
    specs: { "Type": "Hydroponic", "Packaging": "Resealable Pouches", "Life": "3-5 Days" }
  },
  {
    id: 7,
    name: 'Cauliflower',
    variety: 'Snowball',
    price: 40,
    retailPrice: 65,
    grade: 'A',
    tags: ['Seasonal', 'White Curd'],
    farmer: 'Sanjay Maurya',
    location: 'Malihabad, UP',
    image: '🥦',
    harvestDate: "24 Feb 2026",
    stock: "300 units",
    description: "Bright white curds with compact flowering. No yellowing or spots.",
    gallery: ["https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?q=80&w=800"],
    highlights: [
        { bold: "COMPACT:", text: "Dense curds with minimal leaf weight." },
        { bold: "PEST FREE:", text: "Protected by mesh covering during growth." }
    ],
    specs: { "Weight": "800g - 1.2kg", "Color": "Ivory White", "Storage": "Refrigerated" }
  },
  {
    id: 8,
    name: 'Carrots',
    variety: 'Ooty Orange',
    price: 55,
    retailPrice: 85,
    grade: 'A',
    tags: ['High Beta-Carotene', 'Sweet'],
    farmer: 'Karthik Raja',
    location: 'Ooty, Tamil Nadu',
    image: '🥕',
    harvestDate: "21 Feb 2026",
    stock: "600 kg",
    description: "Crunchy, sweet carrots grown in the cool climate of the Nilgiris.",
    gallery: ["https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800"],
    highlights: [
        { bold: "SWEETNESS:", text: "Naturally higher sugar content due to elevation." },
        { bold: "UNIFORM:", text: "Straight, tapered roots for easy peeling." }
    ],
    specs: { "Variety": "Ooty New", "Length": "15cm - 20cm", "Color": "Deep Orange" }
  },
  {
    id: 9,
    name: 'Ginger',
    variety: 'Mahim',
    price: 110,
    retailPrice: 160,
    grade: 'Premium',
    tags: ['Strong Aroma', 'Medicinal'],
    farmer: 'Biju Thomas',
    location: 'Wayanad, Kerala',
    image: '🫚',
    harvestDate: "15 Feb 2026",
    stock: "150 kg",
    description: "Bold ginger rhizomes with low fiber content and high oil essence.",
    gallery: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800"],
    highlights: [
        { bold: "LOW FIBER:", text: "Easy to paste and juice." },
        { bold: "SPICY:", text: "High gingerol content for medicinal use." }
    ],
    specs: { "Variety": "Mahim / Varada", "Wash": "Semi-washed", "Origin": "Kerala" }
  },
  {
    id: 10,
    name: 'Lemon',
    variety: 'Seedless Lime',
    price: 120,
    retailPrice: 180,
    grade: 'A',
    tags: ['Juicy', 'Seedless'],
    farmer: 'Nitin Gadkari (Farms)',
    location: 'Nagpur, Maharashtra',
    image: '🍋',
    harvestDate: "24 Feb 2026",
    stock: "100 kg",
    description: "Thin-skinned, seedless lemons with maximum juice extraction per fruit.",
    gallery: ["https://images.unsplash.com/photo-1590505660564-3990263f3730?q=80&w=800"],
    highlights: [
        { bold: "JUICE YIELD:", text: "30% more juice than local varieties." },
        { bold: "THIN PEEL:", text: "Zest-friendly and easy to squeeze." }
    ],
    specs: { "Variety": "Phule Sharbati", "Count": "18-22 per kg", "Juice": "High" }
  }
  // ... Add the rest of your items (Potatoes, Chillies, etc.) here with similar structures
];