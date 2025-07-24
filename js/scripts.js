//ajout du header, footer et le modal
document.addEventListener("DOMContentLoaded", function () {
  fetch("header.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier :", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("footer.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier :", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("modal.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("modal-container").innerHTML = data;
      handleTheme()
      handleFontDyslexic()
      handleFontZoom()
    })
    .catch(error => {
      console.error("Erreur lors du chargement du fichier :", error);
    });
});

//animation header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


//animation fade in
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target); // facultatif
    }
  });
}, {
  threshold: 0.2
});

faders.forEach(el => appearOnScroll.observe(el));

//animation scroll-up -> se resserre
document.addEventListener('scroll', () => {
 const cards = document.querySelectorAll('.scroll-up');

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardBottom = rect.bottom;

    // Si le bas de la carte est a 1/3
    var tier = window.screen.height / 3;
    if (cardBottom > tier) {
      card.style.transform = 'scaleY(1)';
    } else {
      // Plus le bas de la carte monte hors écran, plus on compresse
      const progress = Math.min(Math.abs(cardBottom) / window.innerHeight, 1);
      const scaleY = 1 - (progress * 0.1); // max 10% de compression
      card.style.transform = `scaleY(${scaleY})`;
    }
  });
});

//animation parallax
const parallax = document.querySelector('.parallax-image');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const isMobile = window.innerWidth < 768;
  const factor = 0.2;
  const maxOffset = isMobile ? 30 : 50;

  const offset = Math.min(scrollY * factor, maxOffset);
  if (parallax)
    parallax.style.transform = `translateY(${offset}px)`;
});

function getElementByAttribute(attr, value, root) {
  root = root || document.body;
  if (root.hasAttribute(attr) && root.getAttribute(attr) == value) {
    return root;
  }
  var children = root.children,
    element;
  for (var i = children.length; i--;) {
    element = getElementByAttribute(attr, value, children[i]);
    if (element) {
      return element;
    }
  }
  return null;
}

//changer le theme
function handleTheme() {
  // Récupère les radios
  const defaultRadio = document.getElementById('default-mode-toggle');
  const darkRadio = document.getElementById('dark-mode-toggle');
  const contrastRadio = document.getElementById('high-contrast-toggle');
  const body = document.body;

  // Fonction pour appliquer la classe
  function applyMode(mode) {
    body.classList.remove('dark-mode', 'high-contrast');
    if (mode === 'dark') body.classList.add('dark-mode');
    if (mode === 'contrast') body.classList.add('high-contrast');
    localStorage.setItem('displayMode', mode);
  }

  // Écouteurs d'événements
  if (defaultRadio && darkRadio && contrastRadio) {
    defaultRadio.addEventListener('change', () => applyMode('default'));
    darkRadio.addEventListener('change', () => applyMode('dark'));
    contrastRadio.addEventListener('change', () => applyMode('contrast'));

    // Appliquer le mode sauvegardé au chargement
    const saved = localStorage.getItem('displayMode');
    if (saved === 'dark') {
      darkRadio.checked = true;
      applyMode('dark');
    } else if (saved === 'contrast') {
      contrastRadio.checked = true;
      applyMode('contrast');
    } else {
      defaultRadio.checked = true;
      applyMode('default');
    }
  }
}

//changer la font
function handleFontDyslexic() {
  // Récupère les radios
  const dysOffRadio = document.getElementById('font-dyslexic-off');
  const dysOnRadio = document.getElementById('font-dyslexic-on');
  const body = document.body;

  // Fonction pour appliquer la classe
  function applyMode(mode) {
    body.classList.remove('dyslexic');
    if (mode === 'dys-on') body.classList.add('dyslexic');
    localStorage.setItem('fontDyslexic', mode);
  }

  // Écouteurs d'événements
  if (dysOffRadio && dysOnRadio) {
    dysOnRadio.addEventListener('change', () => applyMode('dys-on'));
    dysOffRadio.addEventListener('change', () => applyMode('dys-off'));

    // Appliquer le mode sauvegardé au chargement
    const saved = localStorage.getItem('fontDyslexic');
    if (saved === 'dys-on') {
      dysOnRadio.checked = true;
      applyMode('dys-on');
    } else {
      dysOffRadio.checked = true;
      applyMode('dys-off');
    }
  }
}

//changer la font
function handleFontZoom() {
  // Récupère les radios
  const zoomOffRadio = document.getElementById('font-zoom-off');
  const zoomOnRadio = document.getElementById('font-zoom-on');
  const body = document.body;

  // Fonction pour appliquer la classe
  function applyMode(mode) {
    body.classList.remove('zoom');
    if (mode === 'zoom-on') body.classList.add('zoom');
    localStorage.setItem('fontZoom', mode);
  }

  // Écouteurs d'événements
  if (zoomOffRadio && zoomOnRadio) {
    zoomOnRadio.addEventListener('change', () => applyMode('zoom-on'));
    zoomOffRadio.addEventListener('change', () => applyMode('zoom-off'));

    // Appliquer le mode sauvegardé au chargement
    const saved = localStorage.getItem('fontZoom');
    if (saved === 'zoom-on') {
      zoomOnRadio.checked = true;
      applyMode('zoom-on');
    } else {
      zoomOffRadio.checked = true;
      applyMode('zoom-off');
    }
  }
}