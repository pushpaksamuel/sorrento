document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const languageToggle = document.getElementById('language-toggle');
  const drinkModal = document.getElementById('drink-modal');
  const closeModal = document.getElementById('close-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalDrinkName = document.getElementById('modal-drink-name');
  const modalDrinkDetails = document.getElementById('modal-drink-details');
  const orderBtn = document.getElementById('order-btn');
  const floatingNav = document.getElementById('floating-nav');
  const floatingNavToggle = document.getElementById('floating-nav-toggle');
  const floatingNavPanel = document.getElementById('floating-nav-panel');

  if (!nav || !languageToggle) return;

  const menuByLanguage = {
    en: window.sorrento_menu || window.english_full || {},
    sv: window.sorrento_menu_sv || window.swedish_full || {},
    de: window.sorrento_menu_de || window.german_full || {},
    pl: window.sorrento_menu_pl || window.polish_full || {}
  };
  const languages = ['en', 'sv', 'de', 'pl'];

  const navItems = [
    {
      href: '#pizza',
      label: { en: 'Pizza', sv: 'Pizza', de: 'Pizza', pl: 'Pizza' }
    },
    {
      href: '#pan-pizza',
      label: { en: 'Pan Pizza', sv: 'Pan Pizza', de: 'Pan Pizza', pl: 'Pan Pizza' }
    },
    {
      href: '#pasta',
      label: { en: 'Pasta', sv: 'Pasta', de: 'Pasta', pl: 'Makaron' }
    },
    {
      href: '#starters',
      label: { en: 'Starters', sv: 'Forratter', de: 'Vorspeisen', pl: 'Przystawki' }
    },
    {
      href: '#main-courses',
      label: { en: 'Main Courses', sv: 'Huvudratter', de: 'Hauptgange', pl: 'Dania glowne' }
    },
    {
      href: '#salads',
      label: { en: 'Salads', sv: 'Sallader', de: 'Salate', pl: 'Salatki' }
    },
    {
      href: '#desserts',
      label: { en: 'Desserts', sv: 'Dessert', de: 'Desserts', pl: 'Desery' }
    },
    {
      href: '#children',
      label: { en: 'Children', sv: 'Barnmeny', de: 'Kinder', pl: 'Dzieci' }
    },
    {
      href: '#drinks',
      label: { en: 'Drinks', sv: 'Dryck', de: 'Getranke', pl: 'Napoje' }
    },
  ];

  const sectionConfig = {
    pizza: {
      title: { en: 'Pizza Menu', sv: 'Pizzor', de: 'Pizzamenü', pl: 'Menu Pizzy' },
      badge: { en: 'Pizza', sv: 'Pizza', de: 'Pizza', pl: 'Pizza' },
      dataKey: 'pizza'
    },
    'pan-pizza': {
      title: { en: 'Pan Pizza', sv: 'Pan Pizza', de: 'Pan Pizza', pl: 'Pan Pizza' },
      badge: { en: 'Pan Pizza', sv: 'Pan Pizza', de: 'Pan Pizza', pl: 'Pan Pizza' },
      dataKey: 'panPizza'
    },
    pasta: {
      title: { en: 'Pasta', sv: 'Pasta', de: 'Pasta', pl: 'Makaron' },
      badge: { en: 'Italian Classics', sv: 'Italienska Klassiker', de: 'Italienische Klassiker', pl: 'Klasyczne Włoskie Makarony' },
      dataKey: 'pasta'
    },
    starters: {
      title: { en: 'Starters', sv: 'Förrätter', de: 'Vorspeisen', pl: 'Przystawki' },
      badge: { en: 'Appetizers', sv: 'Förrätter', de: 'Vorspeisen', pl: 'Przystawki' },
      dataKey: 'starters'
    },
    'main-courses': {
      title: { en: 'À la Carte', sv: 'À la Carte', de: 'À la Carte', pl: 'À la Carte' },
      badge: { en: 'Main Courses', sv: 'Huvudrätter', de: 'Hauptgänge', pl: 'Dania główne' },
      dataKey: 'alaCarte'
    },
    salads: {
      title: { en: 'Salads', sv: 'Sallader', de: 'Salate', pl: 'Sałatki' },
      badge: { en: 'Fresh & Healthy - 189 SEK', sv: 'Fräscht & Gott - 189 SEK', de: 'Frisch & Gesund - 189 SEK', pl: 'Świeże & zdrowe - 189 SEK' },
      dataKey: 'salads'
    },
    desserts: {
      title: { en: 'Desserts', sv: 'Dessert', de: 'Desserts', pl: 'Desery' },
      badge: { en: 'Sweet Endings - 85 SEK', sv: 'Sött avslut - 85 SEK', de: 'Süßes Ende - 85 SEK', pl: 'Słodkie Zakończenie - 85 SEK' },
      dataKey: 'desserts'
    },
    children: {
      title: { en: 'Children', sv: 'Barnmeny', de: 'Kinder', pl: 'Dzieci' },
      badge: { en: 'Special Kids Menu - 85 SEK', sv: 'Specialmeny för barn - 85 SEK', de: 'Spezielles Kindermenü - 85 SEK', pl: 'Specjalne Menu dla Dzieci - 85 SEK' },
      dataKey: 'kidsMenu'
    }
  };

  const drinkConfig = {
    'beer-cider': {
      title: { en: 'Beer & Cider', sv: 'Öl/Cider', de: 'Bier & Apfelwein', pl: 'Piwo/Cydr' },
      button: { en: '🍺 Beer & Cider', sv: '🍺 Öl/Cider', de: '🍺 Bier & Apfelwein', pl: '🍺 Piwo/Cydr' },
      dataKeys: [{ key: 'beerCider', label: { en: 'Beer & Cider', sv: 'Öl/Cider', de: 'Bier & Apfelwein', pl: 'Piwo/Cydr' } }]
    },
    'soft-drinks': {
      title: { en: 'Soft Drinks', sv: 'Kall Dryck', de: 'Erfrischungsgetränke', pl: 'Napoje bezalkoholowe' },
      button: { en: '🥤 Soft Drinks', sv: '🥤 Kall Dryck', de: '🥤 Erfrischungsgetränke', pl: '🥤 Napoje bezalkoholowe' },
      dataKeys: [{ key: 'coldDrinks', label: { en: 'Soft Drinks', sv: 'Kall Dryck', de: 'Erfrischungsgetränke', pl: 'Napoje bezalkoholowe' } }]
    },
    wine: {
      title: { en: 'Wine', sv: 'Vin', de: 'Wein', pl: 'Wino' },
      button: { en: '🍷 Wine', sv: '🍷 Vin', de: '🍷 Wein', pl: '🍷 Wino' },
      dataKeys: [
        { key: 'houseWine', label: { en: 'House Wine', sv: 'Husets vin', de: 'Hauswein', pl: 'Wino domowe' } },
        { key: 'redWine', label: { en: 'Red Wine', sv: 'Rött Vin', de: 'Rotwein', pl: 'Czerwone Wino' } },
        { key: 'whiteWine', label: { en: 'White Wine', sv: 'Vitt Vin', de: 'Weißwein', pl: 'Białe Wino' } },
        { key: 'roseWine', label: { en: 'Rosé Wine', sv: 'Rosévin', de: 'Roséwein', pl: 'Wino Różowe' } }
      ]
    },
    'cocktails-spirits': {
      title: { en: 'Cocktails & Spirits', sv: 'Cocktails', de: 'Cocktails & Spirituosen', pl: 'Koktajle' },
      button: { en: '🍹 Cocktails & Spirits', sv: '🍹 Cocktails', de: '🍹 Cocktails & Spirituosen', pl: '🍹 Koktajle' },
      dataKeys: [{ key: 'cocktails', label: { en: 'Cocktails & Spirits', sv: 'Cocktails', de: 'Cocktails & Spirituosen', pl: 'Koktajle' } }]
    },
    'hot-drinks': {
      title: { en: 'Hot Drinks', sv: 'Varm Dryck', de: 'Heißgetränke', pl: 'Gorące Napoje' },
      button: { en: '☕ Hot Drinks', sv: '☕ Varm Dryck', de: '☕ Heißgetränke', pl: '☕ Gorące Napoje' },
      dataKeys: [{ key: 'hotDrinks', label: { en: 'Hot Drinks', sv: 'Varm Dryck', de: 'Heißgetränke', pl: 'Gorące Napoje' } }]
    },
    'coffee-drinks': {
      title: { en: 'Coffee Drinks', sv: 'Kaffedrink', de: 'Kaffeegetränke', pl: 'Kawa z alkoholem' },
      button: { en: '☕ Coffee Drinks', sv: '☕ Kaffedrink', de: '☕ Kaffeegetränke', pl: '☕ Kawa z alkoholem' },
      dataKeys: [{ key: 'coffeeDrinks', label: { en: 'Coffee Drinks', sv: 'Kaffedrink', de: 'Kaffeegetränke', pl: 'Kawa z alkoholem' } }]
    }
  };

  const t = (obj, lang) => {
    if (!obj) return undefined;
    if (Object.prototype.hasOwnProperty.call(obj, lang)) return obj[lang];
    if (Object.prototype.hasOwnProperty.call(obj, 'en')) return obj['en'];
    // return first available value
    const keys = Object.keys(obj);
    return keys.length ? obj[keys[0]] : undefined;
  };

  const houseWineBannerText = {
    en: 'House wine Mc Pherson — glass 85 SEK, carafe 170 SEK',
    sv: 'Husets vin Mc Pherson — glas 85 SEK, karaff 170 SEK',
    de: 'Hauswein Mc Pherson — Glas 85 SEK, Karaffe 170 SEK',
    pl: 'Wino domowe Mc Pherson — kieliszek 85 SEK, karafka 170 SEK'
  };

  const sectionItemTemplate = (name, description, price) => `
    <div class="menu-item">
      <h3>${name}</h3>
      <span class="price">${price} SEK</span>
      <p>${description}</p>
    </div>
  `;

  const sectionItemDataTemplate = ([name, description, price]) => sectionItemTemplate(name, description, price);

  const renderSection = (sectionId, language) => {
    const section = document.getElementById(sectionId);
    const config = sectionConfig[sectionId];
    if (!section || !config) return;

    const titleEl = section.querySelector('.section-title');
    const badgeEl = section.querySelector('.section-badge');
    const gridEl = section.querySelector('.menu-grid');
    if (!titleEl || !badgeEl || !gridEl) return;

    titleEl.textContent = t(config.title, language) || '';
    badgeEl.textContent = t(config.badge, language) || '';

    const source = menuByLanguage[language] || {};
    const items = config.dataKey ? (source[config.dataKey] || []) : [];
    gridEl.innerHTML = items.map(sectionItemDataTemplate).join('');
  };

  const groupItems = (language) => {
    return menuByLanguage[language] || {};
  };

  const renderDrinkButtons = (language) => {
    document.querySelectorAll('.category-btn').forEach((button) => {
      const config = drinkConfig[button.dataset.category];
      if (!config) return;
      button.textContent = (config.button && (config.button[language] || config.button['en'])) || button.textContent;
    });
  };

  const renderFloatingNav = (language) => {
    if (!floatingNavPanel) return;
    floatingNavPanel.innerHTML = navItems
      .map((item) => `<a href="${item.href}">${t(item.label, language) || t(item.label, 'en')}</a>`)
      .join('');

    floatingNavPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        floatingNavPanel.setAttribute('hidden', '');
        if (floatingNavToggle) floatingNavToggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  const renderNav = (language) => {
    nav.innerHTML = navItems
      .map((item) => `<a href="${item.href}">${t(item.label, language) || t(item.label, 'en')}</a>`)
      .join('');

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        nav.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  let currentLanguage = 'en';
  let drinkGroups = groupItems(currentLanguage);

  const setLanguage = (language) => {
    currentLanguage = language;
    renderNav(language);
    renderFloatingNav(language);
    renderSection('pizza', language);
    renderSection('pan-pizza', language);
    renderSection('pasta', language);
    renderSection('starters', language);
    renderSection('main-courses', language);
    renderSection('salads', language);
    renderSection('desserts', language);
    renderSection('children', language);
    renderDrinkButtons(language);
    drinkGroups = groupItems(language);

    if (languageToggle) {
      languageToggle.textContent = language.toUpperCase();
      languageToggle.setAttribute('aria-label', `Switch language. Current: ${language.toUpperCase()}`);
    }

    const bannerEl = document.querySelector('.house-wine-banner');
    if (bannerEl) bannerEl.textContent = houseWineBannerText[language] || houseWineBannerText.en;

    document.documentElement.lang = language;

    if (drinkModal && !drinkModal.hasAttribute('hidden')) {
      drinkModal.setAttribute('hidden', '');
    }
  };

  setLanguage(currentLanguage);

  languageToggle.addEventListener('click', () => {
    const idx = languages.indexOf(currentLanguage);
    const next = languages[(idx + 1) % languages.length];
    setLanguage(next);
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      if (!window.matchMedia('(max-width: 768px)').matches) return;
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (floatingNavToggle && floatingNavPanel) {
    floatingNavToggle.addEventListener('click', () => {
      const isHidden = floatingNavPanel.hasAttribute('hidden');
      if (isHidden) {
        floatingNavPanel.removeAttribute('hidden');
        floatingNavToggle.setAttribute('aria-expanded', 'true');
      } else {
        floatingNavPanel.setAttribute('hidden', '');
        floatingNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const openCategoryModal = (categoryKey) => {
    const config = drinkConfig[categoryKey];
    if (!config || !drinkModal || !modalDrinkName || !modalDrinkDetails || !orderBtn) return;
    const source = drinkGroups || {};
    const groups = (config.dataKeys || []).map((group) => ({
      label: group.label,
      items: source[group.key] || []
    })).filter((group) => group.items.length);

    modalDrinkName.textContent = t(config.title, currentLanguage) || '';
    modalDrinkDetails.innerHTML = `
      <div class="modal-drinks-list">
        ${groups.map((group) => `
          <div class="modal-drink-group">
            <h3>${t(group.label, currentLanguage) || t(group.label, 'en')}</h3>
            ${group.items.map(([name, description, price]) => `<div class="modal-drink-row"><span class="drink-name">${name}</span><span class="drink-desc">${description}</span><span class="drink-price">${price} SEK</span></div>`).join('')}
          </div>
        `).join('')}
      </div>
    `;
    orderBtn.style.display = 'none';
    drinkModal.removeAttribute('hidden');
  };

  const closeCategoryModal = () => {
    if (drinkModal) {
      drinkModal.setAttribute('hidden', '');
    }
  };

  document.querySelectorAll('.category-btn').forEach((button) => {
    button.addEventListener('click', () => {
      openCategoryModal(button.dataset.category);
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', closeCategoryModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeCategoryModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drinkModal && !drinkModal.hasAttribute('hidden')) {
      closeCategoryModal();
    }
  });
});


