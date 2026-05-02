const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const languageDropdown = document.querySelector('.language-dropdown');
const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
const tradeDropdown = document.querySelector('.trade-dropdown');
const tradeToggle = document.querySelector('.trade-toggle');
const tradeMenu = document.querySelector('.trade-menu');

if (localStorage.getItem('egm-theme') === 'light') {
  document.body.classList.add('light');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('egm-theme', isLight ? 'light' : 'dark');
});

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const open = mainNav.classList.contains('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}

if (languageDropdown && languageToggle && languageMenu) {
  languageToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = languageDropdown.classList.toggle('open');
    languageToggle.setAttribute('aria-expanded', String(isOpen));
    languageMenu.hidden = !isOpen;
  });
  document.addEventListener('click', (event) => {
    if (!languageDropdown.contains(event.target)) {
      languageDropdown.classList.remove('open');
      languageToggle.setAttribute('aria-expanded', 'false');
      languageMenu.hidden = true;
    }
  });
}

let tradeCloseTimer;
if (tradeDropdown && tradeToggle && tradeMenu) {
  const openTrade = () => {
    clearTimeout(tradeCloseTimer);
    tradeDropdown.classList.add('open');
    tradeToggle.setAttribute('aria-expanded', 'true');
    tradeMenu.hidden = false;
  };
  const closeTrade = () => {
    clearTimeout(tradeCloseTimer);
    tradeCloseTimer = setTimeout(() => {
      tradeDropdown.classList.remove('open');
      tradeToggle.setAttribute('aria-expanded', 'false');
      tradeMenu.hidden = true;
    }, 420);
  };
  tradeDropdown.addEventListener('mouseenter', openTrade);
  tradeDropdown.addEventListener('mouseleave', closeTrade);
  tradeMenu.addEventListener('mouseenter', openTrade);
  tradeMenu.addEventListener('mouseleave', closeTrade);
  tradeToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = tradeDropdown.classList.toggle('open');
    tradeToggle.setAttribute('aria-expanded', String(isOpen));
    tradeMenu.hidden = !isOpen;
  });
}


const treasureButton = document.getElementById('treasureButton');
const bonusModal = document.getElementById('bonusModal');
const closeBonus = document.getElementById('closeBonus');

if (treasureButton && bonusModal && closeBonus) {
  treasureButton.addEventListener('click', () => {
    bonusModal.hidden = false;
  });

  closeBonus.addEventListener('click', () => {
    bonusModal.hidden = true;
  });

  bonusModal.addEventListener('click', (event) => {
    if (event.target === bonusModal) {
      bonusModal.hidden = true;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !bonusModal.hidden) {
      bonusModal.hidden = true;
    }
  });
}


const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 280);
  });

  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* Mobile Trade dropdown tap fix */
const mobileTradeDropdown = document.querySelector('.trade-dropdown');
const mobileTradeToggle = document.querySelector('.trade-toggle');
const mobileTradeMenu = document.querySelector('.trade-menu');

if (mobileTradeDropdown && mobileTradeToggle && mobileTradeMenu) {
  mobileTradeToggle.addEventListener('click', (event) => {
    if (window.innerWidth <= 900) {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = mobileTradeDropdown.classList.toggle('open');
      mobileTradeToggle.setAttribute('aria-expanded', String(isOpen));
      mobileTradeMenu.hidden = !isOpen;
    }
  });

  document.querySelectorAll('.trade-card').forEach((card) => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        mobileTradeDropdown.classList.remove('open');
        mobileTradeToggle.setAttribute('aria-expanded', 'false');
        mobileTradeMenu.hidden = true;
      }
    });
  });
}
