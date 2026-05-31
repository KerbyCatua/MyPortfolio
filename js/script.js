// Generic copy to clipboard function matching the "copy icon" in the Contact section
document.addEventListener('DOMContentLoaded', () => {
    const copyIcon = document.querySelector('.bi-copy');
    if(copyIcon) {
        copyIcon.addEventListener('click', (e) => {
            const emailSpan = e.target.previousElementSibling;
            if(emailSpan) {
                navigator.clipboard.writeText(emailSpan.innerText);
                // Optional: Provide a slight visual change on copy
                const originalIcon = copyIcon.className;
                copyIcon.className = 'bi bi-check2 text-success cursor-pointer px-2';
                setTimeout(() => {
                    copyIcon.className = originalIcon;
                }, 2000);
            }
        });
    }
});