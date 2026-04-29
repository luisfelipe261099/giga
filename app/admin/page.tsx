'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';

const PAGE_SIZE = 10;

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((r) => r.json())
      .then((d) => {
        setAuthenticated(d.authenticated);
        if (d.authenticated) fetchData();
      });
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/products'),
      ]);
      setCategories(await catsRes.json());
      setProducts(await prodsRes.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      });
      if (res.ok) {
        setAuthenticated(true);
        fetchData();
      } else {
        const d = await res.json();
        setLoginError(d.error || 'Erro ao fazer login');
      }
    } catch {
      setLoginError('Erro de conexão');
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setProducts([]);
    setCategories([]);
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

  function handleEdit(prod: any) {
    setEditProduct(prod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const filtered = (products as any[]).filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.title?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (authenticated === null) {
    return (
      <div className="admin-splash">
        <i className="fas fa-spinner fa-spin"></i>
        <span>Verificando sessão...</span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <div className="login-icon-wrap"><i className="fas fa-lock"></i></div>
            <h1>Giga Mix</h1>
            <p>Painel Administrativo</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Usuário</label>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <div className="input-pass-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button type="button" className="btn-toggle-pass" onClick={() => setShowPass((v) => !v)}>
                  <i className={`fas fa-eye${showPass ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>
            {loginError && <p className="login-error"><i className="fas fa-exclamation-circle"></i> {loginError}</p>}
            <button type="submit" className="btn btn-primary btn-full" disabled={loginLoading}>
              {loginLoading ? <><i className="fas fa-spinner fa-spin"></i> Entrando...</> : 'Entrar'}
            </button>
          </form>
          <a href="/" className="login-back-link"><i className="fas fa-arrow-left"></i> Voltar ao site</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <h1><i className="fas fa-cog"></i> Painel Admin — Giga Mix</h1>
          <div className="admin-header-actions">
            <a href="/" className="btn btn-outline btn-sm">
              <i className="fas fa-home"></i> Site
            </a>
            <button onClick={handleLogout} className="btn-logout">
              <i className="fas fa-sign-out-alt"></i> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="admin-grid">
          <div className="admin-sidebar">
            <ProductForm
              categories={categories}
              onSave={() => { fetchData(); setEditProduct(null); }}
              editProduct={editProduct}
              onCancelEdit={() => setEditProduct(null)}
            />
          </div>

          <div className="admin-main">
            <div className="admin-toolbar">
              <h3 className="admin-toolbar-title">
                Produtos
                <span className="admin-count">{filtered.length}</span>
              </h3>
              <div className="admin-search-wrap">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Buscar por nome ou categoria..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
                {search && (
                  <button className="search-clear" onClick={() => { setSearch(''); setPage(1); }}>
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="admin-loading-inner">
                <i className="fas fa-spinner fa-spin"></i> Carregando...
              </div>
            ) : (
              <>
                <div className="admin-products-list">
                  {paginated.length === 0 ? (
                    <div className="admin-empty">
                      <i className="fas fa-box-open"></i>
                      <p>Nenhum produto encontrado.</p>
                    </div>
                  ) : (
                    paginated.map((prod: any) => (
                      <div key={prod.id} className={`admin-product-item ${editProduct?.id === prod.id ? 'editing' : ''}`}>
                        <div className="prod-img" style={{ background: prod.category?.gradient || '#eee' }}>
                          {prod.image ? <img src={prod.image} alt={prod.name} /> : prod.emoji}
                        </div>
                        <div className="prod-details">
                          <strong>{prod.name}</strong>
                          <span>{prod.category?.title}</span>
                        </div>
                        <div className="prod-actions">
                          <button onClick={() => handleEdit(prod)} className="btn-edit" title="Editar">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button onClick={() => handleDelete(prod.id)} className="btn-delete" title="Excluir">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="admin-pagination">
                    <button
                      className="btn-page"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        className={`btn-page ${page === n ? 'active' : ''}`}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      className="btn-page"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

