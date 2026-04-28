import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CategoryNav() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <section className="categories-nav" id="catalogo">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Navegue por Categoria</span>
          <h2>Nosso Catálogo Completo</h2>
          <p>Explore nossa variedade de produtos organizados para facilitar suas compras</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/catalogo#${cat.slug}`} className="category-card">
              <div className="category-icon"><i className={`fas ${cat.icon}`}></i></div>
              <h3>{cat.title}</h3>
              <span className="category-count">{cat._count.products}+ itens</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
