// app.js - Common JavaScript functionality

// Simulate loading
window.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    initializeApp();
});

function initializeApp() {
    // Add touch feedback to all interactive elements
    addTouchFeedback();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            initSplashPage();
            break;
        case 'main.html':
            initMainPage();
            break;
        case 'import.html':
            initImportPage();
            break;
        case 'create.html':
            initCreatePage();
            break;
    }
}

// Splash Page Functions
function initSplashPage() {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'block';
        }
    }, 500);
}

function goToImport() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'pages/import.html';
    }, 1000);
}

function goToCreate() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'pages/create.html';
    }, 1000);
}

// Main Page Functions
function initMainPage() {
    // Initialize dropdowns
    document.addEventListener('click', handleDropdownClick);
    
    // Initialize settings sheet
    initSettingsSheet();
    
    // Initialize bottom navigation
    initBottomNav();
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown');
    
    // Close all other dropdowns
    allDropdowns.forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('active');
}

function handleDropdownClick(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    }
}

// Settings Sheet Functions
function initSettingsSheet() {
    const settingsSheet = document.querySelector('.settings-sheet');
    if (!settingsSheet) return;
    
    let startY = 0;
    let currentY = 0;
    
    settingsSheet.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    settingsSheet.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        if (deltaY > 0) {
            settingsSheet.style.transform = `translateY(${deltaY}px)`;
        }
    });
    
    settingsSheet.addEventListener('touchend', () => {
        const deltaY = currentY - startY;
        
        if (deltaY > 100) {
            closeSettings();
        }
        
        settingsSheet.style.transform = '';
    });
}

function openSettings() {
    const overlay = document.getElementById('settingsOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSettings() {
    const overlay = document.getElementById('settingsOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Import Page Functions
function initImportPage() {
    const importOptions = document.querySelectorAll('.import-option');
    const importForms = document.querySelectorAll('.import-form');
    
    importOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            importOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            option.classList.add('active');
            
            // Hide all forms
            importForms.forEach(form => form.style.display = 'none');
            // Show corresponding form
            if (importForms[index]) {
                importForms[index].style.display = 'flex';
            }
        });
    });
}

// Create Page Functions
function initCreatePage() {
    // Similar to import page initialization
}

// Bottom Navigation
function initBottomNav() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation
            const page = this.textContent.trim();
            console.log('Navigate to:', page);
            // Add navigation logic here
        });
    });
}

// Utility Functions
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

function addTouchFeedback() {
    const elements = document.querySelectorAll('button, a, .dropdown-item, .settings-item, .asset-item, .nav-item, .import-option');
    
    elements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// Navigation Functions
function goBack() {
    window.history.back();
}

function goToMain() {
    window.location.href = 'main.html';
}

// Form Validation
function validateSeedPhrase(seedPhrase) {
    const words = seedPhrase.trim().split(/\s+/);
    return words.length === 12 || words.length === 24;
}

function validatePrivateKey(privateKey) {
    const cleaned = privateKey.replace(/^0x/, '');
    return /^[0-9a-fA-F]{64}$/.test(cleaned);
}

// Mock Wallet Functions
function importWallet(type, data) {
    console.log('Importing wallet:', type, data);
    
    // Show loading
    showLoading();
    
    // Simulate import process
    setTimeout(() => {
        // Store wallet info (in real app, this would be encrypted)
        localStorage.setItem('walletAddress', '0x1234...5678');
        localStorage.setItem('walletType', type);
        
        // Navigate to main page
        window.location.href = 'main.html';
    }, 2000);
}

function createWallet() {
    console.log('Creating new wallet...');
    
    // Show loading
    showLoading();
    
    // Simulate wallet creation
    setTimeout(() => {
        // Generate mock seed phrase
        const mockSeedPhrase = 'abandon ability able about above absent absorb abstract absurd abuse access accident';
        
        // Store wallet info
        localStorage.setItem('walletAddress', '0x' + Math.random().toString(16).substr(2, 40));
        localStorage.setItem('walletType', 'new');
        localStorage.setItem('seedPhrase', mockSeedPhrase); // In real app, this would be encrypted!
        
        // Navigate to seed phrase display page
        alert('Your seed phrase: ' + mockSeedPhrase + '\n\nPlease write it down and keep it safe!');
        window.location.href = 'main.html';
    }, 2000);
}

// Export functions for use in HTML
window.goToImport = goToImport;
window.goToCreate = goToCreate;
window.toggleDropdown = toggleDropdown;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.goBack = goBack;
window.goToMain = goToMain;
window.importWallet = importWallet;
window.createWallet = createWallet;