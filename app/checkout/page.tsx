"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  return (
    <div className="checkout-container">
      {/* 1. Header / Progress */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
  <h1 className="text-2xl font-black text-[#2E7D32] tracking-tighter">MandiDirect 2.0</h1>
  
  <div className="hidden md:flex gap-8 text-sm font-bold text-gray-600">
    <a href="#" className="hover:text-[#2E7D32] transition-colors">How it works</a>
    <a href="#" className="hover:text-[#2E7D32] transition-colors">Market Prices</a>
    <a href="#" className="hover:text-[#2E7D32] transition-colors">Support</a>
  </div>

          </nav>

      <main className="checkout-main">
        {/* LEFT COLUMN: Shipping & Payment */}
        <section className="checkout-form-side">
          <div className="form-section">
            <h2 className="section-title">1. Delivery Address</h2>
            <div className="address-card">
              <div className="address-header">
                <span className="name">Rahul Sharma</span>
                <span className="tag">Home</span>
              </div>
              <p className="address-details">
                Sector 15, CBD Belapur, Navi Mumbai, Maharashtra, 400614
              </p>
              <button className="edit-btn">Change Address</button>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">2. Payment Method</h2>
            <div className="payment-options">
              {['upi', 'card', 'cod'].map((method) => (
                <label key={method} className={`payment-label ${paymentMethod === method ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value={method} 
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-name">
                    {method === 'upi' && "📱 UPI (GPay, PhonePe, Paytm)"}
                    {method === 'card' && "💳 Debit / Credit Card"}
                    {method === 'cod' && "💵 Cash on Delivery"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="place-order-btn">
            Place Your Order & Pay
          </button>
        </section>

        {/* RIGHT COLUMN: Order Summary (The "Sticky" Sidebar) */}
        <aside className="checkout-summary-side">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Items:</span>
              <span>₹499.00</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee:</span>
              <span>₹5.00</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Order Total:</span>
              <span>₹504.00</span>
            </div>

            <div className="savings-highlight">
              🎉 You are saving ₹120.00 on this order!
            </div>
          </div>
        </aside>
      </main>

      <style jsx global>{`
      

      :root {
  --bg-white: #ffffff;
  --bg-slate-50: #f8fafc;
  --text-slate-900: #0f172a; /* Force Dark Text */
  --text-slate-600: #475569; /* Force Muted Text */
  --border-slate: #e2e8f0;
}
        .checkout-container {
          min-height: 100vh;
          
          color-scheme: light !important;
         background-color: var(--bg-white) !important;
         color: var(--text-slate-900) !important;
        }
          font-family: sans-serif;
        }

        .checkout-nav {
          background: white;
          padding: 1.5rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: #2E7D32;
          text-decoration: none;
        }

        .secure-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
        }

        .checkout-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #0f172a;
        }

        .form-section {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
        }

        .address-card {
          padding: 1rem;
          background: #f1f5f9;
          border-radius: 1rem;
          border: 1px solid #cbd5e1;
          background: var(--bg-slate-50) !important;
        border-color: var(--border-slate) !important;
        }

        .name { font-weight: 900; font-size: 1rem; }
        .tag { 
          background: #2E7D32; color: white; 
          font-size: 0.6rem; padding: 2px 8px; 
          border-radius: 4px; margin-left: 10px;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .payment-label {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 1rem;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s;
        }

        .payment-label.active {
          border-color: #2E7D32;
          background: #f0fdf4;
        }

        .place-order-btn {
          width: 100%;
          background: #2E7D32;
          color: white;
          padding: 1.25rem;
          border-radius: 1rem;
          font-size: 1.1rem;
          font-weight: 900;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 15px -3px rgba(46, 125, 50, 0.2);
        }

        /* Summary Sticky Sidebar */
        .summary-card {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          position: sticky;
          top: 2rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #64748b;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.5rem;
          font-weight: 900;
          color: #0f172a;
          margin: 1.5rem 0;
        }

        .savings-highlight {
          background: #f0fdf4;
          color: #166534;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-size: 0.8rem;
          font-weight: 700;
          text-align: center;
        }

        @media (max-width: 900px) {
          .checkout-main { grid-template-columns: 1fr; }
          .checkout-summary-side { order: -1; }
        }

        color-scheme: light !important;
  background-color: var(--bg-white) !important;
  color: var(--text-slate-900) !important;
}


.form-section, .summary-card, .checkout-nav {
  background: white !important;
  border-color: var(--border-slate) !important;
}
  .success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7); /* Dark semi-transparent backdrop */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.success-card {
  background: white !important;
  color: #0f172a !important; /* Force black text */
  padding: 3rem;
  border-radius: 2rem;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
      `}</style>
    </div>
  );
}