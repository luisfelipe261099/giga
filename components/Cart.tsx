'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const number = '5541995278139';
    let message = 'Olá Giga Mix! Gostaria de fazer um pedido:\n\n';
    
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name}\n`;
    });
    
    message += `\nTotal de itens: ${totalItems}`;
    message += `\n\nComo funciona a retirada/entrega?`;
    
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (totalItems === 0) return null;

  return (
    <>
      <button className="cart-badge-btn" onClick={() => setIsOpen(true)}>
        <i className="fas fa-shopping-basket"></i>
        <span className="badge">{totalItems}</span>
      </button>

      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Meu Carrinho</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}><i className="fas fa-times"></i></button>
        </div>

        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <strong>{item.name}</strong>
                <span>Qtd: {item.quantity}</span>
              </div>
              <div className="item-actions">
                <button onClick={() => updateQuantity(item.id, -1)}><i className="fas fa-minus"></i></button>
                <button onClick={() => updateQuantity(item.id, 1)}><i className="fas fa-plus"></i></button>
                <button className="remove" onClick={() => removeFromCart(item.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <button className="btn btn-primary w-full" onClick={handleWhatsApp}>
            <i className="fab fa-whatsapp"></i> Finalizar Pedido
          </button>
          <button className="btn-clear" onClick={clearCart}>Limpar Carrinho</button>
        </div>
      </div>

      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

      <style jsx>{`
        .cart-badge-btn {
          position: fixed;
          bottom: 100px;
          right: 25px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--red-primary);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          transition: transform 0.3s;
        }
        .cart-badge-btn:hover { transform: scale(1.1); }
        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--dark);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border: 2px solid white;
        }

        .cart-sidebar {
          position: fixed;
          top: 0;
          right: -400px;
          width: 380px;
          max-width: 90vw;
          height: 100vh;
          background: white;
          z-index: 2100;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xl);
        }
        .cart-sidebar.active { right: 0; }
        
        .cart-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-100);
        }
        .item-info { display: flex; flex-direction: column; }
        .item-info strong { font-size: 0.95rem; }
        .item-info span { font-size: 0.8rem; color: var(--gray-500); }
        
        .item-actions { display: flex; gap: 0.5rem; align-items: center; }
        .item-actions button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid var(--gray-300);
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }
        .item-actions button.remove { color: var(--red-primary); border-color: var(--red-primary); }

        .cart-footer { padding: 1.5rem; border-top: 1px solid var(--gray-200); display: flex; flex-direction: column; gap: 0.5rem; }
        .btn-clear { background: none; border: none; font-size: 0.8rem; color: var(--gray-500); cursor: pointer; text-decoration: underline; }
        
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 2050;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
        }
        .cart-overlay.active { opacity: 1; visibility: visible; }
        .w-full { width: 100%; }
      `}</style>
    </>
  );
}
