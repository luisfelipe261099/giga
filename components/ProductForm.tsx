'use client';

import { useState } from 'react';

export default function ProductForm({ categories, onSave }: { categories: any[], onSave: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        onSave();
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3>Adicionar Novo Produto</h3>
      <div className="form-group">
        <label>Nome do Produto</label>
        <input name="name" required placeholder="Ex: Perfume Malbec" />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <textarea name="description" placeholder="Detalhes do produto..." />
      </div>
      <div className="form-group">
        <label>Categoria</label>
        <select name="categoryId" required>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>URL da Imagem (Opcional)</label>
        <input name="image" placeholder="https://..." />
      </div>
      <div className="form-group">
        <label>Emoji (Fallback)</label>
        <input name="emoji" placeholder="📦" maxLength={2} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar Produto'}
      </button>

    </form>
  );
}
