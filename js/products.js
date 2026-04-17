/* ============================================
   GIGA Express - Base de dados de Produtos
   Cada produto tem: name, desc, emoji (fallback), img (URL opcional)
   Se a imagem falhar, mostramos o emoji sobre o gradiente da categoria.
   ============================================ */

const WHATSAPP_NUMBER = '5541995278139';

function waLink(productName) {
    const msg = `Olá! Tenho interesse em ${productName} e gostaria de mais informações.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Helper para gerar URL do Unsplash (trocável por fotos da loja)
const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

const CATEGORIES = [
    {
        id: 'perfumes',
        icon: 'fa-spray-can-sparkles',
        title: 'Perfumes & Cosméticos',
        description: 'Fragrâncias importadas e nacionais, cosméticos e cuidados pessoais premium',
        gradient: 'linear-gradient(135deg, #F8BBD0 0%, #CE93D8 100%)',
        products: [
            { name: 'Perfumes Árabes Premium', desc: 'Fragrâncias árabes exclusivas e duradouras', emoji: '🕌', img: U('1592945403244-b3fbafd7f539') },
            { name: 'Perfumes Importados', desc: 'Armaf, Lattafa e outras marcas internacionais', emoji: '💎', img: U('1541643600914-78b084683601') },
            { name: 'Body Splash', desc: 'Aromas refrescantes para o dia a dia', emoji: '🌸', img: U('1615375729003-4c8b27b2c4e4') },
            { name: 'Kits de Perfumes', desc: 'Caixas especiais ideais para presente', emoji: '🎁', img: U('1549298916-b41d501d3772') },
            { name: 'Perfumes Roll-on (Óleo)', desc: 'Fragrâncias concentradas em óleo', emoji: '💧', img: U('1563170351-be82bc888aa4') },
            { name: 'Desodorantes Spray', desc: 'Proteção e frescor durante todo o dia', emoji: '🌬️', img: U('1585751119414-ef2636f8aede') },
            { name: 'Hidratantes Corporais', desc: 'Hidratação profunda e pele macia', emoji: '🧴', img: U('1556228720-195a672e8a03') },
            { name: 'Cremes Corporais', desc: 'Cremes nutritivos para cuidados diários', emoji: '🪞', img: U('1570194065650-d99fb4bedf0a') },
            { name: 'Máscaras Capilares', desc: 'Tratamento intensivo para cabelos', emoji: '💆', img: U('1522337360788-8b13dee7a37e') },
            { name: 'Shampoos', desc: 'Seda, Skala e outras marcas', emoji: '🧴', img: U('1556228453-efd6c1ff04f6') },
            { name: 'Condicionadores', desc: 'Para todos os tipos de cabelo', emoji: '💁', img: U('1526045431048-f857369baa09') },
            { name: 'Óleos Capilares', desc: 'Nutrição e brilho intenso', emoji: '✨', img: U('1608248543803-ba4f8c70ae0b') },
            { name: 'Produtos Infantis', desc: 'Linha completa para bebês', emoji: '👶', img: U('1596733430284-f7437764b1a9') }
        ]
    },
    {
        id: 'higiene',
        icon: 'fa-pump-soap',
        title: 'Higiene Pessoal',
        description: 'Produtos essenciais para o cuidado diário de toda a família',
        gradient: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)',
        products: [
            { name: 'Sabonetes Líquidos', desc: 'Limpeza suave em diversas fragrâncias', emoji: '🧼', img: U('1585325701956-60dd9c8553bc') },
            { name: 'Sabonetes Infantis', desc: 'Fórmulas delicadas para bebês', emoji: '🍼', img: U('1515488825956-39b91ff19d64') },
            { name: 'Shampoo Infantil', desc: 'Shampoos suaves que não ardem', emoji: '👶', img: U('1596733430284-f7437764b1a9') },
            { name: 'Creme Dental', desc: 'Colgate e outras marcas - proteção completa', emoji: '🦷', img: U('1559591935-c6f3e3f1e7df') },
            { name: 'Enxaguante Bucal', desc: 'Frescor e proteção contra bactérias', emoji: '😁', img: U('1609840114035-3c981b782dfe') },
            { name: 'Desodorantes', desc: 'Roll-on e spray - proteção 48h', emoji: '🧴', img: U('1585751119414-ef2636f8aede') },
            { name: 'Produtos Masculinos', desc: 'Nivea Men e outros cuidados', emoji: '🧔', img: U('1621607512214-68297480165e') }
        ]
    },
    {
        id: 'limpeza',
        icon: 'fa-broom',
        title: 'Limpeza Doméstica',
        description: 'Tudo para manter sua casa impecável e perfumada',
        gradient: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
        products: [
            { name: 'Detergente Líquido', desc: 'Galão e tamanho pequeno - poder concentrado', emoji: '🧴', img: U('1583947215259-38e31be8751f') },
            { name: 'Amaciante de Roupas', desc: 'Maciez e perfume duradouro', emoji: '🌺', img: U('1610557892470-55d9e80c0bce') },
            { name: 'Sabão Líquido', desc: 'Limpeza profunda para superfícies', emoji: '🫧', img: U('1558618666-fcd25c85cd64') },
            { name: 'Sabão em Pó', desc: 'Remoção eficaz de manchas difíceis', emoji: '📦', img: U('1582735689369-4fe89db7114c') },
            { name: 'Água Sanitária', desc: 'Desinfecção e branqueamento', emoji: '🧪', img: U('1585421514738-01798e348b17') },
            { name: 'Desinfetante', desc: 'Elimina 99,9% das bactérias', emoji: '🛡️', img: U('1584515933487-779824d29309') },
            { name: 'Limpador Multiuso', desc: 'Limpa todas as superfícies', emoji: '🧽', img: U('1527515637462-cff94eecc1ac') },
            { name: 'Limpa Piso', desc: 'Brilho e perfume para pisos', emoji: '🧹', img: U('1581578731548-c64695cc6952') },
            { name: 'Limpa Vidro', desc: 'Vidros cristalinos sem manchas', emoji: '🪟', img: U('1563453392212-326f5e854473') },
            { name: 'Limpa Grelha', desc: 'Remove gordura pesada', emoji: '🔥', img: U('1534723452862-4c874018d66d') },
            { name: 'Álcool', desc: 'Limpeza e higienização', emoji: '🧫', img: U('1584744982491-665216d95f8b') },
            { name: 'Cera Líquida', desc: 'Brilho duradouro para pisos', emoji: '✨', img: U('1628177142898-93e36e4e3a50') },
            { name: 'Removedores', desc: 'Remove manchas e sujeiras pesadas', emoji: '🧴', img: U('1610557892470-55d9e80c0bce') }
        ]
    },
    {
        id: 'profissional',
        icon: 'fa-jug-detergent',
        title: 'Produtos Profissionais (Galão)',
        description: 'Produtos em grande volume para uso profissional e comercial',
        gradient: 'linear-gradient(135deg, #B2DFDB 0%, #4DB6AC 100%)',
        products: [
            { name: 'Lava Roupas (Galão)', desc: 'Galão para uso profissional', emoji: '🧺', img: U('1610557892470-55d9e80c0bce') },
            { name: 'Amaciante Concentrado', desc: 'Rendimento extra concentrado', emoji: '🌿', img: U('1582735689369-4fe89db7114c') },
            { name: 'Detergente Profissional', desc: 'Alto poder de limpeza', emoji: '🫗', img: U('1583947215259-38e31be8751f') },
            { name: 'Produtos Tróppel', desc: 'Linha Tróppel profissional', emoji: '🧪', img: U('1585421514738-01798e348b17') },
            { name: 'Produtos Sunny', desc: 'Linha Sunny de limpeza', emoji: '☀️', img: U('1527515637462-cff94eecc1ac') },
            { name: 'Limpeza Pesada', desc: 'Limpeza industrial e pesada', emoji: '🏭', img: U('1558618666-fcd25c85cd64') },
            { name: 'Galões de Químicos', desc: 'Químicos diversos em volume', emoji: '🛢️', img: U('1585421514738-01798e348b17') }
        ]
    },
    {
        id: 'descartaveis',
        icon: 'fa-toilet-paper',
        title: 'Descartáveis & Utilidades',
        description: 'Itens essenciais que não podem faltar no dia a dia',
        gradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFAB91 100%)',
        products: [
            { name: 'Papel Higiênico', desc: 'Diversas marcas e metragens', emoji: '🧻', img: U('1584515933487-779824d29309') },
            { name: 'Papel Toalha', desc: 'Alta absorção para uso geral', emoji: '📜', img: U('1585421514284-efb74c2b69ba') },
            { name: 'Guardanapos', desc: 'Para mesas e eventos', emoji: '🍽️', img: U('1567521464027-f127ff144326') },
            { name: 'Embalagens e Sacos Plásticos', desc: 'Diversos tamanhos', emoji: '🛍️', img: U('1597348989645-46b190ce4918') },
            { name: 'Panos de Limpeza', desc: 'Panos multiuso de qualidade', emoji: '🧽', img: U('1527515637462-cff94eecc1ac') },
            { name: 'Flanelas', desc: 'Para polimento e limpeza fina', emoji: '🟨', img: U('1581578731548-c64695cc6952') }
        ]
    },
    {
        id: 'calcados',
        icon: 'fa-shoe-prints',
        title: 'Calçados',
        description: 'Chinelos e calçados para toda a família com os melhores preços',
        gradient: 'linear-gradient(135deg, #FFCCBC 0%, #FF8A65 100%)',
        products: [
            { name: 'Chinelos Masculinos', desc: 'Conforto e estilo para o dia a dia', emoji: '🩴', img: U('1603487742131-4160ec999306') },
            { name: 'Chinelos Femininos', desc: 'Modelos modernos e confortáveis', emoji: '👡', img: U('1596702876760-0dc9d21ec37b') },
            { name: 'Chinelos Infantis', desc: 'Diversão e conforto para os pequenos', emoji: '👟', img: U('1514989940723-e8e51635b782') },
            { name: 'Havaianas e Similares', desc: 'As marcas mais queridas do Brasil', emoji: '🏖️', img: U('1560343090-f0409e92791a') }
        ]
    },
    {
        id: 'automotivo',
        icon: 'fa-car',
        title: 'Automotivo',
        description: 'Produtos essenciais para manutenção e cuidados com seu veículo',
        gradient: 'linear-gradient(135deg, #CFD8DC 0%, #78909C 100%)',
        products: [
            { name: 'Óleo de Motor', desc: 'Lubrax e outras marcas', emoji: '🛢️', img: U('1486262715619-67b85e0b08d3') },
            { name: 'Aditivos', desc: 'Para radiador e combustível', emoji: '⛽', img: U('1545459720-aac8509eb02c') },
            { name: 'Fluídos Automotivos', desc: 'Freio, direção hidráulica e mais', emoji: '💧', img: U('1632823471565-1ecdf7e1f6f6') },
            { name: 'Spray Automotivo', desc: 'Sprays técnicos para manutenção', emoji: '🧴', img: U('1607082349566-187342175e2f') },
            { name: 'Limpa Pneus', desc: 'Brilho e proteção para pneus', emoji: '⚙️', img: U('1580273916550-e323be2ae537') },
            { name: 'Limpeza Automotiva', desc: 'Shampoo automotivo, cera e polidores', emoji: '🚗', img: U('1607860108855-64acf2078ed9') }
        ]
    },
    {
        id: 'ferramentas',
        icon: 'fa-wrench',
        title: 'Ferramentas & Utilidades',
        description: 'Tudo para manutenção e reparos no seu dia a dia',
        gradient: 'linear-gradient(135deg, #FFE082 0%, #FFB300 100%)',
        products: [
            { name: 'Jogo de Chave Allen', desc: 'Kit completo em aço de qualidade', emoji: '🔧', img: U('1581092160607-ee22621dd758') },
            { name: 'Ferramentas Diversas', desc: 'Alicates, chaves, martelos e mais', emoji: '🧰', img: U('1530124566582-a618bc2615dc') },
            { name: 'Serra Policorte', desc: 'Cortes precisos em diversos materiais', emoji: '🪚', img: U('1581783898377-1c85bf937427') },
            { name: 'Lixas', desc: 'Diversas granulações', emoji: '📄', img: U('1572981779307-38b8cabb2407') },
            { name: 'Parafusos', desc: 'Diversos tipos e tamanhos', emoji: '🔩', img: U('1609205807107-454f1c407ccd') },
            { name: 'Itens de Manutenção', desc: 'Peças e acessórios gerais', emoji: '⚙️', img: U('1504148455328-c376907d081c') }
        ]
    },
    {
        id: 'outros',
        icon: 'fa-box-open',
        title: 'Outros Produtos',
        description: 'Produtos diversos para necessidades específicas',
        gradient: 'linear-gradient(135deg, #D1C4E9 0%, #9575CD 100%)',
        products: [
            { name: 'Inseticidas', desc: 'Proteção contra insetos', emoji: '🦟', img: U('1607082349566-187342175e2f') },
            { name: 'Aerosóis Diversos', desc: 'Sprays multiuso para aplicações', emoji: '💨', img: U('1585751119414-ef2636f8aede') },
            { name: 'Produtos Químicos', desc: 'Limpadores específicos', emoji: '⚗️', img: U('1585421514738-01798e348b17') }
        ]
    }
];

/* ============================================
   Renderização
   ============================================ */

function renderProductCard(product, categoryGradient) {
    const hasImg = !!product.img;
    const imgHtml = hasImg
        ? `<img src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.parentElement.classList.add('img-failed'); this.remove();">`
        : '';

    return `
        <article class="product-card">
            <div class="product-img product-img-emoji" style="background: ${categoryGradient};">
                ${imgHtml}
                <span class="product-emoji">${product.emoji}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <a href="${waLink(product.name)}" class="btn btn-sm btn-product" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i> Consultar
                </a>
            </div>
        </article>
    `;
}

function renderCategorySection(category, limit) {
    const items = typeof limit === 'number' ? category.products.slice(0, limit) : category.products;
    const seeAll = typeof limit === 'number' && category.products.length > limit
        ? `<div class="section-more">
               <a href="catalogo.html#${category.id}" class="btn btn-outline">
                   Ver todos os ${category.products.length} produtos em ${category.title} <i class="fas fa-arrow-right"></i>
               </a>
           </div>`
        : '';

    return `
        <section class="product-section" id="${category.id}" data-category="${category.id}">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag"><i class="fas ${category.icon}"></i> ${category.products.length} itens</span>
                    <h2>${category.title}</h2>
                    <p>${category.description}</p>
                </div>
                <div class="products-grid">
                    ${items.map(p => renderProductCard(p, category.gradient)).join('')}
                </div>
                ${seeAll}
            </div>
        </section>
    `;
}

function renderAllCategories(container, limit) {
    if (!container) return;
    container.innerHTML = CATEGORIES.map((cat, i) => {
        const html = renderCategorySection(cat, limit);
        return i % 2 === 1
            ? html.replace('<section class="product-section"', '<section class="product-section section-alt"')
            : html;
    }).join('');
}

window.GIGA_PRODUCTS = { CATEGORIES, renderAllCategories, renderProductCard, renderCategorySection };
