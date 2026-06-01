document.addEventListener('DOMContentLoaded', () => {
    
    // --- Existing Copy to Clipboard Logic ---
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

    // --- Welcome Modal Logic ---
    // localStorage.removeItem('portfolioFirstVisit')
    const hasVisited = localStorage.getItem('portfolioFirstVisit');
    if (!hasVisited) {
        const welcomeModalElement = document.getElementById('welcomeModal');
        
        if (welcomeModalElement) {
            // Initialize and show the Bootstrap Modal
            const welcomeModal = new bootstrap.Modal(welcomeModalElement);
            welcomeModal.show();
            
            // Wait for the modal to be closed before writing to local storage
            welcomeModalElement.addEventListener('hidden.bs.modal', () => {
                localStorage.setItem('portfolioFirstVisit', 'true');
            });
        }
    }

});