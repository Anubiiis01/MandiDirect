"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PRODUCE } from '../../data/products';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter(); // <--- Add this (Import from 'next/navigation')
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1); // <--- Add this
  const [showCartBar, setShowCartBar] = useState(false);
  const product = MOCK_PRODUCE.find((p) => p.id === Number(params.id));

  const handleBuyNow = () => {
  if (!product) return;
  const itemsTotal = product.price * quantity;
  const platformFee = 5.00; // Constant fee
  const grandTotal = itemsTotal + platformFee;

  const orderSummary = {
    itemsTotal: itemsTotal,
    platformFee: platformFee,
    grandTotal: grandTotal,
    quantity: quantity,
    productName: product.name,
    productImg: product.gallery[0]
  };

  // Save to storage so checkout can read it
  localStorage.setItem('mandi_order_summary', JSON.stringify(orderSummary));
  
  // Navigate to checkout
  router.push('/checkout');
};

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-black text-slate-900">Product not found!</h1>
          <Link href="/marketplace" className="inline-block mt-6 bg-[#2E7D32] text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.retailPrice - product.price) / product.retailPrice) * 100
  );

  return (
    <>
      <style jsx global>{`
        /* ============================================
           MANDIDIRECT 2.0 THEME VARIABLES
           ============================================ */
        :root {
          /* Brand Colors */
          --md-green-dark: #2E7D32;
          --md-green-bright: #64DD17;
          --md-green-light: #E8F5E9;
          --md-green-50: #F1F8E9;
          
          /* Neutral Colors */
          --md-slate-900: #0F172A;
          --md-slate-800: #1E293B;
          --md-slate-600: #475569;
          --md-slate-500: #64748B;
          --md-slate-400: #94A3B8;
          --md-slate-100: #F1F5F9;
          --md-slate-50: #F8FAFC;
          
          /* Accent Colors */
          --md-accent-orange: #F59E0B;
          --md-accent-red: #DC2626;
          --md-accent-blue: #0EA5E9;
          
          /* Spacing */
          --md-radius-xl: 1.5rem;
          --md-radius-2xl: 2rem;
          --md-radius-3xl: 2.5rem;
          
          /* Shadows */
          --md-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --md-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          --md-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          
          /* Transitions */
          --md-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ============================================
           FORCE LIGHT THEME
           ============================================ */
        .product-page-container,
        .product-page-container * {
          color-scheme: light;
        }

        /* ============================================
           BASE STYLES
           ============================================ */
        .product-page-container {
          min-height: 100vh;
          background-color: #FFFFFF;
          color: var(--md-slate-900);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .product-page-container a {
          color: var(--md-green-dark);
          text-decoration: none;
          transition: color var(--md-transition);
        }

        .product-page-container a:hover {
          color: var(--md-green-bright);
        }

        /* ============================================
           NAVIGATION (Matching Home)
           ============================================ */
        .product-nav {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--md-slate-100);
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          z-index: 50;
        }

        .product-logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--md-green-dark);
          letter-spacing: -0.05em;
        }

        .product-nav-links {
          display: none;
          gap: 2rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-600);
        }

        @media (min-width: 768px) {
          .product-nav-links {
            display: flex;
          }
        }

        .product-nav-links a:hover {
          color: var(--md-green-dark);
        }

        .location-badge {
          font-size: 0.75rem;
          font-weight: 700;
          background: var(--md-slate-100);
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          color: var(--md-slate-500);
        }

        /* ============================================
           BREADCRUMB
           ============================================ */
        .product-breadcrumb {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-slate-500);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .product-breadcrumb a:hover {
          color: var(--md-green-dark);
        }

        /* ============================================
           MAIN LAYOUT
           ============================================ */
        .product-main {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem 5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .product-main {
            grid-template-columns: repeat(12, 1fr);
            gap: 3rem;
          }
        }

        /* ============================================
           IMAGE GALLERY
           ============================================ */
        .product-gallery {
          display: flex;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .product-gallery {
            grid-column: span 5;
          }
        }

        .thumbnail-strip {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .thumbnail-btn {
          width: 60px;
          height: 70px;
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          overflow: hidden;
          padding: 0.25rem;
          cursor: pointer;
          transition: all var(--md-transition);
          background: transparent;
        }

        .thumbnail-btn:hover,
        .thumbnail-btn.active {
          border-color: var(--md-green-dark);
          box-shadow: 0 0 0 3px var(--md-green-light);
          transform: scale(1.05);
        }

        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: calc(var(--md-radius-xl) - 4px);
        }

        .thumbnail-video {
          width: 60px;
          height: 70px;
          border: 2px dashed var(--md-slate-400);
          border-radius: var(--md-radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 0.625rem;
          font-weight: 800;
          color: var(--md-slate-500);
          cursor: pointer;
          transition: all var(--md-transition);
        }

        .thumbnail-video:hover {
          border-color: var(--md-green-dark);
          color: var(--md-green-dark);
        }

        .main-image-wrapper {
          flex: 1;
          background: var(--md-slate-50);
          border-radius: var(--md-radius-3xl);
          overflow: hidden;
          position: relative;
        }

        .main-image-container {
          aspect-ratio: 1 / 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .main-image-container img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          transition: transform var(--md-transition);
        }

        .main-image-wrapper:hover .main-image-container img {
          transform: scale(1.08);
        }

        .zoom-hint {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-slate-400);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 1rem;
        }

        /* ============================================
           PRODUCT INFO
           ============================================ */
        .product-info {
          padding: 2rem;
        }

        @media (min-width: 1024px) {
          .product-info {
            grid-column: span 4;
            border-right: 2px solid var(--md-slate-100);
          }
        }

        .product-badge {
          display: inline-block;
          background: var(--md-green-light);
          color: var(--md-green-dark);
          font-size: 0.625rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }

        .product-title {
          font-size: 1.75rem;
          font-weight: 900;
          line-height: 1.2;
          color: var(--md-slate-900);
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .product-title {
            font-size: 2.25rem;
          }
        }

        .farmer-link {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-green-dark);
        }

        .product-ratings {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0.75rem 0;
        }

        .rating-stars {
          color: var(--md-accent-orange);
          font-size: 0.875rem;
          font-weight: 700;
        }

        .rating-count {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-500);
        }

        .rating-count:hover {
          color: var(--md-green-dark);
        }

        .info-divider {
          border: none;
          border-top: 2px solid var(--md-slate-100);
          margin: 1.5rem 0;
        }

        /* ============================================
           PRICING
           ============================================ */
        .pricing-section {
          background: var(--md-green-50);
          border: 2px solid var(--md-green-light);
          border-radius: var(--md-radius-2xl);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .deal-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--md-accent-red);
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .discount-tag {
          color: var(--md-accent-red);
          font-size: 1.5rem;
          font-weight: 900;
        }

        .current-price {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          color: var(--md-slate-900);
        }

        .currency {
          font-size: 1rem;
          vertical-align: top;
          font-weight: 700;
        }

        .mrp-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-500);
          margin-top: 0.5rem;
        }

        .mrp-text span {
          text-decoration: line-through;
          color: var(--md-slate-400);
        }

        /* ============================================
           OFFERS CARD
           ============================================ */
        .offers-card {
          background: var(--md-slate-50);
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-2xl);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .offers-title {
          font-size: 0.875rem;
          font-weight: 900;
          color: var(--md-slate-900);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .offer-item {
          background: #FFFFFF;
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          padding: 0.75rem;
          font-size: 0.625rem;
          font-weight: 700;
          text-align: center;
          transition: all var(--md-transition);
        }

        .offer-item:hover {
          border-color: var(--md-green-dark);
          transform: translateY(-2px);
          box-shadow: var(--md-shadow-lg);
        }

        .offer-item strong {
          display: block;
          color: var(--md-green-dark);
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }

        /* ============================================
           FEATURES BAR
           ============================================ */
        .features-bar {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          overflow-x: auto;
          border-top: 2px solid var(--md-slate-100);
          margin-top: 1.5rem;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
          text-align: center;
          flex-shrink: 0;
        }

        .feature-icon {
          width: 3rem;
          height: 3rem;
          background: var(--md-green-light);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          transition: all var(--md-transition);
        }

        .feature-item:hover .feature-icon {
          background: var(--md-green-dark);
          transform: scale(1.1);
        }

        .feature-text {
          font-size: 0.625rem;
          font-weight: 800;
          color: var(--md-slate-600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1.3;
        }

        /* ============================================
           BUY BOX
           ============================================ */
        @media (min-width: 1024px) {
          .buy-box-section {
            grid-column: span 3;
          }
        }

        .buy-box {
          background: #FFFFFF;
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-3xl);
          padding: 2rem;
          position: sticky;
          top: 6rem;
          box-shadow: var(--md-shadow-xl);
          transition: all var(--md-transition);
        }

        .buy-box:hover {
          box-shadow: var(--md-shadow-2xl);
        }

        .buy-price {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--md-slate-900);
          margin-bottom: 0.75rem;
          line-height: 1;
        }

        .delivery-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-600);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .delivery-text .free {
          color: var(--md-green-dark);
        }

        .delivery-text .urgent {
          color: var(--md-accent-red);
        }

        .delivery-link {
          display: block;
          margin-top: 0.25rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .location-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-slate-500);
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--md-slate-100);
        }

        .stock-badge {
          color: var(--md-green-dark);
          font-size: 1.125rem;
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .shipping-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .shipping-row {
          display: flex;
          justify-content: space-between;
        }

        .shipping-label {
          color: var(--md-slate-500);
        }

        .shipping-value {
          color: var(--md-green-dark);
        }

        .quantity-select {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--md-slate-50);
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--md-slate-900);
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all var(--md-transition);
        }

        .quantity-select:focus {
          outline: none;
          border-color: var(--md-green-dark);
          box-shadow: 0 0 0 3px var(--md-green-light);
        }

        /* ============================================
           ACTION BUTTONS (Matching Home)
           ============================================ */
        .btn-cart,
        .btn-buy {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: var(--md-radius-2xl);
          font-size: 0.875rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          transition: all var(--md-transition);
          margin-bottom: 0.75rem;
        }

        .btn-cart {
          background: var(--md-green-bright);
          color: #000000;
          box-shadow: var(--md-shadow-lg);
        }

        .btn-cart:hover {
          transform: scale(1.03);
          box-shadow: var(--md-shadow-xl);
          background: #74E529;
        }

        .btn-buy {
          background: var(--md-slate-900);
          color: #FFFFFF;
          box-shadow: var(--md-shadow-lg);
          margin-bottom: 1.25rem;
        }

        .btn-buy:hover {
          transform: scale(1.03);
          box-shadow: var(--md-shadow-xl);
          background: var(--md-slate-800);
        }

        .gift-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--md-slate-500);
          margin-bottom: 1rem;
        }

        .gift-checkbox input[type="checkbox"] {
          accent-color: var(--md-green-dark);
          width: 1rem;
          height: 1rem;
        }

        .btn-wishlist {
          width: 100%;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 1rem;
          background: var(--md-slate-50);
          border: 2px solid var(--md-slate-100);
          border-radius: var(--md-radius-xl);
          cursor: pointer;
          transition: all var(--md-transition);
          color: var(--md-slate-600);
        }

        .btn-wishlist:hover {
          background: var(--md-green-light);
          border-color: var(--md-green-dark);
          color: var(--md-green-dark);
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 768px) {
          .product-main {
            padding-bottom: 3rem;
          }
          
          .product-info {
            border-right: none;
            border-bottom: 2px solid var(--md-slate-100);
            padding-bottom: 2rem;
          }
          
          .offers-grid {
            grid-template-columns: 1fr;
          }
          
          .buy-box {
            position: static;
          }
          
          .product-title {
            font-size: 1.5rem;
          }
          
          .current-price {
            font-size: 2rem;
          }
        }

        /* ============================================
           ACCESSIBILITY
           ============================================ */
        .product-page-container *:focus {
          outline: 3px solid var(--md-green-bright);
          outline-offset: 2px;
        }

        .product-page-container *:focus:not(:focus-visible) {
          outline: none;
        }

        .product-page-container *:focus-visible {
          outline: 3px solid var(--md-green-bright);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .product-page-container *,
          .product-page-container *::before,
          .product-page-container *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }


        
        .cart-notification-bar {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1100px;
          background: #131921; /* Dark theme to contrast your white page */
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cart-bar-content {
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cart-item-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-thumb {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 0.5rem;
          background: white;
        }

        .added-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cart-product-name {
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .cart-stats {
          display: flex;
          gap: 3rem;
          border-left: 1px solid rgba(255,255,255,0.1);
          border-right: 1px solid rgba(255,255,255,0.1);
          padding: 0 3rem;
        }

        .stat-group {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.65rem;
          color: #94A3B8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .stat-value {
          color: white;
          font-weight: 900;
          font-size: 1.25rem;
        }

        .stat-value.highlight {
          color: #64DD17;
          font-style: italic;
        }

        .cart-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .btn-close-bar {
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          text-transform: uppercase;
        }

        .btn-go-checkout {
          background: #64DD17;
          color: black;
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          font-weight: 900;
          font-size: 0.8rem;
          text-transform: uppercase;
          transition: transform 0.2s;
        }

        .btn-go-checkout:hover {
          transform: scale(1.05);
          color: black !important;
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .cart-bar-content { flex-direction: column; gap: 1rem; padding: 1.5rem; }
          .cart-stats { border: none; padding: 0; gap: 2rem; }
          .cart-actions { gap: 1rem; }
        }



        .quantity-stepper-container {
  margin-bottom: 1.5rem;
}

.quantity-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--md-slate-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.stepper-wrapper {
  display: flex;
  align-items: center;
  background: var(--md-slate-50);
  border: 2px solid var(--md-slate-100);
  border-radius: var(--md-radius-xl);
  overflow: hidden;
  padding: 0.25rem;
}

.stepper-btn {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: calc(var(--md-radius-xl) - 4px);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--md-slate-900);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.stepper-btn:hover {
  background: var(--md-green-light);
  color: var(--md-green-dark);
  transform: scale(0.95);
}

.stepper-btn:active {
  transform: scale(0.9);
}

.quantity-display {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.qty-number {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--md-slate-900);
  line-height: 1;
}

.qty-unit {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--md-slate-400);
  text-transform: uppercase;
}
      `}</style>

      <div className="product-page-container">
        {/* Navigation (Matching Home Page) */}
        <nav className="product-nav">
          <Link href="/" className="product-logo">MandiDirect 2.0</Link>
          <div className="product-nav-links">
            <a href="#">How it works</a>
            <a href="#">Market Prices</a>
            <a href="#">Support</a>
          </div>
          <div className="location-badge">📍 Navi Mumbai</div>
        </nav>

        {/* Breadcrumb */}
        <nav className="product-breadcrumb">
          <Link href="/marketplace">Marketplace</Link>
          {" › "} {product.variety} {" › "} {product.name}
        </nav>

        {/* Main Content */}
        <div className="product-main">
          
          {/* LEFT: Image Gallery */}
          <section className="product-gallery">
            <div className="thumbnail-strip">
              {product.gallery?.map((img, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveImg(i)}
                  className={`thumbnail-btn ${activeImg === i ? 'active' : ''}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} />
                </button>
              ))}
              <div className="thumbnail-video">
                <span>▶</span>
                <span>VIDEO</span>
              </div>
            </div>

            <div className="main-image-wrapper">
              <div className="main-image-container">
                <img src={product.gallery?.[activeImg]} alt={product.name} />
              </div>
              <p className="zoom-hint">Hover to zoom</p>
            </div>
          </section>

          {/* CENTER: Product Info */}
          <section className="product-info">
            <span className="product-badge">★ Mandi's Choice</span>
            
            <h1 className="product-title">
              {product.name} - {product.variety} {product.grade} Grade
            </h1>
            
            <Link href="#" className="farmer-link">
              Visit {product.farmer}'s Farm Store →
            </Link>

            <div className="product-ratings">
              <span className="rating-stars">★★★★☆ 4.0</span>
              <Link href="#" className="rating-count">505 ratings</Link>
            </div>

            <hr className="info-divider" />

            {/* Pricing Card */}
            <div className="pricing-section">
              <div className="deal-badge">
                <span>⚡</span> Limited Time Deal
              </div>
              <div className="price-row">
                <span className="discount-tag">-{discountPercent}%</span>
                <span className="current-price">
                  <span className="currency">₹</span>{product.price}
                </span>
              </div>
              <p className="mrp-text">
                M.R.P.: <span>₹{product.retailPrice}</span>
              </p>
              <p className="mrp-text" style={{ color: 'var(--md-green-dark)', marginTop: '0.5rem' }}>
                ✓ Inclusive of all taxes
              </p>
            </div>

            {/* Offers Card */}
            <div className="offers-card">
              <div className="offers-title">🎁 Available Offers</div>
              <div className="offers-grid">
                <div className="offer-item">
                  <strong>💰 Cashback</strong>
                  Get ₹14.00 back
                </div>
                <div className="offer-item">
                  <strong>🏦 Bank Offer</strong>
                  Upto ₹24.00 off
                </div>
                <div className="offer-item">
                  <strong>🤝 Partner</strong>
                  Save up to 10%
                </div>
              </div>
            </div>

            {/* Features Bar */}
            <div className="features-bar">
              {[
                { icon: "🔄", text: "10 Days Return" },
                { icon: "🚚", text: "Free Delivery" },
                { icon: "🛡️", text: "1 Year Warranty" },
                { icon: "💵", text: "Pay on Delivery" }
              ].map((feature, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: Buy Box */}
          <section className="buy-box-section">
            <div className="buy-box">
              <div className="buy-price">
                <span className="currency">₹</span>{product.price}
                <span className="currency" style={{ fontSize: '1rem' }}>.00</span>
              </div>
              
              <div className="delivery-text">
                <span className="free">✓ FREE delivery</span> by{' '}
                <strong>Saturday, 28 Feb</strong>. Order within{' '}
                <span className="urgent">49 mins</span>
                <Link href="#" className="delivery-link">View details →</Link>
              </div>

              <div className="location-row">
                <span>📍</span> Delivering to Navi Mumbai 400703
              </div>

              <h3 className="stock-badge">✓ In Stock</h3>

              <div className="shipping-details">
                <div className="shipping-row">
                  <span className="shipping-label">Ships from</span>
                  <span>MandiDirect</span>
                </div>
                <div className="shipping-row">
                  <span className="shipping-label">Sold by</span>
                  <span className="shipping-value">{product.farmer}</span>
                </div>
              </div>

              {/* Replace your current quantity select and buttons with this */}
<div className="quantity-stepper-container">
      <p className="quantity-label">Select Quantity</p>
      <div className="stepper-wrapper">
        <button 
          className="stepper-btn" 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        > − </button>
        <div className="quantity-display">
          <span className="qty-number">{quantity}</span>
          <span className="qty-unit">{'kg'}</span>
        </div>
        <button 
          className="stepper-btn" 
          onClick={() => setQuantity(quantity + 1)}
        > + </button>
      </div>
    </div>

    {/* ACTION BUTTONS */}
    <button className="btn-cart" onClick={() => setShowCartBar(true)}>
      🛒 Add to Cart
    </button>
    
    <button className="btn-buy" onClick={handleBuyNow}>
      ⚡ Buy Now
    </button>

              <div className="gift-checkbox">
                <input type="checkbox" id="gift-options" />
                <label htmlFor="gift-options">Add gift wrapping</label>
              </div>
              
              <button className="btn-wishlist">
                ♡ Add to Wish List
              </button>
            </div>
          </section>
        </div>
      </div>
      {showCartBar && (
  <div className="cart-notification-bar">
    <div className="cart-bar-content">
      <div className="cart-item-info">
        <img src={product.gallery[0]} className="cart-thumb" alt="thumb" />
        <div>
          <span className="added-label" style={{color: '#64DD17'}}>Added to Cart</span>
          <span className="cart-product-name">{product.name}</span>
        </div>
      </div>

      <div className="cart-stats">
        <div className="stat-group">
          <span className="stat-label">Qty</span>
          <span className="stat-value">{quantity}</span>
        </div>
        <div className="stat-group">
          <span className="stat-label">Subtotal</span>
          <span className="stat-value highlight">₹{(product.price * quantity).toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="btn-close-bar" onClick={() => setShowCartBar(false)}>Close</button>
        {/* We trigger handleBuyNow here to sync the data before moving */}
        <button className="btn-go-checkout" onClick={handleBuyNow}>
          Proceed to Checkout →
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}