"use client";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
// ✅ FIXED: Updated import path to match your file location
import { WHOLESALE_INVENTORY } from '@/app/data/wholesale-products';

type WholesaleCategory = "Fruits" | "Meat & Poultry" | "Seafood" | "Bakery & Bread" | "Grains & Legumes" | "Flour & Baking Supplies" | "Spices & Seasonings" | "Canned & Jarred Goods" | "Soft Drinks & Sodas" | "Water" | "Coffee & Tea" | "Juices" | "Frozen Foods" | "Snacks & Confectionery" | "Packaging & Disposables" | "Cleaning Supplies" | "Syrups & Concentrates" | "Garnish & Toppings" | "Kitchen Hardware";

export default function WholesalePortal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // ✅ Support both "city" and "location" params for flexibility
  const location = searchParams.get("location") || searchParams.get("city");
  
  const [activeCategory, setActiveCategory] = useState<WholesaleCategory | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

const wholesaleData = useMemo(() => ({
  Fruits: { icon: "🍎", subs: ["Apples", "Bananas", "Citrus", "Berries", "Melons"], brand: "Orchard Fresh Wholesale" },
  "Meat & Poultry": { icon: "🍗", subs: ["Chicken", "Beef", "Pork", "Lamb", "Deli Meats"], brand: "PrimeCut Wholesale" },
  Seafood: { icon: "🐟", subs: ["White Fish", "Salmon", "Shrimp & Prawns", "Shellfish", "Canned/Processed Seafood"], brand: "Ocean Direct Bulk" },
  "Bakery & Bread": { icon: "🍞", subs: ["Sliced Loaves", "Burger Buns & Slider Rolls", "Baguettes & Artisan Loaves", "Tortillas & Flatbreads", "Pastries"], brand: "Artisan Bake Supply" },
  "Grains & Legumes": { icon: "🌾", subs: ["Rice", "Lentils", "Beans", "Quinoa & Couscous", "Oats"], brand: "Harvest Gold Wholesale" },
  "Flour & Baking Supplies": { icon: "🥣", subs: ["All-Purpose & Bread Flour", "Sugars", "Yeast & Leavening Agents", "Cocoa Powder & Chocolate Chips", "Cooking Fats"], brand: "Baker's Choice Pro" },
  "Spices & Seasonings": { icon: "🧂", subs: ["Salt", "Peppercorns", "Herbs", "Ground Spices", "Spice Blends"], brand: "Spice Route Bulk" },
  "Canned & Jarred Goods": { icon: "🥫", subs: ["Tomato Products", "Canned Vegetables", "Pickles & Olives", "Pasta Sauces & Pesto", "Fruit Preserves & Jams"], brand: "Pantry Plus Wholesale" },
  "Soft Drinks & Sodas": { icon: "🥤", subs: ["Cola & Diet Sodas", "Lemon-Lime & Ginger Ales", "Energy Drinks", "Flavored Sparkling Waters", "Iced Teas"], brand: "FizzCo Distribution" },
  Water: { icon: "💧", subs: ["Still Spring Water", "Sparkling Mineral Water", "5-Gallon Office Jugs", "Distilled Water", "Vitamin-Enhanced Water"], brand: "PureSource Wholesale" },
  "Coffee & Tea": { icon: "☕", subs: ["Coffee Beans", "Espresso Roast", "Tea Bags", "Loose Leaf Tea", "Instant Coffee Granules"], brand: "BrewMaster Supply" },
  Juices: { icon: "🧃", subs: ["Orange Juice", "Apple Juice", "Cranberry Juice Cocktail", "Pineapple & Tropical Blends", "Tomato & Vegetable Juice"], brand: "FreshPress Bulk" },
  "Frozen Foods": { icon: "🧊", subs: ["Frozen Vegetables", "Frozen Appetizers", "Ice Cream & Frozen Desserts", "Frozen Fruit", "Ready-to-Heat Meals"], brand: "FrostLine Wholesale" },
  "Snacks & Confectionery": { icon: "🍫", subs: ["Potato Chips & Pretzels", "Nuts & Trail Mixes", "Chocolate Bars & Candies", "Biscuits & Cookies", "Protein & Granola Bars"], brand: "SnackHub Distribution" },
  "Packaging & Disposables": { icon: "📦", subs: ["Takeout Containers", "Disposable Cutlery", "Napkins & Paper Tissues", "Paper Cups & Lids", "Grocery & Carrier Bags"], brand: "PackPro Wholesale" },
  "Cleaning Supplies": { icon: "🧼", subs: ["Dish Soap & Detergents", "Multi-Surface Sanitizers", "Floor Cleaners & Degreasers", "Bleach & Disinfectants", "Hand Soaps & Sanitisers"], brand: "CleanForce Bulk" },
  "Syrups & Concentrates": { icon: "🍯", subs: ["Coffee Syrups", "Soda Fountain Concentrates", "Maple & Pancake Syrups", "Cordials", "Agave & Fruit Nectars"], brand: "SyrupCo Wholesale" },
  "Garnish & Toppings": { icon: "🍒", subs: ["Cocktail Garnishes", "Sprinkles & Dessert Toppings", "Salad Toppings", "Dried Fruit Slices", "Whipped Cream"], brand: "Garnish Pro Supply" },
  "Kitchen Hardware": { icon: "🔧", subs: ["Aluminum Foil & Cling Film", "Parchment & Wax Paper", "Disposable Gloves", "Cleaning Cloths & Sponges", "Gastronorm Pans & Lids"], brand: "ChefGear Wholesale" },
}), []);

  // ✅ DYNAMIC: Get available sub-categories from ACTUAL inventory data
const availableSubs = useMemo(() => {
  if (!activeCategory) return [];
  return wholesaleData[activeCategory].subs;
}, [activeCategory, wholesaleData]);

  // ✅ IMPROVED: Show all products in category if no sub selected
const displayedProducts = useMemo(() => {
  if (!activeCategory) return [];
  
  // Get the VALID sub-categories for this category from wholesaleData
  const validSubs = wholesaleData[activeCategory].subs;
  
  // Start with all products in the active category
  let products = WHOLESALE_INVENTORY.filter(p => p.category === activeCategory);
  
  if (activeSub) {
    // If a specific sub is selected, filter to exact match
    products = products.filter(p => p.sub === activeSub);
  } else {
    // If NO sub selected, ONLY show products whose 'sub' is in the predefined valid list
    // This hides products with typos or invalid sub values like "Ales", "Aes", etc.
    products = products.filter(p => validSubs.includes(p.sub));
  }
  
  return products;
}, [activeCategory, activeSub, wholesaleData]);

  useEffect(() => {
    if (!location) router.replace("/wholesale/select-city");
  }, [location, router]);

  // ✅ Reset sub-category when category changes
  useEffect(() => {
    setActiveSub(null);
  }, [activeCategory]);

  if (!location) return null;

  return (
    <div className="wholesale-app">
      <nav className="wholesale-nav">
        <Link href="/" className="logo">MandiDirect <span>Wholesale</span></Link>
        <button className="current-loc" onClick={() => router.push("/wholesale/select-city")}>
          📍 {location} (Change)
        </button>
      </nav>

      <main className="wholesale-layout">
        {/* SIDEBAR: Shows ONLY sub-categories that exist in your inventory */}
        <aside className="sub-sidebar">
          <h3>Varieties</h3>
          {activeCategory ? (
            <div className="sub-group">
              <p className="sub-label">{activeCategory} Types</p>
              {availableSubs.length > 0 ? (
                availableSubs.map(sub => (
                  <button 
                    key={sub} 
                    className={`sub-item ${activeSub === sub ? 'active' : ''}`}
                    onClick={() => setActiveSub(sub)}
                  >
                    {sub}
                  </button>
                ))
              ) : (
                <p className="no-subs">No varieties available</p>
              )}
            </div>
          ) : (
            <div className="empty-sidebar">
              <p>Select a category to see varieties</p>
            </div>
          )}
        </aside>

        <section className="main-content">
          <header className="content-header">
            <h1>Wholesale Marketplace</h1>
            <p>Direct B2B Rates in {location}</p>
          </header>

          {/* CATEGORY GRID - Removed auto-select of first sub */}
          <div className="category-grid">
            {(Object.entries(wholesaleData) as [WholesaleCategory, (typeof wholesaleData)[WholesaleCategory]][]).map(([name, data]) => (
              <div 
                key={name} 
                className={`cat-card ${activeCategory === name ? 'selected' : ''}`}
                onClick={() => setActiveCategory(name)}
              >
                <span className="cat-icon">{data.icon}</span>
                <h4>{name}</h4>
              </div>
            ))}
          </div>

          <hr className="section-divider" />

          {/* PRODUCT DISPLAY */}
          <div className="product-results">
            {activeCategory ? (
              <>
                <h2 className="result-title">
                  {activeSub ? `Showing: ${activeSub}` : `All ${activeCategory}`}
                </h2>
                {displayedProducts.length > 0 ? (
                  <div className="bulk-grid">
                    {displayedProducts.map(product => (
                      <div key={product.id} className="product-card">
                        <div className="p-img">{product.image}</div>
                        <span className="p-brand">{product.brand}</span>
                        <h4>{product.name}</h4>
                        <div className="p-footer">
                          <span className="p-price">₹{product.price} <small>/{product.unit}</small></span>
                          <button className="add-bulk-btn">Add to Quote</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-products animate-fade">
                    <span className="text-6xl">🚚</span>
                    <h3>No products found</h3>
                    <p>
                      {activeSub 
                        ? `No products available in ${activeSub}. Check back soon!` 
                        : `No ${activeCategory.toLowerCase()} products in inventory for ${location}.`
                      }
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="prompt-box">
                <p>Choose a category above to browse bulk inventory</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ✅ COMPLETE CSS - All referenced classes now styled */}
      <style jsx global>{`
        .wholesale-app {
          min-height: 100vh;
          background: #f8fafc;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .wholesale-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .logo {
          font-weight: 800;
          font-size: 1.25rem;
          color: #0f172a;
          text-decoration: none;
        }
        .logo span { color: #10b981; }
        
        .current-loc {
          background: #f1f5f9;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          cursor: pointer;
          color: #475569;
        }
        .current-loc:hover { background: #e2e8f0; }
        
        .wholesale-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 2rem;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .sub-sidebar {
          background: white;
          padding: 1.5rem;
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        
        .sub-sidebar h3 {
          margin-bottom: 1rem;
          color: #0f172a;
          font-size: 1.1rem;
        }
        
        .sub-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .sub-label { font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem; }
        
        .sub-item {
          text-align: left;
          padding: 0.75rem 1rem;
          border: none;
          background: #f8fafc;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.9rem;
          color: #475569;
          transition: all 0.2s;
        }
        .sub-item:hover { background: #f1f5f9; }
        .sub-item.active {
          background: #10b981;
          color: white;
          font-weight: 600;
        }
        
        .empty-sidebar, .no-subs {
          color: #94a3b8;
          font-size: 0.9rem;
          text-align: center;
          padding: 1rem;
        }
        
        .main-content { display: flex; flex-direction: column; gap: 1.5rem; }
        
        .content-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .content-header p {
          color: #64748b;
          margin: 0.25rem 0 0;
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }
        
        .cat-card {
          background: white;
          padding: 1.25rem;
          border-radius: 1.25rem;
          border: 2px solid #e2e8f0;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }
        .cat-card:hover { border-color: #10b981; transform: translateY(-2px); }
        .cat-card.selected {
          border-color: #10b981;
          background: #ecfdf5;
        }
        
        .cat-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
        .cat-card h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a;
        }
        
        .section-divider { margin: 1rem 0; border: 0; border-top: 2px dashed #e2e8f0; }
        
        .prompt-box {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 1.5rem;
          border: 1px dashed #cbd5e1;
          color: #64748b;
        }
        
        .result-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        
        .bulk-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
          gap: 1.5rem; 
          margin-top: 1rem;
        }

        .product-card {
          background: white; 
          padding: 1.5rem; 
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0; 
          transition: 0.3s;
          display: flex; 
          flex-direction: column;
        }
        .product-card:hover { 
          border-color: #10b981; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
        }
        
        .p-img { font-size: 3rem; margin-bottom: 0.75rem; text-align: center; }
        .p-brand { 
          font-size: 0.7rem; 
          font-weight: 900; 
          color: #10b981; 
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .product-card h4 {
          margin: 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          flex: 1;
        }
        .p-footer { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }
        .p-price { font-weight: 800; font-size: 1.1rem; color: #0f172a; }
        .p-price small { font-weight: 400; color: #64748b; font-size: 0.85rem; }
        
        .add-bulk-btn {
          background: #0f172a; 
          color: white; 
          border: none; 
          padding: 0.6rem 1rem;
          border-radius: 10px; 
          font-weight: 700; 
          cursor: pointer; 
          font-size: 0.8rem;
          transition: background 0.2s;
        }
        .add-bulk-btn:hover { background: #1e293b; }

        .no-products {
          text-align: center; 
          padding: 4rem 2rem; 
          background: white; 
          border-radius: 2rem;
          border: 2px dashed #cbd5e1; 
          color: #64748b;
        }
        .no-products .text-6xl { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .no-products h3 { color: #0f172a; margin: 0 0 0.5rem; font-size: 1.25rem; }
        .no-products p { margin: 0; font-size: 0.95rem; }

        @keyframes fade { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade { animation: fade 0.4s ease-out; }
        
        @media (max-width: 768px) {
          .wholesale-layout {
            grid-template-columns: 1fr;
          }
          .sub-sidebar {
            position: static;
            order: 2;
          }
          .main-content { order: 1; }
        }
      `}</style>
    </div>
  );
}