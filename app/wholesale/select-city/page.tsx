"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function WholesaleCityPickerPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const topCities = useMemo(
    () => ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Ahmedabad", "Kolkata"],
    []
  );

  const filteredCities = topCities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCity = (city: string) => {
    router.push(`/wholesale?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="city-picker-page">
      <div className="picker-card animate-slide-up">
        <div className="search-header">
          <h1>Select Your Trade Region</h1>
          <p>Choose a city to view local wholesale pricing and logistics.</p>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search city or warehouse code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="city-list-wrapper">
          <span className="section-label">Top Hubs</span>
          <div className="city-scroll">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button key={city} className="city-chip" onClick={() => handleSelectCity(city)}>
                  {city}
                </button>
              ))
            ) : (
              <p className="empty-state">No city found for "{searchTerm}".</p>
            )}
          </div>
        </div>

        <p className="portal-hint">Pricing and logistics are calculated based on your selected hub.</p>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #1e293b;
        }

        .city-picker-page {
          min-height: 100vh;
          background: radial-gradient(circle at 20% 20%, #1f3a53 0%, #0f172a 62%);
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .picker-card {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          width: min(100%, 620px);
          max-height: min(86vh, 740px);
          overflow: hidden;
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 28px 60px -20px rgba(15, 23, 42, 0.5);
        }

        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .search-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .search-header h1 {
          margin: 0;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .search-header p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
        }

        .search-box {
          position: relative;
          margin: 1rem 0 0;
        }

        .search-box input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 0.9rem;
          border: 2px solid #e2e8f0;
          background: #ffffff;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .search-box input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          opacity: 0.6;
        }

        .city-list-wrapper {
          margin-top: 1.25rem;
        }

        .section-label {
          display: block;
          font-weight: 800;
          color: #64748b;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.9rem;
        }

        .city-scroll {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          max-height: min(42vh, 320px);
          overflow-y: auto;
          padding: 4px;
        }

        .city-chip {
          appearance: none;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          color: #1e293b;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.9rem 0.5rem;
          text-align: center;
          transition: all 0.2s ease;
          width: 100%;
        }

        .city-chip:hover {
          border-color: #10b981;
          background-color: #f0fdf4;
          color: #047857;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .city-chip:active {
          transform: translateY(0);
          background-color: #dcfce7;
        }

        .empty-state {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
          grid-column: 1 / -1;
          text-align: center;
          padding: 1rem;
        }

        .portal-hint {
          text-align: center;
          color: #64748b;
          font-size: 0.9rem;
          margin-top: 1rem;
          line-height: 1.4;
        }

        .city-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .city-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .city-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .city-picker-page {
            padding: 12px;
          }

          .picker-card {
            padding: 1.25rem;
            border-radius: 1rem;
          }

          .search-box input {
            font-size: 0.95rem;
            padding: 0.9rem 0.9rem 0.9rem 2.8rem;
          }

          .city-scroll {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-height: 38vh;
          }
        }
      `}</style>
    </div>
  );
}
