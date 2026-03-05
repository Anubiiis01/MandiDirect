"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. NAVIGATION */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
  <h1 className="text-2xl font-black text-[#2E7D32] tracking-tighter">MandiDirect 2.0</h1>
  
  <div className="hidden md:flex gap-8 text-sm font-bold text-gray-600">
    <a href="#" className="hover:text-[#2E7D32] transition-colors">How it works</a>
    <a href="#" className="hover:text-[#2E7D32] transition-colors">Market Prices</a>
    <a href="#" className="hover:text-[#2E7D32] transition-colors">Support</a>
  </div>

  <div className="flex items-center gap-6">
    {/* Location Tag */}
    <span className="hidden sm:inline-flex text-[11px] font-black bg-gray-100 px-3 py-1.5 rounded-full text-gray-500 uppercase tracking-tight">
      📍 Navi Mumbai
    </span>

    {/* Auth Buttons */}
    <div className="flex items-center gap-3">
      
      <Link 
        href="/auth" 
        className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white text-sm font-black px-6 py-2.5 rounded-full shadow-lg shadow-green-900/10 transition-all active:scale-95"
      >
        Join Mandi
      </Link>
    </div>
  </div>
</nav>

      {/* 2. MARKET TICKER */}
      <div className="bg-[#2E7D32] text-white py-3 overflow-hidden whitespace-nowrap relative">
        <div className="flex gap-12 animate-marquee inline-block">
          {['Onion: ₹28 (+14%)', 'Tomato: ₹32 (+8%)', 'Potato: ₹22 (-2%)', 'Wheat: ₹45 (+5%)', 'Rice: ₹60 (0%)'].map((price, i) => (
            <span key={i} className="font-bold text-sm tracking-wide uppercase">{price}</span>
          ))}
          {/* Duplicate for smooth scrolling */}
          {['Onion: ₹28 (+14%)', 'Tomato: ₹32 (+8%)', 'Potato: ₹22 (-2%)', 'Wheat: ₹45 (+5%)', 'Rice: ₹60 (0%)'].map((price, i) => (
            <span key={i + 'd'} className="font-bold text-sm tracking-wide uppercase">{price}</span>
          ))}
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <header className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-green-100 text-[#2E7D32] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
          Direct from Farm to Table
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
          Freshness you can <span className="text-[#2E7D32]">track</span>. Prices you can <span className="text-[#64DD17] drop-shadow-sm">trust</span>.
        </h2>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The first marketplace with real-time Mandi intelligence, connecting honest farmers directly with smart buyers.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/list-produce" className="bg-[#64DD17] text-black font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform text-center">
            I AM A FARMER
          </Link>
          <Link href="/marketplace" className="bg-slate-900 text-white font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            I AM A BUYER
          </Link>
        </div>
      </header>

      {/* 4. DUAL PORTALS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group bg-green-50 rounded-[2.5rem] p-10 border border-green-100 hover:shadow-2xl transition-all cursor-pointer h-[400px] flex flex-col justify-between">
          <div>
            <span className="text-4xl">🛒</span>
            <h3 className="text-3xl font-black mt-6 text-[#2E7D32]">Retail Store</h3>
            <p className="text-gray-600 mt-2 font-medium">Buying for your home? Get the freshest pick of the day in small quantities.</p>
          </div>
          <div className="flex items-center gap-2 font-bold text-[#2E7D32]">
            Explore Shop <span>→</span>
          </div>
        </div>

        <Link href="/wholesale/select-city" className="group bg-slate-900 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all cursor-pointer h-[400px] flex flex-col justify-between text-white">
    <div>
      <span className="text-4xl">🚛</span>
      <h3 className="text-3xl font-black mt-6">Wholesale Hub</h3>
      <p className="text-slate-400 mt-2 font-medium">Buying for a business? Access tiered pricing and bulk logistics.</p>
    </div>
    <div className="flex items-center gap-2 font-bold text-[#64DD17]">
      View Bulk Rates <span>→</span>
    </div>
  </Link>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}