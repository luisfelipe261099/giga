import Header from '@/components/Header';
import Footer from '@/components/Footer';

async function getDollarRate() {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL', { next: { revalidate: 3600 } });
    const data = await res.json();
    return parseFloat(data.USDBRL.bid).toFixed(2);
  } catch (error) {
    return '5.50'; // Fallback
  }
}

export default async function ParaguaiPage() {
  const dollarRate = await getDollarRate();

  return (
    <main className="paraguai-page">
      <Header />
      
      <section className="paraguai-hero-inner">
        <div className="container">
          <span className="section-tag"><i className="fas fa-plane-departure"></i> Encomendas Diretas</span>
          <h1>Compras no <span className="text-gradient">Paraguai</span></h1>
          <p>Trazemos sua encomenda com segurança e rapidez. Faça sua cotação agora.</p>
          
          <div className="dollar-card">
            <div className="dollar-info">
              <span className="label">Cotação do Dólar Hoje (Turismo/Comercial + Ref)</span>
              <div className="rate">R$ {dollarRate}</div>
              <span className="update"><i className="fas fa-sync"></i> Atualizado em tempo real</span>
            </div>
            <div className="dollar-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="paraguai-info">
        <div className="container">
          <div className="paraguai-info-grid">
            <div className="info-card">
              <i className="fas fa-shield-halved"></i>
              <h3>Segurança Total</h3>
              <p>Trabalhamos com seriedade e transparência em todas as encomendas.</p>
            </div>
            <div className="info-card">
              <i className="fas fa-truck-ramp-box"></i>
              <h3>Retirada em SJP</h3>
              <p>Você retira sua encomenda direto em nossa distribuidora no Jardim Fabiola.</p>
            </div>
            <div className="info-card">
              <i className="fas fa-tags"></i>
              <h3>Melhores Taxas</h3>
              <p>Cobramos uma taxa justa pelo serviço de transporte e importação.</p>
            </div>
          </div>

          <div className="paraguai-products">
            <h2>O que você pode encomendar</h2>
            <div className="paraguai-products-grid">
              <div className="paraguai-product-card">
                <span className="paraguai-product-icon">🌸</span>
                <h3>Perfumes</h3>
                <p>Fragrâncias importadas direto do Paraguai com preços especiais.</p>
              </div>
              <div className="paraguai-product-card">
                <span className="paraguai-product-icon">🛏️</span>
                <h3>Cobertas</h3>
                <p>Cobertas e mantas de qualidade com ótimo custo-benefício.</p>
              </div>
              <div className="paraguai-product-card">
                <span className="paraguai-product-icon">📱</span>
                <h3>Smartphones</h3>
                <p>Celulares e acessórios com preços abaixo do mercado nacional.</p>
              </div>
            </div>
          </div>

          <div className="paraguai-cta-box">
            <h2>Como fazer seu pedido?</h2>
            <ol className="steps">
              <li>Envie o link ou nome do produto que deseja no Paraguai.</li>
              <li>Nós faremos a cotação com base no preço do dia e nossa taxa.</li>
              <li>Você confirma o pedido e combina a retirada/entrega.</li>
            </ol>
            <a href="https://wa.me/5541995278139?text=Olá! Gostaria de fazer uma encomenda do Paraguai." className="btn btn-whatsapp-lg">
              <i className="fab fa-whatsapp"></i> Solicitar Cotação no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}
