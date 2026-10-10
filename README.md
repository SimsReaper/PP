# PlumPlay — Landing page

Landing page estática responsiva para a marca PlumPlay.

## Antes de divulgar

1. Defina o número de atendimento em `assets/config.js` (apenas DDI + DDD + número, sem símbolos). Botões de contratar/testar só abrirão o WhatsApp após essa configuração.
2. Confirme as condições comerciais, os direitos de distribuição do conteúdo anunciado e o uso autorizado de marcas e imagens. Logos de terceiros não indicam parceria ou licença.
3. Revise a minuta `reembolso.html` para refletir seu procedimento real e as exigências legais; não retenha automaticamente R$5 em pedidos de arrependimento legal de até sete dias.
4. Valide a compatibilidade real do Max Player com seus dispositivos de clientes e confirme as orientações de instalação.

## Arquivos

- `index.html`: página principal com conteúdos, imagens fornecidas, dispositivos, Max Player, plano mensal de R$30 e teste grátis de 4 horas.
- `reembolso.html`: política de cancelamento e reembolso (minuta para revisão).
- `assets/config.js`: WhatsApp.
- `assets/styles.css`: estilos e scrollbar Fluent inspirada no Edge, em laranja.
- `assets/app.js`: menu móvel e links de atendimento.
- `assets/plumplay-logo.webp`: logo do PlumPlay fornecida pelo usuário.
- `assets/maxplayer-logo.png`: logo Max Player fornecida pelo usuário, reamostrada para melhor nitidez.
- `assets/streaming/*.webp`: **as dez imagens enviadas pelo usuário**, ajustadas por recorte centrado proporcional, sem deformação.

## Hospedagem

Pode-se guardar o código no GitHub. **GitHub Pages pode restringir hospedagem de sites cuja finalidade principal seja conduzir negócios ou transações comerciais**: confirme as condições vigentes antes de habilitar o serviço. Para uma landing page de vendas, considere provedor de hospedagem comercial que permita esse uso.

O GitHub Pages não é ativado automaticamente por estes arquivos: quando permitido, ajuste a publicação no repositório em **Settings → Pages**.

## Direitos

Os arquivos de marcas de terceiros permanecem pertencentes aos respectivos titulares. O uso das imagens, a oferta e a retransmissão de conteúdo requerem as permissões e licenças aplicáveis.


## Revisão visual v3
- CTA final restaurado para “Sua próxima experiência começa aqui.”
- Programação: quatro ícones SVG semânticos; Destaques: claquete, troféu e câmera.
- Ícones de “+” em SVG centralizados e não selecionáveis.
- MaxPlay: estrutura integral do bloco V6 (arte, brilhos, selos e dois botões), com ícone fornecido via URL e fallback vetorial local.
- Planos: Mensal, Trimestral, Semestral e Teste gratuito nessa ordem; quatro colunas no desktop, duas no tablet e uma no celular.
- O número do WhatsApp continua pendente em assets/config.js.
- A imagem externa MaxPlay requer conexão; a arte local é fallback derivado da logo anteriormente enviada.

- Descontos exibidos como comparações com pagamentos mensais: trimestral R$85 (R$5 de economia); semestral R$160 (R$20 de economia).