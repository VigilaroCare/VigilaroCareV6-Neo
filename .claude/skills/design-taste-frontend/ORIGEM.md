# Origem desta skill

- Fonte: https://github.com/Leonxlnx/taste-skill — pasta `skills/taste-skill`, commit `63aba5f` (20/10/2026). Instalada a pedido do Agnaldo em 19/10/2026.
- Licença: MIT (cópia em `LICENSE`, ao lado). Copiada sem alteração; a pasta tem o nome de instalação do frontmatter (`design-taste-frontend`), como faz o `install.sh` do repositório.
- Conferida antes de instalar: os scripts (`scripts/*.mjs`) só acessam a rede para buscar imagens de domínio público/CC em acervos abertos (Openverse, Wikimedia Commons, Met, Art Institute of Chicago, NASA, archive.org) quando a skill é usada; abrem o Chrome/Edge local em modo headless para tirar screenshots; apagam só as pastas temporárias que eles mesmos criam; gravam histórico em `~/.taste-skill/`. Exigem Node 22+.
- **Atenção ao usar neste projeto:** a skill é de direção de arte para páginas WEB e propõe estética própria. Nas telas do app (React Native), a fonte canônica visual é `ANATOMIA_EDITORIAL_VIGILARO.md` e ela prevalece — não aplicar a skill para "repaginar" telas do app. Uso natural: páginas web (ex.: `site-legal/`, landing page, artefatos).
- Imagens que ela trouxer têm licença e crédito registrados por ela; manter o crédito ao publicar.
