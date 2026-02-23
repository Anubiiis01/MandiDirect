"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  
  // Updated Sample Data
  const product = {
    name: "Red Onions (Nashik)",
    farmer: "Suresh Kendrick",
    location: "Kalwan, Nashik",
    price: 28,
    retailPrice: 42,
    grade: "A",
    harvestDate: "22 Feb 2026",
    stock: "450 kg",
    tags: ["Organic", "Export Quality"],
    description: "These onions are grown using zero-budget spiritual farming. They have a high pungency level and a shelf life of 4+ months if stored in a cool, dry place.",
    // NEW: Product Highlights
    highlights: [
      { bold: "FARM FRESH:", text: "Harvested within 24 hours of your order." },
      { bold: "NO MIDDLEMEN:", text: "Sourced directly from the Kalwan farm belt." },
      { bold: "LONG SHELF LIFE:", text: "Naturally cured for better storage at home." },
      { bold: "LAB TESTED:", text: "Certified pesticide-free and organic." }
    ],
    // NEW: Technical Details
    specs: {
      "Variety": "Nasik Red (Gavran)",
      "Size": "55mm - 65mm",
      "Packaging": "Mesh Bags (Jali)",
      "Pungency": "High",
      "Origin": "Maharashtra, India"
    }
  };

  // Dummy Images Array
  const images = [
    "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80", // Main Onion
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80", // Field
    "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&w=800&q=80", // Basket
  ];

  const savings = ((product.retailPrice - product.price) / product.retailPrice) * 100;

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24">
      {/* HEADER NAV */}
      <nav className="p-6 flex items-center gap-4">
        <Link href="/marketplace" className="text-gray-400 hover:text-black transition-colors">← Back to Marketplace</Link>
        <div className="h-4 w-[1px] bg-gray-200"></div>
        <span className="font-bold text-sm">Product ID: MD-8821</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: VISUALS (5 Cols) */}
        <section className="lg:col-span-5 space-y-6">
          {/* MAIN IMAGE DISPLAY */}
          <div className="relative aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={images[activeImg]} 
              alt="Produce" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* DUMMY IMAGE GALLERY STRIP */}
          <div className="flex gap-4">
            {images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#2E7D32] scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
            {/* Video Thumbnail Trigger */}
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white cursor-pointer hover:bg-black transition-colors">
              <span className="text-xs font-black">VIDEO</span>
            </div>
          </div>

          {/* FARMER CARD */}
          <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2E7D32] rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-green-200">👨🏽‍🌾</div>
              <div>
                <h4 className="font-black text-lg">{product.farmer}</h4>
                <p className="text-sm text-gray-500 font-medium">Verified Farmer • Kalwan</p>
              </div>
            </div>
            <button className="bg-white px-4 py-2 rounded-xl text-[#2E7D32] font-bold text-sm border border-green-200 shadow-sm hover:bg-green-50 transition-colors">View Profile</button>
          </div>
        </section>

        {/* RIGHT COLUMN: INFO & BUYING (7 Cols) */}
        <section className="lg:col-span-7">
          <div className="flex gap-2 mb-4">
            {product.tags.map(tag => (
              <span key={tag} className="bg-green-100 text-[#2E7D32] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
            ))}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black mb-2 tracking-tight leading-tight">{product.name}</h1>
          <p className="text-gray-500 font-medium text-lg mb-6 flex items-center gap-2">
            <span className="text-[#2E7D32]">📍</span> {product.location}
          </p>

          {/* PRODUCT HIGHLIGHTS (Bullet Points) */}
          <div className="mb-8 space-y-3">
            {product.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[#64DD17] mt-1">✓</span>
                <p><span className="font-black uppercase text-[11px] tracking-wide">{h.bold}</span> <span className="text-gray-600">{h.text}</span></p>
              </div>
            ))}
          </div>

          {/* PRICE COMPARISON BOX */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white mb-10 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-[#64DD17] uppercase tracking-[0.2em] mb-2">MandiDirect Direct Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black italic">₹{product.price}</span>
                  <span className="text-xl opacity-50 font-bold">/kg</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Local Retail</p>
                <p className="text-2xl font-bold line-through opacity-40 italic">₹{product.retailPrice}</p>
                <p className="bg-[#64DD17] text-black text-[10px] font-black px-2 py-1 rounded-md mt-2 inline-block">
                  SAVE {savings.toFixed(0)}% TODAY
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#64DD17] opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          </div>

          {/* SPECS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Grade</p>
              <p className="font-bold text-base">{product.grade}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Stock</p>
              <p className="font-bold text-base">{product.stock}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Harvest</p>
              <p className="font-bold text-sm">{product.harvestDate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Logistics</p>
              <p className="font-bold text-base">Mandi Express</p>
            </div>
          </div>

          {/* PRODUCT DETAILS (Technical Table) */}
          <div className="mb-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Technical Details</h3>
            <div className="border-t border-gray-100">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-1/3 font-bold text-gray-500">{key}</span>
                  <span className="w-2/3 font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUANTITY & CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sticky bottom-6 lg:relative lg:bottom-0">
            <div className="flex items-center border-2 border-gray-200 rounded-2xl p-2 bg-white shadow-xl lg:shadow-none">
              <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-12 h-12 font-black text-xl hover:bg-gray-100 rounded-xl transition-all">-</button>
              <input type="number" value={quantity} readOnly className="w-16 text-center font-black text-xl bg-transparent outline-none" />
              <button onClick={() => setQuantity(q => q+1)} className="w-12 h-12 font-black text-xl hover:bg-gray-100 rounded-xl transition-all">+</button>
            </div>
            <button className="flex-1 bg-[#64DD17] hover:bg-[#52b312] text-black font-black py-5 rounded-2xl shadow-xl transition-all transform active:scale-95 text-lg">
              ADD TO CART • ₹{product.price * quantity}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}