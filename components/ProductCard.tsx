'use client';

import { useCart } from '@/context/CartContext';

type Product = {
  id: string;
  name: string;
  description?: string;
  emoji?: string;
  image?: string;
};

export default function ProductCard({ product, gradient }: { product: any, gradient?: string }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-img" style={{ background: gradient || 'var(--red-bg)' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span className="product-emoji">{product.emoji}</span>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <button className="btn btn-sm btn-primary" onClick={() => addToCart(product)}>
            <i className="fas fa-cart-plus"></i> Adicionar
          </button>
          <a href={`https://wa.me/5541995278139?text=Olá! Tenho interesse em ${product.name}`} className="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i> Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
