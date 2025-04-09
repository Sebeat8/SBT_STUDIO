// SBT STUDIO Portfolio - Główny plik JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja po załadowaniu DOM
    initPortfolio();
    initAnimations();
    initGallery();
    initNavigation();
});

// Główna inicjalizacja portfolio
function initPortfolio() {
    console.log('SBT STUDIO Portfolio - inicjalizacja');
    
    // Sprawdzenie, czy strona jest wyświetlana w ramach GitHub Pages
    if (window.location.hostname.includes('github.io')) {
        console.log('Strona działa na GitHub Pages');
    }
    
    // Obsługa przycisku eksportu do PDF
    const pdfButton = document.getElementById('exportPdf');
    if (pdfButton) {
        pdfButton.addEventListener('click', function() {
            window.print();
        });
    }
}

// Inicjalizacja animacji
function initAnimations() {
    // Animacje przy przewijaniu strony
    const animatedElements = document.querySelectorAll('.animated');
    
    // Funkcja sprawdzająca czy element jest widoczny w oknie przeglądarki
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Funkcja uruchamiająca animacje dla widocznych elementów
    function handleScrollAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Nasłuchiwanie zdarzenia przewijania
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Pierwsze uruchomienie, aby od razu uruchomić animacje widocznych elementów
    handleScrollAnimations();
    
    // Animacje nagłówków sekcji
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animated-header');
    });
}

// Inicjalizacja galerii
function initGallery() {
    // Pobieranie wszystkich obrazów galerii
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Dodawanie efektu hover dla elementów galerii
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('gallery-item-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('gallery-item-hover');
        });
        
        // Obsługa kliknięcia - powiększenie obrazu
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            openLightbox(imgSrc);
        });
    });
    
    // Funkcja otwierająca lightbox z powiększonym obrazem
    function openLightbox(src) {
        // Tworzenie elementu lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        // Tworzenie kontenera obrazu
        const imgContainer = document.createElement('div');
        imgContainer.className = 'lightbox-container';
        
        // Tworzenie elementu obrazu
        const img = document.createElement('img');
        img.src = src;
        
        // Tworzenie przycisku zamknięcia
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        // Dodawanie elementów do DOM
        imgContainer.appendChild(img);
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(imgContainer);
        document.body.appendChild(lightbox);
        
        // Blokowanie przewijania body
        document.body.style.overflow = 'hidden';
        
        // Animacja otwarcia
        setTimeout(() => {
            lightbox.classList.add('lightbox-open');
        }, 10);
        
        // Obsługa zamknięcia
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Funkcja zamykająca lightbox
        function closeLightbox() {
            lightbox.classList.remove('lightbox-open');
            
            // Usunięcie lightboxa po zakończeniu animacji
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
    }
}

// Inicjalizacja nawigacji
function initNavigation() {
    // Obsługa menu mobilnego
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            this.classList.toggle('menu-toggle-active');
        });
    }
    
    // Płynne przewijanie do sekcji po kliknięciu w link nawigacji
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Pobieranie id sekcji z atrybutu href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                // Zamknięcie menu mobilnego, jeśli jest otwarte
                if (nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    menuToggle.classList.remove('menu-toggle-active');
                }
                
                // Przewijanie do sekcji
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Odjęcie wysokości nagłówka
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Aktywacja linku nawigacji na podstawie widocznej sekcji
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        
        // Znajdź aktualnie widoczną sekcję
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100 && 
                window.pageYOffset < sectionTop + sectionHeight - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Ustaw aktywny link
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Nasłuchiwanie zdarzenia przewijania
    window.addEventListener('scroll', setActiveNavLink);
    
    // Pierwsze uruchomienie
    setActiveNavLink();
}

// Obsługa formularza kontaktowego, jeśli istnieje
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Tutaj możesz dodać kod obsługujący wysyłkę formularza
            // Na GitHub Pages nie będzie działać backend, więc potrzebujesz usługi zewnętrznej
            
            // Przykład z FormSubmit (https://formsubmit.co/)
            // Musisz zmodyfikować action formularza w HTML
            
            console.log('Formularz wysłany');
            alert('Dziękujemy za wiadomość! Odpowiemy tak szybko jak to możliwe.');
            contactForm.reset();
        });
    }
}

// Dodatkowe funkcje pomocnicze

// Funkcja opóźniająca wykonanie (debounce)
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Obsługa przewijania strony - pokazywanie/ukrywanie przycisku "Powrót do góry"
function handleScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        // Pokazywanie/ukrywanie przycisku w zależności od pozycji przewijania
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Obsługa kliknięcia przycisku
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Inicjalizacja wszystkich pozostałych funkcji
window.addEventListener('load', function() {
    handleContactForm();
    handleScrollToTop();
});

