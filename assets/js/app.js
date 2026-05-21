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

  if (!toggle || !nav || !languageToggle) return;

  const englishMenu = window.english_full || [];
  const swedishMenu = window.swedish_full || [];
  const germanMenu = window.german_full || [];
  const polishMenu = window.polish_full || [];
  const menuByLanguage = { en: englishMenu, sv: swedishMenu, de: germanMenu, pl: polishMenu };
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
      categories: { en: ['Pizza'], sv: ['Pizza'], de: ['Pizza'], pl: ['Pizza'] }
    },
    'pan-pizza': {
      title: { en: 'Pan Pizza', sv: 'Pan Pizza', de: 'Pan Pizza', pl: 'Pan Pizza' },
      badge: { en: 'Pan Pizza', sv: 'Pan Pizza', de: 'Pan Pizza', pl: 'Pan Pizza' },
      categories: { en: ['Pan Pizza'], sv: ['Pan Pizza'], de: ['Pan Pizza'], pl: ['Pan Pizza'] }
    },
    pasta: {
      title: { en: 'Pasta', sv: 'Pasta', de: 'Pasta', pl: 'Makaron' },
      badge: { en: 'Italian Classics', sv: 'Italienska Klassiker', de: 'Italienische Klassiker', pl: 'Klasyczne Włoskie Makarony' },
      categories: { en: ['Pasta'], sv: ['Pasta'], de: ['Pasta'], pl: ['Makaron'] }
    },
    starters: {
      title: { en: 'Starters', sv: 'Förrätter', de: 'Vorspeisen', pl: 'Przystawki' },
      badge: { en: 'Appetizers', sv: 'Förrätter', de: 'Vorspeisen', pl: 'Przystawki' },
      categories: { en: ['Starter'], sv: ['Förrätt'], de: ['Starter'], pl: ['Przystawka'] }
    },
    'main-courses': {
      title: { en: 'À la Carte', sv: 'À la Carte', de: 'À la Carte', pl: 'À la Carte' },
      badge: { en: 'Main Courses', sv: 'Huvudrätter', de: 'Hauptgänge', pl: 'Dania główne' },
      items: {
        en: [
          ['Kebab Plate', 'Kebab, fries, vegetables, sauce', 169],
          ['Breaded Plaice Fillet', 'Wedge potatoes, vegetables, remoulade sauce', 200],
          ['Sirloin Steak or Chicken Fillet', 'Wedge potatoes, vegetables, béarnaise sauce', 249],
          ['Chicken Shish', 'Baked potatoes, tzatziki', 249],
          ['Bistecca – Sirloin Steak', 'Fried potatoes, mushrooms, onions, creamy parmesan gorgonzola sauce', 269],
          ['Sirloin Plank Steak', 'Oven-grilled mash, fried vegetables, fruit, béarnaise sauce', 269],
          ['Chicken Plank Steak', 'Oven-grilled mash, fried vegetables, fruit, béarnaise sauce', 269],
          ['Salmon Plank Steak', 'Oven-grilled mash, fried vegetables, fruit, remoulade sauce', 269],
          ['Oumph Plank – Vegan', 'Oven-grilled mash, vegetables, vegan sauce', 269]
        ],
        sv: [
          ['Kebabtallrik', 'kebab, pommes frites, grönsaker, sås', 169],
          ['Panerad rödspättafilé', 'klyftpotatis, grönsaker, remouladsås', 200],
          ['Ryggbiff eller kycklingfilé', 'klyftpotatis, grönsaker, bearnaisesås', 249],
          ['Kycklingspett', 'bakad potatis, tzatziki', 249],
          ['Bistecca – Ryggbiff', 'friterad potatis, champinjoner, lök, krämig parmesan-gorgonzolasås', 269],
          ['Ryggbiff på planka', 'ugnsgjord mos, stekta grönsaker, frukt, bearnaisesås', 269],
          ['Kyckling på planka', 'ugnsgjord mos, stekta grönsaker, frukt, bearnaisesås', 269],
          ['Lax på planka', 'ugnsgjord mos, stekta grönsaker, frukt, remouladsås', 269],
          ['Oumph på planka – vegansk', 'ugnsgjord mos, grönsaker, vegansk sås', 269]
        ]
      }
    },
    salads: {
      title: { en: 'Salads', sv: 'Sallader', de: 'Salate', pl: 'Sałatki' },
      badge: { en: 'Fresh & Healthy - 189 SEK', sv: 'Fräscht & Gott - 189 SEK', de: 'Frisch & Gesund - 189 SEK', pl: 'Świeże & zdrowe - 189 SEK' },
      categories: { en: ['Salad'], sv: ['Sallad'], de: ['Salat'], pl: ['Sałatka'] }
    },
    desserts: {
      title: { en: 'Desserts', sv: 'Dessert', de: 'Desserts', pl: 'Desery' },
      badge: { en: 'Sweet Endings - 85 SEK', sv: 'Sött avslut - 85 SEK', de: 'Süßes Ende - 85 SEK', pl: 'Słodkie Zakończenie - 85 SEK' },
      categories: { en: ['Dessert'], sv: ['Dessert'], de: ['Deser'], pl: ['Deser'] }
    },
    children: {
      title: { en: 'Children', sv: 'Barnmeny', de: 'Kinder', pl: 'Dzieci' },
      badge: { en: 'Special Kids Menu - 85 SEK', sv: 'Specialmeny för barn - 85 SEK', de: 'Spezielles Kindermenü - 85 SEK', pl: 'Specjalne Menu dla Dzieci - 85 SEK' },
      categories: { en: ['Young Guests'], sv: ['För yngre gäster'], de: ['Junge Gäste'], pl: ['Dla dzieci'] }
    }
  };

  const drinkConfig = {
    'beer-cider': {
      title: { en: 'Beer & Cider', sv: 'Öl/Cider', de: 'Bier & Apfelwein', pl: 'Piwo/Cydr' },
      button: { en: '🍺 Beer & Cider', sv: '🍺 Öl/Cider', de: '🍺 Bier & Apfelwein', pl: '🍺 Piwo/Cydr' },
      categories: { en: ['Beer/Cider'], sv: ['Öl/Cider'], de: ['Bier/Apfelwein'], pl: ['Piwo/Cydr'] }
    },
    'soft-drinks': {
      title: { en: 'Soft Drinks', sv: 'Kall Dryck', de: 'Erfrischungsgetränke', pl: 'Napoje bezalkoholowe' },
      button: { en: '🥤 Soft Drinks', sv: '🥤 Kall Dryck', de: '🥤 Erfrischungsgetränke', pl: '🥤 Napoje bezalkoholowe' },
      categories: { en: ['Cold Drink'], sv: ['Kall Dryck'], de: ['Kaltes Getränk'], pl: ['Zimne Napoje'] }
    },
    wine: {
      title: { en: 'Wine', sv: 'Vin', de: 'Wein', pl: 'Wino' },
      button: { en: '🍷 Wine', sv: '🍷 Vin', de: '🍷 Wein', pl: '🍷 Wino' },
      categories: { en: ['Red Wine', 'White Wine', 'Rose Wine'], sv: ['Rött Vin', 'Vitt Vin', 'Rosévin'], de: ['Rotwein', 'Weißwein', 'Roséwein'], pl: ['Czerwone Wino', 'Białe Wino', 'Wino Różowe'] }
    },
    'cocktails-spirits': {
      title: { en: 'Cocktails & Spirits', sv: 'Cocktails', de: 'Cocktails & Spirituosen', pl: 'Koktajle' },
      button: { en: '🍹 Cocktails & Spirits', sv: '🍹 Cocktails', de: '🍹 Cocktails & Spirituosen', pl: '🍹 Koktajle' },
      categories: { en: ['Cocktail'], sv: ['Cocktail'], de: ['Cocktail'], pl: ['Koktajl'] }
    },
    'hot-drinks': {
      title: { en: 'Hot Drinks', sv: 'Varm Dryck', de: 'Heißgetränke', pl: 'Gorące Napoje' },
      button: { en: '☕ Hot Drinks', sv: '☕ Varm Dryck', de: '☕ Heißgetränke', pl: '☕ Gorące Napoje' },
      categories: { en: ['Hot Drink'], sv: ['Varm Dryck'], de: ['Heißes Getränk'], pl: ['Gorące Napoje'] }
    },
    'coffee-drinks': {
      title: { en: 'Coffee Drinks', sv: 'Kaffedrink', de: 'Kaffeegetränke', pl: 'Kawa z alkoholem' },
      button: { en: '☕ Coffee Drinks', sv: '☕ Kaffedrink', de: '☕ Kaffeegetränke', pl: '☕ Kawa z alkoholem' },
      categories: { en: ['Coffee Drink'], sv: ['Kaffedrink'], de: ['Kaffeegetränk'], pl: ['Kawa z alkoholem'] }
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

    if (config.items && config.items[language]) {
      gridEl.innerHTML = config.items[language].map(sectionItemDataTemplate).join('');
      return;
    }

    const allowedCategories = (config.categories && (config.categories[language] || config.categories['en'])) || [];
    const items = (menuByLanguage[language] || []).filter(([category]) => allowedCategories.includes(category));
    gridEl.innerHTML = items.map(([, name, description, price]) => sectionItemTemplate(name, description, price)).join('');
  };

  const groupItems = (language) => {
    return menuByLanguage[language].reduce((groups, [category, name, description, price]) => {
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push([name, description, price]);
      return groups;
    }, {});
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

  toggle.addEventListener('click', () => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

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
    const drinkCategories = (config.categories && (config.categories[currentLanguage] || config.categories['en'])) || [];
    const items = drinkCategories.flatMap((category) => drinkGroups[category] || []);

    modalDrinkName.textContent = t(config.title, currentLanguage) || '';
    modalDrinkDetails.innerHTML = `
      <div class="modal-drinks-list">
        ${items.map(([name, description, price]) => `<div class="modal-drink-row"><span>${name}</span><span>${price} SEK</span></div>`).join('')}
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


