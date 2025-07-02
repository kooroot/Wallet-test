// PIN Setup JavaScript

let userPin = '';
let isConfirmStep = false;

// Initialize PIN setup
document.addEventListener('DOMContentLoaded', () => {
    // Focus on hidden input
    const pinInput = document.getElementById('pin-input');
    pinInput.focus();
    
    // Handle input changes
    pinInput.addEventListener('input', handlePinInput);
    document.getElementById('confirm-pin-input').addEventListener('input', handleConfirmPinInput);
});

// Add digit to PIN
function addDigit(digit, isConfirm = false) {
    const input = isConfirm ? document.getElementById('confirm-pin-input') : document.getElementById('pin-input');
    if (input.value.length < 6) {
        input.value += digit;
        input.dispatchEvent(new Event('input'));
    }
}

// Delete last digit
function deleteDigit(isConfirm = false) {
    const input = isConfirm ? document.getElementById('confirm-pin-input') : document.getElementById('pin-input');
    if (input.value.length > 0) {
        input.value = input.value.slice(0, -1);
        input.dispatchEvent(new Event('input'));
    }
}

// Handle PIN input
function handlePinInput(e) {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    e.target.value = value;
    
    // Update dots
    updatePinDots(value, 'pin-dot-');
    
    // Auto submit when 6 digits
    if (value.length === 6) {
        setTimeout(() => {
            handleSetPin({ preventDefault: () => {} });
        }, 300);
    }
}

// Handle confirm PIN input
function handleConfirmPinInput(e) {
    const value = e.target.value.replace(/\D/g, ''); // Only numbers
    e.target.value = value;
    
    // Update dots
    updatePinDots(value, 'confirm-dot-');
    
    // Auto submit when 6 digits
    if (value.length === 6) {
        setTimeout(() => {
            handleConfirmPin({ preventDefault: () => {} });
        }, 300);
    }
}

// Update PIN dots display
function updatePinDots(value, prefix) {
    for (let i = 1; i <= 6; i++) {
        const dot = document.getElementById(prefix + i);
        if (i <= value.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    }
}

// Handle set PIN
function handleSetPin(event) {
    event.preventDefault();
    
    const pinInput = document.getElementById('pin-input');
    const pin = pinInput.value;
    
    if (pin.length !== 6) {
        return;
    }
    
    // Store the PIN temporarily
    userPin = pin;
    
    // Show loading state
    const infoText = document.getElementById('pin-info-text');
    infoText.textContent = 'PIN SET! PLEASE CONFIRM...';
    
    // Transition to confirm step
    setTimeout(() => {
        showConfirmStep();
    }, 500);
}

// Show confirm PIN step
function showConfirmStep() {
    const setStep = document.getElementById('set-pin-step');
    const confirmStep = document.getElementById('confirm-pin-step');
    const subtitle = document.getElementById('pin-subtitle');
    
    // Update subtitle
    subtitle.textContent = 'CONFIRM YOUR PIN CODE TO CONTINUE';
    
    // Transition steps
    setStep.classList.remove('active');
    setStep.classList.add('hidden');
    confirmStep.classList.add('active');
    
    // Focus on confirm input
    const confirmInput = document.getElementById('confirm-pin-input');
    setTimeout(() => {
        confirmInput.focus();
    }, 300);
    
    isConfirmStep = true;
}

// Handle confirm PIN
function handleConfirmPin(event) {
    event.preventDefault();
    
    const confirmInput = document.getElementById('confirm-pin-input');
    const confirmPin = confirmInput.value;
    
    if (confirmPin.length !== 6) {
        return;
    }
    
    const infoText = document.getElementById('confirm-info-text');
    
    // Check if PINs match
    if (confirmPin === userPin) {
        // Success
        infoText.textContent = 'PIN CONFIRMED!';
        
        // Disable input
        confirmInput.disabled = true;
        
        // Store PIN securely (in real app, this would be encrypted)
        const userEmail = localStorage.getItem('userEmail');
        const pinData = {
            email: userEmail,
            pin: btoa(userPin), // Basic encoding (use proper encryption in production)
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('userPin', JSON.stringify(pinData));
        
        // Create wallet and proceed
        setTimeout(() => {
            createWalletForUser(userEmail);
        }, 1000);
    } else {
        // Error - PINs don't match
        infoText.textContent = 'PINS DO NOT MATCH. TRY AGAIN.';
        infoText.style.color = 'var(--cyber-accent)';
        
        // Clear input
        confirmInput.value = '';
        updatePinDots('', 'confirm-dot-');
        
        // Shake animation
        const pinDisplay = confirmInput.closest('.pin-display');
        pinDisplay.classList.add('shake');
        setTimeout(() => {
            pinDisplay.classList.remove('shake');
        }, 500);
        
        // Reset message after a moment
        setTimeout(() => {
            infoText.textContent = 'CONFIRM YOUR 6-DIGIT PIN';
            infoText.style.color = '';
        }, 2000);
    }
}

// Create wallet for user (updated to use PIN)
function createWalletForUser(email) {
    // Generate wallet address based on email
    const walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
    
    // Store user info
    localStorage.setItem('walletAddress', walletAddress);
    localStorage.setItem('walletType', 'email');
    localStorage.setItem('authMethod', 'email');
    
    // Navigate to main page
    window.location.href = 'main.html';
}

// Export functions
window.addDigit = addDigit;
window.deleteDigit = deleteDigit;
window.handleSetPin = handleSetPin;
window.handleConfirmPin = handleConfirmPin;