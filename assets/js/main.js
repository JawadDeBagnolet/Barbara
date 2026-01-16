// ===== GESTION DES ENVELOPPES =====

document.addEventListener('DOMContentLoaded', () => {
    const envelopes = document.querySelectorAll('.envelope');

    envelopes.forEach(envelope => {
        const outer = envelope.querySelector('.envelope-outer');
        const images = envelope.querySelectorAll('.envelope-images img');
        const prevBtn = envelope.querySelector('.envelope-nav .prev');
        const nextBtn = envelope.querySelector('.envelope-nav .next');

        let currentIndex = 0;

        // Ouvrir l'enveloppe au clic
        outer.addEventListener('click', (e) => {
            e.stopPropagation();
            // Fermer toutes les autres enveloppes
            envelopes.forEach(env => {
                if (env !== envelope) {
                    env.classList.remove('open');
                }
            });
            // Ouvrir celle-ci
            envelope.classList.toggle('open');
        });

        // Navigation dans les images (précédent)
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                images[currentIndex].classList.add('active');
            });
        }

        // Navigation dans les images (suivant)
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            });
        }
    });

    // Fermer l'enveloppe en cliquant en dehors
    document.addEventListener('click', (e) => {
        const clickedInside = e.target.closest('.envelope');
        if (!clickedInside) {
            envelopes.forEach(env => env.classList.remove('open'));
        }
    });
});

// ===== AJOUT DE CŒURS FLOTTANTS DYNAMIQUES =====

function createFloatingHearts() {
    const body = document.querySelector('.valentine-body');
    const heartCount = 3;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        body.appendChild(heart);
    }
}

createFloatingHearts();
