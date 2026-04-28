export default function Visit() {
  return (
    <section className="visit-section" id="visite">
      <div className="container">
        <div className="visit-grid">
          <div className="visit-info">
            <span className="section-tag"><i className="fas fa-warehouse"></i> Retirada & Entrega</span>
            <h2>Pedidos via <span className="text-gradient">WhatsApp</span></h2>
            <p>Para sua segurança e comodidade, não atendemos para visitação sem agendamento. Realize seu orçamento pelo site e agende sua retirada ou solicite entrega em São José dos Pinhais e região.</p>

            <ul className="visit-list">
              <li><i className="fas fa-circle-check"></i> Orçamento rápido pelo WhatsApp</li>
              <li><i className="fas fa-circle-check"></i> Retirada agendada (Jardim Fabiola)</li>
              <li><i className="fas fa-circle-check"></i> Entregas em toda a região</li>
              <li><i className="fas fa-circle-check"></i> Preços de atacado direto</li>
            </ul>

            <div className="visit-details">
              <div className="visit-detail">
                <div className="visit-detail-icon"><i className="fas fa-location-dot"></i></div>
                <div>
                  <strong>Endereço</strong>
                  <span>Rua Thomaz Stonoga, 13 — Jardim Fabiola<br />São José dos Pinhais - PR</span>
                </div>
              </div>
              <div className="visit-detail">
                <div className="visit-detail-icon"><i className="fas fa-clock"></i></div>
                <div>
                  <strong>Horário de funcionamento</strong>
                  <span>Segunda a Sábado — 08h às 18h</span>
                </div>
              </div>
            </div>

            <div className="visit-actions">
              <a href="https://www.google.com/maps/dir/?api=1&destination=Rua+Thomaz+Stonoga+13+Jardim+Fabiola+S%C3%A3o+Jos%C3%A9+dos+Pinhais+PR" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-route"></i> Traçar Rota
              </a>
              <a href="https://wa.me/5541995278139" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="visit-map">
            <iframe
              src="https://www.google.com/maps?q=Rua+Thomaz+Stonoga+13+Jardim+Fabiola+S%C3%A3o+Jos%C3%A9+dos+Pinhais+PR&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Giga Mix no Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
