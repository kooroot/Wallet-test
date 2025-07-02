// Password Setup JavaScript

let userPassword = '';

// Initialize password setup
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    // Handle password input
    passwordInput.addEventListener('input', handlePasswordInput);
    confirmPasswordInput.addEventListener('input', handleConfirmPasswordInput);
    
    // Focus on password field
    passwordInput.focus();
});

// Toggle password visibility
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + '-toggle-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '👁‍🗨';
    } else {
        input.type = 'password';
        icon.textContent = '👁';
    }
}

// Check password requirements
function checkPasswordRequirements(password) {
    // Only requirement: minimum 4 characters
    const requirements = {
        length: password.length >= 4
    };
    
    // Update UI for requirement
    updateRequirement('req-length', requirements.length);
    
    const allMet = requirements.length;
    
    return { requirements, allMet };
}

// Update requirement UI
function updateRequirement(reqId, isMet) {
    const reqElement = document.getElementById(reqId);
    const icon = reqElement.querySelector('.req-icon');
    
    if (isMet) {
        reqElement.classList.add('met');
        icon.textContent = '●';
    } else {
        reqElement.classList.remove('met');
        icon.textContent = '○';
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    // Simple strength based on length
    let strength = 0;
    let strengthText = '';
    let strengthClass = '';
    
    if (password.length >= 4) {
        strength = 100;
        strengthText = 'VALID';
        strengthClass = 'strong';
    } else if (password.length > 0) {
        strength = 50;
        strengthText = 'TOO SHORT';
        strengthClass = 'weak';
    }
    
    return { strength, strengthText, strengthClass };
}

// Handle password input
function handlePasswordInput(e) {
    const password = e.target.value;
    const continueBtn = document.getElementById('password-continue-btn');
    
    // Check requirements
    const { allMet } = checkPasswordRequirements(password);
    
    // Calculate strength
    const { strength, strengthText, strengthClass } = calculatePasswordStrength(password);
    
    // Update strength UI
    const strengthFill = document.getElementById('strength-fill');
    const strengthTextEl = document.getElementById('strength-text');
    
    strengthFill.style.width = strength + '%';
    strengthFill.className = 'strength-fill ' + strengthClass;
    strengthTextEl.textContent = password ? strengthText : '';
    strengthTextEl.className = 'strength-text ' + strengthClass;
    
    // Enable/disable continue button
    continueBtn.disabled = !allMet;
}

// Handle confirm password input
function handleConfirmPasswordInput(e) {
    const confirmPassword = e.target.value;
    const matchInfo = document.getElementById('match-info-text');
    const confirmBtn = document.getElementById('confirm-continue-btn');
    
    if (confirmPassword === '') {
        matchInfo.textContent = '';
        matchInfo.className = '';
        confirmBtn.disabled = true;
    } else if (confirmPassword === userPassword) {
        matchInfo.textContent = 'PASSWORDS MATCH';
        matchInfo.className = 'match';
        confirmBtn.disabled = false;
    } else {
        matchInfo.textContent = 'PASSWORDS DO NOT MATCH';
        matchInfo.className = 'no-match';
        confirmBtn.disabled = true;
    }
}

// Handle set password
function handleSetPassword(event) {
    event.preventDefault();
    
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    
    const { allMet } = checkPasswordRequirements(password);
    
    if (!allMet) {
        return;
    }
    
    // Store password temporarily
    userPassword = password;
    
    // Show loading state
    const continueBtn = document.getElementById('password-continue-btn');
    continueBtn.disabled = true;
    continueBtn.textContent = '[ SETTING PASSWORD... ]';
    
    // Transition to confirm step
    setTimeout(() => {
        showConfirmStep();
    }, 500);
}

// Show confirm password step
function showConfirmStep() {
    const setStep = document.getElementById('set-password-step');
    const confirmStep = document.getElementById('confirm-password-step');
    const subtitle = document.getElementById('password-subtitle');
    
    // Update subtitle
    subtitle.textContent = 'CONFIRM YOUR PASSWORD TO CONTINUE';
    
    // Transition steps
    setStep.classList.remove('active');
    setStep.classList.add('hidden');
    confirmStep.classList.add('active');
    
    // Focus on confirm input
    const confirmInput = document.getElementById('confirm-password');
    setTimeout(() => {
        confirmInput.focus();
    }, 300);
}

// Handle confirm password
function handleConfirmPassword(event) {
    event.preventDefault();
    
    const confirmInput = document.getElementById('confirm-password');
    const confirmPassword = confirmInput.value;
    
    if (confirmPassword !== userPassword) {
        return;
    }
    
    // Show loading state
    const confirmBtn = document.getElementById('confirm-continue-btn');
    confirmBtn.disabled = true;
    confirmBtn.textContent = '[ SECURING WALLET... ]';
    
    // Store password securely (in real app, this would be properly encrypted)
    const userEmail = localStorage.getItem('userEmail');
    const passwordData = {
        email: userEmail,
        password: btoa(userPassword), // Basic encoding (use proper encryption in production)
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('userPassword', JSON.stringify(passwordData));
    
    // Create wallet and proceed
    setTimeout(() => {
        createWalletForUser(userEmail);
    }, 1000);
}

// Create wallet for user
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
window.togglePassword = togglePassword;
window.handleSetPassword = handleSetPassword;
window.handleConfirmPassword = handleConfirmPassword;