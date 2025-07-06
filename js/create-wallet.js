// Create Wallet Functionality
let selectedWordCount = 12;
let generatedSeedPhrase = [];
let verificationIndices = [];
let verifiedCount = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Word count selection
    const wordCountOptions = document.querySelectorAll('.word-count-option');
    wordCountOptions.forEach(option => {
        option.addEventListener('click', function() {
            wordCountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedWordCount = parseInt(this.getAttribute('data-count'));
        });
    });
});

// Generate random seed phrase
function generateSeedPhrase() {
    // Reset state
    generatedSeedPhrase = [];
    verificationIndices = [];
    verifiedCount = 0;
    
    // Generate random words from BIP39 wordlist
    for (let i = 0; i < selectedWordCount; i++) {
        const randomIndex = Math.floor(Math.random() * BIP39_WORDLIST.length);
        generatedSeedPhrase.push(BIP39_WORDLIST[randomIndex]);
    }
    
    // Display seed phrase
    displaySeedPhrase();
    
    // Show step 2, hide step 1
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
}

// Display the generated seed phrase
function displaySeedPhrase() {
    const grid = document.getElementById('seedPhraseGrid');
    grid.innerHTML = '';
    
    generatedSeedPhrase.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.className = 'seed-word';
        wordElement.innerHTML = `
            <span class="word-number">${index + 1}</span>
            <span class="word-text">${word}</span>
        `;
        grid.appendChild(wordElement);
    });
}

// Copy seed phrase to clipboard
function copySeedPhrase() {
    const seedText = generatedSeedPhrase.join(' ');
    navigator.clipboard.writeText(seedText).then(() => {
        // Show feedback
        const copyBtn = document.querySelector('.secondary-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✓</span> COPIED!';
        copyBtn.classList.add('success');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy seed phrase');
    });
}

// Proceed to verification step
function proceedToVerification() {
    // Generate 4 random indices for verification
    verificationIndices = [];
    while (verificationIndices.length < 4) {
        const randomIndex = Math.floor(Math.random() * selectedWordCount);
        if (!verificationIndices.includes(randomIndex)) {
            verificationIndices.push(randomIndex);
        }
    }
    
    // Sort indices for better UX
    verificationIndices.sort((a, b) => a - b);
    
    // Create verification UI
    createVerificationUI();
    
    // Show step 3, hide step 2
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
}

// Create verification UI
function createVerificationUI() {
    const container = document.getElementById('verificationContainer');
    container.innerHTML = '';
    
    verificationIndices.forEach((wordIndex, i) => {
        const verifySection = document.createElement('div');
        verifySection.className = 'verify-section';
        verifySection.innerHTML = `
            <div class="verify-prompt">
                <span class="verify-number">Word #${wordIndex + 1}</span>
                <span class="verify-status" id="status-${i}">❓</span>
            </div>
            <div class="verify-options" id="options-${i}">
                ${generateOptions(wordIndex, i)}
            </div>
        `;
        container.appendChild(verifySection);
    });
}

// Generate word options for verification
function generateOptions(correctIndex, questionIndex) {
    const correctWord = generatedSeedPhrase[correctIndex];
    const options = [correctWord];
    
    // Add 3 random incorrect words
    while (options.length < 4) {
        const randomWord = BIP39_WORDLIST[Math.floor(Math.random() * BIP39_WORDLIST.length)];
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Create option buttons
    return options.map(word => `
        <button class="verify-option" onclick="verifyWord('${word}', ${correctIndex}, ${questionIndex})">
            ${word}
        </button>
    `).join('');
}

// Verify selected word
function verifyWord(selectedWord, correctIndex, questionIndex) {
    const correctWord = generatedSeedPhrase[correctIndex];
    const statusElement = document.getElementById(`status-${questionIndex}`);
    const optionsContainer = document.getElementById(`options-${questionIndex}`);
    
    if (selectedWord === correctWord) {
        // Correct
        statusElement.textContent = '✅';
        statusElement.className = 'verify-status correct';
        optionsContainer.innerHTML = `<div class="verified-word">${selectedWord}</div>`;
        verifiedCount++;
        
        // Check if all verified
        if (verifiedCount === 4) {
            document.getElementById('completeBtn').disabled = false;
            document.getElementById('completeBtn').classList.add('ready');
        }
    } else {
        // Incorrect
        statusElement.textContent = '❌';
        statusElement.className = 'verify-status incorrect';
        
        // Highlight incorrect option
        const buttons = optionsContainer.querySelectorAll('.verify-option');
        buttons.forEach(btn => {
            if (btn.textContent.trim() === selectedWord) {
                btn.classList.add('incorrect');
                btn.disabled = true;
            }
        });
    }
}

// Complete wallet setup
function completeSetup() {
    // Store wallet data (in production, this should be encrypted)
    const walletData = {
        seedPhrase: generatedSeedPhrase.join(' '),
        wordCount: selectedWordCount,
        createdAt: new Date().toISOString(),
        walletAddress: generateWalletAddress()
    };
    
    // Save to localStorage (in production, use secure storage)
    localStorage.setItem('walletData', JSON.stringify(walletData));
    localStorage.setItem('walletSetup', 'complete');
    
    // Show success message
    showLoading();
    
    setTimeout(() => {
        alert('지갑이 성공적으로 생성되었습니다!');
        // Navigate to main page
        window.location.href = 'main.html';
    }, 1500);
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
window.generateSeedPhrase = generateSeedPhrase;
window.copySeedPhrase = copySeedPhrase;
window.proceedToVerification = proceedToVerification;
window.verifyWord = verifyWord;
window.completeSetup = completeSetup; 