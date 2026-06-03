document.addEventListener('DOMContentLoaded', () => {
    
    // --- Copy to Clipboard Logic ---
    const copyIcon = document.querySelector('.bi-copy');
    if(copyIcon) {
        copyIcon.addEventListener('click', (e) => {
            const emailSpan = e.target.previousElementSibling;
            if(emailSpan) {
                navigator.clipboard.writeText(emailSpan.innerText);
                const originalIcon = copyIcon.className;
                copyIcon.className = 'bi bi-check2 text-success cursor-pointer px-2';
                setTimeout(() => {
                    copyIcon.className = originalIcon;
                }, 2000);
            }
        });
    }
    // --- End Copy to Clipboard Logic ---

    // localStorage.removeItem('portfolioFirstVisit')
    // --- Welcome Modal Logic ---
    const welcomeModalElement = document.getElementById('welcomeModal');
    if (welcomeModalElement) {
        // Initialize and show the Bootstrap Modal
        const welcomeModal = new bootstrap.Modal(welcomeModalElement);
        welcomeModal.show();
        
        // --- COUNTDOWN TIMER LOGIC ---
        const confirmBtn = document.getElementById('welcomeConfirmBtn');
        const countdownSpan = document.getElementById('welcomeCountdown');
        
        // Ensure the button starts disabled and the timer resets on every reload
        confirmBtn.setAttribute('disabled', 'true');
        let timeLeft = 5;
        countdownSpan.textContent = `(${timeLeft})`;

        // Run this function every 1000 milliseconds (1 second)
        const timer = setInterval(() => {
            timeLeft--; // Decrease time by 1
            
            if (timeLeft > 0) {
                // Update the text to show remaining seconds
                countdownSpan.textContent = `(${timeLeft})`;
            } else {
                // Stop the timer when it hits 0
                clearInterval(timer);
                // Remove the text and enable the button
                countdownSpan.textContent = ''; 
                confirmBtn.removeAttribute('disabled');
            }
        }, 1000);
    }
    // --- End Welcome Modal Logic ---

});