// Select DOM elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Track menu state
let isMenuOpen = false;

// Toggle menu function
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Toggle active classes
    mobileMenuButton.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Add click event listener to menu button
mobileMenuButton.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnButton = mobileMenuButton.contains(event.target);
    
    if (isMenuOpen && !isClickInsideMenu && !isClickOnButton) {
        toggleMenu();
    }
});

// Close menu when clicking on a nav link
const navLinksArray = document.querySelectorAll('.nav-links a');
navLinksArray.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    });
});

// Close menu on window resize (if open)
window.addEventListener('resize', () => {
    if (window.innerWidth > 767 && isMenuOpen) {
        toggleMenu();
    }
});

// Add escape key listener to close menu
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});