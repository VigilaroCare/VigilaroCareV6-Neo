# Origem desta skill

- Fonte: https://github.com/microsoft/playwright-cli (Microsoft, Apache-2.0). Instalada a pedido do Agnaldo em 19/10/2026.
- Como foi instalada: `npm install -g @playwright/cli@latest` (v0.1.22) e, na raiz do repo, `playwright-cli install --skills` — que gera esta pasta na versão casada com o CLI e acrescenta `.playwright-cli/` ao `.gitignore` (a saída pode conter cookies/credenciais de sessão). Navegador: usa o Chrome instalado.
- Para atualizar: `npm install -g @playwright/cli@latest` e rodar de novo `playwright-cli install --skills`.
- Alcance neste projeto: automação de navegador para páginas WEB (ex.: conferir `site-legal/`, consoles das lojas, Expo web). Não testa o app nativo Android/iOS.
