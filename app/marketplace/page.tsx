"use client";
import { useState, useMemo } from 'react';

const MOCK_PRODUCE = [
  { id: 1, name: 'Red Onions', variety: 'Nashik', price: 28, grade: 'A', tags: ['Organic'], farmer: 'Suresh K.', image: '🧅' },
  { id: 2, name: 'Hybrid Tomatoes', variety: 'Bangalore', price: 32, grade: 'A', tags: ['Pesticide Free'], farmer: 'Ramesh G.', image: '🍅' },
  { id: 3, name: 'Desi Potatoes', variety: 'Indore', price: 22, grade: 'B', tags: ['Seasonal'], farmer: 'Amit P.', image: '🥔' },
  { id: 4, name: 'Green Chillies', variety: 'Guntur', price: 45, grade: 'A', tags: ['Export Quality'], farmer: 'Vikas M.', image: '🌶️' },
  { id: 5, name: 'Cauliflower', variety: 'Local', price: 40, grade: 'C', tags: ['Pesticide Free'], farmer: 'Sunil J.', image: '🥦' },
  { id: 6, name: 'Garlic', variety: 'MP White', price: 120, grade: 'A', tags: ['Organic'], farmer: 'Deepak S.', image: '🧄' },
  { id: 7, name: 'Lady Finger', variety: 'Bhindi', price: 55, grade: 'A', tags: ['Fresh'], farmer: 'Rahul T.', image: '🎋' },
  { id: 8, name: 'Carrots', variety: 'Ooty', price: 65, grade: 'A', tags: ['Organic'], farmer: 'Kiran V.', image: '🥕' },
];

const QUICK_VEG_TAGS = ['All', 'Onion', 'Tomato', 'Potato', 'Garlic', 'Carrots', 'Chillies'];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGrade, setActiveGrade] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);
  const [selectedVeg, setSelectedVeg] = useState('All');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
const toggleFeature = (feature: string) => {
  setSelectedFeatures((prev) =>
    prev.includes(feature)
      ? prev.filter((f) => f !== feature) // Remove if already there
      : [...prev, feature]               // Add if not there
  );
};
  // THE FILTER ENGINE
  const filteredProduce = useMemo(() => {
    return MOCK_PRODUCE.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.variety.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = activeGrade === 'All' || item.grade === activeGrade;
      const matchesPrice = item.price <= maxPrice;
      const matchesVegTag = selectedVeg === 'All' || item.name.toLowerCase().includes(selectedVeg.toLowerCase());
      const matchesFeatures = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => item.tags.includes(feature));
    
    return matchesSearch && matchesGrade && matchesPrice && matchesVegTag && matchesFeatures;
  });
}, [searchTerm, activeGrade, maxPrice, selectedVeg, selectedFeatures]); // Add selectedFeatures to dependency array

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* HEADER & SEARCH */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Marketplace</h1>
            <p className="text-gray-500 font-medium">Verified listings near <span className="text-[#2E7D32]">Navi Mumbai</span></p>
          </div>
          
          <div className="w-full md:w-96 relative">
            <input 
              type="text" 
              placeholder="Search by crop name or variety..." 
              className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#2E7D32] outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-4 opacity-40 text-xl">🔍</span>
          </div>
        </header>

        {/* QUICK FILTERS (VEGETABLE NAMES) */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
          {QUICK_VEG_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedVeg(tag)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${
                selectedVeg === tag 
                ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mt-4">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-64 space-y-12">
            {/* GRADE FILTER */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Quality Grade</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {['All', 'A', 'B', 'C'].map((grade) => (
                  <button 
                    key={grade}
                    onClick={() => setActiveGrade(grade)}
                    className={`text-center lg:text-left px-5 py-3 rounded-xl font-bold transition-all ${activeGrade === grade ? 'bg-[#2E7D32] text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                  >
                    Grade {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE SLIDER */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Max Price</h3>
                <span className="text-sm font-bold text-[#2E7D32]">₹{maxPrice}/kg</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="150" 
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2E7D32]" 
              />
              <div className="flex justify-between text-[10px] font-black text-gray-400 mt-3 uppercase tracking-tighter">
                <span>Min: ₹20</span>
                <span>Max: ₹150</span>
              </div>
            </div>



            {/* PREMIUM FEATURE TAGS */}
<div className="pt-6">
  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Premium Features</h3>
  <div className="flex flex-col gap-3">
    
    {/* DELETE THE OLD MAP BLOCK AND PASTE THE NEW ONE HERE: */}
    {['Organic', 'Pesticide Free', 'Export Quality'].map((feature) => (
      <label key={feature} className="flex items-center gap-3 group cursor-pointer">
        <div className="relative flex items-center justify-center">
          <input 
            type="checkbox" 
            checked={selectedFeatures.includes(feature)}
            onChange={() => toggleFeature(feature)}
            className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-[#2E7D32] checked:border-[#2E7D32] transition-all"
          />
          <svg className="absolute w-3 h-3 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-bold text-gray-600 group-hover:text-[#2E7D32] transition-colors">{feature}</span>
      </label>
    ))}

  </div>
</div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="flex-1">
            {filteredProduce.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProduce.map((item) => (
                  <div key={item.id} className="group bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                    <div className="h-56 bg-gray-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500 relative">
                      {item.image}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black shadow-sm">
                        {item.farmer}
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.name}</h4>
                          <p className="text-sm text-[#2E7D32] font-bold uppercase tracking-wider">{item.variety}</p>
                        </div>
                        <span className="bg-[#64DD17]/10 text-[#2E7D32] text-xs font-black px-3 py-1.5 rounded-lg border border-[#64DD17]/20">
                          {item.grade}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
  {item.tags.map((tag) => {
    // Logic to determine color based on tag name
    let tagStyle = "bg-slate-100 text-slate-500 border-slate-200"; // Default
    
    if (tag === 'Organic') 
      tagStyle = "bg-green-50 text-green-700 border-green-200";
    if (tag === 'Pesticide Free') 
      tagStyle = "bg-blue-50 text-blue-700 border-blue-200";
    if (tag === 'Export Quality') 
      tagStyle = "bg-amber-50 text-amber-700 border-amber-200";

    return (
      <span 
        key={tag} 
        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${tagStyle} shadow-sm transition-transform hover:scale-105`}
      >
        {tag === 'Organic' && '🍃 '}
        {tag === 'Pesticide Free' && '🧪 '}
        {tag === 'Export Quality' && '🏆 '}
        {tag}
      </span>
    );
  })}
</div>

                      <div className="mt-auto flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Price / KG</p>
                          <p className="text-3xl font-black text-slate-900 italic">₹{item.price}</p>
                        </div>
                        <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white p-4 rounded-2xl shadow-lg transition-all active:scale-90 group">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <p className="text-4xl mb-4">🚜</p>
                <h3 className="text-xl font-bold text-gray-400">No produce found matching those filters.</h3>
                <button onClick={() => { setSearchTerm(''); setMaxPrice(150); setSelectedVeg('All'); setActiveGrade('All'); setSelectedFeatures([]); }} className="mt-4 text-[#2E7D32] font-bold underline">Clear all filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}