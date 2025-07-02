// Email Authentication JavaScript

let userEmail = '';
let resendTimer = null;

// Initialize email authentication
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const verificationCodeInput = document.getElementById('verification-code');

    // Handle verification code input - only allow numbers
    verificationCodeInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only numbers
        e.target.value = value;
    });

    // Auto-focus email field
    emailInput.focus();
});

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle email input (Step 1)
function handleEmailInput(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const emailButton = document.getElementById('email-continue-btn');
    const email = emailInput.value.trim();
    
    if (!validateEmail(email)) {
        emailInput.focus();
        return;
    }
    
    userEmail = email;
    
    // Show loading state
    emailInput.disabled = true;
    emailButton.disabled = true;
    emailButton.textContent = '[ SENDING CODE... ]';
    
    // Transition to code step
    setTimeout(() => {
        showCodeStep();
        sendVerificationCode();
    }, 500);
}

// Show code input step
function showCodeStep() {
    const emailStep = document.getElementById('email-step');
    const codeStep = document.getElementById('code-step');
    const emailDisplay = document.getElementById('email-display');
    const subtitle = document.getElementById('subtitle');
    const verificationCodeInput = document.getElementById('verification-code');
    
    // Update display
    emailDisplay.textContent = userEmail;
    subtitle.textContent = 'ENTER THE VERIFICATION CODE SENT TO YOUR EMAIL';
    
    // Transition steps
    emailStep.classList.remove('active');
    emailStep.classList.add('hidden');
    codeStep.classList.add('active');
    
    // Focus on code input
    setTimeout(() => {
        verificationCodeInput.focus();
    }, 300);
}

// Send verification code
function sendVerificationCode() {
    const codeInfo = document.getElementById('code-info');
    
    // Show sending state
    codeInfo.textContent = 'SENDING CODE...';
    
    // Simulate sending code
    setTimeout(() => {
        // Show mock code in console (in real app, this would be sent via email)
        console.log('Verification code: 000000');
        codeInfo.textContent = 'CODE SENT! CHECK YOUR EMAIL';
        
        // Start countdown for resend
        startResendCountdown();
        
        // Reset info text after a moment
        setTimeout(() => {
            codeInfo.textContent = 'ENTER THE 6-DIGIT CODE FROM YOUR EMAIL';
        }, 3000);
    }, 1500);
}

// Handle code input (Step 2)
function handleCodeInput(event) {
    event.preventDefault();
    
    const verificationCodeInput = document.getElementById('verification-code');
    const verifyButton = document.getElementById('code-verify-btn');
    const code = verificationCodeInput.value;
    
    if (code.length !== 6) {
        return;
    }
    
    // Show verifying state
    verificationCodeInput.disabled = true;
    verifyButton.disabled = true;
    verifyButton.textContent = '[ VERIFYING... ]';
    const codeInfo = document.getElementById('code-info');
    codeInfo.textContent = 'VERIFYING CODE...';
    
    // Simulate verification
    setTimeout(() => {
        // In real app, verify the code with backend
        const mockCode = '000000';
        
        if (code === mockCode) {
            // Success
            codeInfo.textContent = 'CODE VERIFIED!';
            verifyButton.textContent = '[ SUCCESS! ]';
            
            // Store auth info
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('authMethod', 'email');
            
            // Navigate to PIN setup
            setTimeout(() => {
                window.location.href = 'pin-setup.html';
            }, 500);
        } else {
            // Error
            codeInfo.textContent = 'INVALID CODE. PLEASE TRY AGAIN.';
            verificationCodeInput.disabled = false;
            verifyButton.disabled = false;
            verifyButton.textContent = '[ VERIFY & CONTINUE ]';
            verificationCodeInput.focus();
            verificationCodeInput.select();
            
            // Reset message after a moment
            setTimeout(() => {
                codeInfo.textContent = 'ENTER THE 6-DIGIT CODE FROM YOUR EMAIL';
            }, 3000);
        }
    }, 1500);
}

// Resend verification code
function resendCode() {
    const resendBtn = document.getElementById('resend-btn');
    
    if (resendBtn.disabled) {
        return;
    }
    
    // Clear existing timer
    if (resendTimer) {
        clearInterval(resendTimer);
    }
    
    // Send new code
    sendVerificationCode();
    
    // Clear code input
    const verificationCodeInput = document.getElementById('verification-code');
    verificationCodeInput.value = '';
    verificationCodeInput.focus();
}

// Start countdown for resend button
function startResendCountdown() {
    const resendBtn = document.getElementById('resend-btn');
    let countdown = 60;
    
    resendBtn.disabled = true;
    
    resendTimer = setInterval(() => {
        countdown--;
        resendBtn.textContent = `RESEND CODE (${countdown}s)`;
        
        if (countdown <= 0) {
            clearInterval(resendTimer);
            resendBtn.textContent = 'RESEND CODE';
            resendBtn.disabled = false;
        }
    }, 1000);
}

// Create wallet for user
function createWalletForUser(email) {
    // Generate wallet address based on email
    const walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
    
    // Store user info
    localStorage.setItem('walletAddress', walletAddress);
    localStorage.setItem('walletType', 'email');
    
    // Navigate to main page
    window.location.href = 'main.html';
}

// Export functions
window.handleEmailInput = handleEmailInput;
window.handleCodeInput = handleCodeInput;
window.resendCode = resendCode;