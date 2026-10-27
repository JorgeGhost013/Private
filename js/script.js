/**
 * DRA. JULIANA ALVES - ADVOCACIA TRABALHISTA
 * Interatividade, Máscaras, Status de Expediente, Modais do Blog & Agendamento
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HEADER SCROLL & BACK TO TOP
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.footer-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. FUNÇÃO DE ROLAGEM SUAVE MINIMALISTA (EASING SUAVE SEM SALTOS)
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const smoothScrollToTarget = (targetElement, targetHash = '') => {
    if (!targetElement) return;

    // Calcular altura do cabeçalho fixo + espaçamento de respiro refinado
    const headerEl = document.querySelector('.site-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 80;
    const breathingOffset = 20; // 20px de respiro para destacar o título da seção
    const totalOffset = headerHeight + breathingOffset;

    let targetPosition = 0;
    if (targetElement.id !== 'inicio') {
      const elementRect = targetElement.getBoundingClientRect();
      targetPosition = Math.max(0, elementRect.top + window.pageYOffset - totalOffset);
    }

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    // Se já estiver no local, não faz nada
    if (Math.abs(distance) < 2) return;

    // Duração proporcional à distância, mantendo a experiência ágil e luxuosa
    const duration = Math.min(800, Math.max(450, Math.abs(distance) * 0.35));
    let startTime = null;

    const animationStep = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(animationStep);
      } else {
        window.scrollTo(0, targetPosition);
        if (targetHash && history.pushState) {
          history.pushState(null, null, targetHash);
        }
      }
    };

    window.requestAnimationFrame(animationStep);
  };

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollToTarget(document.documentElement, '#inicio');
    });
  }

  // 3. MENU MOBILE TOGGLE & ÂNCORAS DO HEADER
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const isExpanded = mainNav.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Configuração de todas as âncoras internas com rolagem fluida e elegante
  allAnchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Fechar menu mobile imediatamente de forma suave
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }

        // Atualizar estado ativo visual no menu
        document.querySelectorAll('.nav-link').forEach(navL => navL.classList.remove('active'));
        if (link.classList.contains('nav-link')) {
          link.classList.add('active');
        }

        smoothScrollToTarget(targetElement, href);
      }
    });
  });

  // 4. SCROLL SPY / ATIVAÇÃO AUTOMÁTICA DE LINK DO MENU NA ROLAGEM
  const spySections = [
    { id: 'inicio', el: document.getElementById('inicio') },
    { id: 'fale-conosco', el: document.getElementById('fale-conosco') },
    { id: 'como-chegar', el: document.getElementById('como-chegar') },
    { id: 'blog', el: document.getElementById('blog') },
    { id: 'sobre', el: document.getElementById('sobre') },
    { id: 'agendamento', el: document.getElementById('agendamento') }
  ];
  const navItems = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const headerEl = document.querySelector('.site-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 80;
    const scrollPos = window.scrollY + headerHeight + 60;

    let currentSectionId = '';

    spySections.forEach(({ id, el }) => {
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = id;
        }
      }
    });

    if (currentSectionId) {
      navItems.forEach(link => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 4. VERIFICADOR DE STATUS DE EXPEDIENTE EM TEMPO REAL
  // Horário: Segunda a Sexta das 09:00 às 17:30 | Sábado das 09:00 às 12:00 | Domingo fechado
  const updateOfficeStatus = () => {
    const statusPill = document.getElementById('officeStatusPill');
    const statusText = document.getElementById('officeStatusText');

    if (!statusPill || !statusText) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTimeInMinutes = hour * 60 + minute;

    let isOpen = false;

    if (day >= 1 && day <= 5) {
      // Segunda a Sexta: 09:00 (540 min) às 17:30 (1050 min)
      if (currentTimeInMinutes >= 540 && currentTimeInMinutes < 1050) {
        isOpen = true;
      }
    } else if (day === 6) {
      // Sábado: 09:00 (540 min) às 12:00 (720 min)
      if (currentTimeInMinutes >= 540 && currentTimeInMinutes < 720) {
        isOpen = true;
      }
    }

    if (isOpen) {
      statusPill.className = 'status-pill status-open';
      statusPill.innerHTML = '<span class="status-dot"></span> Aberto Agora';
      statusText.textContent = 'Atendimento telefônico e presencial em andamento.';
    } else {
      statusPill.className = 'status-pill status-closed';
      statusPill.innerHTML = '<span class="status-dot"></span> Fechado no Momento';
      statusText.textContent = 'Expediente encerrado. Você pode enviar sua mensagem que responderemos no próximo horário útil.';
    }
  };

  updateOfficeStatus();

  // 5. MÁSCARA E LIMITAÇÃO ESTRITA DE 11 NÚMEROS NO WHATSAPP: (XX) XXXXX-XXXX
  const phoneInput = document.getElementById('clientPhone');
  if (phoneInput) {
    phoneInput.setAttribute('maxlength', '15');
    phoneInput.setAttribute('inputmode', 'numeric');

    phoneInput.addEventListener('input', (e) => {
      // Manter apenas números e limitar estritamente a 11 dígitos
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) {
        val = val.substring(0, 11);
      }

      // Aplicação da máscara com formatação dinâmica progressiva
      if (val.length > 10) {
        // Formato padrão celular completo com 11 dígitos: (XX) 9XXXX-XXXX
        val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (val.length > 6) {
        val = val.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
      } else if (val.length > 2) {
        val = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (val.length > 0) {
        val = val.replace(/^(\d*)$/, '($1');
      }
      e.target.value = val;
    });
  }

  // 6. FORMULÁRIO DE AGENDAMENTO EXCLUSIVO VIA WHATSAPP
  const appointmentForm = document.getElementById('appointmentForm');
  const formFeedback = document.getElementById('formFeedback');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const phoneInput = document.getElementById('clientPhone');
      const profileInput = document.getElementById('clientProfile');
      const typeInput = document.getElementById('clientAppointmentType');
      const messageInput = document.getElementById('clientMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const profile = profileInput ? profileInput.value : '';
      const type = typeInput ? typeInput.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name) {
        alert('Por favor, informe seu Nome Completo.');
        if (nameInput) nameInput.focus();
        return;
      }

      // Validação estrita de 11 números para WhatsApp (DDD de 2 dígitos + 9 dígitos de celular)
      const rawDigits = phone.replace(/\D/g, '');
      if (rawDigits.length !== 11) {
        alert('Por favor, informe um número de WhatsApp válido com exatamente 11 dígitos (DDD + 9 dígitos).\nExemplo: (13) 99601-2470');
        if (phoneInput) phoneInput.focus();
        return;
      }

      let whatsappText = '*SOLICITAÇÃO DE AGENDAMENTO DE CONSULTA*\n\n';
      whatsappText += 'Olá, Dra. Juliana Alves! Gostaria de solicitar um agendamento de consulta trabalhista.\n\n';
      whatsappText += '👤 *Nome:* ' + name + '\n';
      whatsappText += '📱 *WhatsApp:* ' + phone + '\n';
      whatsappText += '📌 *Perfil:* ' + profile + '\n';
      if (type) {
        whatsappText += '🏛️ *Formato:* ' + type + '\n';
      }
      if (message) {
        whatsappText += '📝 *Resumo do caso:* ' + message + '\n';
      }

      const encodedMsg = encodeURIComponent(whatsappText);
      const whatsappUrl = 'https://wa.me/5513996012470?text=' + encodedMsg;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><div><strong>Abrindo seu WhatsApp com a solicitação pronta...</strong><p style="margin: 4px 0 0 0; font-size: 0.85rem;">Se a conversa não abrir automaticamente, <a href="' + whatsappUrl + '" target="_blank" style="text-decoration: underline; font-weight: 700; color: inherit;">clique aqui para abrir</a>.</p></div>';
        formFeedback.style.display = 'flex';
      }

      window.open(whatsappUrl, '_blank');
    });
  }

  // 7. BASE DE MATÉRIAS COMPLETAS DO BLOG
  const blogArticlesData = {
    'carnaval': {
      title: 'Carnaval é feriado? Atenção, trabalhador!',
      category: 'Legislação Trabalhista & Direitos',
      date: 'Publicado recentemente',
      readTime: '3 min de leitura',
      content: `
        <p>Uma das maiores e mais recorrentes dúvidas que chegam ao escritório no início do ano é: <strong>a terça-feira de Carnaval e a quarta-feira de cinzas são feriados oficiais? O trabalhador é obrigado a trabalhar?</strong></p>
        
        <p>A resposta da legislação trabalhista (CLT e Lei Federal nº 9.093/1995) costuma surpreender muita gente: <strong>o Carnaval NÃO é um feriado nacional automático por lei</strong>.</p>
        
        <div class="modal-callout">
          <strong>Como funciona a regra jurídica:</strong>
          Para que o Carnaval seja considerado feriado oficial, é obrigatório existir uma <strong>lei estadual</strong> ou <strong>lei municipal</strong> decretando o feriado na cidade onde o empregado trabalha, ou então previsão expressa na <strong>Convenção Coletiva de Trabalho (CCT)</strong> da categoria.
        </div>

        <h4 style="font-size: 1.15rem; color: #0A192F; margin: 20px 0 10px 0;">O que acontece se a empresa exigir o trabalho no Carnaval?</h4>
        <p>Se não houver lei municipal/estadual nem previsão no sindicato tornando a data feriado:</p>
        <ul>
          <li>O dia é considerado <strong>dia útil normal</strong> de trabalho;</li>
          <li>A ausência injustificada pode gerar desconto do dia de salário e perda do Descanso Semanal Remunerado (DSR);</li>
          <li>Caso a empresa decida dispensar os funcionários por mera liberalidade, <em>ela não pode descontar o salário</em> posteriormente, a menos que haja acordo prévio de compensação ou banco de horas válido.</li>
        </ul>

        <h4 style="font-size: 1.15rem; color: #0A192F; margin: 20px 0 10px 0;">E se for feriado por lei local ou norma coletiva?</h4>
        <p>Nas cidades ou categorias onde o Carnaval é formalmente feriado, o funcionário que for convocado a trabalhar deve receber o dia pago com <strong>adicional de 100% (em dobro)</strong> ou usufruir de <strong>folga compensatória</strong> em outro dia da semana.</p>

        <p><strong>Orientação da Dra. Juliana Alves:</strong> Sempre consulte a convenção coletiva do seu sindicato de classe e verifique a legislação do município da sua prestação de serviços. Em caso de dúvidas sobre descontos indevidos em folha, nossa equipe está à disposição para analisar seu holerite.</p>
      `
    },
    'janeiro-branco': {
      title: 'Janeiro Branco: a saúde mental da enfermagem',
      category: 'Saúde Ocupacional & Enfermagem',
      date: 'Campanha de Conscientização',
      readTime: '4 min de leitura',
      content: `
        <p>A campanha <strong>Janeiro Branco</strong> é dedicada a colocar em foco a saúde mental e emocional da sociedade. No ambiente jurídico-trabalhista, uma das categorias mais vulneráveis e frequentemente atingidas por transtornos psíquicos é a dos <strong>profissionais de enfermagem</strong> (enfermeiros, técnicos e auxiliares).</p>

        <p>Submetidos a plantões exaustivos de 12x36, turnos noturnos, sobrecarga decorrente de quadro reduzido de equipes, contato diário com a dor e pressão constante, esses profissionais enfrentam índices alarmantes da <strong>Síndrome de Burnout</strong> (esgotamento profissional), depressão e crises de ansiedade.</p>

        <div class="modal-callout">
          <strong>Burnout é Doença Ocupacional:</strong> Desde janeiro de 2022, a OMS incluiu formalmente o Burnout na Classificação Internacional de Doenças (CID-11 como QD85), equiparando-o plenamente a acidente de trabalho no Brasil quando decorrente da atividade laboral.
        </div>

        <h4 style="font-size: 1.15rem; color: #0A192F; margin: 20px 0 10px 0;">Quais direitos o profissional de enfermagem possui ao adoecer?</h4>
        <ul>
          <li><strong>Afastamento pelo INSS com Auxílio-Doença Acidentário (B-91):</strong> Quando comprovado o nexo entre o trabalho hospitalar e o adoecimento psíquico;</li>
          <li><strong>Estabilidade Provisória de 12 Meses:</strong> Retornando do auxílio-doença acidentário, o empregado não pode ser demitido sem justa causa durante o período de 1 ano (art. 118 da Lei 8.213/91);</li>
          <li><strong>Manutenção dos depósitos de FGTS</strong> durante todo o período do afastamento acidentário;</li>
          <li><strong>Indenização por Danos Morais e Materiais:</strong> Custos com consultas psicológicas, psiquiátricas e medicamentos que decorreram da omissão do empregador na preservação da higidez mental no trabalho.</li>
          <li><strong>Rescisão Indireta do Contrato:</strong> Se o hospital submete o profissional a assédio moral, perseguições ou jornadas ilegais que agravam o quadro de saúde, é possível pleitear a rescisão indireta (a chamada "demissão forçada do empregador"), garantindo todos os direitos rescisórios.</li>
        </ul>

        <p><strong>Orientação da Dra. Juliana Alves:</strong> Cuidar de quem cuida é uma obrigação legal do empregador. Se você atua na enfermagem ou área da saúde e sente sua saúde mental abalada pelas condições de trabalho, guarde receitas, laudos médicos e procure orientação jurídica especializada para resguardar sua carreira e sua saúde.</p>
      `
    },
    'demissao': {
      title: 'Pediu demissão? Saiba quais são seus direitos!',
      category: 'Rescisão Contratual & Consultoria',
      date: 'Guia Prático dos Direitos',
      readTime: '4 min de leitura',
      content: `
        <p>Tomar a decisão de se desligar de um emprego é um passo importante que exige cautela e planejamento financeiro. Muitos trabalhadores têm dúvidas sobre <strong>o que realmente recebem e o que perdem ao pedir demissão voluntária</strong>.</p>

        <h4 style="font-size: 1.15rem; color: #0A192F; margin: 20px 0 10px 0;">1. O que o trabalhador RECEBE ao pedir demissão:</h4>
        <ul>
          <li><strong>Saldo de Salário:</strong> Pagamento pelos dias efetivamente trabalhados no mês da saída;</li>
          <li><strong>13º Salário Proporcional:</strong> Equivalente aos meses trabalhados no ano corrente (cada mês com mais de 14 dias trabalhados conta como 1/12);</li>
          <li><strong>Férias Vencidas (se houver):</strong> Com o adicional de 1/3 constitucional;</li>
          <li><strong>Férias Proporcionais:</strong> Também acrescidas de 1/3 constitucional.</li>
        </ul>

        <h4 style="font-size: 1.15rem; color: #0A192F; margin: 20px 0 10px 0;">2. O que o trabalhador NÃO RECEBE ao pedir demissão:</h4>
        <ul>
          <li><strong>NÃO recebe a multa de 40% do FGTS;</strong></li>
          <li><strong>NÃO pode sacar o saldo do FGTS</strong> que ficou depositado na conta vinculada;</li>
          <li><strong>NÃO tem direito ao Seguro-Desemprego.</strong></li>
        </ul>

        <div class="modal-callout">
          <strong>Atenção Máxima ao Aviso Prévio:</strong> Se você pedir demissão e não quiser ou não puder cumprir os 30 dias de aviso prévio trabalhando, a empresa tem o direito legal de <strong>descontar o valor correspondente a 1 mês de salário</strong> das suas verbas rescisórias (art. 487 da CLT).
        </div>

        <h4 style="font-size: 1.15rem; color: #0A192F; margin: 20px 0 10px 0;">Alternativas importantes antes de pedir demissão:</h4>
        <p>Antes de redigir sua carta de demissão, avalie com uma advogada trabalhista:</p>
        <ul>
          <li><strong>Rescisão Indireta:</strong> Se a empresa cometeu faltas graves (atraso frequente de salários, não recolhimento de FGTS, assédio moral, risco grave à integridade), você não precisa pedir demissão; tem direito a sair recebendo a multa de 40%, seguro-desemprego e saque do FGTS!</li>
          <li><strong>Demissão por Comum Acordo (art. 484-A da CLT):</strong> Você e a empresa decidem em conjunto o desligamento, permitindo saque de 80% do FGTS e multa de 20%.</li>
        </ul>

        <p><strong>Orientação da Dra. Juliana Alves:</strong> Nunca assine termos de rescisão sem conferir atentamente os cálculos e sem ter certeza de que todas as verbas foram apuradas com exatidão.</p>
      `
    }
  };

  // 8. CONTROLE DO MODAL DE MATÉRIA COMPLETA
  const modalOverlay = document.getElementById('blogModal');
  const modalBody = document.getElementById('blogModalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const openBlogModal = (articleId) => {
    const article = blogArticlesData[articleId];
    if (!article || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <div class="badge-tag" style="margin-bottom: 12px; background: rgba(196, 160, 98, 0.15); color: #C4A062; border-color: rgba(196, 160, 98, 0.3);">${article.category}</div>
      <div class="blog-meta" style="margin-bottom: 16px;">
        <span>${article.date}</span> • <span>${article.readTime}</span>
      </div>
      <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.85rem; color: #0A192F; margin-bottom: 20px; line-height: 1.3;">${article.title}</h3>
      <div class="modal-article-text">
        ${article.content}
      </div>
      <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <span style="font-size: 0.95rem; color: #2D3748; font-weight: 500;">Ficou com alguma dúvida sobre este assunto?</span>
        <a href="https://wa.me/5513996012470?text=Ol%C3%A1%2C%20Dra.%20Juliana%20Alves.%20Gostaria%20de%20uma%20orienta%C3%A7%C3%A3o%20sobre%20o%20artigo%20do%20blog." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" onclick="closeBlogModal()" style="font-size: 0.9rem; padding: 12px 22px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          Tirar Dúvidas no WhatsApp
        </a>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeBlogModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.closeBlogModal = closeBlogModal;

  // Registrar clique em TODO o card do blog (imagem, textos, card inteiro)
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const articleId = card.getAttribute('data-blog-id');
      if (articleId) {
        openBlogModal(articleId);
      }
    });
  });

  // Registrar clique nos botões "Ler Artigo Completo"
  const blogReadButtons = document.querySelectorAll('.blog-btn-read');
  blogReadButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const articleId = btn.getAttribute('data-blog-id');
      if (articleId) {
        openBlogModal(articleId);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeBlogModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeBlogModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeBlogModal();
      }
    });
  }
});
