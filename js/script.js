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




    // --- Modal Video Player Logic ---
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        const modalVideoPlayer = document.getElementById('modalVideoPlayer');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const videoModalSubtitle = document.getElementById('videoModalSubtitle');

        // Dynamic Loading on Open
        videoModal.addEventListener('show.bs.modal', function (event) {
            const triggerEl = event.relatedTarget;
            
            // Extract attributes from whatever element triggered it
            const videoSrc = triggerEl.getAttribute('data-video-src');
            const title = triggerEl.getAttribute('data-video-title');
            const subtitle = triggerEl.getAttribute('data-video-subtitle');

            // Apply Titles
            if (title) videoModalTitle.textContent = title;
            if (subtitle) videoModalSubtitle.textContent = subtitle;
            
            // Pass media and play
            if (videoSrc) {
                modalVideoPlayer.src = videoSrc;
                modalVideoPlayer.load();
                
                // Slight delay ensures the viewport is ready before engaging play
                setTimeout(() => {
                    modalVideoPlayer.play().catch(e => console.warn('Browser restrictions prevented autoplay:', e));
                }, 150);
            }
        });

        // Hard Reset on Close
        videoModal.addEventListener('hidden.bs.modal', function () {
            modalVideoPlayer.pause();
            modalVideoPlayer.currentTime = 0;
            modalVideoPlayer.src = ""; // Clears the file buffer entirely 
        });
    }
    // --- End Modal Video Player Logic ---



});