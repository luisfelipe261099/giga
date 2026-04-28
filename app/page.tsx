import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Visit from '@/components/Visit';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Visit />
      <CategoryNav />
      
      {/* Featured CTA */}
      <section className="catalog-cta">
        <div className="container">
          <div className="catalog-cta-inner">
            <div className="catalog-cta-text">
              <span className="section-tag"><i className="fas fa-boxes-stacked"></i> Marketplace</span>
              <h2>Veja nosso <span className="text-gradient">catálogo completo</span></h2>
              <p>Mais de 500 produtos organizados em categorias. Navegue, filtre e consulte o que precisar direto pelo WhatsApp.</p>
            </div>
            <a href="/catalogo" className="btn btn-primary btn-lg">
              <i className="fas fa-arrow-right"></i> Ver Catálogo Completo
            </a>
          </div>
        </div>
      </section>

      {/* Paraguai Section */}
      <section className="paraguai-section" id="paraguai">
        <div className="paraguai-bg"></div>
        <div className="container">
          <div className="paraguai-grid">
            <div className="paraguai-content">
              <span className="paraguai-tag"><i className="fas fa-plane-departure"></i> Serviço Adicional</span>
              <h2>Também fazemos encomendas do <span className="paraguai-highlight">Paraguai</span></h2>
              <p className="paraguai-lead">Além da nossa loja física, trazemos produtos e encomendas do Paraguai para você.</p>
              <div className="paraguai-cta">
                <a href="https://wa.me/5541995278139" className="btn btn-whatsapp-lg" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> Fazer Encomenda pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* WhatsApp Float */}
      <a href="https://wa.me/5541995278139" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </main>
  );
}
