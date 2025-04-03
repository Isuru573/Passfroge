document.addEventListener('DOMContentLoaded', () => {
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const excludeSimilarCheckbox = document.getElementById('excludeSimilar');
    const generateBtn = document.getElementById('generateBtn');
    const passwordDisplay = document.getElementById('passwordDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    
    // Show slider value
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });
    
    // Generate password
    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;
        const excludeSimilar = excludeSimilarCheckbox.checked;
        
        const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols, excludeSimilar);
        passwordDisplay.textContent = password;
        strengthIndicator.textContent = `Strength: ${checkStrength(password)}`;
        
        passwordHistory.push(password);
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
        updateHistory();
    });
    
    // Copy password
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(passwordDisplay.textContent);
        alert('Copied to clipboard!');
    });
    
    // Clear history
    clearHistoryBtn.addEventListener('click', () => {
        passwordHistory = [];
        localStorage.removeItem('passwordHistory');
        updateHistory();
    });
    
    // Update history list
    function updateHistory() {
        historyList.innerHTML = '';
        passwordHistory.forEach(pwd => {
            const li = document.createElement('li');
            li.textContent = pwd;
            historyList.appendChild(li);
        });
    }
    
    // Generate password function
    function generatePassword(length, uppercase, numbers, symbols, excludeSimilar) {
        let charset = 'abcdefghijklmnopqrstuvwxyz';
        if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers) charset += '0123456789';
        if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        if (excludeSimilar) charset = charset.replace(/[l1O0]/g, '');
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }
    
    // Check password strength
    function checkStrength(password) {
        if (password.length < 8) return 'Weak';
        if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) return 'Strong';
        return 'Medium';
    }
    
    // Load history on start
    updateHistory();
});