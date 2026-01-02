document.addEventListener('DOMContentLoaded', function() {
    
    const body = document.body;
    const btn = document.getElementById("theme-toggle");
    const storageKey = 'themePreference';

    function applyTheme(isLight) {
        if (isLight) {
            body.classList.add("light");
            btn.textContent = "☀";
        } else {
            body.classList.remove("light");
            btn.textContent = "🌙";
        }
    }

    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light') {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    btn.addEventListener("click", () => {
        const isCurrentlyLight = body.classList.contains("light");
        applyTheme(!isCurrentlyLight);
        const newTheme = !isCurrentlyLight ? 'light' : 'dark';
        localStorage.setItem(storageKey, newTheme);
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
           
            this.querySelectorAll('.ripple').forEach(r => r.remove());

            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');

            this.appendChild(circle);
        });
    });

    const observerOptions = {
        threshold: 0.1 
    };

    const generalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              
                const delay = entry.target.getAttribute('data-delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('reveal-visible');
                
                const skillCard = entry.target.closest('.skill-card');
                if (skillCard) {
                    const skillLevel = skillCard.getAttribute('data-skill-level');
                    const fillElement = skillCard.querySelector('.skill-fill');
                    
                    if(fillElement && !fillElement.classList.contains('skill-animate')) {
                         fillElement.style.width = `${skillLevel}%`;
                         fillElement.classList.add('skill-animate');
                    }
                }

                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => generalObserver.observe(el));

    if (document.getElementById('typed-output')) {
        new Typed('#typed-output', {
            strings: [
                "Técnico de Redes",
                "Estudante de Informática",
                "Desenvolvedor Front-end",
                "Desenvolvedor / Designer"
            ],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active'); 
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded); 
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.proj-card-link');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.classList.add('hidden'), 500); 
                }
            });
        });
    });

    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalMeta = document.querySelector('.modal-meta-info');
    const modalCta = document.querySelector('.modal-cta-links');

    const projectData = {
    'bi-html': {
        title: 'Bilhete de Identidade em HTML/CSS',
        meta: 'Design Front-end',
        description: '<p>Este projeto demonstra o uso de tabelas, fontes personalizadas e posicionamento CSS para replicar um BI.</p>',
        links: [
            { text: 'Ver Imagem / PDF do Projeto', url: 'BI Ney_files/BI Ney.html' } 
        ]
    },
    'rede-lan': {
        title: 'Configuração de Rede LAN',
        meta: 'Infraestrutura de Redes',
        description: '<p>Projeto realizado no Cisco Packet Tracer simulando uma rede empresarial.</p>',
        links: [
            { text: 'Ver Diagrama (PDF/Imagem)', url: 'NeyMG/NeyMG.docx' } 
        ]
    },
    'projeto-novo': {
        title: 'Implementação de Rede Empresarial com Conectividade Sem Fio',
        meta: 'Conectividade Sem Fio',
        description: '<p>Configuração de uma infraestrutura de rede integrada no Cisco Packet Tracer, utilizando modem DSL para acesso externo, roteador wireless para distribuição de sinal e end-devices cabeados, garantindo uma topologia funcional e segura.</p>',
        links: [
            { text: 'Ver Documento', url: 'NeiLAN/NeiLAN.pkt' }
        ]
    }
};
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        modalCta.innerHTML = '';
        
        modalTitle.textContent = data.title;
        modalMeta.textContent = data.meta;
        modalDescription.innerHTML = data.description;
        
        data.links.forEach(link => {
            const btn = document.createElement('a');
            btn.href = link.url;
            btn.textContent = link.text;
            btn.target = '_blank';
            btn.classList.add('btn', 'primary-btn');
            modalCta.appendChild(btn);
        });

        modalOverlay.classList.add('active');
        body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        body.style.overflow = 'auto';
    }

    document.querySelectorAll('.open-modal').forEach(card => {
        card.addEventListener('click', function() {
            openModal(this.getAttribute('data-project-id'));
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    const notificationArea = document.getElementById('notification-area');
    
    function showNotification(message, type = 'success', duration = 5000) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerHTML = `<p class="notification-message">${message}</p>`;
        
        notificationArea.prepend(notification);
        setTimeout(() => notification.classList.add('show'), 10); 

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500); 
        }, duration);
    }

    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(emailInput.value)) {
                showNotification('❌ Erro: Por favor, insira um email válido.', 'error', 7000);
                return;
            }

            showNotification('⏳ Processando envio...', 'info', 2000); 
            
            setTimeout(() => {
                showNotification('✅ Mensagem enviada com sucesso! Agradeço o contato.', 'success', 7000);
                contactForm.reset();
            }, 2000); 
        });
    }

    const passwordInput = document.getElementById('password-input');
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqNumber = document.getElementById('req-number');

    const regexes = {
        length: /.{8,}/,        
        uppercase: /[A-Z]/,     
        number: /[0-9]/         
    };

    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }

    function validatePassword() {
        const value = passwordInput.value;
        updateRequirement(reqLength, regexes.length.test(value));
        updateRequirement(reqUppercase, regexes.uppercase.test(value));
        updateRequirement(reqNumber, regexes.number.test(value));
    }

    function updateRequirement(element, passed) {
        if (passed) {
            element.classList.remove('fail');
            element.classList.add('success');
        } else {
            element.classList.remove('success');
            element.classList.add('fail');
        }
    }
});



const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = "A enviar...";
        btn.disabled = true;

        setTimeout(() => {
            showNotification("Mensagem enviada com sucesso!", "success");
            this.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 2000);
    });
}

function showNotification(message, type) {
    const area = document.getElementById('notification-area');
    const toast = document.createElement('div');
    toast.className = `notification show ${type}`;
    toast.innerHTML = `<p class="notification-message">✅ ${message}</p>`;
    
    area.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

