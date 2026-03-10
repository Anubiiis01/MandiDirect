"use client";
import { useEffect, useMemo, useState , useRef} from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isRibbonVisible, setIsRibbonVisible] = useState(false);
  // ✅ FILTER & SORT STATE
const [showFilters, setShowFilters] = useState(false);
const [activeFilters, setActiveFilters] = useState<{
  inStockOnly: boolean;
  priceRange: 'all' | 'under-100' | '100-500' | '500-2000' | 'above-2000';
  sortBy: 'default' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
}>({
  inStockOnly: false,
  priceRange: 'all',
  sortBy: 'default'
});
  const categoryGridRef = useRef<HTMLDivElement>(null);
  const scrollThresholdRef = useRef(0);



const wholesaleData = useMemo(() => ({
  Fruits: { icon: "🍎", subs: ["Apples", "Bananas", "Citrus", "Berries", "Melons"], brand: "Orchard Fresh Wholesale" },
  "Meat & Poultry": { icon: "🍗", subs: ["Chicken", "Beef", "Pork", "Lamb", "Deli Meats"], brand: "PrimeCut Wholesale" },
  Seafood: { icon: "🐟", subs: ["White Fish", "Salmon", "Shrimp & Prawns", "Shellfish", "Canned/Processed Seafood"], brand: "Ocean Direct Bulk" },
  "Bakery & Bread": { icon: "🍞", subs: ["Sliced Loaves", "Burger Buns & Slider Rolls", "Baguettes & Artisan Loaves", "Tortillas & Flatbreads", "Pastries"], brand: "Artisan Bake Supply" },
  "Grains & Legumes": { icon: "🌾", subs: ["Rice", "Lentils", "Beans", "Wheat","Barley", "Oats"], brand: "Harvest Gold Wholesale" },
  "Flour & Baking Supplies": { icon: "🥣", subs: ["All-Purpose", "Bread Flour", "Sugars", "Yeast & Leavening Agents", "Cocoa Powder ", "Chocolate Chips", "Baking Powder"], brand: "Baker's Choice Pro" },
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
  "Syrups & Concentrates": { icon: "🍯", subs: ["Fruit Syrups", "Soda Fountain Concentrates", "Maple & Pancake Syrups", "Cordials", "Agave & Fruit Nectars"], brand: "SyrupCo Wholesale" },
  "Garnish & Toppings": { icon: "🍒", subs: ["Cocktail Garnishes", "Sprinkles & Dessert Toppings", "Salad Toppings", "Dried Fruit Slices", "Whipped Cream"], brand: "Garnish Pro Supply" },
  "Kitchen Hardware": { icon: "🔧", subs: ["Aluminum Foil & Cling Film", "Parchment & Wax Paper", "Disposable Gloves", "Cleaning Cloths & Sponges", "Gastronorm Pans & Lids"], brand: "ChefGear Wholesale" },
}), []);


// ✅ FILTERED CATEGORIES BASED ON SEARCH
const filteredCategories = useMemo(() => {
  if (!searchQuery.trim()) {
    return Object.entries(wholesaleData) as [WholesaleCategory, (typeof wholesaleData)[WholesaleCategory]][];
  }
  const query = searchQuery.toLowerCase();
  return (Object.entries(wholesaleData) as [WholesaleCategory, (typeof wholesaleData)[WholesaleCategory]][])
    .filter(([name]) => name.toLowerCase().includes(query));
}, [searchQuery, wholesaleData]);



  // ✅ DYNAMIC: Get available sub-categories from ACTUAL inventory data
const availableSubs = useMemo(() => {
  if (!activeCategory) return [];
  return wholesaleData[activeCategory].subs;
}, [activeCategory, wholesaleData]);

  // ✅ IMPROVED: Show all products in category if no sub selected
// ✅ IMPROVED: Show all products in category with Filters + Sorting
const displayedProducts = useMemo(() => {
  if (!activeCategory) return [];
  
  const validSubs = wholesaleData[activeCategory].subs;
  
  // Start with all products in the active category
  let products = WHOLESALE_INVENTORY.filter(p => p.category === activeCategory);
  
  if (activeSub) {
    products = products.filter(p => p.sub === activeSub);
  } else {
    products = products.filter(p => validSubs.includes(p.sub));
  }
  
  // 🔽 APPLY FILTERS
  if (activeFilters.priceRange !== 'all') {
    products = products.filter(p => {
      const price = p.price;
      switch (activeFilters.priceRange) {
        case 'under-100': return price < 100;
        case '100-500': return price >= 100 && price <= 500;
        case '500-2000': return price > 500 && price <= 2000;
        case 'above-2000': return price > 2000;
        default: return true;
      }
    });
  }
  
  // 🔽 APPLY SORTING
  if (activeFilters.sortBy !== 'default') {
    products = [...products].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return 0;
      }
    });
  }
  
  return products;
}, [activeCategory, activeSub, wholesaleData, activeFilters]);

  useEffect(() => {
    if (!location) router.replace("/wholesale/select-city");
  }, [location, router]);

  // ✅ Reset sub-category when category changes
  useEffect(() => {
    setActiveSub(null);
  }, [activeCategory]);


  // ✅ SCROLL DETECTION FOR FLOATING RIBBON
useEffect(() => {
  const calculateThreshold = () => {
    if (categoryGridRef.current) {
      const rect = categoryGridRef.current.getBoundingClientRect();
      scrollThresholdRef.current = window.scrollY + rect.bottom - 80; // 80px = nav height buffer
    }
  };
  
  calculateThreshold();
  window.addEventListener('resize', calculateThreshold);
  
  const handleScroll = () => {
    setIsRibbonVisible(window.scrollY > scrollThresholdRef.current);
  };
  // ✅ Detect if ribbon is scrollable and add data attribute
const ribbonScroller = document.querySelector('.ribbon-scroller');
if (ribbonScroller) {
  const isScrollable = ribbonScroller.scrollWidth > ribbonScroller.clientWidth;
  ribbonScroller.setAttribute('data-scrollable', isScrollable ? 'true' : 'false');
}
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', calculateThreshold);
  };
}, [activeCategory]); // Recalculate when category changes (grid height may change)


// ✅ KEYBOARD SHORTCUT: Press "/" to focus search
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      e.preventDefault();
      const input = document.querySelector('.command-input') as HTMLInputElement;
      input?.focus();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

// ✅ Activate drag-scroll on ribbon
useEffect(() => {
  if (isRibbonVisible) {
    const scroller = document.querySelector('.ribbon-scroller');
    const cleanup = enableDragScroll(scroller as HTMLElement);
    return cleanup;
  }
}, [isRibbonVisible]);


// ✅ Drag-to-scroll helper for ribbon
const enableDragScroll = (element: HTMLElement | null) => {
  if (!element) return;
  
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const onMouseDown = (e: MouseEvent) => {
    isDown = true;
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
    element.style.cursor = 'grabbing';
  };

  const onMouseLeave = () => {
    isDown = false;
    element.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    isDown = false;
    element.style.cursor = 'grab';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    element.scrollLeft = scrollLeft - walk;
  };

  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mouseleave', onMouseLeave);
  element.addEventListener('mouseup', onMouseUp);
  element.addEventListener('mousemove', onMouseMove);

  // Cleanup function
  return () => {
    element.removeEventListener('mousedown', onMouseDown);
    element.removeEventListener('mouseleave', onMouseLeave);
    element.removeEventListener('mouseup', onMouseUp);
    element.removeEventListener('mousemove', onMouseMove);
  };
};



// ✅ FILTER HANDLERS
const handleFilterChange = (key: keyof typeof activeFilters, value: any) => {
  setActiveFilters(prev => ({ ...prev, [key]: value }));
};

const resetFilters = () => {
  setActiveFilters({
    inStockOnly: false,
    priceRange: 'all',
    sortBy: 'default'
  });
};

const hasActiveFilters = useMemo(() => {
  return activeFilters.inStockOnly || 
         activeFilters.priceRange !== 'all' || 
         activeFilters.sortBy !== 'default';
}, [activeFilters]);




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
          
              {/* ✅ COMMAND PALETTE SEARCH BAR */}
<div className="command-palette-wrapper">
  <div className="command-palette glass">
    <span className="search-icon">🔍</span>
    <input
      type="text"
      className="command-input"
      placeholder="Quick search categories: 'Meat', 'Bakery', 'Spices'..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={(e) => e.target.select()}
    />
    {searchQuery && (
      <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
    )}
    <span className="search-hint">Press / to focus</span>
  </div>
  {searchQuery && filteredCategories.length > 0 && (
    <div className="search-results-count">
      Showing {filteredCategories.length} of {Object.keys(wholesaleData).length} categories
    </div>
  )}
  {searchQuery && filteredCategories.length === 0 && (
    <div className="no-search-results">
      No categories match "{searchQuery}" — try "Meat", "Bakery", or "Spices"
    </div>
  )}
</div>

{/* ✅ CATEGORY GRID (Now Filtered) */}
<div className="category-grid" ref={categoryGridRef}>
  {filteredCategories.map(([name, data]) => (
    <div 
      key={name} 
      className={`cat-card ${activeCategory === name ? 'selected' : ''}`}
      onClick={() => {
        setActiveCategory(name);
        setSearchQuery(''); // Clear search on selection
      }}
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
                {/* ✅ SECTION HEADER WITH FILTER/SORT BUTTONS */}
<div className="results-header">
  <h2 className="result-title" color='#0f172a'>
    {activeSub ? `Showing: ${activeSub}` : `All ${activeCategory}`}
  </h2>
  
  <div className="filter-sort-controls">
    {/* FILTER BUTTON */}
    <div className="filter-dropdown">
      <button 
        className={`filter-btn ${hasActiveFilters ? 'has-filters' : ''}`}
        onClick={() => setShowFilters(!showFilters)}
      >
        <span>⚙️</span> Filter
        {hasActiveFilters && <span className="filter-badge">✓</span>}
      </button>
      
      {/* FILTER DROPDOWN PANEL */}
      {showFilters && (
        <div className="filter-panel glass">
          <div className="filter-section">
            <label className="filter-label">
              <input
                type="checkbox"
                checked={activeFilters.inStockOnly}
                onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
              />
              <span>In Stock Only</span>
            </label>
          </div>
          
          <div className="filter-section">
            <span className="filter-label">Price Range</span>
            <div className="price-options">
              {(['all', 'under-100', '100-500', '500-2000', 'above-2000'] as const).map(range => (
                <button
                  key={range}
                  className={`price-option ${activeFilters.priceRange === range ? 'active' : ''}`}
                  onClick={() => handleFilterChange('priceRange', range)}
                >
                  {range === 'all' ? 'All Prices' : 
                   range === 'under-100' ? '< ₹100' :
                   range === '100-500' ? '₹100-500' :
                   range === '500-2000' ? '₹500-2K' : '> ₹2K'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-actions">
            <button className="reset-btn" onClick={resetFilters}>Reset</button>
            <button className="apply-btn" onClick={() => setShowFilters(false)}>Apply</button>
          </div>
        </div>
      )}
    </div>
    
    {/* SORT BUTTON */}
    <div className="sort-dropdown">
      <select
        className="sort-select"
        value={activeFilters.sortBy}
        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
      >
        <option value="default">Sort: Default</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>
    </div>
  </div>
</div>
                {displayedProducts.length > 0 ? (
                  <div className="bulk-grid">
                    {displayedProducts.map(product => (
                      <div key={product.id} className="product-card">
                        <div className="p-img">
  {product.image.startsWith("http") ? (
    <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
  ) : (
    product.image
  )}
</div>
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
        {/* ✅ STICKY FLOATING RIBBON - Appears on scroll */}
{isRibbonVisible && activeCategory && (
  <div className="floating-ribbon glass">
    <div className="ribbon-scroller">
      {Object.entries(wholesaleData).map(([name, data]) => (
        <button
          key={name}
          className={`ribbon-item ${activeCategory === name ? 'active' : ''}`}
          onClick={() => setActiveCategory(name as WholesaleCategory)}
          title={name}
        >
          <span className="ribbon-icon">{data.icon}</span>
          <span className="ribbon-label">{name}</span>
        </button>
      ))}
    </div>
  </div>
)}
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
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
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


        /* ✅ COMMAND PALETTE SEARCH */
.command-palette-wrapper {
  margin-bottom: 1rem;
  position: relative;
  z-index: 10;
}

.command-palette {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
}

.command-palette:focus-within {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

/* Glass-morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.search-icon {
  font-size: 1.1rem;
  opacity: 0.7;
}

.command-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  padding: 0.25rem 0;
  outline: none;
  color: #0f172a;
}

.command-input::placeholder {
  color: #94a3b8;
}

.clear-search {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #94a3b8;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.clear-search:hover {
  background: #f1f5f9;
  color: #64748b;
}

.search-hint {
  font-size: 0.75rem;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  display: none;
}

@media (min-width: 768px) {
  .search-hint { display: inline-block; }
}

.search-results-count,
.no-search-results {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  padding-left: 0.5rem;
}

.no-search-results {
  color: #ef4444;
  font-weight: 500;
}

/* ✅ FLOATING RIBBON */
.floating-ribbon {
  position: fixed;
  top: 72px; /* Adjust based on your nav height */
  left: 0;
  right: 0;
  z-index: 90;
  padding: 0.5rem 2rem;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* ✅ REPLACE EXISTING .ribbon-scroller WITH THIS */
.ribbon-scroller {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.5rem 0.25rem; /* Extra padding for scroll affordance */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(148, 163, 184, 0.5) transparent; /* Firefox */
  cursor: grab;
  user-select: none;
}

/* Show subtle scrollbar on hover (desktop) */
.ribbon-scroller:hover {
  scrollbar-color: rgba(16, 185, 129, 0.7) transparent;
}

/* Custom scrollbar for WebKit (Chrome/Safari/Edge) */
.ribbon-scroller::-webkit-scrollbar {
  height: 6px;
}

.ribbon-scroller::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.ribbon-scroller::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 10px;
  transition: background 0.2s;
}

.ribbon-scroller:hover::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.7);
}


.ribbon-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0; /* Critical: prevents items from shrinking */
  min-width: max-content; /* Critical: ensures items keep their width */
  -webkit-tap-highlight-color: transparent; /* Remove mobile tap highlight */
}

/* Add visual scroll hint on first render (optional but nice) */
@keyframes pulseScroll {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.ribbon-scroller::after {
  content: '↔';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: rgba(148, 163, 184, 0.8);
  pointer-events: none;
  animation: pulseScroll 2s ease-in-out infinite;
  opacity: 0;
  transition: opacity 0.3s;
}

/* Show scroll hint only when overflow exists AND not scrolled to end */
.ribbon-scroller[data-scrollable='true']::after {
  opacity: 1;
}

/* Hide hint on mobile */
@media (max-width: 768px) {
  .ribbon-scroller::after {
    display: none;
  }
}

.ribbon-item:hover {
  background: white;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.ribbon-item.active {
  background: #10b981;
  border-color: #059669;
  color: white;
}

.ribbon-icon {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.ribbon-label {
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
  max-width: 0;
  overflow: hidden;
}

/* Show label on hover OR when active */
.ribbon-item:hover .ribbon-label,
.ribbon-item.active .ribbon-label {
  opacity: 1;
  transform: translateX(0);
  max-width: 200px;
  padding-left: 0.25rem;
}

/* Mobile optimization for ribbon */
@media (max-width: 768px) {
  .floating-ribbon {
    top: 64px;
    padding: 0.5rem 1rem;
  }
  .ribbon-label {
    display: none; /* Hide labels on mobile, icons only */
  }
}



/* ✅ DARK MODE SUPPORT FOR FLOATING RIBBON */
@media (prefers-color-scheme: dark) {
  .floating-ribbon.glass {
    background: rgba(255, 255, 255, 0.85); /* slate-800 with transparency */
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgb(255, 255, 255);
  }
  
  .ribbon-item {
    background: rgba(51, 65, 85, 0.9); /* slate-700 */
    border-color: rgba(255, 255, 255, 0.15);
    color: #e2e8f0; /* slate-200 */
  }
  
  .ribbon-item:hover {
    background: rgba(71, 85, 105, 0.95); /* slate-600 */
    border-color: rgba(16, 185, 129, 0.5); /* emerald-500 with transparency */
  }
  
  .ribbon-item.active {
    background: #10b981; /* emerald-500 */
    border-color: #059669; /* emerald-600 */
    color: white;
  }
  
  .ribbon-label {
    color: #f1f5f9; /* slate-100 */
  }
}

/* ✅ Also fix Command Palette for dark mode */
@media (prefers-color-scheme: dark) {
  .command-palette.glass {
    background: rgba(30, 41, 59, 0.85);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  .command-input {
    color: #f1f5f9;
  }
  
  .command-input::placeholder {
    color: #94a3b8;
  }
  
  .search-hint {
    background: rgba(51, 65, 85, 0.9);
    color: #cbd5e1;
  }
  
  .clear-search:hover {
    background: rgba(71, 85, 105, 0.8);
    color: #f1f5f9;
  }
}


/* ✅ RESULTS HEADER WITH FILTER/SORT */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.result-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.filter-sort-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* 🔽 FILTER BUTTON & DROPDOWN */
.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #10b981;
  color: #10b981;
}

.filter-btn.has-filters {
  border-color: #10b981;
  background: #ecfdf5;
  color: #065f46;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 700;
}

.filter-panel {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 280px;
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 50;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.filter-section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.filter-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.filter-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #10b981;
  cursor: pointer;
}

.price-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.price-option {
  padding: 0.4rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.price-option:hover {
  border-color: #10b981;
  color: #10b981;
}

.price-option.active {
  background: #10b981;
  border-color: #059669;
  color: white;
  font-weight: 600;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.reset-btn,
.apply-btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn {
  background: #f1f5f9;
  border: none;
  color: #475569;
}

.reset-btn:hover {
  background: #e2e8f0;
}

.apply-btn {
  background: #10b981;
  border: none;
  color: white;
}

.apply-btn:hover {
  background: #059669;
}

/* 🔽 SORT DROPDOWN */
.sort-dropdown .sort-select {
  padding: 0.5rem 2rem 0.5rem 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #475569;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  transition: all 0.2s;
}

.sort-dropdown .sort-select:hover {
  border-color: #10b981;
  color: #10b981;
}

.sort-dropdown .sort-select:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

/* ✅ DARK MODE SUPPORT FOR FILTERS */
@media (prefers-color-scheme: dark) {
  .result-title {
    color: #0f172a;
  }
  
  .filter-btn {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(255, 255, 255, 0.15);
    color: #e2e8f0;
  }
  
  .filter-btn:hover {
    border-color: #10b981;
    color: #10b981;
  }
  
  .filter-btn.has-filters {
    background: rgba(16, 185, 129, 0.15);
    border-color: #10b981;
    color: #6ee7b7;
  }
  
  .filter-panel.glass {
    background: rgba(30, 41, 59, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .filter-section {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .filter-label {
    color: #f1f5f9;
  }
  
  .price-option {
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(255, 255, 255, 0.15);
    color: #cbd5e1;
  }
  
  .price-option:hover {
    border-color: #10b981;
    color: #6ee7b7;
  }
  
  .price-option.active {
    background: #10b981;
    color: white;
  }
  
  .reset-btn {
    background: rgba(51, 65, 85, 0.8);
    color: #cbd5e1;
  }
  
  .reset-btn:hover {
    background: rgba(71, 85, 105, 0.9);
  }
  
  .sort-dropdown .sort-select {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(255, 255, 255, 0.15);
    color: #e2e8f0;
  }
}

/* ✅ MOBILE RESPONSIVENESS */
@media (max-width: 640px) {
  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-sort-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-panel {
    width: 100%;
    right: auto;
    left: 0;
  }
}
      `}</style>
    </div>
  );
}