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
    var IMG_BASE = 'https://images.unsplash.com/';
    var IMG_PARAMS = '?auto=format&fit=crop&w=400&h=300&q=80';

    var sectionImages = {
        'perfumes': [
            'photo-1541643600914-78b084683601',
            'photo-1592945403244-b3fbafd7f539',
            'photo-1523293182086-7651a899d37f',
            'photo-1585386959984-a4155224a1ad',
            'photo-1594035910387-fea081ac29ee',
            'photo-1608528577891-eb055944f2e7',
            'photo-1556228578-0d85b1a4d571',
            'photo-1611930022073-b7a4ba5fcccd',
            'photo-1596462502278-27bfdc403348',
            'photo-1585232004423-244e0e6904e3',
            'photo-1535585209827-a15fcdbc4c2d',
            'photo-1527799820374-dcf8d9d4a388',
            'photo-1515488042361-ee00e0ddd4e4'
        ],
        'higiene': [
            'photo-1607006344380-b6775a0824a7',
            'photo-1515488042361-ee00e0ddd4e4',
            'photo-1543076499-a6133cb932fd',
            'photo-1559591937-fffb0f6e8602',
            'photo-1621955964441-c173e01c135b',
            'photo-1608528577891-eb055944f2e7',
            'photo-1581497396202-5645e76a3a8e'
        ],
        'limpeza': [
            'photo-1585421514284-efb74c2b69ba',
            'photo-1563453392212-326f5e854473',
            'photo-1622560480605-d83c853bc5c3',
            'photo-1585421514284-efb74c2b69ba',
            'photo-1563453392212-326f5e854473',
            'photo-1622560480605-d83c853bc5c3',
            'photo-1585421514284-efb74c2b69ba',
            'photo-1563453392212-326f5e854473',
            'photo-1622560480605-d83c853bc5c3',
            'photo-1585421514284-efb74c2b69ba',
            'photo-1563453392212-326f5e854473',
            'photo-1622560480605-d83c853bc5c3',
            'photo-1585421514284-efb74c2b69ba'
        ],
        'profissional': [
            'photo-1622560480605-d83c853bc5c3',
            'photo-1563453392212-326f5e854473',
            'photo-1585421514284-efb74c2b69ba',
            'photo-1622560480605-d83c853bc5c3',
            'photo-1563453392212-326f5e854473',
            'photo-1585421514284-efb74c2b69ba',
            'photo-1622560480605-d83c853bc5c3'
        ],
        'descartaveis': [
            'photo-1583947215259-38e31be8751f',
            'photo-1583947215259-38e31be8751f',
            'photo-1583947215259-38e31be8751f',
            'photo-1583947215259-38e31be8751f',
            'photo-1583947215259-38e31be8751f',
            'photo-1583947215259-38e31be8751f'
        ],
        'calcados': [
            'photo-1603487742131-4160ec999306',
            'photo-1603487742131-4160ec999306',
            'photo-1603487742131-4160ec999306',
            'photo-1603487742131-4160ec999306'
        ],
        'automotivo': [
            'photo-1487754180451-c456f719a1fc',
            'photo-1487754180451-c456f719a1fc',
            'photo-1487754180451-c456f719a1fc',
            'photo-1487754180451-c456f719a1fc',
            'photo-1487754180451-c456f719a1fc',
            'photo-1487754180451-c456f719a1fc'
        ],
        'ferramentas': [
            'photo-1581092160562-40aa08e78837',
            'photo-1504148455328-c376907d081c',
            'photo-1581092160562-40aa08e78837',
            'photo-1504148455328-c376907d081c',
            'photo-1581092160562-40aa08e78837',
            'photo-1504148455328-c376907d081c'
        ],
        'outros': [
            'photo-1584949091598-c31daaaa4aa9',
            'photo-1608528577891-eb055944f2e7',
            'photo-1585421514284-efb74c2b69ba'
        ]
    };

    function injectProductImages() {
        Object.keys(sectionImages).forEach(function (sectionId) {
            var section = document.getElementById(sectionId);
            if (!section) return;

            var cards = section.querySelectorAll('.product-card');
            var images = sectionImages[sectionId];

            cards.forEach(function (card, index) {
                if (index >= images.length) return;

                var imgDiv = card.querySelector('.product-img');
                if (!imgDiv) return;

                var icon = imgDiv.querySelector('i');
                var title = card.querySelector('h3');

                var img = document.createElement('img');
                img.src = IMG_BASE + images[index] + IMG_PARAMS;
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
