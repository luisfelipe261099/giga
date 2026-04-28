import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    id: 'perfumes',
    slug: 'perfumes',
    icon: 'fa-spray-can-sparkles',
    title: 'Perfumes & Cosméticos',
    description: 'Fragrâncias importadas e nacionais, cosméticos e cuidados pessoais premium',
    gradient: 'linear-gradient(135deg, #F8BBD0 0%, #CE93D8 100%)',
    products: [
      { name: 'Perfumes Árabes Premium', description: 'Fragrâncias árabes exclusivas e duradouras', emoji: '🕌', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80' },
      { name: 'Perfumes Importados', description: 'Armaf, Lattafa e outras marcas internacionais', emoji: '💎', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80' },
      { name: 'Body Splash', description: 'Aromas refrescantes para o dia a dia', emoji: '🌸', image: 'https://images.unsplash.com/photo-1615375729003-4c8b27b2c4e4?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kits de Perfumes', description: 'Caixas especiais ideais para presente', emoji: '🎁', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' },
      { name: 'Perfumes Roll-on (Óleo)', description: 'Fragrâncias concentradas em óleo', emoji: '💧', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=600&q=80' },
      { name: 'Desodorantes Spray', description: 'Proteção e frescor durante todo o dia', emoji: '🌬️', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=600&q=80' },
      { name: 'Hidratantes Corporais', description: 'Hidratação profunda e pele macia', emoji: '🧴', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80' },
      { name: 'Cremes Corporais', description: 'Cremes nutritivos para cuidados diários', emoji: '🪞', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=600&q=80' },
      { name: 'Máscaras Capilares', description: 'Tratamento intensivo para cabelos', emoji: '💆', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shampoos', description: 'Seda, Skala e outras marcas', emoji: '🧴', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=600&q=80' },
      { name: 'Condicionadores', description: 'Para todos os tipos de cabelo', emoji: '💁', image: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=600&q=80' },
      { name: 'Óleos Capilares', description: 'Nutrição e brilho intenso', emoji: '✨', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Produtos Infantis', description: 'Linha completa para bebês', emoji: '👶', image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'higiene',
    slug: 'higiene',
    icon: 'fa-pump-soap',
    title: 'Higiene Pessoal',
    description: 'Produtos essenciais para o cuidado diário de toda a família',
    gradient: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 100%)',
    products: [
      { name: 'Sabonetes Líquidos', description: 'Limpeza suave em diversas fragrâncias', emoji: '🧼', image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sabonetes Infantis', description: 'Fórmulas delicadas para bebês', emoji: '🍼', image: 'https://images.unsplash.com/photo-1515488825956-39b91ff19d64?auto=format&fit=crop&w=600&q=80' },
      { name: 'Shampoo Infantil', description: 'Shampoos suaves que não ardem', emoji: '👶', image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=600&q=80' },
      { name: 'Creme Dental', description: 'Colgate e outras marcas - proteção completa', emoji: '🦷', image: 'https://images.unsplash.com/photo-1559591935-c6f3e3f1e7df?auto=format&fit=crop&w=600&q=80' },
      { name: 'Enxaguante Bucal', description: 'Frescor e proteção contra bactérias', emoji: '😁', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80' },
      { name: 'Desodorantes', description: 'Roll-on e spray - proteção 48h', emoji: '🧴', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=600&q=80' },
      { name: 'Produtos Masculinos', description: 'Nivea Men e outros cuidados', emoji: '🧔', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'limpeza',
    slug: 'limpeza',
    icon: 'fa-broom',
    title: 'Limpeza Doméstica',
    description: 'Tudo para manter sua casa impecável e perfumada',
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #81C784 100%)',
    products: [
      { name: 'Detergente Líquido', description: 'Galão e tamanho pequeno - poder concentrado', emoji: '🧴', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Amaciante de Roupas', description: 'Maciez e perfume duradouro', emoji: '🌺', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sabão Líquido', description: 'Limpeza profunda para superfícies', emoji: '🫧', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' },
      { name: 'Sabão em Pó', description: 'Remoção eficaz de manchas difíceis', emoji: '📦', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Água Sanitária', description: 'Desinfecção e branqueamento', emoji: '🧪', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80' },
      { name: 'Desinfetante', description: 'Elimina 99,9% das bactérias', emoji: '🛡️', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpador Multiuso', description: 'Limpa todas as superfícies', emoji: '🧽', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpa Piso', description: 'Brilho e perfume para pisos', emoji: '🧹', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpa Vidro', description: 'Vidros cristalinos sem manchas', emoji: '🪟', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpa Grelha', description: 'Remove gordura pesada', emoji: '🔥', image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Álcool', description: 'Limpeza e higienização', emoji: '🧫', image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Cera Líquida', description: 'Brilho duradouro para pisos', emoji: '✨', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80' },
      { name: 'Removedores', description: 'Remove manchas e sujeiras pesadas', emoji: '🧴', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'profissional',
    slug: 'profissional',
    icon: 'fa-jug-detergent',
    title: 'Produtos Profissionais (Galão)',
    description: 'Produtos em grande volume para uso profissional e comercial',
    gradient: 'linear-gradient(135deg, #B2DFDB 0%, #4DB6AC 100%)',
    products: [
      { name: 'Lava Roupas (Galão)', description: 'Galão para uso profissional', emoji: '🧺', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80' },
      { name: 'Amaciante Concentrado', description: 'Rendimento extra concentrado', emoji: '🌿', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Detergente Profissional', description: 'Alto poder de limpeza', emoji: '🫗', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Produtos Tróppel', description: 'Linha Tróppel profissional', emoji: '🧪', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80' },
      { name: 'Produtos Sunny', description: 'Linha Sunny de limpeza', emoji: '☀️', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpeza Pesada', description: 'Limpeza industrial e pesada', emoji: '🏭', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' },
      { name: 'Galões de Químicos', description: 'Químicos diversos em volume', emoji: '🛢️', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'descartaveis',
    slug: 'descartaveis',
    icon: 'fa-toilet-paper',
    title: 'Descartáveis & Utilidades',
    description: 'Itens essenciais que não podem faltar no dia a dia',
    gradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFAB91 100%)',
    products: [
      { name: 'Papel Higiênico', description: 'Diversas marcas e metragens', emoji: '🧻', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80' },
      { name: 'Papel Toalha', description: 'Alta absorção para uso geral', emoji: '📜', image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80' },
      { name: 'Guardanapos', description: 'Para mesas e eventos', emoji: '🍽️', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80' },
      { name: 'Embalagens e Sacos Plásticos', description: 'Diversos tamanhos', emoji: '🛍️', image: 'https://images.unsplash.com/photo-1597348989645-46b190ce4918?auto=format&fit=crop&w=600&q=80' },
      { name: 'Panos de Limpeza', description: 'Panos multiuso de qualidade', emoji: '🧽', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80' },
      { name: 'Flanelas', description: 'Para polimento e limpeza fina', emoji: '🟨', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'calcados',
    slug: 'calcados',
    icon: 'fa-shoe-prints',
    title: 'Calçados',
    description: 'Chinelos e calçados para toda a família com os melhores preços',
    gradient: 'linear-gradient(135deg, #FFCCBC 0%, #FF8A65 100%)',
    products: [
      { name: 'Chinelos Masculinos', description: 'Conforto e estilo para o dia a dia', emoji: '🩴', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chinelos Femininos', description: 'Modelos modernos e confortáveis', emoji: '👡', image: 'https://images.unsplash.com/photo-1596702876760-0dc9d21ec37b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Chinelos Infantis', description: 'Diversão e conforto para os pequenos', emoji: '👟', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80' },
      { name: 'Havaianas e Similares', description: 'As marcas mais queridas do Brasil', emoji: '🏖️', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'automotivo',
    slug: 'automotivo',
    icon: 'fa-car',
    title: 'Automotivo',
    description: 'Produtos essenciais para manutenção e cuidados com seu veículo',
    gradient: 'linear-gradient(135deg, #CFD8DC 0%, #78909C 100%)',
    products: [
      { name: 'Óleo de Motor', description: 'Lubrax e outras marcas', emoji: '🛢️', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80' },
      { name: 'Aditivos', description: 'Para radiador e combustível', emoji: '⛽', image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Fluídos Automotivos', description: 'Freio, direção hidráulica e mais', emoji: '💧', image: 'https://images.unsplash.com/photo-1632823471565-1ecdf7e1f6f6?auto=format&fit=crop&w=600&q=80' },
      { name: 'Spray Automotivo', description: 'Sprays técnicos para manutenção', emoji: '🧴', image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpa Pneus', description: 'Brilho e proteção para pneus', emoji: '⚙️', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80' },
      { name: 'Limpeza Automotiva', description: 'Shampoo automotivo, cera e polidores', emoji: '🚗', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'ferramentas',
    slug: 'ferramentas',
    icon: 'fa-wrench',
    title: 'Ferramentas & Utilidades',
    description: 'Tudo para manutenção e reparos no seu dia a dia',
    gradient: 'linear-gradient(135deg, #FFE082 0%, #FFB300 100%)',
    products: [
      { name: 'Jogo de Chave Allen', description: 'Kit completo em aço de qualidade', emoji: '🔧', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
      { name: 'Ferramentas Diversas', description: 'Alicates, chaves, martelos e mais', emoji: '🧰', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80' },
      { name: 'Serra Policorte', description: 'Cortes precisos em diversos materiais', emoji: '🪚', image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80' },
      { name: 'Lixas', description: 'Diversas granulações', emoji: '📄', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80' },
      { name: 'Parafusos', description: 'Diversos tipos e tamanhos', emoji: '🔩', image: 'https://images.unsplash.com/photo-1609205807107-454f1c407ccd?auto=format&fit=crop&w=600&q=80' },
      { name: 'Itens de Manutenção', description: 'Peças e acessórios gerais', emoji: '⚙️', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'outros',
    slug: 'outros',
    icon: 'fa-box-open',
    title: 'Outros Produtos',
    description: 'Produtos diversos para necessidades específicas',
    gradient: 'linear-gradient(135deg, #D1C4E9 0%, #9575CD 100%)',
    products: [
      { name: 'Inseticidas', description: 'Proteção contra insetos', emoji: '🦟', image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Aerosóis Diversos', description: 'Sprays multiuso para aplicações', emoji: '💨', image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&w=600&q=80' },
      { name: 'Produtos Químicos', description: 'Limpadores específicos', emoji: '⚗️', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80' }
    ]
  }
]

async function main() {
  console.log('Seeding data...')
  for (const categoryData of categories) {
    const { products, id, ...rest } = categoryData
    await prisma.category.upsert({
      where: { slug: rest.slug },
      update: {},
      create: {
        ...rest,
        products: {
          create: products
        }
      }
    })
  }
  console.log('Seed finished!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
