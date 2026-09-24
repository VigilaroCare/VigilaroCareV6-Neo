# Conformidade legal — de onde vem cada exigência

Situação em 24/09/2026. Este documento registra as **fontes oficiais** que embasam cada versão da política de privacidade em `data/legal/politica_privacidade.js`, e o que ainda falta para publicar fora do Brasil.

Não é parecer jurídico. É o rastro da pesquisa, para que um advogado possa conferir o raciocínio em vez de refazê-lo.

---

## Por que não é tradução

Verter a política brasileira para inglês **não** produz um documento conforme nos EUA; para espanhol, **não** produz um documento conforme na UE. Os regimes exigem conteúdo diferente:

| exigência | LGPD (pt-BR) | RGPD (pt-PT, es) | EUA (en) |
|---|---|---|---|
| base legal declarada por finalidade | sim | **sim, explícita por artigo** | não se aplica |
| transferência internacional | menção | **obrigatória, com o mecanismo** | não se aplica |
| decisão automatizada | revisão (art. 20) | **art. 22, com menção expressa** | — |
| autoridade para reclamação | ANPD | **CNPD / AEPD** | — |
| representante local | — | **art. 27, obrigatório** | — |
| venda de dados / opt-out | — | — | **CCPA/CPRA** |
| dado de saúde fora do sistema de saúde | sensível | categoria especial | **My Health My Data** |
| menores | art. 14 | **art. 8, idade varia por país** | **COPPA (<13)** |

Repare no detalhe que mais facilmente passaria batido numa tradução: a **idade de consentimento difere entre Portugal e Espanha**. O RGPD fixa 16 anos e permite baixar até 13; Portugal usa 13, a Espanha usa 14 (LO 3/2018). Uma política espanhola que dissesse 13 estaria errada.

---

## Fontes consultadas

**União Europeia**
- [Art. 13 do RGPD — informação a prestar quando os dados são recolhidos junto do titular](https://gdpr-info.eu/art-13-gdpr/)
- [Art. 9 — categorias especiais, inclui dados de saúde](https://gdpr-info.eu/art-9-gdpr/)
- [Art. 8 — condições aplicáveis ao consentimento de menores](https://gdpr-info.eu/art-8-gdpr/)
- [Considerando 38 — proteção específica das crianças](https://gdpr-info.eu/recitals/no-38/)
- [EDPB — Transparência (orientações endossadas)](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/transparency_en)
- [EDPB — guia para pequenas empresas: tratar dados licitamente](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en)
- [Comissão Europeia — que informação deve ser dada aos titulares](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_en)
- [ICO — como redigir a informação de privacidade](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/how-should-we-draft-our-privacy-information/)

**Estados Unidos**
- [FTC — Complying with COPPA: perguntas frequentes](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)
- [16 CFR Parte 312 — texto da regra COPPA](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312)
- [FTC — plano de conformidade COPPA em seis passos](https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business)
- [FTC — declaração de política sobre verificação de idade, fev/2026](https://www.ftc.gov/news-events/news/press-releases/2026/02/ftc-issues-coppa-policy-statement-incentivize-use-age-verification-technologies-protect-children)
- [Washington My Health My Data Act — RCW 19.373](https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true)
- [Procuradoria-Geral de Washington — proteção de dados de saúde](https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy)

---

## Por que a posição do Vigilaro Care é forte

Três fatos, todos **verificados no código** antes de irem para o texto:

1. **Nenhum SDK de anúncio ou rastreio.** Das 57 dependências, as únicas que falam com terceiros por telemetria ou pagamento são `@sentry/react-native` e `react-native-purchases`. Isso sustenta a afirmação de que não há venda nem compartilhamento para publicidade — a mais escrutinada pela CCPA e pela My Health My Data.
2. **Arquitetura local-first.** Sem conta, sem login, sem servidor guardando cadastro. O que reduz drasticamente a exposição nos três regimes, porque quase não há tratamento por nossa conta.
3. **Envio a terceiros é opt-in.** IA e cuidador remoto só enviam algo se o usuário usar a função.

Essa combinação é incomum em apps de saúde e deve ser dita na política, porque é verdadeira e é o principal argumento de conformidade.

---

## O que falta — e só o titular do negócio resolve

| # | Pendência | Por quê |
|---|---|---|
| ~~L1~~ | ~~Razão social e CNPJ~~ | **Resolvido em 24/09: Vigilaro Care LTDA, CNPJ 65.297.217/0001-50.** Preenchido em `CONTROLADOR.razaoSocial` e propagado às quatro políticas, aos Termos de Uso (que não identificavam o fornecedor) e ao aviso de copyright — que dizia **"Vigilaro Inc."**, entidade diferente da real, nos quatro idiomas. |
| **L2** | **Representante na União Europeia** (RGPD art. 27) | Ver a seção "Como se resolve o representante na UE", abaixo. Sem isso, **não publique nas lojas europeias** — mas Brasil e EUA não dependem deste item. |
| **L3** | **Contratos com os operadores** (RGPD art. 28) e mecanismo de transferência (cap. V) | A política afirma que as transferências para OpenAI, Sentry e RevenueCat se apoiam em cláusulas-padrão ou no EU-US Data Privacy Framework. É preciso **confirmar e arquivar** o instrumento de cada um. A afirmação precisa ser verdadeira. |
| **L4** | **Encarregado / DPO** | Avaliar se o tratamento em larga escala de dados de saúde exige encarregado (LGPD art. 41; RGPD art. 37(1)(c)). Dado o volume potencial, é provável que sim. |
| **L5** | **Termos de Uso por regime** | Feito para a política, **falta para os Termos**, que continuam só em português com tradução parcial da moldura. |
| **L6** | **Revisão por advogado** | Nada aqui substitui isso, em especial COPPA e My Health My Data, que têm enforcement ativo. |
| **L7** | **Data Safety (Play) e App Privacy (Apple)** | As fichas das lojas precisam declarar exatamente o que a política diz. Ver A7 em `PENDENCIAS.md`. |

---

## Como se resolve o representante na UE (L2)

**O que a lei pede.** O artigo 27.º do RGPD obriga controlador estabelecido fora da União, que ofereça bens ou serviços a pessoas na União, a designar **por escrito** um representante. Ele tem de estar estabelecido **num dos Estados-Membros onde estão os titulares** — no nosso caso, Portugal ou Espanha, que são os idiomas que publicamos. O representante passa a ser o endereço que autoridades de controlo e titulares podem procurar, em acréscimo ou em vez da empresa.

**Existe isenção?** O art. 27(2) dispensa quando o tratamento é *ocasional*, **não** envolve em larga escala categorias especiais de dados, e é improvável que resulte em risco. As três condições são cumulativas. O Vigilaro Care trata **dados de saúde**, que são categoria especial — então a isenção provavelmente não se aplica. Há um argumento a favor, pela arquitetura local-first (quase nada é tratado nos nossos servidores), mas é precisamente o tipo de argumento que um advogado deve avaliar e **deixar documentado**, não que se presume.

**Como se faz na prática.** Duas vias:
1. **Alguém do próprio grupo** estabelecido num Estado-Membro — sócio, filial ou pessoa de confiança residente. Basta o mandato escrito.
2. **Serviço de representação**, um mercado que existe justamente para isto: a empresa figura como representante, recebe contactos e os encaminha. É contrato recorrente; peça cotação a mais de um.

Depois de designado, o contacto dele **tem de constar da política de privacidade** (art. 13(1)(a) e orientação do EDPB). O código já está preparado: preencher `CONTROLADOR.representanteUE` propaga a informação para as versões pt-PT e es, e `npm run validate:legal` para de reprovar.

**Não protege de responsabilidade.** O art. 27(5) é explícito: designar representante não impede ações legais contra a própria empresa.

**A via mais simples continua sendo a terceira:** não publicar nas lojas europeias por enquanto. A obrigação nasce de oferecer o serviço a residentes na União; sem oferta, não há obrigação. Lançar Brasil primeiro é decisão de negócio perfeitamente defensável.

---

## Novidade relevante: adequação UE–Brasil

A Comissão Europeia e o Brasil **adotaram decisões de adequação mútuas** (documento C(2026) 373 final, de 26/01/2026), depois do parecer favorável do EDPB (Opinião 28/2025, de 05/11/2025), que reconheceu o alinhamento próximo entre a LGPD e o RGPD.

O que isso muda para nós: dados pessoais podem fluir da União para o Brasil **sem salvaguarda adicional** — a transferência passa a ser tratada como se fosse interna à UE. Isso simplifica parte do item L3, porque a perna "utilizador europeu → Vigilaro Care no Brasil" deixa de precisar de cláusulas contratuais-tipo.

**O que isso NÃO muda**, e é o engano fácil de cometer:
- **não dispensa o representante do art. 27.** Adequação é capítulo V (transferências); representante é âmbito territorial (art. 3(2)). São coisas diferentes;
- **não cobre as transferências seguintes** — Vigilaro → OpenAI, Sentry e RevenueCat, nos EUA. Essas continuam a exigir mecanismo próprio (L3);
- não dispensa nenhuma das outras obrigações do RGPD, que continuam a aplicar-se por oferecermos o serviço na União.

---

## Uma ressalva sobre o alcance

Estas políticas cobrem o que o **aplicativo** faz. O `backend-proxy` é um segundo tratamento, com outra superfície — logs de requisição, retenção no provedor de hospedagem, chaves. Quando o proxy passar a registrar qualquer coisa por usuário, esta análise precisa ser refeita para ele.
