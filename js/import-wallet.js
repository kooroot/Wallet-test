// Import Wallet Functionality
let selectedWordCount = 12;
let seedInputs = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Word count toggle
    const toggleOptions = document.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            toggleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedWordCount = parseInt(this.getAttribute('data-count'));
            generateInputGrid();
        });
    });
    
    // Generate initial input grid
    generateInputGrid();
});

// Generate input grid for seed phrase
function generateInputGrid() {
    const grid = document.getElementById('seedInputGrid');
    grid.innerHTML = '';
    seedInputs = [];
    
    for (let i = 0; i < selectedWordCount; i++) {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'seed-input-wrapper';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'seed-input';
        input.placeholder = `${i + 1}`;
        input.setAttribute('data-index', i);
        input.autocomplete = 'off';
        input.spellcheck = false;
        
        // Add input event listeners
        input.addEventListener('input', handleWordInput);
        input.addEventListener('keydown', handleKeyNavigation);
        input.addEventListener('paste', handlePaste);
        
        const label = document.createElement('span');
        label.className = 'input-label';
        label.textContent = i + 1;
        
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        grid.appendChild(inputWrapper);
        
        seedInputs.push(input);
    }
    
    // Focus first input
    seedInputs[0].focus();
}

// Handle word input with autocomplete
function handleWordInput(e) {
    const input = e.target;
    const value = input.value.toLowerCase().trim();
    const index = parseInt(input.getAttribute('data-index'));
    
    // Clear any existing dropdown
    removeAutocomplete(input);
    
    if (value.length >= 1) {
        // Find matching words
        const matches = BIP39_WORDLIST.filter(word => 
            word.toLowerCase().startsWith(value)
        ).slice(0, 5); // Show max 5 suggestions
        
        if (matches.length > 0 && value !== matches[0]) {
            showAutocomplete(input, matches, index);
        }
    }
    
    // Validate input
    validateInput(input);
    checkAllInputs();
}

// Show autocomplete dropdown
function showAutocomplete(input, matches, index) {
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    
    matches.forEach(word => {
        const option = document.createElement('div');
        option.className = 'autocomplete-option';
        option.textContent = word;
        option.addEventListener('click', () => {
            input.value = word;
            removeAutocomplete(input);
            validateInput(input);
            checkAllInputs();
            
            // Move to next input
            if (index < selectedWordCount - 1) {
                seedInputs[index + 1].focus();
            }
        });
        dropdown.appendChild(option);
    });
    
    // Position dropdown
    const wrapper = input.parentElement;
    wrapper.appendChild(dropdown);
}

// Remove autocomplete dropdown
function removeAutocomplete(input) {
    const wrapper = input.parentElement;
    const dropdown = wrapper.querySelector('.autocomplete-dropdown');
    if (dropdown) {
        dropdown.remove();
    }
}

// Validate individual input
function validateInput(input) {
    const value = input.value.toLowerCase().trim();
    
    if (value === '') {
        input.classList.remove('valid', 'invalid');
    } else if (BIP39_WORDLIST.includes(value)) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

// Handle keyboard navigation
function handleKeyNavigation(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    
    switch(e.key) {
        case 'Enter':
        case 'Tab':
            if (!e.shiftKey && index < selectedWordCount - 1) {
                e.preventDefault();
                seedInputs[index + 1].focus();
            }
            break;
        case 'Backspace':
            if (e.target.value === '' && index > 0) {
                e.preventDefault();
                seedInputs[index - 1].focus();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (index >= 3) {
                seedInputs[index - 3].focus();
            }
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (index < selectedWordCount - 3) {
                seedInputs[index + 3].focus();
            }
            break;
        case 'ArrowLeft':
            if (e.target.selectionStart === 0 && index > 0) {
                e.preventDefault();
                seedInputs[index - 1].focus();
            }
            break;
        case 'ArrowRight':
            if (e.target.selectionEnd === e.target.value.length && index < selectedWordCount - 1) {
                e.preventDefault();
                seedInputs[index + 1].focus();
            }
            break;
    }
}

// Handle paste event
function handlePaste(e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const words = pastedText.trim().split(/\s+/);
    
    const startIndex = parseInt(e.target.getAttribute('data-index'));
    
    words.forEach((word, i) => {
        if (startIndex + i < selectedWordCount) {
            seedInputs[startIndex + i].value = word.toLowerCase();
            validateInput(seedInputs[startIndex + i]);
        }
    });
    
    checkAllInputs();
}

// Paste from clipboard button
function pasteSeedPhrase() {
    navigator.clipboard.readText().then(text => {
        const words = text.trim().split(/\s+/);
        
        if (words.length !== selectedWordCount) {
            alert(`시드 구문은 ${selectedWordCount}개의 단어여야 합니다. 입력된 단어: ${words.length}개`);
            return;
        }
        
        words.forEach((word, i) => {
            if (i < selectedWordCount) {
                seedInputs[i].value = word.toLowerCase();
                validateInput(seedInputs[i]);
            }
        });
        
        checkAllInputs();
    }).catch(err => {
        console.error('Failed to read clipboard:', err);
        alert('클립보드에서 읽기 실패. 수동으로 붙여넣어 주세요.');
    });
}

// Check all inputs and enable/disable import button
function checkAllInputs() {
    const importBtn = document.getElementById('importBtn');
    let allValid = true;
    
    seedInputs.forEach(input => {
        const value = input.value.toLowerCase().trim();
        if (!value || !BIP39_WORDLIST.includes(value)) {
            allValid = false;
        }
    });
    
    importBtn.disabled = !allValid;
    if (allValid) {
        importBtn.classList.add('ready');
    } else {
        importBtn.classList.remove('ready');
    }
}

// Import wallet
function importWallet() {
    // Collect seed phrase
    const seedPhrase = seedInputs.map(input => 
        input.value.toLowerCase().trim()
    ).join(' ');
    
    // Validate seed phrase format
    if (!validateSeedPhrase(seedPhrase)) {
        alert('올바르지 않은 시드 구문입니다.');
        return;
    }
    
    // Store wallet data (in production, this should be encrypted)
    const walletData = {
        seedPhrase: seedPhrase,
        wordCount: selectedWordCount,
        importedAt: new Date().toISOString(),
        walletAddress: generateWalletAddress()
    };
    
    // Save to localStorage (in production, use secure storage)
    localStorage.setItem('walletData', JSON.stringify(walletData));
    localStorage.setItem('walletSetup', 'complete');
    
    // Show loading
    showLoading();
    
    setTimeout(() => {
        alert('지갑을 성공적으로 가져왔습니다!');
        // Navigate to main page
        window.location.href = 'main.html';
    }, 1500);
}

// Validate seed phrase
function validateSeedPhrase(seedPhrase) {
    const words = seedPhrase.trim().split(/\s+/);
    
    if (words.length !== 12 && words.length !== 24) {
        return false;
    }
    
    // Check if all words are in BIP39 wordlist
    return words.every(word => BIP39_WORDLIST.includes(word));
}

// Generate mock wallet address
function generateWalletAddress() {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

// Export functions
window.pasteSeedPhrase = pasteSeedPhrase;
window.importWallet = importWallet; 