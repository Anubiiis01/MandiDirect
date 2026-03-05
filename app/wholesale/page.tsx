"use client";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type WholesaleCategory = "Vegetables" | "Dairy" | "Meat" | "Flours" | "Sauces";

export default function WholesalePortal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("city");
  const [activeCategory, setActiveCategory] = useState<WholesaleCategory | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const wholesaleData: Record<WholesaleCategory, { icon: string; subs: string[]; brand: string }> = useMemo(() => ({
    Vegetables: { icon: "🥦", subs: ["Onions", "Potatoes"], brand: "MandiBulk Premium" },
    Dairy: { icon: "🥛", subs: ["Bulk Milk", "Butter Blocks"], brand: "Amul Wholesale" },
    Meat: { icon: "🥩", subs: ["Poultry", "Mutton"], brand: "Coastal Fresh" },
    Flours: { icon: "🌾", subs: ["Maida", "Corn Flour"], brand: "Chakki Gold" },
    Sauces: { icon: "🥫", subs: ["Tomato Ketchup", "Soy Sauce"], brand: "Chef's Choice" }
  }), []);

  useEffect(() => {
    if (!location) {
      router.replace("/wholesale/select-city");
    }
  }, [location, router]);

  if (!location) return null;

  // Main wholesale page after city selection
  return (
    <div className="wholesale-app">
      <nav className="wholesale-nav">
        <Link href="/" className="logo">MandiDirect <span>Wholesale</span></Link>
        <button className="current-loc" onClick={() => router.push("/wholesale/select-city")}>📍 {location} (Change)</button>
      </nav>

      <main className="wholesale-layout">
        {/* SIDEBAR: Sub-categories */}
        <aside className="sub-sidebar">
          <h3>Inventory</h3>
          {activeCategory ? (
            <div className="sub-group">
              <p className="sub-label">{activeCategory}</p>
              {wholesaleData[activeCategory].subs.map(sub => (
                <button 
                  key={sub} 
                  className={`sub-item ${activeSub === sub ? 'active' : ''}`}
                  onClick={() => setActiveSub(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          ) : (
            <p className="empty-hint">Select a category to view varieties</p>
          )}
        </aside>

        {/* MAIN: Category Grid */}
        <section className="main-content">
          <header className="content-header">
            <h1>Wholesale Marketplace</h1>
            <p>B2B Bulk Pricing Active</p>
          </header>

          <div className="category-grid">
            {(Object.entries(wholesaleData) as [WholesaleCategory, (typeof wholesaleData)[WholesaleCategory]][]).map(([name, data]) => (
              <div 
                key={name} 
                className={`cat-card ${activeCategory === name ? 'selected' : ''}`}
                onClick={() => {
                  setActiveCategory(name);
                  setActiveSub(data.subs[0]);
                }}
              >
                <span className="cat-icon">{data.icon}</span>
                <h4>{name}</h4>
                <div className="product-preview">
                  <div className="preview-img">📦</div>
                  <div className="preview-info">
                    <span className="brand-name">{data.brand}</span>
                    <span className="price-range">Starting ₹18/kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
  /* Reset & Base */
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { 
    font-family: 'Inter', -apple-system, system-ui, sans-serif; 
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
  }

  /* 2. Main App Layout */
  .wholesale-app { background: #f8fafc; min-height: 100vh; }
  
  .wholesale-nav { 
    padding: 0.75rem 5%; background: white; border-bottom: 1px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; z-index: 100;
  }
  .logo { font-size: 1.25rem; font-weight: 800; text-decoration: none; color: #0f172a; }
  .logo span { color: #10b981; }

  .current-loc { 
    background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 8px;
    border: none; color: #1e293b;
    font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: 0.2s;
  }
  .current-loc:hover { background: #e2e8f0; }

  .wholesale-layout {
    display: grid; grid-template-columns: 280px 1fr; gap: 2.5rem;
    max-width: 1440px; margin: 0 auto; padding: 2rem 5%;
  }

  /* Sidebar */
  .sub-sidebar { 
    background: white; padding: 1.5rem; border-radius: 1.25rem; 
    height: fit-content; border: 1px solid #e2e8f0; position: sticky; top: 100px;
  }
  .sub-sidebar h3 { font-size: 1.1rem; margin-bottom: 1.5rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.75rem; }
  .sub-label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; margin-bottom: 0.5rem; text-transform: uppercase; }
  
  .sub-item {
    display: block; width: 100%; text-align: left; padding: 0.85rem 1rem;
    border-radius: 0.75rem; border: none; background: none; cursor: pointer;
    color: #475569; font-weight: 600; transition: 0.2s; margin-bottom: 0.25rem;
  }
  .sub-item:hover { background: #f1f5f9; color: #0f172a; }
  .sub-item.active { background: #0f172a; color: white; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.2); }

  /* Content Area */
  .content-header { margin-bottom: 2rem; }
  .content-header h1 { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.03em; }
  .content-header p { color: #10b981; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; }

  /* Category Cards */
  .category-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;
  }
  .cat-card {
    background: white; padding: 1.75rem; border-radius: 1.25rem;
    border: 2px solid #f1f5f9; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cat-card:hover { 
    transform: translateY(-4px); 
    border-color: #10b981; 
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); 
  }
  .cat-card.selected { border-color: #10b981; background: #f0fdf4; }
  
  .cat-icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
  .cat-card h4 { font-size: 1.25rem; font-weight: 700; }

  .product-preview {
    margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; 
    padding-top: 1.25rem; border-top: 1px solid #f1f5f9;
  }
  .preview-img { 
    width: 48px; height: 48px; background: #f8fafc; border-radius: 12px; 
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    border: 1px solid #e2e8f0;
  }
  .brand-name { display: block; font-size: 0.85rem; font-weight: 800; color: #1e293b; }
  .price-range { font-size: 0.8rem; color: #059669; font-weight: 700; }

  /* Animations */
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .wholesale-layout { grid-template-columns: 1fr; }
    .sub-sidebar { display: none; } /* On mobile you'd typically use a horizontal scroll or drawer */
  }

`}</style>
    </div>
  );
}