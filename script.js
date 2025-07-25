document.addEventListener('DOMContentLoaded', () => {
    // Configura o Tailwind para reconhecer a classe 'dark' no HTML
    tailwind.config = {
        darkMode: 'class'
    };
    EducaMilanApp.init();
});

const EducaMilanApp = {
    data: {
        topics: ["Provas e Simulados", "Planos de Aula", "Educação Inclusiva", "Ferramentas Offline", "Parcerias", "Outro Assunto"]
    },

    init() {
        this.ui.initTheme();
        this.ui.initTypewriter();
        this.ui.initScrollAnimations();
        this.ui.updateCopyrightYear();
        this.ui.populateContactFormTopics();
        this.bindEvents();
        lucide.createIcons();
    },

    bindEvents() {
        document.getElementById('mobile-menu-button')?.addEventListener('click', this.ui.toggleMobileMenu);
        document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', this.ui.smoothScroll));
        document.getElementById('theme-toggle')?.addEventListener('click', this.ui.toggleTheme);
        document.getElementById('mobile-theme-toggle')?.addEventListener('click', this.ui.toggleTheme);
        document.getElementById('contact-form')?.addEventListener('submit', this.handleContactFormSubmit);
        document.getElementById('widget-main-button')?.addEventListener('click', this.ui.toggleFloatingWidget);
    },

    handleContactFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const topic = form['subject-topic'].value;
        const message = form.message.value;
        const subject = encodeURIComponent(`Contato via Site: ${topic} - ${name}`);
        const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
        window.location.href = `mailto:educamilan@gmail.com?subject=${subject}&body=${body}`;
    },

    ui: {
        initTheme() {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        toggleTheme() {
            document.documentElement.classList.toggle('dark');
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            lucide.createIcons();
        },
        toggleMobileMenu() {
            document.getElementById('mobile-menu')?.classList.toggle('hidden');
        },
        smoothScroll(e) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            document.getElementById('mobile-menu')?.classList.add('hidden');
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
        },
        initTypewriter() {
            const type = (el, text, delay = 100) => {
                let i = 0;
                el.innerHTML = "";
                const cursor = document.createElement('span');
                cursor.className = 'typewriter-cursor';
                el.appendChild(cursor);
                const typing = setInterval(() => {
                    if (i < text.length) {
                        el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                        i++;
                    } else {
                        clearInterval(typing);
                        setTimeout(() => cursor.style.display = 'none', 1000);
                    }
                }, delay);
            };
            setTimeout(() => type(document.getElementById('typewriter-1'), "Alma"), 500);
            setTimeout(() => type(document.getElementById('typewriter-2'), "Propósito"), 1200);
        },
        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));
        },
        updateCopyrightYear() {
            const yearSpan = document.getElementById('copyright-year');
            if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        },
        populateContactFormTopics() {
            const select = document.getElementById('subject-topic');
            if (!select) return;
            select.innerHTML = '<option value="" disabled selected>Selecione um tópico...</option>';
            select.innerHTML += EducaMilanApp.data.topics.map(topic => `<option value="${topic}">${topic}</option>`).join('');
        },
        toggleFloatingWidget() {
            const button = document.getElementById('widget-main-button');
            const options = document.getElementById('widget-options');
            const icon = button.querySelector('i');
            const isOpen = button.classList.toggle('open');

            if (isOpen) {
                options.classList.remove('max-h-0', 'opacity-0');
                options.classList.add('max-h-48');
                icon.classList.add('rotate-45');
            } else {
                options.classList.add('max-h-0', 'opacity-0');
                options.classList.remove('max-h-48');
                icon.classList.remove('rotate-45');
            }
        }
    }
};