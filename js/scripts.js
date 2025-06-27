//ajout du header et footer
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

//animation parallax
const parallax = document.querySelector('.parallax-image');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const isMobile = window.innerWidth < 768;
  const factor = isMobile ? 0.1 : 0.2;
  const maxOffset = isMobile ? 20 : 50;

  const offset = Math.min(scrollY * factor, maxOffset);
  if (parallax)
    parallax.style.transform = `translateY(${offset}px)`;
});

function getElementByAttribute(attr, value, root) {
    root = root || document.body;
    if(root.hasAttribute(attr) && root.getAttribute(attr) == value) {
        return root;
    }
    var children = root.children, 
        element;
    for(var i = children.length; i--; ) {
        element = getElementByAttribute(attr, value, children[i]);
        if(element) {
            return element;
        }
    }
    return null;
}

//changer le theme
// Vérifie périodiquement si le bouton mode-toggle est présent (car le header est chargé dynamiquement)
const modeInterval = setInterval(() => {
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    clearInterval(modeInterval);
    const body = document.body;

    // Définir les modes et les classes CSS correspondantes
    const modes = [
      { name: 'Normal', class: '' }, // Mode par défaut, pas de classe
      { name: 'Sombre', class: 'dark-mode' },
      { name: 'Contrasté', class: 'high-contrast' }
    ];

    let currentModeIndex = 0; // 0 = Normal, 1 = Sombre, 2 = Contraste

    // Récupérer le mode sauvegardé ou utiliser le mode normal par défaut
    const savedModeIndex = localStorage.getItem('displayModeIndex');
    if (savedModeIndex !== null && !isNaN(parseInt(savedModeIndex))) {
      currentModeIndex = parseInt(savedModeIndex);
    }

    // Appliquer le mode initial au chargement de la page
    applyMode(currentModeIndex);

    modeToggle.addEventListener('click', () => {
      // Passer au mode suivant
      currentModeIndex = (currentModeIndex + 1) % modes.length;
      applyMode(currentModeIndex);

      // Sauvegarder le mode actuel dans le stockage local
      localStorage.setItem('displayModeIndex', currentModeIndex);
    });

    function applyMode(index) {
      // Supprimer toutes les classes de mode existantes
      modes.forEach(mode => {
        if (mode.class) {
          body.classList.remove(mode.class);
        }
      });

      // Ajouter la classe du mode actuel (si elle existe)
      if (modes[index].class) {
        body.classList.add(modes[index].class);
      }

      // Mettre à jour le texte du bouton
      modeToggle.textContent = `Mode ${modes[index].name}`;
      modeToggle.setAttribute('aria-label', `Changer le mode d'affichage actuel: ${modes[index].name}`);
    }
  }
}, 100);