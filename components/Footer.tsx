import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo" aria-label="Giga Mix">
              <div className="logo-icon">
                <span className="logo-g">G</span><span className="logo-iga">iga</span>
              </div>
              <span className="logo-express">MIX</span>
            </div>
            <p>Sua distribuidora completa com os melhores produtos e preços em São José dos Pinhais/PR.</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '12px' }}><i className="fas fa-location-dot"></i> Rua Thomaz Stonoga, 13 - Jardim Fabiola, SJP/PR</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '4px' }}><i className="fas fa-phone"></i> (41) 99527-8139</p>
          </div>
          <div className="footer-links">
            <h4>Navegação</h4>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="#visite">Visite a Loja</Link></li>
              <li><Link href="/catalogo">Catálogo Completo</Link></li>
              <li><Link href="#paraguai">Encomendas do Paraguai</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://wa.me/5541995278139" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Giga Mix - CNPJ 56.978.746/0001-29 - São José dos Pinhais/PR.</p>
        </div>
      </div>
    </footer>
  );
}
