'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cart from './Cart';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <span><i className="fas fa-truck-fast"></i> Somente Retirada ou Entrega</span>
            <span><i className="fas fa-clock"></i> Agendamento via WhatsApp</span>
            <span><i className="fas fa-map-marker-alt"></i> Jardim Fabiola, SJP/PR</span>
            <a href="tel:+5541995278139" className="top-bar-phone"><i className="fas fa-phone"></i> (41) 99527-8139</a>
          </div>
        </div>
      </div>

      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div className="container">
          <nav className="navbar">
            <Link href="/" className="logo" aria-label="Giga Mix - Página Inicial">
              <div className="logo-icon">
                <span className="logo-g">G</span><span className="logo-iga">iga</span>
              </div>
              <span className="logo-express">MIX</span>
            </Link>

            <div className="search-bar">
              <input type="text" placeholder="Buscar produtos..." aria-label="Buscar produtos no catálogo" />
              <button aria-label="Pesquisar"><i className="fas fa-search"></i></button>
            </div>

            <div className="nav-actions">
              <Link href="/paraguai" className="nav-link-paraguai">
                <i className="fas fa-plane-departure"></i> Paraguay
              </Link>
              <a href="https://wa.me/5541995278139" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                <span>Orçar Agora</span>
              </a>
              <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
                <span></span><span></span><span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      <Cart />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}><i className="fas fa-times"></i></button>
        </div>
        <nav className="mobile-nav">
          <Link href="#visite" onClick={() => setMenuOpen(false)}><i className="fas fa-store"></i> Visite Nossa Loja</Link>
          <Link href="/catalogo" onClick={() => setMenuOpen(false)}><i className="fas fa-boxes-stacked"></i> Catálogo Completo</Link>
          <Link href="#paraguai" onClick={() => setMenuOpen(false)}><i className="fas fa-plane-departure"></i> Encomendas do Paraguai</Link>
          <Link href="#contato" onClick={() => setMenuOpen(false)}><i className="fas fa-envelope"></i> Contato</Link>
        </nav>
      </div>
      <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>
    </>
  );
}
