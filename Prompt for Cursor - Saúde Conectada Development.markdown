# Prompt para o Cursor: Desenvolvimento Completo do Sistema Saúde Conectada com Progresso e Save Points

**Objetivo**: Desenvolver o sistema **Saúde Conectada**, uma plataforma híbrida para clínicas (UPAs, UBSs, privadas) e telemedicina, com foco em usabilidade, automação e acessibilidade. O projeto abrange **frontend** (React Native para app mobile, React para web/totens), **backend** (Node.js), e **DevOps** (deploy em VPS/localhost). O Cursor deve criar um **checklist de desenvolvimento**, um **mapa de progresso**, implementar um **sistema de save points** para recuperação de falhas, e notificar-me regularmente para revisar o avanço. O ambiente de desenvolvimento deve ser configurado automaticamente com todos os comandos necessários para iniciar o servidor e permitir alterações em tempo real.

**Contexto**:
- **Público**: Pacientes (18-80 anos, incluindo idosos e deficientes), médicos, enfermeiros, farmacêuticos, faxineiros, cozinheiros, administradores.
- **Plataformas**:
  - App mobile: iOS 14+, Android 10+ (resoluções 360x640 a 1440x3200).
  - Web: Totens (1920x1080), TVs 4K, admin (1280x720+).
- **Metas**:
  - Carregamento: <1s (95% dos casos).
  - Responsividade: 100% em todos os dispositivos.
  - Acessibilidade: WCAG 2.1 AA (contraste 4.5:1, ARIA, leitores de tela).
  - UX: >4.7/5 em testes com 20 usuários.
- **Diferenciais**:
  - Cadastro rápido com RG (câmera) e pré-cadastro via redes sociais (Google, Facebook, Apple).
  - Triagem com IA para pré-diagnósticos e sugestões de tratamento.
  - Telemedicina com espera <5 min.
  - Gamificação: Pontos, recompensas, desafios diários.
  - Notificações em tempo real (filas, alertas, tarefas).
  - Integração com planos médicos, wearables, e sensores IoT (mockados).
  - Painel de espera em salas (TVs) e no app.
  - Automação hospitalar: Monitoramento de pacientes, tarefas por setor, estoque de farmácia.

**Instruções Gerais**:
1. **Tecnologias**:
   - **Frontend**: React Native (mobile), React (web/totens), TypeScript, Material UI 5.0, Tailwind CSS, Framer Motion (animações), React Navigation (app), React Router (web), i18next (multilíngue), React Query (APIs), React Hook Form (formulários), Zod (validações).
   - **Backend**: Node.js, Express, Prisma ORM, PostgreSQL, Redis (cache), Socket.IO (real-time), JWT (autenticação), bcrypt (senhas), Winston (logs).
   - **DevOps**: Docker, Nginx, PM2, GitHub Actions (CI/CD), Sentry (erros), Prometheus/Grafana (monitoramento).
   - **Testes**: Jest, React Testing Library, Cypress (E2E), Supertest (API).
   - **Outros**: WebRTC (telemedicina), Firebase (notificações push), AWS S3 (exames), mock de APIs (Google Maps, wearables, redes sociais).
2. **Estrutura do Código**:
   - Monorepo com Turborepo: `/packages/frontend-app`, `/packages/frontend-web`, `/packages/backend`.
   - Frontend: `/src/components`, `/src/screens`, `/src/styles`, `/src/utils`, `/src/assets`.
   - Backend: `/src/controllers`, `/src/models`, `/src/routes`, `/src/middlewares`, `/src/services`.
3. **Acessibilidade**:
   - ARIA labels, contraste 4.5:1, fontes ajustáveis (14-24px), vídeos em Libras, suporte a VoiceOver/TalkBack.
   - Modo alto contraste dinâmico, zoom até 200%, teclado virtual em totens.
4. **Correção de Erros**:
   - Responsividade: Teste em 360x640, 1080x1920, 1920x1080; ajuste automático.
   - Performance: Lazy-load assets (<200KB), memoization (React.memo, useCallback).
   - Compatibilidade: iOS 14+, Android 10+, Chrome, Firefox, Safari.
   - Tipagem: Validação em tempo real com TypeScript.
   - Testes: 80% de cobertura (Jest, Cypress).
5. **Monitoramento**:
   - Frontend: Vercel Analytics, Firebase Crashlytics.
   - Backend: Prometheus/Grafana, Sentry.
   - Logs: Winston (backend), console estruturado (frontend).
6. **Ambiente de Desenvolvimento**:
   - Configure automaticamente Node.js, npm, Docker, PostgreSQL, Redis, e emuladores Android/iOS.
   - Forneça comandos para iniciar servidores frontend e backend com hot-reload.
   - Crie `/docs/SETUP.md` com instruções detalhadas.
7. **Sistema de Progresso e Save Points**:
   - Crie `/docs/PROGRESS_TRACKER.md` com status (To Do, In Progress, Done) e ETAs.
   - Crie `/docs/SAVE_POINTS.md` com checkpoints (ex.: "Tela Login Concluída", "Backend Autenticação OK").
   - Para cada save point:
     - Salve o código em `/save-points/<timestamp>.zip`.
     - Registre no `/docs/SAVE_POINTS.md` com descrição, data, e hash do commit.
     - Se detectar falha (ex.: erro crítico, teste com <80% cobertura), reverta ao último save point.
     - Interface no Cursor: Botão "Reverter Save Point" (lista save points disponíveis).
   - Notifique-me após cada save point: "Save point criado: [descrição]. Revisar?"
8. **Notificações**:
   - Após cada marco (tela, funcionalidade, deploy): "Progresso atualizado! Veja CHECKLIST.md, PROGRESS_TRACKER.md e SAVE_POINTS.md."
   - Diariamente: Relatório de avanço com % concluído e próximas tarefas.

**Pré-requisitos de Configuração do Ambiente**:
1. **Instalar Dependências no Ubuntu**:
   ```bash
   # Atualizar sistema
   sudo apt update && sudo apt upgrade -y

   # Instalar Node.js (v20.x) e npm
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   node -v && npm -v

   # Instalar Docker e Docker Compose
   sudo apt install -y docker.io docker-compose
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker $USER

   # Instalar PostgreSQL
   sudo apt install -y postgresql postgresql-contrib
   sudo systemctl enable postgresql
   sudo systemctl start postgresql

   # Instalar Redis
   sudo apt install -y redis-server
   sudo systemctl enable redis
   sudo systemctl start redis

   # Instalar emuladores Android (opcional, para React Native)
   sudo apt install -y openjdk-17-jdk
   wget https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip
   unzip commandlinetools-linux-8512546_latest.zip -d ~/android-sdk
   export ANDROID_HOME=$HOME/android-sdk
   ~/android-sdk/cmdline-tools/bin/sdkmanager "platform-tools" "platforms;android-33" "emulator"

   # Instalar dependências globais
   npm install -g yarn turbo pm2
   ```

2. **Clonar Repositório e Instalar Projeto**:
   ```bash
   # Criar diretório do projeto
   mkdir -p ~/saude-conectada
   cd ~/saude-conectada

   # Inicializar monorepo (será criado pelo Cursor)
   git init
   npm init -y
   npm install turbo --save-dev

   # Instalar dependências do frontend e backend
   cd packages/frontend-app && yarn install
   cd ../frontend-web && yarn install
   cd ../backend && yarn install
   ```

3. **Configurar Banco de Dados**:
   ```bash
   # Configurar PostgreSQL
   sudo -u postgres psql -c "CREATE DATABASE saude_conectada;"
   sudo -u postgres psql -c "CREATE USER saude_user WITH PASSWORD 'Saude123!';"
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE saude_conectada TO saude_user;"

   # Verificar Redis
   redis-cli ping  # Deve retornar "PONG"
   ```

4. **Iniciar Servidores com Hot-Reload**:
   ```bash
   # Frontend Mobile (React Native)
   cd ~/saude-conectada/packages/frontend-app
   yarn start &  # Inicia Metro Bundler
   yarn android  # Emulador Android
   # Ou yarn ios (se em macOS com Xcode)

   # Frontend Web (React)
   cd ~/saude-conectada/packages/frontend-web
   yarn dev &  # Inicia Vite com hot-reload

   # Backend (Node.js)
   cd ~/saude-conectada/packages/backend
   yarn dev &  # Inicia com nodemon
   ```

5. **Acessar Projeto**:
   - Mobile: Emulador ou dispositivo via Metro (http://localhost:8081).
   - Web: http://localhost:3000.
   - Backend: http://localhost:5000/api/health.
   - Verifique logs:
     ```bash
     tail -f ~/saude-conectada/packages/backend/logs/app.log
     ```

6. **Criar .env**:
   ```bash
   cd ~/saude-conectada
   cat <<EOL > .env
   DATABASE_URL="postgresql://saude_user:Saude123!@localhost:5432/saude_conectada"
   REDIS_URL="redis://localhost:6379"
   JWT_SECRET="sua-chave-secreta-256-bits"
   AWS_ACCESS_KEY_ID="mock-key"
   AWS_SECRET_ACCESS_KEY="mock-secret"
   FIREBASE_CONFIG="mock-config"
   GOOGLE_CLIENT_ID="mock-id"
   FACEBOOK_APP_ID="mock-id"
   APPLE_CLIENT_ID="mock-id"
   EOL
   ```

**Funcionalidades Específicas**:
1. **Autenticação**:
   - Login unificado (e-mail/senha) com redirecionamento automático por tipo de usuário (paciente, médico, enfermeiro, farmacêutico, faxineiro, cozinheiro, admin).
   - Pré-cadastro de pacientes via redes sociais (Google, Facebook, Apple; configurável no painel admin).
   - Cadastro de pacientes na tela de login; funcionários via painel admin ou link de convite (expira em 24h).
   - Recuperação de senha por e-mail.
   - Usuários padrão (criar no backend):
     - Paciente: `paciente@saude.com`, senha: `Paciente123!`
     - Médico: `medico@saude.com`, senha: `Medico123!`
     - Enfermeiro: `enfermeiro@saude.com`, senha: `Enfermeiro123!`
     - Farmacêutico: `farmacia@saude.com`, senha: `Farmacia123!`
     - Faxineiro: `faxina@saude.com`, senha: `Faxina123!`
     - Cozinheiro: `cozinha@saude.com`, senha: `Cozinha123!`
     - Admin: `admin@saude.com`, senha: `Admin123!`
   - Exibir credenciais na tela de login para testes (removível em produção).

2. **Telas (25)**:
   - **Tela 1: Login (App/Web)**:
     - Campos: E-mail, senha (toggle mostrar/esconder).
     - Botões: Entrar, Cadastrar Paciente, Esqueci a Senha, Google, Facebook, Apple.
     - Dropdown: Idiomas (PT, EN, ES, Libras).
     - Animação: Fade-in logo (0.5s).
     - Validações: E-mail (regex), senha (8-16 caracteres, 1 número, 1 letra).
     - Acessibilidade: ARIA, contraste 4.5:1, navegação por teclado.
     - Redireciona automaticamente por tipo de usuário (ex.: paciente → Dashboard Paciente).
   - **Tela 2: Cadastro Paciente (App/Totem)**:
     - Câmera para RG, campos: Nome, CPF, Telefone, E-mail, Plano Médico (ex.: Unimed, Amil).
     - Dropdown: Planos médicos (busca dinâmica).
     - Checkbox LGPD.
     - Animação: Slide-up campos (0.5s).
     - Validações: CPF (algoritmo), telefone (+55 DD).
   - **Tela 3: Triagem (App/Totem/Tablet)**:
     - Checkbox de sintomas, campo livre (300 caracteres).
     - Sinais vitais: Pressão, saturação, temperatura.
     - IA sugere pré-diagnósticos (mockado).
     - Animação: Pulse no Confirmar (0.3s).
   - **Tela 4: Dashboard Paciente (App)**:
     - Histórico, agendamentos, etapas de atendimento (Triagem → Consultório → Medicação → Retorno).
     - Notificação automática para queixas repetidas.
     - Gamificação: Barra de pontos.
     - Animação: Preenchimento barra (0.5s).
   - **Tela 5: Espera Telemedicina (App)**:
     - Temporizador, barra de progresso, cancelar.
     - Animação: Barra fluida (0.5s).
   - **Tela 6: Videochamada Telemedicina (App)**:
     - Vídeo, chat, upload de arquivos.
     - Sugestões IA visíveis.
     - Animação: Fade-in vídeo (0.3s).
   - **Tela 7: Receitas/Atestados (App)**:
     - Lista de documentos, visualizador PDF.
     - Botões: Baixar, Enviar.
   - **Tela 8: Dashboard Médico (App/Web)**:
     - Pacientes, consultas, tarefas.
     - Relatórios (gráficos).
   - **Tela 9: Dashboard Enfermeiro (App/Web)**:
     - Tarefas, alertas.
   - **Tela 10: Dashboard Farmacêutico (App/Web)**:
     - Cadastro de produtos, insumos, EPIs.
     - Controle de estoque com alertas.
     - Retirada de medicamentos.
   - **Tela 11: Dashboard Faxineiro (App/Web)**:
     - Cronograma de limpeza.
   - **Tela 12: Dashboard Cozinheiro (App/Web)**:
     - Pedidos de refeições, cronograma.
   - **Tela 13: Dashboard Admin (Web)**:
     - CRUD de usuários (com foto opcional).
     - Notificações por usuário/setor/todos.
     - Relatórios exportáveis.
   - **Tela 14: Painel de Espera (Web/TV)**:
     - Fila por setor (iniciais do paciente, tempo estimado).
     - Notificações em tempo real (Socket.IO).
   - **Tela 15: Cadastro Funcionários (Web)**:
     - Formulário: Nome, CPF, cargo, foto.
     - Link de convite (expira em 24h).
   - **Tela 16: Agendamento Consultas (App/Web)**:
     - Especialidade, data, hospital (mock Google Maps).
   - **Tela 17: Prontuário Eletrônico (App/Web)**:
     - Histórico, exames, medicações.
     - Upload de exames (clínica/terceiros).
   - **Tela 18: Laboratório (Web)**:
     - Upload de resultados, status.
   - **Tela 19: Notificações (App)**:
     - Alertas (consultas, medicações, filas).
   - **Tela 20: Relatórios Médico (Web)**:
     - Gráficos de atendimentos.
   - **Tela 21: Configurações Gerais (Web)**:
     - Idiomas, temas, APIs sociais (Google, Facebook, Apple), backup.
   - **Tela 22: Feedback (App)**:
     - Estrelas (1-5), comentário.
   - **Tela 23: Gamificação (App)**:
     - Pontos, recompensas, desafios diários.
   - **Tela 24: Wearables (App)**:
     - Mock de conexão, dados vitais.
   - **Tela 25: Tutorial (App/Totem)**:
     - Carrossel interativo (6 slides).

3. **Melhorias Adicionadas** (Inspiradas em Rotinas Hospitalares):
   - **IA Avançada**:
     - Triagem: Pré-diagnósticos baseados em sintomas (mock IBM Watson Health).
     - Sugestões: Medicamentos, exames, encaminhamentos.
     - Alertas: Notificações para padrões anormais (ex.: pressão alta repetida).
   - **Chatbot**:
     - Assistente para triagem, agendamento, dúvidas (respostas mockadas).
     - Vídeos dinâmicos em Libras.
   - **Biometria**:
     - Login com impressão digital no app (mockado).
   - **Farmácia**:
     - Cadastro de medicamentos, insumos, EPIs.
     - Alertas automáticos de estoque baixo.
     - Histórico de dispensação por paciente.
   - **Monitoramento de Pacientes**:
     - Dashboard de sinais vitais em tempo real (mock wearables/IoT).
     - Integração com oxímetros, monitores cardíacos (mockado).
   - **Telemedicina**:
     - Transcrição de áudio em tempo real (mockada).
     - Gravação de consultas (opcional, com consentimento).
   - **Analytics**:
     - Painel admin com métricas (tempo de espera, taxa de atendimento).
     - Exportação de relatórios (PDF, Excel).
   - **Segurança**:
     - Criptografia AES-256 para prontuários.
     - Auditoria de acessos no painel admin.
   - **Automação Hospitalar**:
     - Tarefas automáticas por setor (ex.: enfermeiro recebe "aplicar medicação").
     - Integração com HL7 FHIR (mockado) para interoperabilidade.
     - Alertas para manutenção de equipamentos (ex.: desfibrilador).
   - **Prontuário Eletrônico**:
     - Timeline visual de atendimentos.
     - Integração com exames laboratoriais (clínica/terceiros).

4. **DevOps**:
   - **VPS Ubuntu**:
     - Dockerfile para frontend/backend.
     - Nginx como proxy reverso.
     - PM2 para Node.js.
     - PostgreSQL/Redis em containers.
     - GitHub Actions: Build, teste, deploy.
   - **Localhost**:
     - Scripts npm para rodar localmente.
     - Arquivo `.env.example` com variáveis.
   - **Monitoramento**:
     - Prometheus/Grafana para CPU, memória, API.
     - Sentry para erros em tempo real.

**Checklist, Progresso e Save Points**:
- Criar `/docs/CHECKLIST.md`:
  ```markdown
  - [ ] Configurar ambiente de desenvolvimento
  - [ ] Tela 1: Login (Frontend)
  - [ ] Tela 2: Cadastro Paciente (Frontend)
  - [ ] Backend: Autenticação JWT
  - [ ] DevOps: Deploy VPS
  - [ ] Testes: 80% cobertura
  ```
- Criar `/docs/PROGRESS_TRACKER.md`:
  ```markdown
  # Mapa de Progresso
  - Configuração Ambiente: Done, 2025-04-16
  - Tela 1: Login: In Progress, ETA: 2025-04-18
  - Backend: Autenticação: To Do, ETA: 2025-04-20
  ```
- Criar `/docs/SAVE_POINTS.md`:
  ```markdown
  # Save Points
  - 2025-04-16_12:00: Ambiente configurado, commit: abc123
  - 2025-04-18_15:00: Tela Login concluída, commit: def456
  ```
- **Save Points**:
  - Após cada marco (tela, funcionalidade, deploy), salve em `/save-points/<timestamp>.zip`.
  - Se erro crítico (ex.: build falha, teste <80%), reverta ao último save point.
  - Interface no Cursor: Lista de save points com botão "Reverter" (ex.: "2025-04-18: Tela Login").
  - Notificação: "Erro detectado. Reverter para [save point]? Alternativas: [sugestões]."

**Entregáveis**:
- Código: Frontend (React Native/React), Backend (Node.js).
- Testes: Jest, Cypress, Supertest (80% cobertura).
- Documentação:
  - `/docs/README_VPS.md`: Deploy em Ubuntu.
  - `/docs/README_LOCALHOST.md`: Configuração local.
  - `/docs/CHECKLIST.md`: Tarefas.
  - `/docs/PROGRESS_TRACKER.md`: Progresso.
  - `/docs/SAVE_POINTS.md`: Checkpoints.
  - `/docs/SETUP.md`: Configuração do ambiente.
- Deploy: Scripts para VPS/localhost.
- Usuários padrão criados, visíveis na tela de login para testes.

**Cronograma Estimado**:
- Configuração ambiente: 1 dia.
- Telas e funcionalidades: 10 dias.
- Testes e ajustes: 3 dias.
- Deploy e documentação: 2 dias.
- Total: ~16 dias (notificações diárias).

**Exemplo de Implementação (Tela 1: Login)**:
1. Crie `packages/frontend-app/src/screens/Login.tsx` e `packages/frontend-web/src/screens/Login.tsx`.
2. Use Material UI 5.0, Tailwind CSS, paleta azul (#0055FF).
3. Inclua: E-mail, senha, botões sociais, idiomas.
4. Animações: Fade-in logo (0.5s) com Framer Motion.
5. Validações: Zod para e-mail/senha.
6. Acessibilidade: ARIA, contraste 4.5:1, teclado.
7. Testes: Jest para inputs e cliques.
8. Backend: Rota `/api/login` (JWT).
9. Atualize CHECKLIST.md, PROGRESS_TRACKER.md, crie save point.
10. Notifique: "Tela Login concluída. Revisar?"

**Comandos para Iniciar Desenvolvimento**:
1. **Configurar e Iniciar**:
   ```bash
   # Configurar ambiente (executar uma vez)
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs docker.io docker-compose postgresql postgresql-contrib redis-server
   sudo systemctl enable docker postgresql redis
   sudo systemctl start docker postgresql redis
   sudo usermod -aG docker $USER
   npm install -g yarn turbo pm2
   sudo -u postgres psql -c "CREATE DATABASE saude_conectada; CREATE USER saude_user WITH PASSWORD 'Saude123!'; GRANT ALL PRIVILEGES ON DATABASE saude_conectada TO saude_user;"
   mkdir -p ~/saude-conectada && cd ~/saude-conectada
   git init && npm init -y && npm install turbo --save-dev

   # Criar estrutura inicial (Cursor deve gerar)
   mkdir -p packages/{frontend-app,frontend-web,backend}
   cd packages/frontend-app && yarn init -y && yarn add react-native typescript @types/react-native @mui/material tailwindcss framer-motion react-navigation i18next react-query react-hook-form zod
   cd ../frontend-web && yarn init -y && yarn add react react-dom typescript @mui/material tailwindcss framer-motion react-router-dom i18next react-query react-hook-form zod
   cd ../backend && yarn init -y && yarn add express prisma @prisma/client redis socket.io jsonwebtoken bcrypt winston supertest jest

   # Iniciar servidores
   cd ~/saude-conectada
   turbo run dev  # Inicia todos os pacotes com hot-reload
   ```

2. **Monitorar Alterações**:
   ```bash
   # Ver logs em tempo real
   tail -f ~/saude-conectada/packages/backend/logs/app.log
   # Ou abrir no navegador/emulador
   firefox http://localhost:3000  # Web
   ```

**Notificação Final**:
- Após conclusão: "Saúde Conectada concluído! Teste com os logins fornecidos e revise o deploy em VPS/localhost. Save points disponíveis em /save-points."