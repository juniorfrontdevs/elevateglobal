const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const mainNav=document.getElementById("mainNav");
const backToTop=document.getElementById("backToTop");
const treasureButton=document.getElementById("treasureButton");
const bonusModal=document.getElementById("bonusModal");
const closeBonus=document.getElementById("closeBonus");

if(localStorage.getItem("egm-theme")==="light"){
  document.body.classList.add("light");
  themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  const isLight=document.body.classList.contains("light");
  themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem("egm-theme",isLight?"light":"dark");
});

menuToggle.addEventListener("click",()=>{
  mainNav.classList.toggle("open");
  const open=mainNav.classList.contains("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu");
});

document.querySelectorAll(".accordion-item button").forEach(button=>{
  button.addEventListener("click",()=>{
    const selected=button.closest(".accordion-item");
    document.querySelectorAll(".accordion-item").forEach(item=>{
      const itemButton=item.querySelector("button");
      const icon=item.querySelector("i");
      if(item!==selected){
        item.classList.remove("open");
        itemButton.setAttribute("aria-expanded","false");
        icon.className="fa-solid fa-chevron-down";
      }
    });
    selected.classList.toggle("open");
    const open=selected.classList.contains("open");
    button.setAttribute("aria-expanded",String(open));
    button.querySelector("i").className=open?"fa-solid fa-chevron-up":"fa-solid fa-chevron-down";
  });
});

document.querySelector(".subscribe-form").addEventListener("submit",event=>{
  event.preventDefault();
  const input=event.currentTarget.querySelector("input");
  if(!input.value.trim()) return;
  alert("Thank you for subscribing!");
  input.value="";
});

window.addEventListener("scroll",()=>{
  backToTop.classList.toggle("show",window.scrollY>360);
});

treasureButton.addEventListener("click",()=>{
  bonusModal.hidden=false;
});

closeBonus.addEventListener("click",()=>{
  bonusModal.hidden=true;
});

bonusModal.addEventListener("click",event=>{
  if(event.target===bonusModal) bonusModal.hidden=true;
});

document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&!bonusModal.hidden) bonusModal.hidden=true;
});

const marketTabs = document.querySelectorAll('[data-market-tab]');
const marketEmpty = document.getElementById('marketEmpty');

marketTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    marketTabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const labelMap = {
      all: 'Showing all available trading pairs.',
      crypto: 'Showing crypto trading pairs.',
      fiat: 'Showing fiat trading pairs.'
    };

    if (marketEmpty) {
      marketEmpty.textContent = labelMap[tab.dataset.marketTab] || labelMap.all;
    }
  });
});


const rotatingNewsText = document.getElementById('newsText');

const rotatingNewsMessages = [
  'Withdrawal within 0-2 days',
  'Bonus up to 100% on each deposits'
];

let rotatingNewsIndex = 0;

if (rotatingNewsText) {
  setInterval(() => {
    rotatingNewsIndex = (rotatingNewsIndex + 1) % rotatingNewsMessages.length;
    rotatingNewsText.classList.add('is-changing');

    setTimeout(() => {
      rotatingNewsText.textContent = rotatingNewsMessages[rotatingNewsIndex];
      rotatingNewsText.classList.remove('is-changing');
    }, 280);
  }, 3000);
}

const languageDropdown=document.querySelector('.language-dropdown');
const languageToggle=document.querySelector('.language-toggle');
const languageMenu=document.querySelector('.language-menu');
if(languageDropdown&&languageToggle&&languageMenu){
  languageToggle.addEventListener('click',(event)=>{
    event.stopPropagation();
    const isOpen=languageDropdown.classList.toggle('open');
    languageToggle.setAttribute('aria-expanded',String(isOpen));
    languageMenu.hidden=!isOpen;
  });
  languageMenu.querySelectorAll('button').forEach((button)=>{
    button.addEventListener('click',()=>{
      languageDropdown.classList.remove('open');
      languageToggle.setAttribute('aria-expanded','false');
      languageMenu.hidden=true;
    });
  });
  document.addEventListener('click',(event)=>{
    if(!languageDropdown.contains(event.target)){
      languageDropdown.classList.remove('open');
      languageToggle.setAttribute('aria-expanded','false');
      languageMenu.hidden=true;
    }
  });
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'){
      languageDropdown.classList.remove('open');
      languageToggle.setAttribute('aria-expanded','false');
      languageMenu.hidden=true;
    }
  });
}


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
