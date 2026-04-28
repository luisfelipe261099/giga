import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div className="hero-badge"><i className="fas fa-truck-fast"></i> Somente Retirada ou Entrega</div>
            <h1>Distribuidora <span className="text-gradient">Giga Mix</span> em SJP</h1>
            <p>Atendimento exclusivo para retirada de pedidos agendados ou entregas. Perfumes importados, limpeza, calçados e ferramentas com o melhor preço da região.</p>
            <div className="hero-actions">
              <Link href="/catalogo" className="btn btn-primary btn-lg">
                <i className="fas fa-th-large"></i> Ver Catálogo
              </Link>
              <Link href="/paraguai" className="btn btn-outline btn-lg">
                <i className="fas fa-plane-departure"></i> Encomendas Paraguai
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>500+</strong>
                <span>Produtos na loja</span>
              </div>
              <div className="stat">
                <strong>9</strong>
                <span>Categorias</span>
              </div>
              <div className="stat">
                <strong>Seg-Sáb</strong>
                <span>08h às 18h</span>
              </div>
            </div>
          </div>

          <div className="hero-photo" aria-hidden="true">
            <div className="hero-photo-frame">
              <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80"
                   alt="Fachada da loja Giga Mix em São José dos Pinhais" />
              <div className="hero-photo-badge">
                <i className="fas fa-location-dot"></i>
                <div>
                  <strong>Jardim Fabiola</strong>
                  <span>São José dos Pinhais</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
