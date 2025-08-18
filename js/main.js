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
