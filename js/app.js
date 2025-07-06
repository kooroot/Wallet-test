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
        case 'trade.html':
            initTradePage();
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
    // Don't show loading on initial page load
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
    // Initialize drawer
    initDrawer();
    
    // Initialize drawer sections (dropdown functionality)
    initDrawerSections();
    
    // Initialize settings sheet
    initSettingsSheet();
    
    // Initialize bottom sheets (account and network)
    initBottomSheets();
    
    // Initialize bottom navigation
    initBottomNav();
    
    // Initialize account and network switching
    initAccountSwitching();
    initNetworkSwitching();
}

// Drawer Functions
function initDrawer() {
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    
    // Handle drawer swipe gestures
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    drawer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    drawer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        
        if (deltaX < 0) {
            drawer.style.transform = `translateX(${deltaX}px)`;
        }
    });
    
    drawer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        const deltaX = currentX - startX;
        
        if (deltaX < -100) {
            closeDrawer();
        } else {
            drawer.style.transform = '';
        }
    });
}

function openDrawer() {
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    
    drawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    
    drawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    drawer.style.transform = '';
}

// Account Switching
function initAccountSwitching() {
    const accountItems = document.querySelectorAll('.account-item');
    const currentAccount = document.querySelector('.current-account');
    
    accountItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update current account
            const accountName = this.querySelector('.account-name').textContent;
            const accountAddress = this.querySelector('.account-address').textContent;
            const accountBalance = this.querySelector('.account-balance').textContent;
            
            // Update UI
            currentAccount.querySelector('.account-name').textContent = accountName;
            currentAccount.querySelector('.account-address').textContent = accountAddress;
            currentAccount.querySelector('.account-balance').textContent = accountBalance;
            
            // Close drawer after selection
            setTimeout(() => closeDrawer(), 300);
        });
    });
}

// Network Switching
function initNetworkSwitching() {
    const networkItems = document.querySelectorAll('.network-item');
    
    networkItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all networks
            networkItems.forEach(net => net.classList.remove('active'));
            
            // Add active class to selected network
            this.classList.add('active');
            
            // Close drawer after selection
            setTimeout(() => closeDrawer(), 300);
        });
    });
}

// Scanner Function
function openScanner() {
    console.log('Opening QR Scanner');
    // Add QR scanner functionality here
    alert('QR Scanner will be implemented');
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

// Trade Page Functions
function initTradePage() {
    // Initialize bottom navigation
    initBottomNav();
    
    // Initialize trade actions
    const tradeButtons = document.querySelectorAll('.trade-action-btn');
    tradeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            console.log('Trade action:', action);
            // Add trade action logic here
        });
    });
    
    // Initialize trade pairs
    const tradePairs = document.querySelectorAll('.trade-pair');
    tradePairs.forEach(pair => {
        pair.addEventListener('click', function() {
            const pairName = this.querySelector('.pair-name').textContent;
            console.log('Selected pair:', pairName);
            // Add trade pair selection logic here
        });
    });
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
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

// Navigation function
function navigateToPage(page) {
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    
    switch(page) {
        case 'home':
            window.location.href = basePath + '/main.html';
            break;
        case 'trade':
            window.location.href = basePath + '/trade.html';
            break;
        case 'dapp':
            // Placeholder for DApp page
            console.log('Navigate to DApp page');
            alert('DApp page coming soon!');
            break;
        case 'history':
            // Placeholder for History page
            console.log('Navigate to History page');
            alert('History page coming soon!');
            break;
    }
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

// Drawer Section Toggle Function
function toggleSection(sectionName) {
    const content = document.getElementById(sectionName + '-content');
    const arrow = document.getElementById(sectionName + '-arrow');
    
    if (content.classList.contains('collapsed')) {
        // Open this section
        content.classList.remove('collapsed');
        arrow.textContent = '▼';
    } else {
        // Close this section
        content.classList.add('collapsed');
        arrow.textContent = '▶';
    }
}

// Initialize drawer sections
function initDrawerSections() {
    // No longer needed since we're using bottom sheets for all sections
}

// Social Login Functions
function loginWithGoogle() {
    console.log('Login with Google');
    showLoading();
    
    // Simulate OAuth flow
    setTimeout(() => {
        // In real app, this would handle Google OAuth
        const mockEmail = 'user@gmail.com';
        localStorage.setItem('userEmail', mockEmail);
        localStorage.setItem('authMethod', 'google');
        
        // Create wallet for the user
        createWalletForUser(mockEmail);
    }, 1500);
}

function loginWithApple() {
    console.log('Login with Apple');
    showLoading();
    
    setTimeout(() => {
        const mockEmail = 'user@icloud.com';
        localStorage.setItem('userEmail', mockEmail);
        localStorage.setItem('authMethod', 'apple');
        
        createWalletForUser(mockEmail);
    }, 1500);
}

function loginWithTwitter() {
    console.log('Login with X (Twitter)');
    showLoading();
    
    setTimeout(() => {
        const mockEmail = 'user@x.com';
        localStorage.setItem('userEmail', mockEmail);
        localStorage.setItem('authMethod', 'twitter');
        
        createWalletForUser(mockEmail);
    }, 1500);
}

function loginWithFarcaster() {
    console.log('Login with Farcaster');
    showLoading();
    
    setTimeout(() => {
        const mockEmail = 'user@farcaster.xyz';
        localStorage.setItem('userEmail', mockEmail);
        localStorage.setItem('authMethod', 'farcaster');
        
        createWalletForUser(mockEmail);
    }, 1500);
}

function showEmailInput() {
    // Navigate to email input page
    window.location.href = 'pages/email-input.html';
}

function createWalletForUser(email) {
    // Store user email for wallet creation
    localStorage.setItem('userEmail', email);
    
    // Navigate to wallet setup page
    window.location.href = 'pages/wallet-setup.html';
}

// Account Sheet Functions
function openAccountSheet() {
    const overlay = document.getElementById('accountOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeDrawer(); // Close drawer when opening sheet
    }
}

function closeAccountSheet() {
    const overlay = document.getElementById('accountOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Network Sheet Functions
function openNetworkSheet() {
    const overlay = document.getElementById('networkOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeDrawer(); // Close drawer when opening sheet
    }
}

function closeNetworkSheet() {
    const overlay = document.getElementById('networkOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize bottom sheet touch gestures
function initBottomSheets() {
    const sheets = document.querySelectorAll('.account-sheet, .network-sheet');
    
    sheets.forEach(sheet => {
        let startY = 0;
        let currentY = 0;
        
        sheet.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        sheet.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            if (deltaY > 0) {
                sheet.style.transform = `translateY(${deltaY}px)`;
            }
        });
        
        sheet.addEventListener('touchend', () => {
            const deltaY = currentY - startY;
            
            if (deltaY > 100) {
                const sheetType = sheet.classList.contains('account-sheet') ? 'Account' : 'Network';
                window[`close${sheetType}Sheet`]();
            }
            
            sheet.style.transform = '';
        });
    });
}

// Export functions for use in HTML
window.goToImport = goToImport;
window.goToCreate = goToCreate;
window.toggleSection = toggleSection;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.openScanner = openScanner;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.openAccountSheet = openAccountSheet;
window.closeAccountSheet = closeAccountSheet;
window.openNetworkSheet = openNetworkSheet;
window.closeNetworkSheet = closeNetworkSheet;
window.goBack = goBack;
window.goToMain = goToMain;
window.importWallet = importWallet;
window.createWallet = createWallet;
window.loginWithGoogle = loginWithGoogle;
window.loginWithApple = loginWithApple;
window.loginWithTwitter = loginWithTwitter;
window.loginWithFarcaster = loginWithFarcaster;
window.showEmailInput = showEmailInput;
window.goToCreateWallet = goToCreateWallet;
window.goToImportWallet = goToImportWallet;

// Wallet Setup Functions
function goToCreateWallet() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'create-wallet.html';
    }, 500);
}

function goToImportWallet() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'import-wallet.html';
    }, 500);
}