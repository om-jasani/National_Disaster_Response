document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Navigation and section visibility
    const sectionLinks = document.querySelectorAll('.nav-link, .scroll-link');
    const sections = document.querySelectorAll('main > section');

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
    }

    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            showSection(sectionId);
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
            }
            // Update the URL hash without triggering a scroll
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    sectionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Adjust section display
    function adjustSectionDisplay() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else if (!hash || hash === 'home') {
            showSection('home');
        }
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Modals
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeBtns = document.querySelectorAll('.close');

    function showModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    loginBtn.addEventListener('click', () => showModal(loginModal));
    signupBtn.addEventListener('click', () => showModal(signupModal));
    closeBtns.forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal'))));

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted:', new FormData(form));
            alert('Form submitted successfully!');
            form.reset();
            if (form.closest('.modal')) {
                closeModal(form.closest('.modal'));
            }
        });
    });

    // Language selector
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', (e) => {
        alert(`Language changed to ${e.target.value}. This feature is not fully implemented.`);
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    const header = document.querySelector('header');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });
    }, observerOptions);

    observer.observe(header);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Cookie consent
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 1000);
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('active');
    });

    // Mock data for alerts
    const mockAlerts = [
        { id: 1, type: 'Severe Weather', message: 'Heavy rainfall expected in the southern region.' },
        { id: 2, type: 'Earthquake', message: 'Magnitude 5.2 earthquake reported in the western province.' },
        { id: 3, type: 'Wildfire', message: 'Wildfire spreading in the northern forest area. Evacuation may be necessary.' }
    ];

    // Populate alerts
    const alertList = document.getElementById('alert-list');
    mockAlerts.forEach((alert, index) => {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert');
        alertElement.innerHTML = `
            <h3>${alert.type}</h3>
            <p>${alert.message}</p>
        `;
        alertElement.style.animationDelay = `${index * 0.2}s`;
        alertList.appendChild(alertElement);
    });

    // Mock data for emergency contacts
    const mockContacts = [
        { name: 'National Emergency Hotline', number: '911' },
        { name: 'Fire Department', number: '555-0123' },
        { name: 'Police Department', number: '555-0456' },
        { name: 'Ambulance Services', number: '555-0789' }
    ];

    // Populate emergency contacts
    const emergencyContacts = document.getElementById('emergency-contacts');
    mockContacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.name}: ${contact.number}`;
        emergencyContacts.appendChild(li);
    });

    // Mock data for preparedness guides
    const mockGuides = [
        { title: 'Hurricane Preparedness', url: '#' },
        { title: 'Earthquake Safety', url: '#' },
        { title: 'Flood Response', url: '#' },
        { title: 'Wildfire Evacuation', url: '#' }
    ];

    // Populate preparedness guides
    const preparednessGuides = document.getElementById('preparedness-guides');
    mockGuides.forEach(guide => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = guide.url;
        a.textContent = guide.title;
        li.appendChild(a);
        preparednessGuides.appendChild(li);
    });

    // Mock map initialization
    const crisisMap = document.getElementById('crisis-map');
    crisisMap.innerHTML = '<p>Interactive crisis map would be displayed here.</p>';

    // Logo click handler
    const logo = document.querySelector('.logo a');
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('home');
    });

    // Improve language selector behavior
    languageSelector.addEventListener('focus', () => {
        languageSelector.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    languageSelector.addEventListener('blur', () => {
        languageSelector.style.backgroundColor = 'transparent';
    });

    // Event listeners for page load and navigation
    window.addEventListener('load', adjustSectionDisplay);
    window.addEventListener('popstate', adjustSectionDisplay);
});