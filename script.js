document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // 2. Typing Effect for Headline (Existing logic improved)
    const textElement = document.getElementById('typing-text');
    const words = ["Speed of Thought", "Power of AI", "Scale of Data"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeHeadline() {
        const currentWord = words[wordIndex];
        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        const displayedText = currentWord.substring(0, charIndex);
        textElement.textContent = displayedText;

        if (!isDeleting) charIndex++;
        else charIndex--;

        setTimeout(typeHeadline, typeSpeed);
    }
    typeHeadline();

    // 3. Code Window Typing Simulation (New!)
    const codeBody = document.getElementById('code-body');
    // Lines of code to type out
    const sqlCode = [
        { text: "SELECT user_id, SUM(amount) AS total_spend", indent: 0 },
        { text: "FROM vertica_transactions", indent: 0 },
        { text: "WHERE quarter = 'Q4'", indent: 0 },
        { text: "GROUP BY 1", indent: 0 },
        { text: "ORDER BY 2 DESC", indent: 0 },
        { text: "LIMIT 5;", indent: 0 }
    ];

    let lineIndex = 0;
    
    function typeCode() {
        if (lineIndex < sqlCode.length) {
            const lineData = sqlCode[lineIndex];
            const div = document.createElement('div');
            div.className = 'line fade-in';
            // Start with line number and empty content
            div.innerHTML = `<span class="num">${lineIndex + 2}</span> <span class="typing-line"></span>`;
            codeBody.appendChild(div);

            const span = div.querySelector('.typing-line');
            let charIdx = 0;

            function typeLine() {
                if (charIdx < lineData.text.length) {
                    span.textContent += lineData.text.charAt(charIdx);
                    charIdx++;
                    setTimeout(typeLine, 30); // Speed of typing code
                } else {
                    // Highlight keywords after typing is done (Simple mock)
                    span.innerHTML = span.textContent
                        .replace(/(SELECT|FROM|WHERE|GROUP BY|ORDER BY|LIMIT|DESC|AS)/g, '<span class="keyword">$1</span>')
                        .replace(/('.*?')/g, '<span class="string">$1</span>');
                    
                    lineIndex++;
                    setTimeout(typeCode, 500); // Wait before next line
                }
            }
            typeLine();
        }
    }
    
    // Start code typing after a short delay
    setTimeout(typeCode, 1500);


    // 4. Spotlight Effect for Cards (New!)
    const cards = document.querySelectorAll('.card');
    const container = document.getElementById('cards-container');

    container.onmousemove = e => {
        for(const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };
});