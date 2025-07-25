 // --- DATA ---
        const servicesData = [
            { 
                title: "Tecnologia na Educação", 
                icon: "cpu",
                color: "text-blue-500",
                services: ["Introdução à Gamificação", "Plataformas de Realidade Aumentada", "Ferramentas de Realidade Virtual", "Uso de Inteligência Artificial no Ensino", "Robótica Educacional", "Desenvolvimento de Apps Educativos", "Laboratórios Virtuais para Ciências", "Automação de Tarefas de Professores com IA", "Uso de Blockchain na Certificação Escolar", "Aplicações de Machine Learning no Ensino"]
            },
            { 
                title: "Métodos Inovadores", 
                icon: "lightbulb",
                color: "text-amber-500",
                services: ["Ensino Baseado em Projetos (PBL)", "Flipped Classroom (Sala de Aula Invertida)", "Ensino Personalizado", "Educação Baseada em Competências", "Ensino com Narrativas (Storytelling)", "Aprendizagem Socioemocional", "Design Thinking na Educação"]
            },
            { 
                title: "Inclusão e Acessibilidade", 
                icon: "accessibility",
                color: "text-violet-500",
                services: ["Educação Inclusiva para Alunos com Deficiências", "Recursos Didáticos para Inclusão de Autistas", "Acessibilidade Digital em Aulas Virtuais", "Tecnologias Assistivas no Ensino Regular", "Materiais Adaptados para Deficiência Visual", "Inclusão de Alunos Surdos", "Planejamento Inclusivo"]
            },
            { 
                title: "Formação de Professores", 
                icon: "graduation-cap",
                color: "text-teal-500",
                services: ["Capacitação em Gamificação", "Formação em Ferramentas Digitais", "Estratégias para Aulas Online", "Práticas de Avaliação Formativa", "Treinamento em Inclusão Escolar", "Desenvolvimento de Habilidades Socioemocionais", "Gestão de Sala de Aula"]
            },
            { 
                title: "Recursos Educacionais", 
                icon: "library",
                color: "text-orange-500",
                services: ["Criação de Materiais Interativos", "Recursos Educacionais Abertos (REAs)", "Desenvolvimento de E-books", "Criação de Vídeos Educativos", "Materiais para Ensino de Línguas", "Guias para Pais", "Jogos de Tabuleiro Educativos"]
            },
            { 
                title: "Experiências Gamificadas", 
                icon: "gamepad-2",
                color: "text-red-500",
                services: ["Jogos de Matemática", "Criação de Quizzes Interativos", "Missões e Desafios para História", "Simuladores para Ensino de Ciências"]
            },
            {
                title: "Projetos Interdisciplinares",
                icon: "book-copy",
                color: "text-lime-500",
                services: ["Projetos sobre Sustentabilidade", "Educação Financeira", "Estudos com Foco em Cidadania", "Jogos para Temas Globais", "Projetos de Inovação Científica"]
            },
            {
                title: "Educação Infantil e Fundamental",
                icon: "baby",
                color: "text-pink-500",
                services: ["Atividades Lúdicas para Educação Infantil", "Contação de Histórias", "Jogos Sensoriais", "Atividades de Alfabetização Divertidas", "Introdução à Matemática com Brincadeiras"]
            },
            {
                title: "Educação Lúdica e Criativa",
                icon: "lightbulb",
                color: "text-cyan-500",
                services: ["Planejamento de Gincanas Educativas", "Oficinas de Contação de Histórias", "Projetos de Criação de Jogos", "Dinâmicas de Exploração com Arte"]
            },
            {
                title: "Educação Global e Multicultural",
                icon: "globe",
                color: "text-emerald-500",
                services: ["Estudos sobre Culturas Globais", "Projetos de Parcerias Internacionais", "Aulas sobre Migrações e Globalização", "Oficinas sobre Línguas Estrangeiras"]
            },
            {
                title: "Comunicação e Mídia",
                icon: "megaphone",
                color: "text-fuchsia-500",
                services: ["Projetos sobre Educação Midiática", "Análise Crítica de Mídias", "Produção Jornalística Escolar", "Dinâmicas sobre Fake News", "Criação de Conteúdo Digital"]
            },
            {
                title: "Empreendedorismo Educacional",
                icon: "rocket",
                color: "text-rose-500",
                services: ["Planejamento de Negócios Escolares", "Oficinas de Empreendedorismo para Jovens", "Aulas sobre Gestão de Projetos", "Projetos de Startups Educacionais"]
            },
             {
                title: "Diversos",
                icon: "boxes",
                color: "text-slate-500",
                services: ["Exploração de Assuntos Multidisciplinares", "Ferramentas de Ensino Não Convencionais", "Planejamento Escolar Personalizado", "Projetos de Extensão Escolar"]
            }
        ];
        
        // --- GEMINI API INTEGRATION ---
        
        // Stores the conversation history for the chatbot
        let chatHistory = [];

        /**
         * Generic function to call the Gemini API.
         * @param {string} prompt The user's prompt.
         * @param {Array} history The conversation history (optional).
         * @returns {Promise<string>} The text response from the API.
         */
        async function callGeminiAPI(prompt, history = []) {
            const apiKey = ""; // API key is handled by the environment.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const fullHistory = [...history, { role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: fullHistory };

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const result = await response.json();
                
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    return text;
                } else {
                    console.error("Unexpected API response structure:", result);
                    return "Desculpe, não consegui processar a resposta. Tente novamente.";
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                return "Ocorreu um erro ao conectar com a IA. Por favor, verifique sua conexão e tente mais tarde.";
            }
        }


        document.addEventListener('DOMContentLoaded', () => {
            // --- INITIALIZE ---
            lucide.createIcons();
            populateServiceGrid();
            populateContactFormTopics();
            setupEventListeners();
            updateCopyrightYear();
            initializeChat();
        });

        function populateServiceGrid() {
            const grid = document.getElementById('service-grid');
            if (!grid) return;
            grid.innerHTML = servicesData.map(service => `
                <div class="service-card flex flex-col items-center text-center" data-title="${service.title}">
                    <i data-lucide="${service.icon}" class="w-12 h-12 mb-4 ${service.color}"></i>
                    <h3 class="text-xl font-bold text-slate-800">${service.title}</h3>
                </div>
            `).join('');
            lucide.createIcons(); // Re-render icons
        }
        
        function populateContactFormTopics() {
            const select = document.getElementById('subject-topic');
            if(!select) return;
            select.innerHTML = '<option value="" disabled selected>Selecione um tópico...</option>';
            select.innerHTML += servicesData.map(service => `<option value="${service.title}">${service.title}</option>`).join('');
        }

        function updateCopyrightYear() {
            const yearSpan = document.getElementById('copyright-year');
            if(yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        }

        // --- EVENT LISTENERS ---
        function setupEventListeners() {
            // Mobile Menu
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Service Modal
            const modal = document.getElementById('service-modal');
            const closeModalBtn = document.getElementById('close-modal');
            const serviceGrid = document.getElementById('service-grid');

            if(serviceGrid) {
                serviceGrid.addEventListener('click', (e) => {
                    const card = e.target.closest('.service-card');
                    if (card) {
                        const title = card.dataset.title;
                        const serviceData = servicesData.find(s => s.title === title);
                        if (serviceData) {
                            document.getElementById('modal-title').textContent = serviceData.title;
                            const contentEl = document.getElementById('modal-content');
                            contentEl.innerHTML = `<ul class="list-disc list-inside space-y-2">${serviceData.services.map(s => `<li>${s}</li>`).join('')}</ul>`;
                            modal.classList.add('visible');
                        }
                    }
                });
            }

            const closeModal = () => modal.classList.remove('visible');
            if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
            if(modal) modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Contact Form
            const contactForm = document.getElementById('contact-form');
            if(contactForm) {
                contactForm.addEventListener('submit', handleContactFormSubmit);
            }
            
            // --- GEMINI FEATURES LISTENERS ---
            // Chatbot
            const chatSendBtn = document.getElementById('chat-send-btn');
            const chatInput = document.getElementById('chat-input');
            chatSendBtn.addEventListener('click', handleChatSubmit);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleChatSubmit();
                }
            });

            // Lesson Plan Generator
            const lessonPlanForm = document.getElementById('lesson-plan-form');
            lessonPlanForm.addEventListener('submit', handleLessonPlanSubmit);
        }
        
        // --- CHATBOT FUNCTIONS ---
        
        function initializeChat() {
            const persona = "Você é Dudu, um assistente de IA da EducaMilan. Sua especialidade é educação, tecnologia e pedagogia. Você é amigável, prestativo e inspirador. Seu objetivo é ajudar educadores, pais e alunos a encontrarem soluções criativas para seus desafios. Comece a conversa se apresentando brevemente.";
            const firstMessage = "Olá! Eu sou o Dudu, seu assistente pedagógico de IA. Como posso ajudar você a inovar na educação hoje?";
            
            chatHistory.push({ role: "user", parts: [{ text: persona }] });
            chatHistory.push({ role: "model", parts: [{ text: firstMessage }] });
            
            // The initial message is already in the HTML, so we don't need to add it again.
        }

        async function handleChatSubmit() {
            const chatInput = document.getElementById('chat-input');
            const message = chatInput.value.trim();
            if (!message) return;

            appendMessage(message, 'user');
            chatInput.value = '';
            showTypingIndicator();

            const prompt = message;
            const response = await callGeminiAPI(prompt, chatHistory);
            
            // Update history
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            chatHistory.push({ role: "model", parts: [{ text: response }] });

            removeTypingIndicator();
            appendMessage(response, 'ai');
        }

        function appendMessage(text, sender) {
            const messagesContainer = document.getElementById('chat-messages');
            const messageEl = document.createElement('div');
            let formattedText = text.replace(/\n/g, '<br>');

            if (sender === 'user') {
                messageEl.className = 'flex gap-3 justify-end';
                messageEl.innerHTML = `
                    <div class="bg-slate-200 p-3 rounded-lg rounded-br-none shadow-sm max-w-xs border border-slate-200">${formattedText}</div>
                    <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 flex-shrink-0">VC</div>
                `;
            } else { // AI
                messageEl.className = 'flex gap-3 justify-start ai-message';
                messageEl.innerHTML = `
                    <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">AI</div>
                    <div class="bg-blue-100 text-slate-800 p-3 rounded-lg rounded-bl-none shadow-sm max-w-xs border border-blue-200">${formattedText}</div>
                `;
            }
            messagesContainer.appendChild(messageEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chat-messages');
            const typingEl = document.createElement('div');
            typingEl.id = 'typing-indicator';
            typingEl.className = 'flex gap-3 justify-start';
            typingEl.innerHTML = `
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">AI</div>
                <div class="bg-blue-100 text-slate-800 p-3 rounded-lg rounded-bl-none shadow-sm border border-blue-200 flex items-center">
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce mx-1" style="animation-delay: 0.1s;"></div>
                    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                </div>
            `;
            messagesContainer.appendChild(typingEl);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        // --- LESSON PLAN GENERATOR FUNCTIONS ---
        
        async function handleLessonPlanSubmit(e) {
            e.preventDefault();
            const topic = document.getElementById('lesson-topic').value.trim();
            const grade = document.getElementById('lesson-grade').value.trim();
            const resultContainer = document.getElementById('lesson-plan-result');
            const submitButton = document.getElementById('lesson-plan-btn');

            if (!topic || !grade) {
                alert("Por favor, preencha o tema e a série.");
                return;
            }

            resultContainer.style.display = 'block';
            resultContainer.innerHTML = '<div class="flex justify-center items-center p-8"><div class="loader"></div></div>';
            submitButton.disabled = true;
            submitButton.innerHTML = 'Gerando...';

            const prompt = `Crie um plano de aula detalhado e criativo para o tema "${topic}" para alunos do "${grade}". O plano deve ser estruturado com os seguintes tópicos em negrito:
            **Tema:** ${topic}
            **Série/Ano:** ${grade}
            **Objetivos de Aprendizagem:** (Liste 3 objetivos claros e mensuráveis)
            **Materiais Necessários:** (Liste os materiais)
            **Etapas da Aula (Passo a Passo):** (Descreva pelo menos 4 etapas, incluindo uma introdução lúdica, uma atividade principal prática e uma conclusão)
            **Avaliação:** (Sugira uma forma criativa de avaliar o aprendizado dos alunos)
            **Dica de Inclusão:** (Forneça uma dica para adaptar a aula para alunos com necessidades especiais, como TDAH ou dislexia).`;

            const response = await callGeminiAPI(prompt);
            
            // Format response with bolding and line breaks
            let formattedResponse = response
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800">$1</strong>');

            resultContainer.innerHTML = `<h3 class="text-xl font-bold mb-4 text-center">Plano de Aula Gerado com IA ✨</h3><div class="prose max-w-none">${formattedResponse}</div>`;
            submitButton.disabled = false;
            submitButton.innerHTML = 'Gerar Plano de Aula';
        }


        // --- ORIGINAL FUNCTIONS ---

        function handleContactFormSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const name = form.name.value;
            const phone = form.phone.value;
            const email = form.email.value;
            const topic = form['subject-topic'].value;
            const summaryInput = form['subject-summary'];
            
            const summaryWords = summaryInput.value.trim().split(/\s+/);
            if (summaryWords.length > 2) {
                alert("Por favor, defina o assunto em no máximo duas palavras.");
                summaryInput.focus();
                return;
            }
            const summary = summaryInput.value;
            const message = form.message.value;

            const subject = encodeURIComponent(`${topic}: ${summary}`);
            const body = encodeURIComponent(
                `Nome: ${name}\n` +
                `Telefone: ${phone}\n` +
                `Email: ${email}\n\n` +
                `Mensagem:\n${message}`
            );

            window.location.href = `mailto:educamilan@gmail.com?subject=${subject}&body=${body}`;
        }
