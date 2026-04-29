'use client';

import { useState, useRef, useEffect } from 'react';

interface ProductFormProps {
  categories: any[];
  onSave: () => void;
  editProduct?: any | null;
  onCancelEdit?: () => void;
}

function compressImage(file: File, maxSize = 500, quality = 0.6): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProductForm({ categories, onSave, editProduct, onCancelEdit }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageData, setImageData] = useState<string>('');
  const [compressing, setCompressing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = !!editProduct;

  useEffect(() => {
    setImagePreview(editProduct?.image || '');
    setImageData(editProduct?.image || '');
  }, [editProduct]);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    try {
      const compressed = await compressImage(file);
      setImagePreview(compressed);
      setImageData(compressed);
    } catch {
      alert('Erro ao processar imagem. Tente outra.');
    } finally {
      setCompressing(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    data.image = imageData || '';
    if (isEdit) data.id = editProduct.id;

    try {
      const res = await fetch('/api/admin/products', {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        onSave();
        if (!isEdit) {
          (e.target as HTMLFormElement).reset();
          setImagePreview('');
          setImageData('');
        } else {
          onCancelEdit?.();
        }
      } else {
        alert('Erro ao salvar. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h3>{isEdit ? '✏️ Editar Produto' : '➕ Adicionar Produto'}</h3>

      <div className="form-group">
        <label>Nome do Produto</label>
        <input name="name" required placeholder="Ex: Perfume Malbec" defaultValue={editProduct?.name || ''} key={editProduct?.id + '-name'} />
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <textarea name="description" placeholder="Detalhes do produto..." defaultValue={editProduct?.description || ''} key={editProduct?.id + '-desc'} />
      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select name="categoryId" required defaultValue={editProduct?.categoryId || ''} key={editProduct?.id + '-cat'}>
          <option value="">Selecione...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Imagem do Produto</label>
        <div
          className={`image-upload-area ${compressing ? 'compressing' : ''}`}
          onClick={() => !compressing && fileRef.current?.click()}
        >
          {compressing ? (
            <div className="upload-placeholder">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Comprimindo imagem...</span>
            </div>
          ) : imagePreview ? (
            <img src={imagePreview} alt="Preview" />
          ) : (
            <div className="upload-placeholder">
              <i className="fas fa-cloud-upload-alt"></i>
              <span>Clique para enviar imagem</span>
              <small>Comprimida automaticamente • JPEG • Max 500px</small>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        {imagePreview && !compressing && (
          <button
            type="button"
            className="btn-remove-img"
            onClick={() => { setImagePreview(''); setImageData(''); if (fileRef.current) fileRef.current.value = ''; }}
          >
            <i className="fas fa-times"></i> Remover imagem
          </button>
        )}
      </div>

      <div className="form-group">
        <label>Emoji (Fallback sem imagem)</label>
        <input name="emoji" placeholder="📦" maxLength={2} defaultValue={editProduct?.emoji || ''} key={editProduct?.id + '-emoji'} />
      </div>

      <div className="form-row-btns">
        <button type="submit" className="btn btn-primary" disabled={loading || compressing}>
          {loading ? 'Salvando...' : isEdit ? 'Atualizar Produto' : 'Salvar Produto'}
        </button>
        {isEdit && (
          <button type="button" className="btn btn-outline" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

