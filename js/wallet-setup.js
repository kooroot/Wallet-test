// Wallet Setup Page Functions

// This page is for setting up wallet - don't auto-redirect
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wallet setup page loaded');
    // No auto-check here - user should be able to create/import new wallet
});

// Navigation functions are already defined in app.js via window object

// Debug function to clear wallet data (for testing)
window.clearWalletData = function() {
    localStorage.removeItem('walletSetup');
    localStorage.removeItem('walletData');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authMethod');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletType');
    localStorage.removeItem('seedPhrase');
    console.log('Wallet data cleared!');
}

// Complete localStorage clear (for debugging)
window.clearAllData = function() {
    localStorage.clear();
    console.log('All localStorage data cleared!');
    window.location.reload();
} 