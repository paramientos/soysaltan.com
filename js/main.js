// Main JavaScript file for Soysal Tan website

document.addEventListener('DOMContentLoaded', function() {
    // Tüm başlangıç fonksiyonları burada toplanır
    setupThemeToggle();
    setupNavbarScroll();
    setupSmoothScrolling();
    setupFormValidation();
    setupStarsBackground();
    setupCardTilt();
    setupMobileMenu();
    setupTerminal(); 
});

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const isDarkMode = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

function setupNavbarScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('backdrop-blur-2xl', 'shadow-lg');
        } else {
            header.classList.remove('backdrop-blur-2xl', 'shadow-lg');
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupFormValidation() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            let isValid = true;
            if (!nameField.value.trim()) {
                markInvalid(nameField, 'İsim alanı zorunludur');
                isValid = false;
            } else {
                markValid(nameField);
            }
            if (!emailField.value.trim()) {
                markInvalid(emailField, 'E-posta alanı zorunludur');
                isValid = false;
            } else if (!isValidEmail(emailField.value)) {
                markInvalid(emailField, 'Geçerli bir e-posta adresi giriniz');
                isValid = false;
            } else {
                markValid(emailField);
            }
            if (!subjectField.value.trim()) {
                markInvalid(subjectField, 'Konu alanı zorunludur');
                isValid = false;
            } else {
                markValid(subjectField);
            }
            if (!messageField.value.trim()) {
                markInvalid(messageField, 'Mesaj alanı zorunludur');
                isValid = false;
            } else {
                markValid(messageField);
            }
            if (isValid) {
                contactForm.innerHTML = `
                    <div class="text-center py-12">
                        <svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h3 class="mt-2 text-xl font-medium text-gray-900 dark:text-gray-100">Mesajınız gönderildi!</h3>
                        <p class="mt-1 text-gray-500 dark:text-gray-400">En kısa sürede size dönüş yapacağım.</p>
                    </div>
                `;
            }
        });
    }
    function markInvalid(field, message) {
        field.classList.add('border-red-500');
        field.classList.remove('border-green-500');
        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
        errorDiv.textContent = message;
    }
    function markValid(field) {
        field.classList.remove('border-red-500');
        field.classList.add('border-green-500');
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

function setupStarsBackground() {
    const starsBg = document.getElementById('stars-bg');
    if (!starsBg) return;
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsBg.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 120;
    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.2 + 0.3,
                o: Math.random() * 0.5 + 0.5,
                d: Math.random() * 0.5 + 0.5
            });
        }
    }
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const star of stars) {
            ctx.save();
            ctx.globalAlpha = star.o;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#a259ff';
            ctx.fill();
            ctx.restore();
        }
    }
    function animateStars() {
        for (const star of stars) {
            star.y += star.d;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        }
        drawStars();
        requestAnimationFrame(animateStars);
    }
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
    });
    createStars();
    animateStars();
}

function setupCardTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Interactive Terminal
function setupTerminal() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalForm = document.getElementById('terminal-form');

    if (!terminalInput || !terminalOutput || !terminalForm) return;

    let commandHistory = [];
    let historyIndex = -1;
    let gameActive = false;
    let secretNumber = 0;
    let attempts = 0;

    const scrollToBottom = () => {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const printOutput = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        terminalOutput.appendChild(div);
        scrollToBottom();
    };

    const printCommand = (cmd) => {
        const div = document.createElement('div');
        div.innerHTML = `<span class="text-green-400">$</span> <span class="text-gray-100">${cmd}</span>`;
        terminalOutput.appendChild(div);
    };

    const commands = {
        help: `
            <ul class="list-disc list-inside space-y-1">
                <li><span class="text-yellow-400">help</span> - Bu yardım menüsünü gösterir.</li>
                <li><span class="text-yellow-400">fetch</span> - Sistem bilgilerini gösterir.</li>
                <li><span class="text-yellow-400">ls</span> - Dosyaları listeler (sadece bir espri).</li>
                <li><span class="text-yellow-400">cowsay &lt;mesaj&gt;</span> - İnek konuşur.</li>
                <li><span class="text-yellow-400">hack &lt;hedef&gt;</span> - Sahte hack simülasyonu başlatır.</li>
                <li><span class="text-yellow-400">game</span> - Sayı tahmin oyununu başlatır.</li>
                <li><span class="text-yellow-400">snake</span> - Yılan oyununu başlatır.</li>
                <li><span class="text-yellow-400">theme &lt;tema&gt;</span> - Temayı değiştirir (default, matrix, retro).</li>
                <li><span class="text-yellow-400">weather &lt;şehir&gt;</span> - Belirtilen şehrin hava durumunu gösterir.</li>
                <li><span class="text-yellow-400">bsod</span> - Mavi ekran şakası.</li>
                <li><span class="text-yellow-400">self-destruct</span> - Terminali imha eder.</li>
                <li><span class="text-yellow-400">clear</span> - Terminali temizler.</li>
                <li><span class="text-yellow-400">matrix</span> - Matrix kod yağmuru animasyonunu başlatır.</li>
                <li><span class="text-yellow-400">ascii-art &lt;tür&gt;</span> - ASCII sanat gösterir (cat, dog, coffee, heart).</li>
                <li><span class="text-yellow-400">calc &lt;ifade&gt;</span> - Matematiksel ifadeleri hesaplar.</li>
                <li><span class="text-yellow-400">quote</span> - Rastgele bir alıntı gösterir.</li>
            </ul>
        `,
        fetch: `
            <ul class="list-disc list-inside space-y-1">
                <li><span class="text-yellow-400">Sistem:</span> ${navigator.userAgent}</li>
                <li><span class="text-yellow-400">Platform:</span> ${navigator.platform}</li>
                <li><span class="text-yellow-400">Dil:</span> ${navigator.language}</li>
                <li><span class="text-yellow-400">Çözünürlük:</span> ${window.innerWidth}x${window.innerHeight}</li>
                <li><span class="text-yellow-400">Piksel Oranı:</span> ${window.devicePixelRatio}</li>
            </ul>
        `,
        ls: `
            <ul class="list-disc list-inside space-y-1">
                <li><span class="text-yellow-400">README.md</span></li>
                <li><span class="text-yellow-400">LICENSE</span></li>
                <li><span class="text-yellow-400">package.json</span></li>
                <li><span class="text-yellow-400">node_modules/</span></li>
                <li><span class="text-yellow-400">public/</span></li>
                <li><span class="text-yellow-400">src/</span></li>
            </ul>
        `,
        about: 'Ben Soysal Tan. PHP & Laravel geliştiricisiyim. DevOps ve Siber Güvenlik alanlarına büyük bir tutkuyla bağlıyım.',
        socials: `
            <ul class="list-inside list-disc pl-2">
                <li><a href="https://github.com/soysaltan" target="_blank" class="text-purple-400 hover:underline">GitHub</a></li>
                <li><a href="https://linkedin.com/in/soysaltan" target="_blank" class="text-purple-400 hover:underline">LinkedIn</a></li>
                <li><a href="https://twitter.com/soysaltan" target="_blank" class="text-purple-400 hover:underline">Twitter</a></li>
            </ul>
        `,
        contact: 'Bana <a href="mailto:soysal.tan@example.com" class="text-purple-400 hover:underline">soysal.tan@example.com</a> adresinden ulaşabilirsiniz.',
        date: () => new Date().toLocaleString('tr-TR'),
        clear: () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        'self-destruct': () => {
            const resultDiv = document.createElement('div');
            terminalOutput.appendChild(resultDiv);

            let countdown = 5;
            resultDiv.innerHTML = `<span class="text-red-500">UYARI: Kendi kendini imha sekansı başlatıldı. ${countdown}...</span>`;

            const countdownInterval = setInterval(() => {
                countdown--;
                resultDiv.innerHTML = `<span class="text-red-500">UYARI: Kendi kendini imha sekansı başlatıldı. ${countdown}...</span>`;
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    resultDiv.innerHTML = `<span class="text-red-500">BOOM!</span>`;
                    document.querySelectorAll('header, section, footer').forEach(el => {
                        el.classList.add('destruct');
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 4000);
                }
            }, 1000);

            return '';
        },
        'hack': async () => {
            const outputDiv = document.createElement('div');
            terminalOutput.appendChild(outputDiv);

            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            const steps = [
                "Bağlantı noktası taranıyor...",
                "Güvenlik duvarı atlatılıyor...",
                "Şifreleme anahtarları çözülüyor...",
                "Root erişimi kazanılıyor...",
                "Sisteme sızılıyor..."
            ];

            for (let i = 0; i < steps.length; i++) {
                const stepDiv = document.createElement('div');
                stepDiv.textContent = steps[i];
                outputDiv.appendChild(stepDiv);

                const progressBarContainer = document.createElement('div');
                progressBarContainer.className = 'progress-bar';
                const progressBarFill = document.createElement('div');
                progressBarFill.className = 'progress-bar-fill';
                progressBarContainer.appendChild(progressBarFill);
                outputDiv.appendChild(progressBarContainer);

                await sleep(200);

                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    progressBarFill.style.width = progress + '%';
                    if (progress >= 100) {
                        clearInterval(interval);
                    }
                }, 50);

                await sleep(800);
            }

            const successDiv = document.createElement('div');
            successDiv.innerHTML = '<span class="text-green-400">Erişim Sağlandı! Ana sisteme hoş geldiniz.</span>';
            outputDiv.appendChild(successDiv);

            return '';
        },
        'cowsay': (args) => {
            const message = args.replace(/^"|"$|^'|'$/g, '');
            if (!message) {
                return 'Ne söylememi istersin? Kullanım: cowsay "mesajın"';
            }

            const bubble = (text) => {
                const line = '─'.repeat(text.length + 2);
                return `┌${line}┐\n│ ${text} │\n└${line}┘`;
            };

            const cow = `
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`;

            return `<pre class="text-green-300">${bubble(message)}${cow}</pre>`;
        },
        'game': () => {
            gameActive = true;
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            return '1 ile 100 arasında bir sayı tuttum. Bakalım bulabilecek misin? (Çıkmak için: quit)';
        },
        'theme': (themeName) => {
            const terminalContainer = document.getElementById('terminal');
            if (!terminalContainer) return 'Hata: Terminal konteyneri bulunamadı.';

            const themes = ['matrix', 'retro'];
            terminalContainer.classList.remove(...themes.map(t => `theme-${t}`));

            if (themeName === 'default') {
                return 'Varsayılan temaya dönüldü.';
            }

            if (themes.includes(themeName)) {
                terminalContainer.classList.add(`theme-${themeName}`);
                return `${themeName} teması etkinleştirildi.`;
            } else {
                return `Bilinmeyen tema: ${themeName}. Kullanılabilir temalar: default, ${themes.join(', ')}.`;
            }
        },
        'bsod': () => {
            const bsod = document.getElementById('bsod');
            if (bsod) {
                bsod.style.display = 'flex';
                setTimeout(() => {
                    bsod.style.display = 'none';
                }, 5000);
            }
            return '';
        },
        'snake': () => {
            // Snake game logic would go here
            return 'Yılan oyunu yakında...';
        },
        'matrix': () => {
            const matrixCanvas = document.getElementById('matrix-canvas');
            if (!matrixCanvas) return 'Matrix canvas bulunamadı.';
            
            matrixCanvas.classList.remove('hidden');
            
            const ctx = matrixCanvas.getContext('2d');
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
            chars = chars.split('');
            
            const fontSize = 14;
            const columns = matrixCanvas.width / fontSize;
            
            let drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
            
            const exitButton = document.createElement('button');
            exitButton.textContent = 'Çıkış';
            exitButton.className = 'fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md z-50';
            document.body.appendChild(exitButton);
            
            exitButton.addEventListener('click', () => {
                matrixCanvas.classList.add('hidden');
                exitButton.remove();
                if (matrixInterval) clearInterval(matrixInterval);
            });
            
            let matrixInterval = setInterval(() => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                
                ctx.fillStyle = '#0F0';
                ctx.font = fontSize + 'px monospace';
                
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }, 33);
            
            return '';
        },
        'ascii-art': (args) => {
            const artType = args.trim().toLowerCase();
            const arts = {
                cat: `
 /\\_/\\
( o.o )
 > ^ <
`,
                dog: `
  __      _
o'')}____//
 \`_/      )
 (_(_/-(_/
`,
                coffee: `
      ( (
       ) )
    ........
    |      |]
    \\      /
     \`----'
`,
                heart: `
 /\\  /\\
/  \\/  \\
\\      /
 \\    /
  \\  /
   \\/
`
            };
            
            if (!artType) {
                return `Lütfen bir ASCII sanat türü belirtin. Kullanım: ascii-art <tür>
Mevcut türler: ${Object.keys(arts).join(', ')}`;
            }
            
            if (arts[artType]) {
                return `<pre class="text-green-300">${arts[artType]}</pre>`;
            } else {
                return `Belirtilen ASCII sanat türü bulunamadı: ${artType}
Mevcut türler: ${Object.keys(arts).join(', ')}`;
            }
        },
        'calc': (args) => {
            const expression = args.trim();
            if (!expression) {
                return 'Lütfen bir matematiksel ifade girin. Örnek: calc 2+2 veya calc 5*10-3';
            }
            
            try {
                // Güvenli bir şekilde matematiksel ifadeleri değerlendirmek için Function kullanıyoruz
                // Sadece matematiksel işlemler için güvenli bir ortam sağlar
                const safeEval = new Function('return ' + expression);
                const result = safeEval();
                
                if (isNaN(result) || !isFinite(result)) {
                    return 'Geçersiz matematiksel ifade. Lütfen sadece sayılar ve işlemler (+, -, *, /, %, **) kullanın.';
                }
                
                return `<span class="text-yellow-400">${expression}</span> = <span class="text-green-400">${result}</span>`;
            } catch (error) {
                return 'Geçersiz matematiksel ifade. Lütfen sadece sayılar ve işlemler (+, -, *, /, %, **) kullanın.';
            }
        },
        'quote': () => {
            const quotes = [
                {
                    text: "Programlama, bir bilgisayara ne yapacağını söyleme sanatıdır.",
                    author: "Donald Knuth"
                },
                {
                    text: "Kod, insanların okuması için yazılır, tesadüfen makineler tarafından çalıştırılır.",
                    author: "Harold Abelson"
                },
                {
                    text: "Basitlik, karmaşıklığın ötesindedir.",
                    author: "Steve Jobs"
                },
                {
                    text: "Bilgisayarlar faydalıdır. Onlar size cevaplar verir.",
                    author: "Pablo Picasso"
                },
                {
                    text: "Bilgisayar bilimi aslında bilgisayarlarla ilgili değildir. Tıpkı astronominin teleskoplarla ilgili olmadığı gibi.",
                    author: "Edsger W. Dijkstra"
                },
                {
                    text: "Hata ayıklama, kodu yazmaktan iki kat daha zordur. Bu nedenle, kodunuz olabildiğince zekice ise, hata ayıklayacak kadar zeki değilsiniz demektir.",
                    author: "Brian W. Kernighan"
                },
                {
                    text: "Bilgi güçtür.",
                    author: "Francis Bacon"
                },
                {
                    text: "Başarı, başarısızlıktan başarısızlığa coşkuyu kaybetmeden geçmektir.",
                    author: "Winston Churchill"
                },
                {
                    text: "Hayal ettiğiniz her şeyi yapabilirsiniz. Tek yapmanız gereken harekete geçmektir.",
                    author: "Johann Wolfgang von Goethe"
                },
                {
                    text: "Hayatın %10'u size ne olduğu, %90'ı ise ona nasıl tepki verdiğinizdir.",
                    author: "Charles R. Swindoll"
                }
            ];
            
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            return `<div class="p-4 bg-gray-800 rounded-md">
                <p class="text-lg italic">"${randomQuote.text}"</p>
                <p class="text-right text-sm text-gray-400">— ${randomQuote.author}</p>
            </div>`;
        },
        'weather': async (args) => {
            const city = args.trim();
            if (!city) {
                return 'Lütfen bir şehir belirtin. Kullanım: weather &lt;şehir&gt;';
            }

            const outputElement = document.createElement('div');
            outputElement.innerHTML = `Hava durumu alınıyor: ${city}...`;
            terminalOutput.appendChild(outputElement);
            scrollToBottom();

            try {
                const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=%C+%t+%w`);
                if (!response.ok) {
                    throw new Error('Hava durumu bilgisi alınamadı.');
                }
                const data = await response.text();
                outputElement.innerHTML = `<pre class="whitespace-pre-wrap">${city}: ${data}</pre>`;
            } catch (error) {
                outputElement.textContent = `Hata: ${error.message}`;
            }
            scrollToBottom();
            return '';
        }
    };

    terminalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullCommand = terminalInput.value.trim();
        if (fullCommand === '') return;

        printCommand(fullCommand);
        commandHistory.unshift(fullCommand);
        historyIndex = -1;

        terminalInput.value = '';

        const [command, ...args] = fullCommand.split(' ');

        if (gameActive) {
            if (command.toLowerCase() === 'quit') {
                gameActive = false;
                printOutput('Oyundan çıkıldı.');
            } else {
                const guess = parseInt(command);
                if (isNaN(guess)) {
                    printOutput('Lütfen geçerli bir sayı girin.');
                } else {
                    attempts++;
                    if (guess === secretNumber) {
                        printOutput(`<span class="text-green-400">Tebrikler! ${attempts} denemede doğru bildin.</span>`);
                        gameActive = false;
                    } else if (guess < secretNumber) {
                        printOutput('Daha yüksek bir sayı dene.');
                    } else {
                        printOutput('Daha düşük bir sayı dene.');
                    }
                }
            }
            scrollToBottom();
            return;
        }

        if (command in commands) {
            const commandValue = commands[command];
            if (typeof commandValue === 'function') {
                const result = await commandValue(args.join(' '));
                if (result) {
                    printOutput(result);
                }
            } else {
                printOutput(commandValue);
            }
        } else {
            printOutput(`Komut bulunamadı: ${command}. Yardım için 'help' yazın.`);
        }
        scrollToBottom();
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }
    });

    printOutput('Soysal Tan interaktif terminaline hoş geldiniz. Başlamak için `help` yazın.');
}
