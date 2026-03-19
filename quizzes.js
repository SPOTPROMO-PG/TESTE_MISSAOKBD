// quizzes.js — QUIZ fictício para TODOS os KBDs (marca -> kbd -> perguntas)
// Estrutura obrigatória: QUIZZES[marcaId][kbdId] = [ { pergunta, alternativas, gabarito, justificativa } ]

const QUIZZES = {
  always: {
    kbd1: [
      {
        pergunta: "Teste (ALWAYS): Qual é a ação correta após aprender o KBD?",
        alternativas: [
          "A) Responder o quiz e concluir",
          "B) Sair do app sem salvar",
          "C) Pular todas as marcas",
          "D) Responder qualquer alternativa",
        ],
        gabarito: "A",
        justificativa: "No fluxo, você abre o KBD e responde o quiz para concluir.",
      },
    ],
  },

  downy: {
    kbd1: [
      {
        pergunta: "Teste (DOWNY • KBD1): O que finaliza corretamente este KBD?",
        alternativas: [
          "A) Responder o quiz corretamente",
          "B) Fechar o navegador",
          "C) Trocar de setor sem concluir",
          "D) Ignorar o quiz",
        ],
        gabarito: "A",
        justificativa: "Conclui quando finaliza o quiz do KBD.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (DOWNY • KBD2): Para concluir, você deve:",
        alternativas: ["A) Abrir Home", "B) Responder o quiz", "C) Alterar setor", "D) Nada"],
        gabarito: "B",
        justificativa: "O quiz é a etapa que marca o KBD como concluído.",
      },
    ],
    kbd3: [
      {
        pergunta: "Teste (DOWNY • KBD3): O que acontece após concluir o quiz?",
        alternativas: [
          "A) Volta ao login",
          "B) Vai para o próximo KBD pendente",
          "C) Apaga o progresso",
          "D) Fecha o site",
        ],
        gabarito: "B",
        justificativa:
          "Após concluir, o fluxo leva para o próximo KBD da marca; se acabar, vai para a próxima marca pendente.",
      },
    ],
  },

  pantene: {
    kbd1: [
      {
        pergunta: "Teste (PANTENE • KBD1): Resposta correta (teste) é:",
        alternativas: ["A) A", "B) B", "C) C", "D) D"],
        gabarito: "A",
        justificativa: "Quiz fictício — alternativa A é a correta para testes.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (PANTENE • KBD2): Se você acertar, aparece:",
        alternativas: ["A) Parabéns", "B) Erro 404", "C) Sem resposta", "D) Reinício total"],
        gabarito: "A",
        justificativa: "Acertou: aparece “Parabéns”.",
      },
    ],
    kbd3: [
      {
        pergunta: "Teste (PANTENE • KBD3): O progresso do KBD fica salvo em:",
        alternativas: ["A) LocalStorage", "B) Bluetooth", "C) Wi-Fi", "D) Galeria"],
        gabarito: "A",
        justificativa: "O app salva progresso local via LocalStorage.",
      },
    ],
    kbd4: [
      {
        pergunta: "Teste (PANTENE • KBD4): Objetivo principal do teste é:",
        alternativas: [
          "A) Validar o fluxo completo",
          "B) Travar o app",
          "C) Pular marcas",
          "D) Não registrar nada",
        ],
        gabarito: "A",
        justificativa: "Queremos validar o fluxo completo por marca/KBD.",
      },
    ],
  },

  pampers: {
    kbd1: [
      {
        pergunta: "Teste (PAMPERS • KBD1): Para concluir a marca, precisa:",
        alternativas: [
          "A) Responder 1 KBD apenas",
          "B) Responder todos os KBDs da marca",
          "C) Apenas ver o vídeo",
          "D) Só entrar no app",
        ],
        gabarito: "B",
        justificativa: "A marca só conclui quando todos os KBDs dela forem respondidos.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (PAMPERS • KBD2): KBD pendente aparece como:",
        alternativas: ["A) 0%", "B) 100%", "C) 200%", "D) —"],
        gabarito: "A",
        justificativa: "KBD pendente aparece como 0%.",
      },
    ],
    kbd3: [
      {
        pergunta: "Teste (PAMPERS • KBD3): KBD concluído aparece como:",
        alternativas: ["A) 0%", "B) 50%", "C) 100%", "D) 10%"],
        gabarito: "C",
        justificativa: "KBD concluído aparece como 100%.",
      },
    ],
    kbd4: [
      {
        pergunta: "Teste (PAMPERS • KBD4): Ao terminar a marca, o app:",
        alternativas: [
          "A) Vai para próxima marca pendente",
          "B) Desloga",
          "C) Apaga tudo",
          "D) Trava",
        ],
        gabarito: "A",
        justificativa: "Concluiu a marca: vai para a próxima marca que ainda tem pendências.",
      },
    ],
    kbd5: [
      {
        pergunta: "Teste (PAMPERS • KBD5): Se faltar 1 quiz em qualquer marca:",
        alternativas: [
          "A) Finaliza mesmo assim",
          "B) Indica pendência e não finaliza",
          "C) Oculta a marca",
          "D) Não mostra progresso",
        ],
        gabarito: "B",
        justificativa: "O fluxo só completa quando todas as marcas/KBDs estiverem concluídos.",
      },
    ],
  },

  secret: {
    kbd1: [
      {
        pergunta: "Teste (SECRET • KBD1): Resposta correta (teste) é:",
        alternativas: ["A) A", "B) B", "C) C", "D) D"],
        gabarito: "A",
        justificativa: "Quiz fictício: alternativa A é correta.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (SECRET • KBD2): Ao errar, o app deve:",
        alternativas: [
          "A) Mostrar incorreto + resposta certa",
          "B) Fechar a página",
          "C) Ir para home sem aviso",
          "D) Reiniciar o celular",
        ],
        gabarito: "A",
        justificativa: "Erro: feedback imediato + resposta correta.",
      },
    ],
  },

  "oral-b": {
    kbd1: [
      {
        pergunta: "Teste (ORAL-B • KBD1): O botão do quiz fica em:",
        alternativas: ["A) No final do KBD", "B) No login", "C) No footer", "D) No console"],
        gabarito: "A",
        justificativa: "No KBD existe o botão “Responder o Quiz”.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (ORAL-B • KBD2): Progresso do quiz mostra:",
        alternativas: [
          "A) Pergunta X de Y",
          "B) Só um relógio",
          "C) Apenas pontos",
          "D) Nada",
        ],
        gabarito: "A",
        justificativa: "O quiz exibe “Pergunta X de Y”.",
      },
    ],
    kbd3: [
      {
        pergunta: "Teste (ORAL-B • KBD3): A medalha de 100% é:",
        alternativas: ["A) 🥇", "B) 🥈", "C) 🥉", "D) 🏆"],
        gabarito: "A",
        justificativa: "100% = 🥇.",
      },
    ],
  },

  gillette: {
    kbd1: [
      {
        pergunta: "Teste (GILLETTE • KBD1): Qual medalha para <80%?",
        alternativas: ["A) 🥇", "B) 🥈", "C) 🥉", "D) 🏆"],
        gabarito: "C",
        justificativa: "<80% = 🥉.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (GILLETTE • KBD2): Entre 80–99% é:",
        alternativas: ["A) 🥇", "B) 🥈", "C) 🥉", "D) 🎖️"],
        gabarito: "B",
        justificativa: "80–99% = 🥈.",
      },
    ],
    kbd3: [
      {
        pergunta: "Teste (GILLETTE • KBD3): Ao finalizar este quiz, o app:",
        alternativas: [
          "A) Vai para o próximo KBD da marca",
          "B) Apaga o progresso",
          "C) Volta pro login",
          "D) Sai do navegador",
        ],
        gabarito: "A",
        justificativa: "Fluxo automático para o próximo pendente.",
      },
    ],
  },

  venus: {
    kbd1: [
      {
        pergunta: "Teste (VENUS • KBD1): Para concluir o fluxo total, precisa:",
        alternativas: [
          "A) Apenas 1 marca",
          "B) Todas as marcas",
          "C) Somente Always",
          "D) Somente Gillette",
        ],
        gabarito: "B",
        justificativa: "O fluxo completa quando todas as marcas/KBDs estiverem respondidos.",
      },
    ],
    kbd2: [
      {
        pergunta: "Teste (VENUS • KBD2): O sistema indica % por:",
        alternativas: ["A) KBD", "B) GPS", "C) Rede social", "D) IMEI"],
        gabarito: "A",
        justificativa: "Indicamos percentuais por KBD e por marca.",
      },
    ],
    kbd3: [
      {
        pergunta: "Teste (VENUS • KBD3): Qual é a medalha de 100%?",
        alternativas: ["A) 🥇", "B) 🥈", "C) 🥉", "D) 🏆"],
        gabarito: "A",
        justificativa: "100% = 🥇.",
      },
    ],
  },
};

window.QUIZZES = QUIZZES;