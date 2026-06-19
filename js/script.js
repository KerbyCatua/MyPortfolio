document.addEventListener('DOMContentLoaded', () => {
    
    // --- Copy to Clipboard Logic ---
    const copyBtn = document.querySelector('.email-clipboard-box button');
    const emailText = document.querySelector('.email-clipboard-box span');
    const copyIcon = document.querySelector('.email-clipboard-box i');
    if (copyBtn && emailText && copyIcon) {
        copyBtn.addEventListener('click', async () => {
            try {
                // 1. Asynchronously write the text to the clipboard
                await navigator.clipboard.writeText(emailText.innerText.trim());
                
                // 2. Cache the original icon classes
                const originalIconClasses = copyIcon.className;
                
                // 3. Swap the icon to a success checkmark and make it green
                copyIcon.className = 'bi bi-check2 fs-5 cursor-pointer px-2 transition-transform text-success';
                
                // 4. Revert back to the original copy icon after 2 seconds
                setTimeout(() => {
                    copyIcon.className = originalIconClasses;
                }, 2000);

            } catch (err) {
                console.error('Failed to copy to clipboard: ', err);
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




    // --- Slideshow Logic ---
    const topImg = document.getElementById('slideshow-top');
    const bottomImg = document.getElementById('slideshow-bottom');
    if (topImg && bottomImg) {
        let currentImageIndex = 1;
        const totalImages = 6;

        setInterval(() => {
            // Determine the next image index
            let nextIndex = currentImageIndex + 1;
            if (nextIndex > totalImages) {
                nextIndex = 1;
            }

            // 1. Lock the bottom image to whatever is currently visible
            bottomImg.src = `assets/video-edit-samples/edit2/edit2-thumbnail/thumbnail-${currentImageIndex}.png`;
            
            // 2. Prep the top image to show the NEXT image, instantly making it transparent
            topImg.style.transition = 'none';
            topImg.src = `assets/video-edit-samples/edit2/edit2-thumbnail/thumbnail-${nextIndex}.png`;
            topImg.style.opacity = 0;
            
            // 3. Force browser reflow so the style resets apply immediately
            void topImg.offsetWidth;
            
            // 4. Trigger the 2-second fade IN for the new thumbnail
            topImg.style.transition = 'opacity 2s ease-in-out';
            topImg.style.opacity = 1;
            
            // 5. Update the current index tracker for the next cycle
            currentImageIndex = nextIndex;
            
        }, 2000); // 2000ms delay between slide transitions
    }
    // --- End Slideshow Logic ---




});