'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/products')
      ]);
      const cats = await catsRes.json();
      const prods = await prodsRes.json();
      setCategories(cats);
      setProducts(prods);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="container">
          <h1>Painel Administrativo - Giga Mix</h1>
          <a href="/" className="btn btn-outline btn-sm">Voltar ao Site</a>
        </div>
      </header>

      <main className="container">
        <div className="admin-grid">
          <div className="admin-sidebar">
            <ProductForm categories={categories} onSave={fetchData} />
          </div>

          <div className="admin-main">
            <h3>Produtos Atuais ({products.length})</h3>
            {loading ? (
              <p>Carregando produtos...</p>
            ) : (
              <div className="admin-products-list">
                {products.map((prod: any) => (
                  <div key={prod.id} className="admin-product-item">
                    <div className="prod-img" style={{ background: prod.category.gradient }}>
                      {prod.image ? <img src={prod.image} alt={prod.name} /> : prod.emoji}
                    </div>
                    <div className="prod-details">
                      <strong>{prod.name}</strong>
                      <span>{prod.category.title}</span>
                    </div>
                    <button onClick={() => handleDelete(prod.id)} className="btn-delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
