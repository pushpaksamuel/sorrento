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

  if (!toggle || !nav || !languageToggle) return;

  const englishMenu = window.english_full || [];
  const swedishMenu = window.swedish_full || [];
  const menuByLanguage = { en: englishMenu, sv: swedishMenu };

  const sectionConfig = {
    pizza: {
      title: { en: 'Pizza Menu', sv: 'Pizzor' },
      badge: { en: 'Pizza', sv: 'Pizza' },
      categories: { en: ['Pizza'], sv: ['Pizza'] }
    },
    'pan-pizza': {
      title: { en: 'Pan Pizza', sv: 'Pan Pizza' },
      badge: { en: 'Pan Pizza', sv: 'Pan Pizza' },
      categories: { en: ['Pan Pizza'], sv: ['Pan Pizza'] }
    },
    pasta: {
      title: { en: 'Pasta', sv: 'Pasta' },
      badge: { en: 'Italian Classics', sv: 'Italienska Klassiker' },
      categories: { en: ['Pasta'], sv: ['Pasta'] }
    },
    starters: {
      title: { en: 'Starters', sv: 'Förrätter' },
      badge: { en: 'Appetizers', sv: 'Förrätter' },
      categories: { en: ['Starter'], sv: ['Förrätt'] }
    },
    'main-courses': {
      title: { en: 'À la Carte', sv: 'À la Carte' },
      badge: { en: 'Main Courses', sv: 'Huvudrätter' },
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
      title: { en: 'Salads', sv: 'Sallader' },
      badge: { en: 'Fresh & Healthy - 189 SEK', sv: 'Fräscht & Gott - 189 SEK' },
      categories: { en: ['Salad'], sv: ['Sallad'] }
    },
    desserts: {
      title: { en: 'Desserts', sv: 'Dessert' },
      badge: { en: 'Sweet Endings - 85 SEK', sv: 'Sött avslut - 85 SEK' },
      categories: { en: ['Dessert'], sv: ['Dessert'] }
    },
    children: {
      title: { en: 'Children', sv: 'Barnmeny' },
      badge: { en: 'Special Kids Menu - 85 SEK', sv: 'Specialmeny för barn - 85 SEK' },
      categories: { en: ['Young Guests'], sv: ['För yngre gäster'] }
    }
  };

  const drinkConfig = {
    'beer-cider': {
      title: { en: 'Beer & Cider', sv: 'Öl/Cider' },
      button: { en: '🍺 Beer & Cider', sv: '🍺 Öl/Cider' },
      categories: { en: ['Beer/Cider'], sv: ['Öl/Cider'] }
    },
    'soft-drinks': {
      title: { en: 'Soft Drinks', sv: 'Kall Dryck' },
      button: { en: '🥤 Soft Drinks', sv: '🥤 Kall Dryck' },
      categories: { en: ['Cold Drink'], sv: ['Kall Dryck'] }
    },
    wine: {
      title: { en: 'Wine', sv: 'Vin' },
      button: { en: '🍷 Wine', sv: '🍷 Vin' },
      categories: { en: ['Red Wine', 'White Wine', 'Rose Wine'], sv: ['Rött Vin', 'Vitt Vin', 'Rosévin'] }
    },
    'cocktails-spirits': {
      title: { en: 'Cocktails & Spirits', sv: 'Cocktails' },
      button: { en: '🍹 Cocktails & Spirits', sv: '🍹 Cocktails' },
      categories: { en: ['Cocktail'], sv: ['Cocktail'] }
    },
    'hot-drinks': {
      title: { en: 'Hot Drinks', sv: 'Varm Dryck' },
      button: { en: '☕ Hot Drinks', sv: '☕ Varm Dryck' },
      categories: { en: ['Hot Drink'], sv: ['Varm Dryck'] }
    },
    'coffee-drinks': {
      title: { en: 'Coffee Drinks', sv: 'Kaffedrink' },
      button: { en: '☕ Coffee Drinks', sv: '☕ Kaffedrink' },
      categories: { en: ['Coffee Drink'], sv: ['Kaffedrink'] }
    }
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

    titleEl.textContent = config.title[language];
    badgeEl.textContent = config.badge[language];

    if (config.items && config.items[language]) {
      gridEl.innerHTML = config.items[language].map(sectionItemDataTemplate).join('');
      return;
    }

    const allowedCategories = config.categories[language] || [];
    const items = menuByLanguage[language].filter(([category]) => allowedCategories.includes(category));
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
      button.textContent = config.button[language];
    });
  };

  let currentLanguage = 'en';
  let drinkGroups = groupItems(currentLanguage);

  const setLanguage = (language) => {
    currentLanguage = language;
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
      languageToggle.textContent = language === 'en' ? 'SV' : 'EN';
      languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Swedish menu' : 'Switch to English menu');
    }

    document.documentElement.lang = language === 'en' ? 'en' : 'sv';

    if (drinkModal && !drinkModal.hasAttribute('hidden')) {
      drinkModal.setAttribute('hidden', '');
    }
  };

  setLanguage(currentLanguage);

  languageToggle.addEventListener('click', () => {
    setLanguage(currentLanguage === 'en' ? 'sv' : 'en');
  });

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const openCategoryModal = (categoryKey) => {
    const config = drinkConfig[categoryKey];
    if (!config || !drinkModal || !modalDrinkName || !modalDrinkDetails || !orderBtn) return;

    const drinkCategories = config.categories[currentLanguage] || [];
    const items = drinkCategories.flatMap((category) => drinkGroups[category] || []);

    modalDrinkName.textContent = config.title[currentLanguage];
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


