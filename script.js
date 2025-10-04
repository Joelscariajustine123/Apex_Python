document.addEventListener('DOMContentLoaded', () => {

    // --- Create and append "Copy" buttons to all code blocks ---
    const codeBlocks = document.querySelectorAll('.code-block pre');
    codeBlocks.forEach(block => {
        // Create the button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = 'Copy';
        
        // Get the parent of pre which is .code-block
        block.parentElement.appendChild(copyButton);

        // Add click event listener
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });


    // --- Active navigation link on scroll ---
    const sections = document.querySelectorAll('section.module, section#projects');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const options = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.4 // trigger when 40% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Get the id of the intersecting section
                const id = entry.target.getAttribute('id');
                
                // Find the corresponding nav link and add active class
                const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

});