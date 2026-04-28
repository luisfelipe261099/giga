import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export default async function CatalogPage() {
  const categories = await prisma.category.findMany({
    include: {
      products: true
    }
  });

  return (
    <main className="catalog-page">
      <Header />
      
      <section className="catalog-hero">
        <div className="container">
          <div className="catalog-hero-inner">
            <div className="catalog-breadcrumb">
              <a href="/"><i className="fas fa-house"></i> Início</a>
              <i className="fas fa-chevron-right"></i>
              <span>Catálogo</span>
            </div>
            <h1>Catálogo <span className="text-gradient">Completo</span></h1>
            <p>Adicione produtos ao seu orçamento e finalize pelo WhatsApp.</p>
          </div>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat.id} className="product-section" id={cat.slug}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag"><i className={`fas ${cat.icon}`}></i> {cat.products.length} itens</span>
              <h2>{cat.title}</h2>
              <p>{cat.description}</p>
            </div>
            <div className="products-grid">
              {cat.products.map((product) => (
                <ProductCard key={product.id} product={product} gradient={cat.gradient || undefined} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
      
      <a href="https://wa.me/5541995278139" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </main>
  );
}
