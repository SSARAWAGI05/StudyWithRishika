document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const registerModal = document.getElementById('register-modal');
    const signinModal = document.getElementById('signin-modal');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const registerForm = document.getElementById('registerForm');
    const signinForm = document.getElementById('signinForm');

    // Modal toggle functions
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        signinModal.classList.remove('active');
        registerModal.classList.add('active');
    });
    
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        signinModal.classList.add('active');
    });
    
    // Close button logic remains the same, except add/remove 'active' class
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            registerModal.classList.remove('active');
            signinModal.classList.remove('active');
        });
    });
    
    // Click outside to close modals
    window.addEventListener('click', (e) => {
        if (e.target === registerModal || e.target === signinModal) {
            registerModal.classList.remove('active');
            signinModal.classList.remove('active');
        }
    });
    

    // Registration handler
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        try {
            const user = authService.registerUser(username, email, password);
            alert('Registration successful! Please sign in.');
            registerModal.style.display = 'none';
            signinModal.style.display = 'flex';
            e.target.reset();
        } catch (error) {
            alert(error.message);
        }
    });

    // Sign in handler
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const { token } = authService.loginUser(username, password);
            localStorage.setItem('authToken', token);
            alert('Sign in successful!');
            signinModal.style.display = 'none';
            e.target.reset();
            
            updateUIForLoggedInUser(username);
        } catch (error) {
            alert(error.message);
        }
    });

        // Add this to your app.js or create a new modal.js file
    document.addEventListener('DOMContentLoaded', function() {
        // Get modal elements
        const signinModal = document.getElementById('signin-modal');
        const registerModal = document.getElementById('register-modal');
        const loginLink = document.getElementById('loginLink');
        const closeButtons = document.querySelectorAll('.close-button, .close');
        
        // Show signin modal
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            signinModal.style.display = 'flex';  // Using flex instead of block for better centering
        });
        
        // Close modals when clicking the close button
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                signinModal.style.display = 'none';
                registerModal.style.display = 'none';
            });
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === signinModal) {
                signinModal.style.display = 'none';
            }
            if (e.target === registerModal) {
                registerModal.style.display = 'none';
            }
        });
        
        // Switch between signin and register modals
        document.getElementById('showSignin').addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            signinModal.style.display = 'flex';
        });
    });

    
    // UI update function
    function updateUIForLoggedInUser(username) {
        const signinLink = document.querySelector('a[href="#signin"]');
        signinLink.textContent = username;
        signinLink.href = '#profile';
        
        const nav = document.querySelector('.nav-links');
        const logoutLi = document.createElement('li');
        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Logout';
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.reload();
        });
        logoutLi.appendChild(logoutLink);
        nav.appendChild(logoutLi);
    }

    // Check for existing session
    const token = localStorage.getItem('authToken');
    if (token) {
        const userData = authService.verifyToken(token);
        if (userData) {
            updateUIForLoggedInUser(userData.username);
        }
    }
});