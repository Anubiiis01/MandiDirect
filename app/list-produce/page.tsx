"use client";
import { useState } from 'react';

export default function FarmerListing() {
  const [mandiPrice, setMandiPrice] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const platformFee = 2; 

  const suggestedPrice = mandiPrice > 0 ? (mandiPrice - transportCost + platformFee) : 0;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Centered container: max-w-2xl makes it look great on laptops */}
      <div className="max-w-2xl mx-auto p-6 pb-32"> 
        
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-[#2E7D32] tracking-tight">List Your Produce</h1>
          <p className="text-gray-500 mt-2">Set your price and reach buyers directly.</p>
        </header>

        <div className="space-y-10">
          {/* SECTION 1: THE CALCULATOR */}
          <section className="bg-green-50 p-6 rounded-3xl border border-green-100 shadow-sm">
            <h2 className="font-bold text-[#2E7D32] mb-5 flex items-center gap-2 text-lg">
              <span>📊</span> Profit Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Local Mandi Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-medium">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-4 pl-8 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] outline-none transition-all bg-white"
                    onChange={(e) => setMandiPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Transport Cost</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-medium">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-4 pl-8 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#2E7D32] outline-none transition-all bg-white"
                    onChange={(e) => setTransportCost(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-green-200 flex justify-between items-center shadow-sm">
              <span className="text-sm font-semibold text-gray-600">Suggested Listing Price:</span>
              <div className="text-right">
                <span className="text-3xl font-black text-[#2E7D32]">₹{suggestedPrice}/kg</span>
                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Recommended for Market</p>
              </div>
            </div>
          </section>

          {/* SECTION 2: PRODUCE DETAILS */}
          <section className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">What are you selling?</label>
              <select className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white transition-colors outline-none cursor-pointer">
                <option>Select Crop</option>
                <option>Onion (Red)</option>
                <option>Tomato (Hybrid)</option>
                <option>Potatoes (Jyoti)</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">Grade Quality</label>
              <div className="grid grid-cols-3 gap-3">
                {['A', 'B', 'C'].map((grade) => (
                  <button key={grade} className="py-4 border-2 border-gray-100 rounded-2xl font-bold hover:border-[#2E7D32] hover:text-[#2E7D32] transition-all bg-gray-50 hover:bg-white shadow-sm">
                    Grade {grade}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">Special Tags</label>
              <div className="flex flex-wrap gap-3">
                {['Organic', 'Pesticide Free', 'Export Quality'].map((tag) => (
                  <label key={tag} className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-full cursor-pointer hover:border-[#2E7D32] transition-all shadow-sm">
                    <input type="checkbox" className="w-5 h-5 accent-[#2E7D32]" />
                    <span className="text-sm font-semibold text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: VIDEO UPLOAD */}
          <div className="group border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50 hover:bg-green-50 hover:border-[#2E7D32] transition-all cursor-pointer shadow-sm">
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🎥</div>
            <p className="text-base font-bold mt-4 text-gray-800">Upload Verified Field Video</p>
            <p className="text-sm text-gray-400 mt-2">Required for buyer trust and faster sales.</p>
          </div>
        </div>

        {/* ANIMATED SUBMIT BUTTON */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 md:relative md:bg-transparent md:border-none md:p-0 md:mt-16">
          <button className="w-full bg-[#64DD17] hover:bg-[#52b312] text-black font-black py-5 rounded-2xl shadow-xl transform transition-all active:scale-95 animate-pulse-slow">
            LIST THIS PRODUCE
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(100, 221, 23, 0.3); }
          50% { transform: scale(1.02); box-shadow: 0 20px 25px -5px rgba(100, 221, 23, 0.4); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}