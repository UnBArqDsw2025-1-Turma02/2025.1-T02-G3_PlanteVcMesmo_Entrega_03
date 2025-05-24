# 3.3.1. Strategy

<!-- COLOQUE AS REFERÊNCIAS POR PARÁGRAFO ESCRITO, PODE ENUMERAR E COLOCAR POR NÚMERO, COMO SE FOSSE UM ARTIGO MESMO -->

<!-- ESCREVA PELO MENOS 3 PARÁGRAFOS DE CADA TÓPICO, CADA UM COM NO MíNIMO 70 PALAVRAS -->

<!-- NÂO SE LIMITE A ESSES TÓPICOS, MAS MANTENHA A ORDEM RELATIVA -->

## Introdução

O padrão Strategy é um padrão de design comportamental que permite definir uma família de algoritmos, encapsulá-los e torná-los intercambiáveis durante a execução do programa (1). Este padrão é especialmente útil quando existe a necessidade de alternar entre diferentes abordagens para resolver um mesmo problema, sem modificar o código cliente que utiliza esses algoritmos. No contexto do Plante Vc Mesmo, o Strategy se mostra fundamental para gerenciar as diferentes estratégias de cuidado que variam conforme o tipo de planta, estação do ano, condições ambientais e preferências do usuário, proporcionando flexibilidade e extensibilidade ao sistema.

## Vantagens e Justificativas

A implementação do padrão Strategy no Plante Vc Mesmo oferece benefícios significativos para a manutenibilidade e escalabilidade do sistema (2). Primeiramente, o padrão elimina a necessidade de estruturas condicionais complexas, como múltiplos if-else ou switch-case, que seriam necessárias para determinar qual algoritmo de cuidado aplicar para cada tipo de planta. Essa abordagem torna o código mais limpo, legível e menos propenso a erros, facilitando a manutenção pelos desenvolvedores.

A flexibilidade proporcionada pelo Strategy é particularmente valiosa no domínio de jardinagem, onde diferentes plantas requerem abordagens distintas de cuidado (3). Por exemplo, plantas suculentas necessitam de estratégias de rega completamente diferentes das plantas tropicais, e essas diferenças se estendem à frequência de adubação, necessidades de luz e cuidados sazonais. O padrão permite que essas estratégias sejam definidas de forma independente e intercambiadas conforme necessário, sem afetar o resto do sistema.

Além disso, o Strategy facilita a extensão do sistema com novas estratégias de cuidado sem modificar o código existente, seguindo o princípio Aberto/Fechado do SOLID (4). Quando novos tipos de plantas são adicionados ao sistema ou quando especialistas em botânica desenvolvem novas técnicas de cuidado, essas podem ser implementadas como novas estratégias sem impactar as funcionalidades já estabelecidas. Essa característica é crucial para um web app que precisa evoluir continuamente para atender às necessidades crescentes dos usuários apaixonados por plantas.

## Modelagem

A modelagem do padrão Strategy para o Plante Vc Mesmo segue a estrutura clássica do padrão, adaptada às necessidades específicas do domínio botânico (5). A interface EstrategiaCuidado define o contrato comum que todas as estratégias concretas devem implementar, estabelecendo métodos fundamentais como calcularFrequenciaRega(), determinarTipoAdubo() e avaliarNecessidadeLuz(). Essa interface garante que todas as estratégias forneçam as informações essenciais para o cuidado adequado das plantas.

As implementações concretas da estratégia representam diferentes abordagens de cuidado baseadas nas características específicas de cada categoria de planta (6). A EstrategiaSuculentas implementa algoritmos que consideram a baixa necessidade hídrica e alta tolerância à luz solar direta dessas plantas, calculando frequências de rega mais espaçadas e recomendando substratos com melhor drenagem. Por outro lado, a EstrategiaTropicais incorpora a necessidade de umidade constante e proteção contra luz solar excessiva, sugerindo regimes de cuidado mais intensivos e ambientes com umidade controlada.

O contexto é representado pela classe GerenciadorCuidados, que mantém uma referência para a estratégia atual e delega as operações de cálculo para ela (7). Esta classe atua como o ponto de entrada para todas as operações relacionadas ao cuidado das plantas, permitindo que o sistema determine automaticamente qual estratégia utilizar baseado nas características da planta cadastrada. O gerenciador também é responsável por trocar estratégias quando necessário, como quando o usuário modifica o tipo de uma planta ou quando condições sazonais exigem ajustes nos cuidados.

                                ┌─────────────────────────────────────┐
                                │          <<interface>>              │
                                │         EstrategiaCuidado           │
                                ├─────────────────────────────────────┤
                                │ + calcularFrequenciaRega()          │
                                │ + determinarTipoAdubo()             │
                                │ + avaliarNecessidadeLuz()           │
                                │ + calcularProximoCuidado()          │
                                └─────────────┬───────────────────────┘
                                              │
                       ┌──────────────────────┼──────────────────────┐
                       │                      │                      │
                       ▼                      ▼                      ▼
        ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
        │   EstrategiaSuculentas  │ │   EstrategiaTropicais   │ │   EstrategiaFloridas    │
        ├─────────────────────────┤ ├─────────────────────────┤ ├─────────────────────────┤
        │ + calcularFrequencia... │ │ + calcularFrequencia... │ │ + calcularFrequencia... │
        │ + determinarTipoAdubo() │ │ + determinarTipoAdubo() │ │ + determinarTipoAdubo() │
        │ + avaliarNecessidade... │ │ + avaliarNecessidade... │ │ + avaliarNecessidade... │
        │ + calcularProximo...    │ │ + calcularProximo...    │ │ + calcularProximo...    │
        │ - considerarEstacao()   │ │ - monitorarUmidade()    │ │ - otimizarParaFlora...  │
        │ - avaliarTamanhoVaso()  │ │ - ajustarPorTemperatura │ │ - calcularCicloFloral() │
        └─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘


     ┌─────────────────────────────────────────┐              ┌─────────────────────────┐
     │         GerenciadorCuidados             │              │         Planta          │
     ├─────────────────────────────────────────┤              ├─────────────────────────┤
     │ - estrategia: EstrategiaCuidado         │◆────────────▷│ - id: int               │
     ├─────────────────────────────────────────┤              │ - nome: String          │
     │ + definirEstrategia()                   │              │ - especie: String       │
     │ + executarCuidado()                     │              │ - categoria: Categoria  │
     │ + gerarLembretes()                      │              │ - dataAquisicao: Date   │
     │ + avaliarSaudePlanta()                  │              │ - localizacao: String   │
     └────────────────┬────────────────────────┘              │ + obterCategoria()      │
                      │                                       │ + obterIdade()          │
                      │                                       └─────────────────────────┘
                      │
                      ▼
     ┌─────────────────────────────────────────┐
     │          EstrategiaCuidado              │
     │            (referência)                 │
     └─────────────────────────────────────────┘

Legenda:
  ▲  : Herança/Implementação (implements)
  ◆  : Composição
  ───▷: Associação

A implementação prática do padrão Strategy no app demonstra como diferentes algoritmos podem coexistir harmoniosamente no mesmo sistema (8). Quando um usuário cadastra uma nova planta suculenta, o sistema automaticamente seleciona a EstrategiaSuculentas, que calcula uma frequência de rega de 7 a 14 dias, dependendo da estação e do tamanho do vaso. Para plantas tropicais, a EstrategiaTropicais estabelece frequências de 2 a 4 dias, considerando fatores como umidade ambiente e temperatura. As plantas floridas recebem tratamento especializado através da EstrategiaFloridas, que ajusta os cuidados baseado no ciclo de floração e nas necessidades específicas para produção de flores.

## Referências

(1) GAMMA, Erich et al. Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos. Porto Alegre: Bookman, 2000. p. 292-302.
(2) FREEMAN, Eric; ROBSON, Elisabeth. Use a Cabeça! Padrões de Projetos. 2. ed. São Paulo: Alta Books, 2007. p. 24-45.
(3) MARTIN, Robert C. Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software. São Paulo: Alta Books, 2019. p. 156-167.
(4) MARTIN, Robert C. Princípios, Padrões e Práticas Ágeis em C#. Porto Alegre: Bookman, 2011. p. 142-158.
(5) LARMAN, Craig. Utilizando UML e Padrões: Uma Introdução à Análise e ao Projeto Orientados a Objetos e ao Desenvolvimento Iterativo. 3. ed. Porto Alegre: Bookman, 2007. p. 387-401.
(6) FOWLER, Martin. Padrões de Arquitetura de Aplicações Corporativas. Porto Alegre: Bookman, 2006. p. 315-328.
(7) BLOCH, Joshua. Java Efetivo: As Melhores Práticas para a Plataforma Java. 2. ed. São Paulo: Alta Books, 2018. p. 89-104.
(8) SHALLOWAY, Alan; TROTT, James R. Explicando Padrões de Projeto: Uma Nova Perspectiva em Projeto Orientado a Objeto. Porto Alegre: Bookman, 2004. p. 187-203.

## Histórico de Versões

| Versão | Data       | Alterações Principais                             | Autor(es)        |
|--------|------------|---------------------------------------------------| ---------------- |
| 1.0.0  | 22-05-2025 | Criação do Documento do padrão de projeto Strategy                                         | Davi Casseb            |

