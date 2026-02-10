// ===== GESTION DES ENVELOPPES =====

document.addEventListener('DOMContentLoaded', () => {
    const envelopes = document.querySelectorAll('.envelope');

    envelopes.forEach(envelope => {
        const outer = envelope.querySelector('.envelope-outer');
        const images = envelope.querySelectorAll('.envelope-images img');
        const prevBtn = envelope.querySelector('.envelope-nav .prev');
        const nextBtn = envelope.querySelector('.envelope-nav .next');

        let currentIndex = 0;
        let isAnimating = false;

        // Transition slide entre deux images
        function slideTo(newIndex, direction) {
            if (isAnimating || newIndex === currentIndex || images.length <= 1) return;
            isAnimating = true;

            const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
            const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

            const oldImg = images[currentIndex];
            const newImg = images[newIndex];

            // Lancer les animations
            oldImg.classList.remove('active');
            oldImg.classList.add(outClass);

            newImg.classList.add(inClass);

            // Nettoyer après l'animation
            const onEnd = () => {
                oldImg.classList.remove(outClass);
                oldImg.style.opacity = '0';

                newImg.classList.remove(inClass);
                newImg.classList.add('active');

                currentIndex = newIndex;
                isAnimating = false;
                newImg.removeEventListener('animationend', onEnd);
            };

            newImg.addEventListener('animationend', onEnd);
        }

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
                const newIndex = (currentIndex - 1 + images.length) % images.length;
                slideTo(newIndex, 'prev');
            });
        }

        // Navigation dans les images (suivant)
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentIndex + 1) % images.length;
                slideTo(newIndex, 'next');
            });
        }

        // Swipe tactile sur les images (mobile)
        const imagesContainer = envelope.querySelector('.envelope-images');
        if (imagesContainer && images.length > 1) {
            let touchStartX = 0;
            let touchStartY = 0;
            let isSwiping = false;

            imagesContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
                isSwiping = true;
            }, { passive: true });

            imagesContainer.addEventListener('touchmove', (e) => {
                if (!isSwiping) return;
                const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
                const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
                // Si le swipe est plus horizontal que vertical, empêcher le scroll
                if (diffX > diffY && diffX > 10) {
                    e.preventDefault();
                }
            }, { passive: false });

            imagesContainer.addEventListener('touchend', (e) => {
                if (!isSwiping) return;
                isSwiping = false;
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        // Swipe gauche → photo suivante
                        const newIndex = (currentIndex + 1) % images.length;
                        slideTo(newIndex, 'next');
                    } else {
                        // Swipe droite → photo précédente
                        const newIndex = (currentIndex - 1 + images.length) % images.length;
                        slideTo(newIndex, 'prev');
                    }
                }
            }, { passive: true });
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
