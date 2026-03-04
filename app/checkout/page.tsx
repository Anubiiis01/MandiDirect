  "use client";
  import { useEffect, useState } from 'react';
  import Link from 'next/link';

  export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [isOrdered, setIsOrdered] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // <--- Add this
    

    const [orderData, setOrderData] = useState({
    itemsTotal: 0,
    platformFee: 5,
    grandTotal: 0,
    quantity: 1
  });

  // --- NEW: Load data from LocalStorage ---
  useEffect(() => {
    const savedOrder = localStorage.getItem('mandi_order_summary');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);
    const handlePlaceOrder = () => {
      setIsLoading(true);
      
      // Simulate payment processing (1.5 seconds)
      setTimeout(() => {
        setIsLoading(false);
        setIsOrdered(true);
      }, 1500);
    };

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

          <button 
            onClick={handlePlaceOrder} 
            className={`place-order-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : "Place Your Order & Pay"}
          </button>
        </section>

        {/* RIGHT COLUMN: Updated with dynamic orderData */}
        <aside className="checkout-summary-side">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Items ({orderData.quantity}):</span>
              <span>₹{orderData.itemsTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee:</span>
              <span>₹{orderData.platformFee.toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Order Total:</span>
              <span>₹{orderData.grandTotal.toFixed(2)}</span>
            </div>

            <div className="savings-highlight">
              🎉 You saved ₹{(orderData.itemsTotal * 0.2).toFixed(0)} on this order!
            </div>
          </div>
        </aside>

        {isOrdered && (
          <div className="success-overlay">
            <div className="success-card">
              <div className="check-container">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <h2 className="success-title">Payment Successful!</h2>
              <p className="success-text">
                Order <b>#MD-2026-X</b> has been placed. <br/>
                Check your SMS for tracking details.
              </p>
              <Link href="/marketplace" className="back-home-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
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
          font-family: sans-serif;
        }
            
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


  .btn-go-checkout {
    background: #64DD17;
    color: black !important;
    padding: 1rem 2rem;
    border-radius: 1.25rem;
    font-weight: 900;
    font-size: 0.9rem;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 4px 15px rgba(100, 221, 23, 0.3);
  }

  /* Hover State: Lift and Glow */
  .btn-go-checkout:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 20px rgba(100, 221, 23, 0.4);
    background: #76ff03;
  }

  /* The Shimmering Glare Effect */
  .shimmer-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: skewX(-25deg);
    transition: 0.5s;
  }

  .btn-go-checkout:hover .shimmer-effect {
    animation: shimmer 1.2s infinite;
  }

  /* Arrow Animation */
  .arrow-icon {
    transition: transform 0.3s ease;
  }

  .btn-go-checkout:hover .arrow-icon {
    transform: translateX(5px);
  }

  /* Keyframes for the Shimmer */
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 150%; }
  }

  /* Continuous Pulse for Visibility */
  @keyframes pulse-soft {
    0% { box-shadow: 0 0 0 0 rgba(100, 221, 23, 0.5); }
    70% { box-shadow: 0 0 0 15px rgba(100, 221, 23, 0); }
    100% { box-shadow: 0 0 0 0 rgba(100, 221, 23, 0); }
  }

  .btn-go-checkout {
    animation: pulse-soft 2s infinite;
  }



  /* --- Overlay Background --- */
  .success-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.85); /* Dark blur effect */
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1.5rem;
  }

  /* --- The Card --- */
  .success-card {
    background: white;
    padding: 3rem 2rem;
    border-radius: 2.5rem;
    text-align: center;
    max-width: 420px;
    width: 100%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: popIn 0.5s cubic-bezier(0.26, 0.53, 0.74, 1.48) forwards;
  }

  .success-title {
    color: #0f172a;
    font-size: 1.75rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }

  .success-text {
    color: #64748b;
    line-height: 1.6;
  }

  /* --- SVG Drawing Animation --- */
  .check-container { width: 80px; height: 80px; margin: 0 auto 1.5rem; }
  .checkmark {
    width: 80px; height: 80px; border-radius: 50%; display: block;
    stroke-width: 3; stroke: #2E7D32; stroke-miterlimit: 10;
    animation: fill .4s ease-in-out .4s forwards;
  }
  .checkmark-circle {
    stroke-dasharray: 166; stroke-dashoffset: 166;
    stroke-width: 3; stroke: #2E7D32; fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .checkmark-check {
    transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke { 100% { stroke-dashoffset: 0; } }
  @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 40px #E8F5E9; } }
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1); }
  }

  .back-home-btn {
    display: inline-block;
    margin-top: 2rem;
    background: #2E7D32;
    color: white !important;
    padding: 1rem 2rem;
    border-radius: 1.25rem;
    text-decoration: none;
    font-weight: 800;
    transition: transform 0.2s;
  }

  .back-home-btn:hover { transform: scale(1.05); }  
        `}</style>
      </div>
    );
  }