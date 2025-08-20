window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
    setupNavbarScroll();
    setupSmoothScrolling();
    setupFormValidation();
    setupStarsBackground();
    setupCardTilt();
    setupBlogFilter();
    setupMobileMenu();
    setupScrollToTop();
    setupTooltips();
    //setupLoadingAnimations();
    setupKeyboardNavigation();
    setupTableOfContents();
    setupEasterEggs();
    setupKonamiCode();
    setupGitHubActivityFeed();
});

function setupBlogFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            blogPosts.forEach(post => {
                if (filter === 'all' || post.classList.contains(filter)) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupFormValidation() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        input.classList.add('error');
    }

    function clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
        }
        input.classList.remove('error');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            console.log('Form submitted successfully');
        }
    });
}

function setupStarsBackground() {
    const starsContainer = document.querySelector('.stars-bg');
    if (!starsContainer) return;

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        return star;
    }

    for (let i = 0; i < 100; i++) {
        starsContainer.appendChild(createStar());
    }

    setInterval(() => {
        if (starsContainer.children.length < 100) {
            starsContainer.appendChild(createStar());
        }
    }, 5000);

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        starsContainer.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });
}

function setupCardTilt() {
    const cards = document.querySelectorAll('.card, .blog-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 opacity-0 invisible';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.id = 'scroll-to-top';

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.remove('opacity-0', 'invisible');
            scrollButton.classList.add('opacity-100', 'visible');
        } else {
            scrollButton.classList.add('opacity-0', 'invisible');
            scrollButton.classList.remove('opacity-100', 'visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

function setupTooltips() {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.className = 'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 ease-in-out transform pointer-events-none max-w-xs';
    document.body.appendChild(tooltip);

    const tooltipContent = {
        'PHP': 'A popular general-purpose scripting language that is especially suited to web development.',
        'Laravel': 'A web application framework with expressive, elegant syntax for PHP development.',
        'JavaScript': 'A programming language that conforms to the ECMAScript specification.',
        'React': 'A JavaScript library for building user interfaces, maintained by Facebook.',
        'Node.js': 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
        'Docker': 'A platform for developing, shipping, and running applications using containerization.',
        'DevOps': 'A set of practices that combines software development and IT operations.',
        'Security': 'The practice of protecting systems, networks, and programs from digital attacks.',
        'API': 'Application Programming Interface - a set of protocols for building software applications.',
        'Framework': 'A platform for developing software applications with pre-written code.',
        'Tutorial': 'A method of transferring knowledge through step-by-step instructions.',
        'Guide': 'A comprehensive resource providing detailed information on a specific topic.',
        'MySQL': 'An open-source relational database management system.',
        'Git': 'A distributed version control system for tracking changes in source code.',
        'CSS': 'Cascading Style Sheets - a style sheet language for describing presentation.',
        'HTML': 'HyperText Markup Language - the standard markup language for web pages.',
        'Tailwind': 'A utility-first CSS framework for rapidly building custom user interfaces.',
        'Bootstrap': 'A free and open-source CSS framework for responsive web development.',
        'Vue.js': 'A progressive JavaScript framework for building user interfaces.',
        'Angular': 'A TypeScript-based open-source web application framework.',
        'Python': 'A high-level, interpreted programming language with dynamic semantics.',
        'Java': 'A class-based, object-oriented programming language.',
        'C++': 'A general-purpose programming language created as an extension of C.',
        'MongoDB': 'A document-oriented NoSQL database program.',
        'PostgreSQL': 'An open-source relational database management system.',
        'Redis': 'An in-memory data structure store used as a database and cache.',
        'Nginx': 'A web server that can also be used as a reverse proxy and load balancer.',
        'Apache': 'A free and open-source cross-platform web server software.',
        'Linux': 'A family of open-source Unix-like operating systems.',
        'AWS': 'Amazon Web Services - a comprehensive cloud computing platform.',
        'Azure': 'Microsoft\'s cloud computing service for building and managing applications.'
    };

    const tooltipElements = document.querySelectorAll('.badge, .skill-tag, [data-tooltip]');

    tooltipElements.forEach(element => {
        let tooltipText = element.getAttribute('data-tooltip');

        if (!tooltipText) {
            const elementText = element.textContent.trim();
            tooltipText = tooltipContent[elementText] || `Learn more about ${elementText}`;
        }

        element.setAttribute('data-tooltip', tooltipText);
        element.setAttribute('aria-describedby', 'tooltip');

        element.addEventListener('mouseenter', function (e) {
            showTooltip(e, tooltipText);
        });

        element.addEventListener('mouseleave', function () {
            hideTooltip();
        });

        element.addEventListener('mousemove', function (e) {
            updateTooltipPosition(e);
        });

        element.addEventListener('focus', function (e) {
            showTooltip(e, tooltipText);
        });

        element.addEventListener('blur', function () {
            hideTooltip();
        });

        element.addEventListener('touchstart', function (e) {
            e.preventDefault();
            showTooltip(e, tooltipText);

            setTimeout(() => {
                hideTooltip();
            }, 3000);
        });
    });

    function showTooltip(event, text) {
        tooltip.textContent = text;
        tooltip.classList.remove('opacity-0', 'invisible');
        tooltip.classList.add('opacity-100', 'visible');
        updateTooltipPosition(event);
    }

    function hideTooltip() {
        tooltip.classList.add('opacity-0', 'invisible');
        tooltip.classList.remove('opacity-100', 'visible');
    }

    function updateTooltipPosition(event) {
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let x = event.clientX + 10;
        let y = event.clientY - tooltipRect.height - 10;

        if (x + tooltipRect.width > viewportWidth) {
            x = event.clientX - tooltipRect.width - 10;
        }

        if (y < 0) {
            y = event.clientY + 10;
        }

        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
}

function setupLoadingAnimations() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900';
    loader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p class="text-white text-lg font-medium">Loading...</p>
        </div>
    `;

    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 500);
    });

    setupContentAnimations();
    setupLinkTransitions();
}

function setupContentAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animateElements = document.querySelectorAll('.card, .blog-post, .skill-item, .project-item, h1, h2, h3');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

function setupLinkTransitions() {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target === '_blank') return;

            e.preventDefault();

            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 opacity-0 transition-opacity duration-300';
            overlay.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
            `;

            document.body.appendChild(overlay);

            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);

            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(2rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in-up {
        animation: fade-in-up 0.7s ease-out forwards;
    }
    
    .skeleton-loader {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
    }
    
    @keyframes skeleton-loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
    
    img {
        transition: opacity 0.3s ease-in-out;
    }
    
    img[data-loaded="false"] {
        opacity: 0;
    }
    
    img[data-loaded="true"] {
        opacity: 1;
    }
`;

document.head.appendChild(style);

function setupKeyboardNavigation() {
    let focusableElements = [];
    let currentFocusIndex = -1;

    function updateFocusableElements() {
        focusableElements = Array.from(document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"]), .card, .blog-post, .project-item'
        )).filter(el => {
            return el.offsetWidth > 0 && el.offsetHeight > 0 && !el.disabled && !el.hidden;
        });
    }

    function focusElement(index) {
        if (index >= 0 && index < focusableElements.length) {
            const element = focusableElements[index];
            element.focus();

            if (element.classList.contains('card') || element.classList.contains('blog-post') || element.classList.contains('project-item')) {
                element.style.outline = '2px solid #a855f7';
                element.style.outlineOffset = '2px';

                element.addEventListener('blur', function () {
                    this.style.outline = '';
                    this.style.outlineOffset = '';
                }, { once: true });
            }

            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            currentFocusIndex = index;
        }
    }

    function handleKeyNavigation(e) {
        updateFocusableElements();

        switch (e.key) {
            case 'Tab':
                if (!e.shiftKey) {
                    if (currentFocusIndex < focusableElements.length - 1) {
                        e.preventDefault();
                        focusElement(currentFocusIndex + 1);
                    }
                } else {
                    if (currentFocusIndex > 0) {
                        e.preventDefault();
                        focusElement(currentFocusIndex - 1);
                    }
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (currentFocusIndex < focusableElements.length - 1) {
                    focusElement(currentFocusIndex + 1);
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (currentFocusIndex > 0) {
                    focusElement(currentFocusIndex - 1);
                }
                break;

            case 'Home':
                e.preventDefault();
                focusElement(0);
                break;

            case 'End':
                e.preventDefault();
                focusElement(focusableElements.length - 1);
                break;

            case 'Enter':
            case ' ':
                const activeElement = document.activeElement;
                if (activeElement && (activeElement.classList.contains('card') || activeElement.classList.contains('blog-post') || activeElement.classList.contains('project-item'))) {
                    e.preventDefault();
                    const link = activeElement.querySelector('a');
                    if (link) {
                        link.click();
                    }
                }
                break;

            case 'Escape':
                if (document.activeElement) {
                    document.activeElement.blur();
                    currentFocusIndex = -1;
                }
                break;
        }
    }

    document.addEventListener('keydown', handleKeyNavigation);

    focusableElements.forEach((element, index) => {
        element.addEventListener('focus', () => {
            currentFocusIndex = index;
        });
    });

    updateFocusableElements();

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200';
    document.body.insertBefore(skipLink, document.body.firstChild);

    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

function setupTableOfContents() {
    const article = document.querySelector('article.prose');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 3) return;

    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents bg-[#1a2036]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 mb-8 z-20';
    tocContainer.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                Table of Contents
            </h3>
            <button class="toc-toggle text-gray-400 hover:text-white transition-colors" aria-label="Toggle table of contents">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
        </div>
        <nav class="toc-nav">
            <ul class="space-y-2"></ul>
        </nav>
    `;

    const tocList = tocContainer.querySelector('ul');
    const tocToggle = tocContainer.querySelector('.toc-toggle');
    const tocNav = tocContainer.querySelector('.toc-nav');

    let currentActiveLink = null;

    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
            heading.id = id;
        }

        const li = document.createElement('li');
        const level = heading.tagName.toLowerCase();
        const indent = level === 'h3' ? 'ml-4' : '';

        li.innerHTML = `
            <a href="#${id}" class="toc-link block py-2 px-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/30 transition-all duration-200 text-sm ${indent}" data-target="${id}">
                ${heading.textContent.trim()}
            </a>
        `;

        tocList.appendChild(li);
    });

    tocToggle.addEventListener('click', () => {
        const isCollapsed = tocNav.style.display === 'none';
        tocNav.style.display = isCollapsed ? 'block' : 'none';
        tocToggle.querySelector('svg').style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(-90deg)';
    });

    const tocLinks = tocContainer.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const tocHeight = tocContainer.offsetHeight;
                const offset = headerHeight + tocHeight + 20;

                const targetPosition = targetElement.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                updateActiveLink(link);
            }
        });
    });

    function updateActiveLink(activeLink) {
        if (currentActiveLink) {
            currentActiveLink.classList.remove('bg-purple-600/30', 'text-white', 'border-l-2', 'border-purple-500');
            currentActiveLink.classList.add('text-gray-300');
        }

        activeLink.classList.remove('text-gray-300');
        activeLink.classList.add('bg-purple-600/30', 'text-white', 'border-l-2', 'border-purple-500');
        currentActiveLink = activeLink;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const correspondingLink = tocContainer.querySelector(`[data-target="${entry.target.id}"]`);
                if (correspondingLink) {
                    updateActiveLink(correspondingLink);
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });

    headings.forEach(heading => {
        observer.observe(heading);
    });

    const articleHeader = article.querySelector('header');
    if (articleHeader) {
        articleHeader.insertAdjacentElement('afterend', tocContainer);
    } else {
        article.insertBefore(tocContainer, article.firstChild);
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobileView(e) {
        if (e.matches) {
            tocNav.style.display = 'none';
            tocToggle.querySelector('svg').style.transform = 'rotate(-90deg)';
        } else {
            tocNav.style.display = 'block';
            tocToggle.querySelector('svg').style.transform = 'rotate(0deg)';
        }
    }

    mediaQuery.addListener(handleMobileView);
    handleMobileView(mediaQuery);

    // Smart TOC positioning based on scroll
    let tocOriginalPosition = null;
    let tocFloating = false;

    function handleTocScroll() {
        if (!tocOriginalPosition) {
            tocOriginalPosition = tocContainer.getBoundingClientRect().top + window.pageYOffset;
        }

        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollTop = window.pageYOffset;
        const shouldFloat = scrollTop > (tocOriginalPosition - headerHeight - 20);

        if (shouldFloat && !tocFloating) {
            tocContainer.style.position = 'fixed';
            tocContainer.style.top = `${headerHeight + 20}px`;
            tocContainer.style.right = '20px';
            tocContainer.style.width = '280px';
            tocContainer.style.maxHeight = `calc(100vh - ${headerHeight + 40}px)`;
            tocContainer.style.overflowY = 'auto';
            tocContainer.style.zIndex = '30';
            tocFloating = true;
        } else if (!shouldFloat && tocFloating) {
            tocContainer.style.position = 'static';
            tocContainer.style.top = 'auto';
            tocContainer.style.right = 'auto';
            tocContainer.style.width = 'auto';
            tocContainer.style.maxHeight = 'none';
            tocContainer.style.overflowY = 'visible';
            tocFloating = false;
        }
    }

    // Only enable floating TOC on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleTocScroll);
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && tocFloating) {
                tocContainer.style.position = 'static';
                tocContainer.style.top = 'auto';
                tocContainer.style.right = 'auto';
                tocContainer.style.width = 'auto';
                tocContainer.style.maxHeight = 'none';
                tocContainer.style.overflowY = 'visible';
                tocFloating = false;
                tocOriginalPosition = null;
            } else if (window.innerWidth > 768 && !window.onscroll) {
                window.addEventListener('scroll', handleTocScroll);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('data-loaded', 'false');

        if (img.complete) {
            img.setAttribute('data-loaded', 'true');
        } else {
            img.addEventListener('load', function () {
                this.setAttribute('data-loaded', 'true');
            });

            img.addEventListener('error', function () {
                this.setAttribute('data-loaded', 'true');
            });
        }
    });
});

function setupEasterEggs() {
    let secretSequence = [];
    const snakeSequence = ['s', 'n', 'a', 'k', 'e'];
    const tetrisSequence = ['t', 'e', 't', 'r', 'i', 's'];
    const matrixSequence = ['m', 'a', 't', 'r', 'i', 'x'];
    const bsodSequence = ['b', 's', 'o', 'd'];

    document.addEventListener('keydown', function (e) {
        secretSequence.push(e.key.toLowerCase());

        if (secretSequence.length > Math.max(snakeSequence.length, tetrisSequence.length, matrixSequence.length, bsodSequence.length)) {
            secretSequence.shift();
        }

        if (arraysEqual(secretSequence.slice(-snakeSequence.length), snakeSequence)) {
            startSnakeGame();
            secretSequence = [];
        } else if (arraysEqual(secretSequence.slice(-tetrisSequence.length), tetrisSequence)) {
            startTetrisGame();
            secretSequence = [];
        } else if (arraysEqual(secretSequence.slice(-matrixSequence.length), matrixSequence)) {
            startMatrixEffect();
            secretSequence = [];
        } else if (arraysEqual(secretSequence.slice(-bsodSequence.length), bsodSequence)) {
            showBSOD();
            secretSequence = [];
        }
    });

    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }
}

function startSnakeGame() {
    const canvas = document.createElement('canvas');
    canvas.id = 'snake-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.backgroundColor = '#000';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 20;
    const tileCount = Math.floor(canvas.width / gridSize);

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;

    function drawGame() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        ctx.fillStyle = '#f00';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText('Press ESC to exit', 10, 60);
    }

    function update() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= Math.floor(canvas.height / gridSize) ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            resetGame();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * Math.floor(canvas.height / gridSize))
            };
        } else {
            snake.pop();
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = { x: 15, y: 15 };
        dx = 0;
        dy = 0;
        score = 0;
    }

    function gameLoop() {
        update();
        drawGame();
    }

    const gameInterval = setInterval(gameLoop, 100);

    function handleKeyPress(e) {
        if (e.key === 'Escape') {
            clearInterval(gameInterval);
            document.body.removeChild(canvas);
            document.removeEventListener('keydown', handleKeyPress);
            return;
        }

        switch (e.key) {
            case 'ArrowUp':
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx === 0) { dx = 1; dy = 0; }
                break;
        }
    }

    document.addEventListener('keydown', handleKeyPress);
    drawGame();
}

function startTetrisGame() {
    alert('Tetris game coming soon! 🎮');
}

function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9998';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const matrixArray = matrix.split('');
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px arial';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(draw, 35);

    function handleEscape(e) {
        if (e.key === 'Escape') {
            clearInterval(matrixInterval);
            document.body.removeChild(canvas);
            document.removeEventListener('keydown', handleEscape);
        }
    }

    document.addEventListener('keydown', handleEscape);

    setTimeout(() => {
        clearInterval(matrixInterval);
        if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
        }
        document.removeEventListener('keydown', handleEscape);
    }, 10000);
}

function showBSOD() {
    const bsod = document.createElement('div');
    bsod.id = 'bsod';
    bsod.style.position = 'fixed';
    bsod.style.top = '0';
    bsod.style.left = '0';
    bsod.style.width = '100vw';
    bsod.style.height = '100vh';
    bsod.style.backgroundColor = '#0000FF';
    bsod.style.color = '#FFFFFF';
    bsod.style.fontFamily = 'Courier New, monospace';
    bsod.style.fontSize = '14px';
    bsod.style.padding = '20px';
    bsod.style.zIndex = '9999';
    bsod.innerHTML = `
        <div style="text-align: center; margin-top: 100px;">
            <h1>:(</h1>
            <p>Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.</p>
            <br>
            <p>0% complete</p>
            <br>
            <p>For more information about this issue and possible fixes, visit our website</p>
            <p>If you call a support person, give them this info:</p>
            <p>Stop code: EASTER_EGG_ACTIVATED</p>
            <br>
            <p style="font-size: 12px;">Press ESC to continue...</p>
        </div>
    `;
    document.body.appendChild(bsod);

    function handleEscape(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(bsod);
            document.removeEventListener('keydown', handleEscape);
        }
    }

    document.addEventListener('keydown', handleEscape);

    setTimeout(() => {
        if (document.body.contains(bsod)) {
            document.body.removeChild(bsod);
        }
        document.removeEventListener('keydown', handleEscape);
    }, 5000);
}

function setupKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    let userInput = [];

    document.addEventListener('keydown', function (e) {
        userInput.push(e.code);

        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }

        if (userInput.length === konamiCode.length &&
            userInput.every((key, index) => key === konamiCode[index])) {
            activateKonamiEffect();
            userInput = [];
        }
    });
}

function activateKonamiEffect() {
    document.body.style.transform = 'rotate(360deg)';
    document.body.style.transition = 'transform 2s ease-in-out';

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    let colorIndex = 0;

    const colorInterval = setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 200);

    setTimeout(() => {
        document.body.style.transform = '';
        document.body.style.backgroundColor = '';
        document.body.style.transition = '';
        clearInterval(colorInterval);
    }, 3000);

    const message = document.createElement('div');
    message.innerHTML = '🎉 KONAMI CODE ACTIVATED! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.fontWeight = 'bold';
    message.style.color = '#fff';
    message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
    message.style.zIndex = '10000';
    message.style.animation = 'bounce 1s infinite';

    document.body.appendChild(message);

    setTimeout(() => {
        if (document.body.contains(message)) {
            document.body.removeChild(message);
        }
    }, 3000);
}

function setupGitHubActivityFeed() {
    const githubFeed = document.getElementById('github-feed');
    const githubLoading = document.getElementById('github-loading');

    if (!githubFeed) return;

    // GitHub username
    const username = 'paramientos';

    // Fetch GitHub events
    fetch(`https://api.github.com/users/${username}/events/public?per_page=10`)
        .then(response => {
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            return response.json();
        })
        .then(events => {
            githubLoading.style.display = 'none';
            displayGitHubEvents(events);
        })
        .catch(error => {
            console.error('Error fetching GitHub activity:', error);
            githubLoading.innerHTML = `
                <div class="text-center py-12">
                    <div class="text-red-400 mb-4">
                        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-lg font-medium mb-2">Unable to load GitHub activity</p>
                        <p class="text-sm text-gray-400">Please check back later or visit my GitHub profile directly</p>
                    </div>
                </div>
            `;
        });
}

function displayGitHubEvents(events) {
    const githubFeed = document.getElementById('github-feed');

    if (events.length === 0) {
        githubFeed.innerHTML = `
            <div class="text-center py-12">
                <div class="text-gray-400">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"></path>
                    </svg>
                    <p class="text-lg font-medium mb-2">No recent activity</p>
                    <p class="text-sm">Check back later for updates</p>
                </div>
            </div>
        `;
        return;
    }

    const eventItems = events.slice(0, 6).map(event => {
        const eventDate = new Date(event.created_at);
        const timeAgo = getTimeAgo(eventDate);

        let eventIcon = '📝';
        let eventText = '';
        let eventColor = 'text-gray-300';

        switch (event.type) {
            case 'PushEvent':
                eventIcon = '🚀';
                eventColor = 'text-green-400';
                const commitCount = event.payload.commits ? event.payload.commits.length : 0;
                eventText = `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to`;
                break;
            case 'CreateEvent':
                eventIcon = '✨';
                eventColor = 'text-blue-400';
                eventText = `Created ${event.payload.ref_type}`;
                break;
            case 'IssuesEvent':
                eventIcon = '🐛';
                eventColor = 'text-yellow-400';
                eventText = `${event.payload.action} issue in`;
                break;
            case 'PullRequestEvent':
                eventIcon = '🔀';
                eventColor = 'text-purple-400';
                eventText = `${event.payload.action} pull request in`;
                break;
            case 'WatchEvent':
                eventIcon = '⭐';
                eventColor = 'text-yellow-400';
                eventText = 'Starred';
                break;
            case 'ForkEvent':
                eventIcon = '🍴';
                eventColor = 'text-orange-400';
                eventText = 'Forked';
                break;
            default:
                eventText = `${event.type.replace('Event', '').toLowerCase()} in`;
        }

        return `
            <div class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                <div class="flex items-start space-x-4">
                    <div class="text-2xl">${eventIcon}</div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="${eventColor} font-medium">${eventText}</span>
                            <a href="${event.repo.url.replace('api.github.com/repos', 'github.com')}" 
                               target="_blank" rel="noopener noreferrer"
                               class="text-white hover:text-purple-300 transition-colors font-mono text-sm truncate">
                                ${event.repo.name}
                            </a>
                        </div>
                        ${event.payload.commits && event.payload.commits.length > 0 ? `
                            <div class="text-sm text-gray-400 mb-2">
                                Latest: "${event.payload.commits[event.payload.commits.length - 1].message.split('\n')[0]}"
                            </div>
                        ` : ''}
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-500">${timeAgo}</span>
                            <a href="${event.repo.url.replace('api.github.com/repos', 'github.com')}" 
                               target="_blank" rel="noopener noreferrer"
                               class="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                                View Repository →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    githubFeed.innerHTML = eventItems;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
}
