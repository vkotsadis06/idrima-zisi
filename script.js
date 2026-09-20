// script.js
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for fade-in animations
const sections = document.querySelectorAll('.section-animate');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Simple lightbox for gallery images
const galleryImgs = document.querySelectorAll('.gallery-img');
galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';

        const largeImg = document.createElement('img');
        largeImg.src = img.src;
        largeImg.style.maxWidth = '90%';
        largeImg.style.maxHeight = '90%';
        largeImg.style.borderRadius = '10px';

        modal.appendChild(largeImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });
});

// Φόρτωση Εκδηλώσεων από το CMS
document.addEventListener("DOMContentLoaded", () => {
    fetch('data/events.json', { cache: 'no-store' })
        .then(response => {
            if (!response.ok) throw new Error('Δεν βρέθηκε αρχείο');
            return response.json();
        })
        .then(data => {
            const eventsList = document.getElementById('dynamic-events-list');
            if (!eventsList) return;
            
            eventsList.innerHTML = ''; // Καθαρίζουμε την οθόνη
            
            if (data.events && data.events.length > 0) {
                data.events.forEach(event => {
                    const li = document.createElement('li');
                    li.className = 'mb-4 p-4 bg-white rounded shadow-sm border-start border-4';
                    li.style.borderColor = '#8B4513';
                    
                    // Αν έχει ανεβάσει αφίσα, την εμφανίζουμε
                    let imgHtml = event.image ? `<img src="${event.image}" class="img-fluid rounded mt-3 shadow-sm" style="max-height: 300px; object-fit: cover;">` : '';
                    
                    li.innerHTML = `
                        <h4 style="color: #8B4513; margin-bottom: 0.5rem;">${event.title}</h4>
                        <p class="text-muted mb-2"><strong><i class="bi bi-calendar3"></i> ${event.date}</strong></p>
                        <p class="mb-0" style="font-size: 1.1rem;">${event.description}</p>
                        ${imgHtml}
                    `;
                    eventsList.appendChild(li);
                });
            } else {
                eventsList.innerHTML = '<p class="text-center">Δεν υπάρχουν προγραμματισμένες εκδηλώσεις αυτή τη στιγμή.</p>';
            }
        })
        .catch(error => {
            console.log('Αναμονή για καταχώρηση εκδηλώσεων...');
        });
});
