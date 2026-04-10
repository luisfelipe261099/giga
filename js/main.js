/* ============================================
   GIGA Express - JavaScript Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Header Scroll Effect ----------
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to Top
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Mobile Menu ----------
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const menuClose = document.getElementById('menuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function openMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ---------- Search Functionality ----------
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');

    function sanitizeInput(input) {
        var div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    function performSearch(query) {
        query = sanitizeInput(query.trim().toLowerCase());
        if (!query) {
            clearSearch();
            return;
        }

        var allCards = document.querySelectorAll('.product-card');
        var allSections = document.querySelectorAll('.product-section');
        var found = false;
        var firstMatch = null;

        allCards.forEach(function (card) {
            var title = (card.querySelector('h3') || {}).textContent || '';
            var desc = (card.querySelector('p') || {}).textContent || '';
            var text = (title + ' ' + desc).toLowerCase();

            if (text.indexOf(query) !== -1) {
                card.classList.remove('hidden-by-search');
                card.classList.add('search-highlight');
                found = true;
                if (!firstMatch) firstMatch = card;
            } else {
                card.classList.add('hidden-by-search');
                card.classList.remove('search-highlight');
            }
        });

        // Show/hide sections
        allSections.forEach(function (section) {
            var visibleCards = section.querySelectorAll('.product-card:not(.hidden-by-search)');
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        if (!found) {
            clearSearch();
            var catalogo = document.getElementById('catalogo');
            if (catalogo) {
                var msg = document.createElement('div');
                msg.className = 'no-results-msg';
                msg.id = 'noResultsMsg';
                msg.innerHTML = '<i class="fas fa-search" style="font-size:2rem;margin-bottom:1rem;display:block;opacity:0.3"></i>Nenhum produto encontrado para "<strong>' + query + '</strong>".<br>Tente outro termo ou navegue pelas categorias.';
                catalogo.querySelector('.container').appendChild(msg);
            }
        }
    }

    function clearSearch() {
        var allCards = document.querySelectorAll('.product-card');
        var allSections = document.querySelectorAll('.product-section');

        allCards.forEach(function (card) {
            card.classList.remove('hidden-by-search', 'search-highlight');
        });

        allSections.forEach(function (section) {
            section.style.display = '';
        });

        var noResults = document.getElementById('noResultsMsg');
        if (noResults) noResults.remove();
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            performSearch(searchInput.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });

        // Live search with debounce
        var searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function () {
                if (searchInput.value.length >= 2) {
                    performSearch(searchInput.value);
                } else if (searchInput.value.length === 0) {
                    clearSearch();
                }
            }, 300);
        });
    }

    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function () {
            performSearch(mobileSearchInput.value);
            closeMenu();
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch(mobileSearchInput.value);
                closeMenu();
            }
        });
    }

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- Intersection Observer (Animations) ----------
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe product cards and category cards
    document.querySelectorAll('.product-card, .category-card, .contact-card').forEach(function (el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ---------- Category Card Click Highlight ----------
    document.querySelectorAll('.category-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var category = this.getAttribute('data-category');
            if (category) {
                // Brief highlight effect on the target section
                var section = document.getElementById(category);
                if (section) {
                    section.style.transition = 'background 0.3s ease';
                    section.style.background = 'rgba(211, 47, 47, 0.03)';
                    setTimeout(function () {
                        section.style.background = '';
                    }, 1500);
                }
            }
        });
    });

    // ---------- Product Images Injection ----------
    // Usando imagens externas confiáveis que correspondem a cada produto
    var productImages = {
        'perfumes': [
            // 0: Perfumes Árabes Premium - frascos dourados de perfume
            'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Perfumes Importados - coleção de perfumes
            'https://images.pexels.com/photos/264819/pexels-photo-264819.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Body Splash - spray corporal
            'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Kits de Perfumes - kit presente
            'https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Perfumes Roll-on (Óleo)
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Desodorantes Spray
            'https://images.pexels.com/photos/8128069/pexels-photo-8128069.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 6: Hidratantes Corporais
            'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 7: Cremes Corporais
            'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 8: Máscaras Capilares
            'https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 9: Shampoos
            'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 10: Condicionadores
            'https://images.pexels.com/photos/3737586/pexels-photo-3737586.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 11: Óleos Capilares
            'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 12: Produtos Infantis (bebê)
            'https://images.pexels.com/photos/3270224/pexels-photo-3270224.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'higiene': [
            // 0: Sabonetes Líquidos
            'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Sabonetes Infantis
            'https://images.pexels.com/photos/7262898/pexels-photo-7262898.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Shampoo Infantil
            'https://images.pexels.com/photos/6634576/pexels-photo-6634576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Creme Dental Colgate
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Enxaguante Bucal
            'https://images.pexels.com/photos/7583935/pexels-photo-7583935.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Desodorantes
            'https://images.pexels.com/photos/8128069/pexels-photo-8128069.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 6: Produtos Masculinos
            'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'limpeza': [
            // 0: Detergente Líquido
            'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Amaciante de Roupas
            'https://images.pexels.com/photos/5217882/pexels-photo-5217882.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Sabão Líquido
            'https://images.pexels.com/photos/4108726/pexels-photo-4108726.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Sabão em Pó
            'https://images.pexels.com/photos/5217914/pexels-photo-5217914.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Água Sanitária
            'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Desinfetante
            'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 6: Limpador Multiuso
            'https://images.pexels.com/photos/4108714/pexels-photo-4108714.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 7: Limpa Piso
            'https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 8: Limpa Vidro
            'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 9: Limpa Grelha
            'https://images.pexels.com/photos/6195956/pexels-photo-6195956.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 10: Álcool
            'https://images.pexels.com/photos/3987153/pexels-photo-3987153.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 11: Cera Líquida
            'https://images.pexels.com/photos/4108725/pexels-photo-4108725.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 12: Removedores
            'https://images.pexels.com/photos/4239036/pexels-photo-4239036.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'profissional': [
            // 0: Lava Roupas (Galão)
            'https://images.pexels.com/photos/5217882/pexels-photo-5217882.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Amaciante Concentrado
            'https://images.pexels.com/photos/5217914/pexels-photo-5217914.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Detergente Profissional
            'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Produtos Tróppel
            'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Produtos Sunny
            'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Limpeza Pesada
            'https://images.pexels.com/photos/4108726/pexels-photo-4108726.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 6: Galões de Químicos
            'https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'descartaveis': [
            // 0: Papel Higiênico
            'https://images.pexels.com/photos/3958199/pexels-photo-3958199.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Papel Toalha
            'https://images.pexels.com/photos/4210337/pexels-photo-4210337.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Guardanapos
            'https://images.pexels.com/photos/4210341/pexels-photo-4210341.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Embalagens e Sacos Plásticos
            'https://images.pexels.com/photos/6962024/pexels-photo-6962024.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Panos de Limpeza
            'https://images.pexels.com/photos/6195120/pexels-photo-6195120.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Flanelas
            'https://images.pexels.com/photos/6195126/pexels-photo-6195126.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'calcados': [
            // 0: Chinelos Masculinos
            'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Chinelos Femininos
            'https://images.pexels.com/photos/1756086/pexels-photo-1756086.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Chinelos Infantis
            'https://images.pexels.com/photos/2987584/pexels-photo-2987584.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Havaianas e Similares
            'https://images.pexels.com/photos/1032113/pexels-photo-1032113.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'automotivo': [
            // 0: Óleo de Motor
            'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Aditivos
            'https://images.pexels.com/photos/4489731/pexels-photo-4489731.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Fluídos Automotivos
            'https://images.pexels.com/photos/4489728/pexels-photo-4489728.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Spray Automotivo
            'https://images.pexels.com/photos/3807133/pexels-photo-3807133.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Limpa Pneus
            'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Limpeza Automotiva
            'https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'ferramentas': [
            // 0: Jogo de Chave Allen
            'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Ferramentas Diversas
            'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Serra Policorte
            'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 3: Lixas
            'https://images.pexels.com/photos/8985474/pexels-photo-8985474.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 4: Parafusos
            'https://images.pexels.com/photos/1573823/pexels-photo-1573823.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 5: Itens de Manutenção
            'https://images.pexels.com/photos/4792510/pexels-photo-4792510.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ],
        'outros': [
            // 0: Inseticidas
            'https://images.pexels.com/photos/5462263/pexels-photo-5462263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 1: Aerosóis Diversos
            'https://images.pexels.com/photos/4239036/pexels-photo-4239036.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            // 2: Produtos Químicos
            'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
        ]
    };

    function injectProductImages() {
        Object.keys(productImages).forEach(function (sectionId) {
            var section = document.getElementById(sectionId);
            if (!section) return;

            var cards = section.querySelectorAll('.product-card');
            var images = productImages[sectionId];

            cards.forEach(function (card, index) {
                if (index >= images.length) return;

                var imgDiv = card.querySelector('.product-img');
                if (!imgDiv) return;

                var icon = imgDiv.querySelector('i');
                var title = card.querySelector('h3');

                var img = document.createElement('img');
                img.src = images[index];
                img.alt = title ? title.textContent + ' - GIGA Express' : 'Produto GIGA Express';
                img.loading = 'lazy';
                img.width = 400;
                img.height = 300;

                img.onerror = function () {
                    this.remove();
                };

                imgDiv.appendChild(img);
            });
        });
    }

    injectProductImages();

});
