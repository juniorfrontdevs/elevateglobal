const themeToggle = document.getElementById("themeToggle");
const languageDropdown = document.querySelector(".language-dropdown");
const languageToggle = document.querySelector(".language-toggle");
const languageMenu = document.querySelector(".language-menu");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordInput");
const loginForm = document.getElementById("loginForm");

if (localStorage.getItem("egm-theme") === "light") {
  document.body.classList.add("light");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem("egm-theme", isLight ? "light" : "dark");
});

languageToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = languageDropdown.classList.toggle("open");
  languageToggle.setAttribute("aria-expanded", String(open));
  languageMenu.hidden = !open;
});

document.addEventListener("click", (event) => {
  if (!languageDropdown.contains(event.target)) {
    languageDropdown.classList.remove("open");
    languageToggle.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
  }
});

togglePassword.addEventListener("click", () => {
  const visible = passwordInput.type === "text";
  passwordInput.type = visible ? "password" : "text";
  togglePassword.innerHTML = visible
    ? '<i class="fa-regular fa-eye"></i>'
    : '<i class="fa-regular fa-eye-slash"></i>';
  togglePassword.setAttribute("aria-label", visible ? "Show password" : "Hide password");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Login form submitted!");
});


const tradeDropdown = document.querySelector('.trade-dropdown');
const tradeToggle = document.querySelector('.trade-toggle');
const tradeMenu = document.querySelector('.trade-menu');

if (tradeDropdown && tradeToggle && tradeMenu) {
  tradeDropdown.addEventListener('mouseenter', () => {
    tradeDropdown.classList.add('open');
    tradeToggle.setAttribute('aria-expanded', 'true');
    tradeMenu.hidden = false;
  });

  tradeDropdown.addEventListener('mouseleave', () => {
    tradeDropdown.classList.remove('open');
    tradeToggle.setAttribute('aria-expanded', 'false');
    tradeMenu.hidden = true;
  });

  tradeToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = tradeDropdown.classList.toggle('open');
    tradeToggle.setAttribute('aria-expanded', String(isOpen));
    tradeMenu.hidden = !isOpen;
  });

  document.addEventListener('click', (event) => {
    if (!tradeDropdown.contains(event.target)) {
      tradeDropdown.classList.remove('open');
      tradeToggle.setAttribute('aria-expanded', 'false');
      tradeMenu.hidden = true;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      tradeDropdown.classList.remove('open');
      tradeToggle.setAttribute('aria-expanded', 'false');
      tradeMenu.hidden = true;
    }
  });
}


/* Trade dropdown hover delay improvement */
let tradeDropdownCloseTimer;

if (typeof tradeDropdown !== "undefined" && tradeDropdown && tradeToggle && tradeMenu) {
  const openTradeDropdown = () => {
    clearTimeout(tradeDropdownCloseTimer);
    tradeDropdown.classList.add("open");
    tradeToggle.setAttribute("aria-expanded", "true");
    tradeMenu.hidden = false;
  };

  const delayedCloseTradeDropdown = () => {
    clearTimeout(tradeDropdownCloseTimer);
    tradeDropdownCloseTimer = setTimeout(() => {
      tradeDropdown.classList.remove("open");
      tradeToggle.setAttribute("aria-expanded", "false");
      tradeMenu.hidden = true;
    }, 420);
  };

  tradeDropdown.addEventListener("mouseenter", openTradeDropdown);
  tradeDropdown.addEventListener("mouseleave", delayedCloseTradeDropdown);
  tradeMenu.addEventListener("mouseenter", openTradeDropdown);
  tradeMenu.addEventListener("mouseleave", delayedCloseTradeDropdown);
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
