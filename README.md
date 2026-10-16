# MaxPrism — histórico de atualizações (v11 a v14) — imagens originais e botões ajustados

Base: MaxPrism v10. A navegação, FAQ, cores, valores, links de lojas e Instagram permanecem inalterados.

## Corrigido

- Streaming: os **10 arquivos `.webp` originais do repositório `SimsReaper/PP`**, sob `assets/streaming/`, são exibidos via URLs públicas da origem (sem reconstruções SVG feitas na v10).
- Dispositivos: os **10 arquivos de imagens do HTML original do MaxPlayer** foram recuperados dos URLs fornecidos no próprio trecho, inclusive a arte Google Play para Android Mobile. Cada card mantém seu link específico de loja; Apple TV e iPhone continuam distintos.
- Botões do banner: removida a largura excessiva e reduzido o preenchimento horizontal, com largura ajustada ao texto; em celular não forçam largura total.
- Carrossel: uma ocorrência por plataforma, sem duplicações visíveis (o mecanismo da v10 foi preservado).

## Funcionamento das imagens

Por padrão, o `index.html` carrega os arquivos originais **pela internet** (repositório GitHub e site MaxPlayer). Isso significa que abrir o HTML localmente com acesso à internet exibe as marcas originais. Em caso de falha, o nome permanece legível, sem imagens inventadas.

**Para baixar os 20 arquivos originais e tornar essa parte do site independente desses servidores:** no Windows execute `baixar_imagens_originais.bat` na pasta extraída. O script utiliza as mesmas URLs auditadas para obter os arquivos binários e modifica APENAS os caminhos das imagens que foram baixadas com sucesso para usar o diretório local. Verifique as mensagens para eventuais falhas. Não use este script se não deseja baixar imagens de terceiros.

Ao publicar no GitHub/Cloudflare Pages, prefira o site com os arquivos baixados localmente, reduzindo a dependência dos servidores externos. Isso não altera as regras de permissão de uso das marcas ou direitos de distribuição de conteúdo.

Nenhum arquivo anterior (v9/v10) foi sobrescrito por essa entrega.


## v12 — proporções, legendas e cores

- Carrossel: as dez marcas originais têm uma área visual fixa de 66px e uma legenda com área fixa de 32px, com centralização consistente entre cartões. Ajustes individuais para as diferentes margens embutidas nas imagens originais (Windows, App Store, Google Play etc.). As fontes e os links para as lojas foram preservados.
- Streaming: o padding branco interno e a borda dos cartões foram removidos; as imagens originais 16:9 ocupam toda a área do cartão, preservando os cantos arredondados.
- Destaques: cores do fundo, contorno e ícone igualadas às usadas em 01 / Programação (`#fff7e7`, `#ffe0a4`, `#da8a00`).
- Mantidos os demais elementos da v11, incluindo o FAQ, os preços, o Instagram, o banner e o controle de rolagem do carrossel.

As imagens originais do GitHub e do MaxPlayer continuam remotas por padrão, como na v11; para baixar cópias locais use `baixar_imagens_originais.bat` no Windows. Os direitos de marca e imagem permanecem com os titulares.

## v13 — planos, comparações e mensagens do Direct

- Mensal: R$ 30,00 por 30 dias. Trimestral: R$ 80,00 por 90 dias; economia R$ 10,00 (11,1% vs três pagamentos mensais), equivalente a R$ 26,67/mês. Semestral: R$ 150,00 por 180 dias; economia R$ 30,00 (16,7% vs seis pagamentos mensais), equivalente a R$ 25,00/mês. Teste grátis: 4 horas.
- A comparação com mensalidades avulsas é explicada sem tachar qualquer preço.
- Os quatro botões mantêm aparência e rótulos originais, abrem `https://ig.me/m/friendsjfas` e tentam copiar a mensagem específica para a área de transferência. Não enviam mensagens automaticamente.
- Se a cópia falhar, um aviso discreto mostra a mensagem para seleção manual. O botão flutuante do Instagram, demais seções e página de reembolso permanecem inalterados.
- Arquivos de código alterados: `index.html`, `assets/styles.css`, `assets/app.js`. `README.md` foi atualizado apenas para documentar a mudança.


## v14 — nome MaxPrism, política e rodapé

- Nome exibido e metadados passam de PlumPlay para MaxPrism, incluindo as mensagens dos quatro botões de planos; o Instagram permanece `@friendsjfas`.
- A página de cancelamento e reembolso passou a ter cartões claros e tipografia em azul-marinho com contraste legível. Nenhuma condição ou valor de reembolso foi alterado.
- Rodapé da página principal simplificado para Instagram e Cancelamento e reembolso. O restante dos links continua na navegação do site.
- Cabeçalho da página de política simplificado para a marca e o botão Voltar ao site.
- **Logo provisória:** os arquivos gráficos originais e os respectivos caminhos (`assets/plumplay-logo.webp`, `assets/favicon.png`, etc.) foram mantidos sem alteração. A logo ainda pode conter o nome antigo na própria imagem até que a nova arte MaxPrism seja fornecida.
- Mantidos os planos, a interação de cópia + abertura do Direct, o carrossel, os arquivos externos e o restante do layout da v13.

## v16 — política de privacidade dos redirecionamentos

- `index.html` e `reembolso.html`: política global `no-referrer` no documento.
- Links externos para o MaxPlayer mantêm `rel="noopener noreferrer"` e usam `referrerpolicy="no-referrer"`.
- Folha `assets/styles.css` é carregada com `referrerpolicy="no-referrer"`; imagens dos dispositivos já usam o mesmo atributo individualmente.
- `_headers` configura `Referrer-Policy: no-referrer` em todo o site quando publicado no Cloudflare Pages.
- O site **continua carregando imagens e o fundo da página a partir de servidores externos**; mesmo sem Referer, esses servidores recebem solicitações HTTP e podem observar IP, User-Agent e outras informações técnicas.
- Para não realizar requisições automáticas ao MaxPlayer ao exibir o site, baixe e hospede as imagens e o fundo localmente, desde que tenha a autorização necessária.
- Não foram aplicadas ainda as mudanças pendentes do rodapé (Voltar ao topo) nem a remoção de Voltar ao site no cabeçalho da página de reembolso.

- O fundo remoto do banner passou de `assets/styles.css` para uma declaração `style` na seção do banner, preservando exatamente as camadas visuais. Assim a requisição herda a política `no-referrer` do HTML mesmo em hospedagens sem suporte ao `_headers`.


## v17 — montagem de dispositivos e navegação
- No hero, o espaço provisório passou a exibir a montagem enviada pelo usuário, recortada somente no entorno transparente, com transparência preservada e compactada em WebP de alta qualidade, e salva em `assets/maxprism-dispositivos.webp`. A grade, cores, textos e CTA permanecem iguais.
- O rodapé principal recupera o atalho **Voltar ao topo ↑**.
- Na política de cancelamento e reembolso, o botão redundante **Voltar ao site** foi retirado do cabeçalho; o logotipo ainda leva à página inicial e o botão de retorno no corpo permanece. O rodapé da política também apresenta **Voltar ao topo ↑**.
- `og:image` aponta para a logo atual MaxPrism em vez do logo antigo PlumPlay.
- A proteção `Referrer-Policy: no-referrer` da v16 permanece, incluindo `_headers` e as metatags.
- Permanecem intactos: identidade visual, ícones, imagens e preços de planos, Direct Instagram `@friendsjfas`, carrossel e mensagens de cópia.


## v18 — altura do banner e proporção da marca
- O banner principal agora ocupa no mínimo a altura visível abaixo da navbar (78px desktop, 69px celular), sem limite de 850px. Mantém centralização e expansão natural quando o conteúdo exigir mais espaço.
- Removido `background:#051c40` do seletor `.site-brand img`; a marca tem fundo transparente.
- Favicon PNG quadrado (512 × 512) e ICO com o símbolo laranja centralizado mantendo proporção original, sem esticar nem achatar.
- Cabeçalho e rodapé usam o ícone quadrado proporcional com transparência.

## v18.1 — alinhamento da seção de planos

- O atalho “Teste gratuito de 4h” mantém `#teste` no endereço, mas centraliza a seção inteira em `#planos` exatamente como o botão “Conhecer planos”.
- Corrige também a abertura direta de `index.html#teste` e a navegação de histórico, sem alterar estilos ou demais links.
- Arquivo funcional modificado: `assets/app.js`.

## v18.2 — plataformas compatíveis

- Removido o cartão MAG Box / Infomir do carrossel de dispositivos. Permanecem nove plataformas distintas e seus links originais.
- Recalibrada a largura dos itens para manter a rolagem circular, sem duplicar cartões.
- Retirados o ajuste visual específico e o download da imagem MAG Box do script Windows. Agora são 19 recursos externos no baixador (10 marcas de streaming + 9 plataformas).
- Sem alterações de preços, Instagram, outros blocos ou visual geral.


## v18.3 — centralização do banner no celular
- No celular (até 540px), a chamada do hero, título, descrição, botões e marcadores são centralizados.
- O título passa a ocupar três linhas controladas: “Tudo o que” / “você gosta.” / “Em cada tela.”.
- A marca no cabeçalho fica mais próxima do nome MaxPrism, com `gap: 3px` no celular.
- O desktop mantém a apresentação anterior; os componentes, preços e links dos outros blocos permanecem intactos.
