document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const languageToggle = document.getElementById('language-toggle');
  const menuItems = Array.from(document.querySelectorAll('.menu-item[data-lang]'));

  if (!toggle || !nav) return;

  const setLanguage = (language) => {
    menuItems.forEach((item) => {
      item.hidden = item.dataset.lang !== language;
    });

    if (languageToggle) {
      languageToggle.textContent = language === 'en' ? 'SV' : 'EN';
      languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Swedish menu' : 'Switch to English menu');
    }

    document.documentElement.lang = language === 'en' ? 'en' : 'sv';
  };

  let currentLanguage = 'en';
  setLanguage(currentLanguage);

  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'sv' : 'en';
      setLanguage(currentLanguage);
    });
  }

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

  // DRINK CATEGORY MODAL FUNCTIONALITY
  const categoryButtons = document.querySelectorAll('.category-btn');
  const drinkModal = document.getElementById('drink-modal');
  const closeModal = document.getElementById('close-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalDrinkName = document.getElementById('modal-drink-name');
  const modalDrinkDetails = document.getElementById('modal-drink-details');
  const orderBtn = document.getElementById('order-btn');

  const categoryData = {
    'beer-cider': {
      title: '🍺 Beer & Cider',
      items: [
        ['Non-alcoholic Beer', '45 SEK'],
        ['Norrlands Guld Draft (0.4L)', '85 SEK'],
        ['Mariestads Export (0.5L)', '95 SEK'],
        ['Mariestads OLD OX (0.5L)', '95 SEK'],
        ['Heineken Lager (0.33L)', '75 SEK'],
        ['Karlovacko, Croatia (0.5L)', '95 SEK'],
        ['Bernard Light, Czech (0.5L)', '95 SEK'],
        ['Bernard Dark, Czech (0.5L)', '95 SEK'],
        ['Brutal Brewing IPA', '75 SEK'],
        ['Smirnoff Ice (0.33L)', '95 SEK']
      ]
    },
    'soft-drinks': {
      title: '🥤 Soft Drinks',
      items: [
        ['Water (Pepsi)', '35 SEK'],
        ['Mineral Water (Pepsi Max)', '35 SEK'],
        ['7-Up', '35 SEK'],
        ['Ice Tea', '49 SEK'],
        ['Juice (7-Ingo)', '35 SEK']
      ]
    },
    'wine': {
      title: '🍷 Wine',
      items: [
        ['House Wine, Mc Pherson (glass)', '85 SEK'],
        ['House Wine, Mc Pherson (carafe)', '170 SEK'],
        ['Mc Pherson Shiraz, Australia', '400 SEK'],
        ['Coto Vintage Crianza, Spain', '450 SEK'],
        ['Chardonnay, Australia (dry white)', '340 SEK'],
        ['Cono Sur Viognier, Chile', '380 SEK'],
        ['Cato Mayor Rosé, Spain', '340 SEK']
      ]
    },
    'cocktails-spirits': {
      title: '🍹 Cocktails & Spirits',
      items: [
        ['Strawberry Spritz (5cl)', '139 SEK'],
        ['Mango Spritz (5cl)', '139 SEK'],
        ['Limoncello Spritz (5cl)', '139 SEK'],
        ['Prosecco (5cl)', '139 SEK'],
        ['Aperol Spritz (5cl)', '139 SEK'],
        ['Gin & Tonic (5cl)', '139 SEK'],
        ['Rum & Cola (5cl)', '139 SEK'],
        ['Vodka Red Bull (5cl)', '139 SEK'],
        ['Mojito (5cl)', '139 SEK'],
        ['Strawberry Daiquiri (5cl)', '139 SEK']
      ]
    },
    'hot-drinks': {
      title: '☕ Hot Drinks',
      items: [
        ['Tea', '35 SEK'],
        ['Black Coffee', '35 SEK'],
        ['Cappuccino', '45 SEK'],
        ['Caffè Latte', '45 SEK'],
        ['Espresso', '40 SEK']
      ]
    },
    'coffee-drinks': {
      title: '☕ Coffee Drinks',
      items: [
        ['Coffee Karlsson (Baileys & Cointreau, 4cl)', '99 SEK'],
        ['Coffee Karlsson (Baileys & Cointreau, 6cl)', '129 SEK'],
        ['Irish Coffee (Irish Whiskey, 4cl)', '99 SEK'],
        ['Irish Coffee (Irish Whiskey, 6cl)', '129 SEK'],
        ['Italian Coffee (Galliano, 4cl)', '99 SEK'],
        ['Italian Coffee (Galliano, 6cl)', '129 SEK'],
        ['French Coffee (Cognac, 4cl)', '99 SEK'],
        ['French Coffee (Cognac, 6cl)', '129 SEK']
      ]
    }
  };

  const openCategoryModal = (categoryKey) => {
    const category = categoryData[categoryKey];
    if (!category) return;

    modalDrinkName.textContent = category.title;
    
    let itemsHTML = '<div class="modal-drinks-list">';
    category.items.forEach(([name, price]) => {
      itemsHTML += `<div class="modal-drink-row"><span>${name}</span><span>${price}</span></div>`;
    });
    itemsHTML += '</div>';
    
    modalDrinkDetails.innerHTML = itemsHTML;
    orderBtn.style.display = 'none';
    drinkModal.removeAttribute('hidden');
  };

  const closeCategoryModal = () => {
    drinkModal.setAttribute('hidden', '');
  };

  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openCategoryModal(btn.dataset.category);
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', closeCategoryModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeCategoryModal);
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drinkModal && !drinkModal.hasAttribute('hidden')) {
      closeCategoryModal();
    }
  });
});


