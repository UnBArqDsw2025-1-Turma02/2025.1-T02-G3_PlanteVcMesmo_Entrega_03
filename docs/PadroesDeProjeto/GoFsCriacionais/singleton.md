
# 3.1.2. Singleton

## Introdução

O padrão Singleton é um padrão de projeto do tipo criacional que garante que uma determinada classe tenha apenas uma instância durante todo o ciclo de vida da aplicação. Essa instância é compartilhada globalmente por diversos módulos, permitindo o acesso centralizado a recursos que devem permanecer únicos. Nesse projeto, esse padrão será aplicado para manter o controle e a consistência em componentes centrais tanto do backend quanto, em alguns casos, do frontend.

## Aplicação no Projeto

A aplicação do padrão Singleton no projeto “Plante Você Mesmo” é justificada pela necessidade de manter um controle centralizado e eficiente sobre recursos que devem ter apenas uma instância ativa. No backend, será utilizado no serviço de notificações internas, que envia lembretes sobre cuidados com plantas. Como esse serviço pode ser chamado por várias partes do sistema, é importante que ele funcione de forma padronizada e com uma única instância de controle. [1] [2].

Além disso, o padrão será aplicado na gestão da conexão com o banco de dados utilizando o TypeORM. Isso evita a criação de múltiplas conexões simultâneas, o que poderia gerar conflitos ou desperdício de recursos. Por fim, será usado também no serviço de logger, que registra informações do sistema para depuração e acompanhamento. Ao utilizar uma única instância, todas as mensagens são registradas de maneira centralizada e consistente.

No frontend, o Singleton será utilizado para encapsular serviços globais da aplicação Vue.js. Isso inclui o serviço de comunicação com a API, onde será mantida uma única instância do Axios com configurações padronizadas de cabeçalhos e baseURL, garantindo consistência nas requisições. Além disso, será aplicado no sistema de notificações da interface (como toasts), centralizando o gerenciamento das mensagens exibidas ao usuário e evitando duplicações ou conflitos entre os componentes.

## Vantagens e Justificativas

A principal vantagem do Singleton é o controle centralizado sobre uma instância única de um determinado serviço. Isso é especialmente útil quando a criação de múltiplas instâncias poderia gerar inconsistências ou afetar a performance do sistema. No caso da aplicação, garantir que o logger e o gerenciador de notificações sejam únicos evita duplicidade de logs ou notificações redundantes, além de facilitar a manutenção e leitura dos dados. [1].

Outra vantagem relevante está na gestão de recursos. Ao manter uma única conexão ativa com o banco de dados, o sistema economiza memória e reduz a carga de trabalho sobre o servidor. Isso torna o backend mais eficiente, especialmente em contextos com múltiplos acessos simultâneos.

No frontend, o uso do Singleton permite simplificar serviços compartilhados, como um cliente HTTP ou gerador de notificações. Ele elimina a necessidade de reconfigurar esses serviços em cada componente, mantendo a coerência e facilitando testes e manutenção.

## Modelagem

Abaixo segue a modelagem textual de como o padrão Singleton será implementado nos principais serviços da aplicação:

```
+------------------------+              +---------------------------+
|    LoggerService       |              |  NotificationService (FE) |
+------------------------+              +---------------------------+
| - instance: Logger     |              | - instance: Notifier      |
+------------------------+              +---------------------------+
| + getInstance(): LoggerService        | + getInstance(): Notifier |
| + log(msg: string): void              | + notify(msg): void       |
+------------------------+              +---------------------------+

+--------------------------+
|   DatabaseService        |
+--------------------------+
| - instance: DataSource   |
+--------------------------+
| + getInstance(): DatabaseService |
| + connect(): void               |
+--------------------------+

+------------------------------+
| NotificationService (BE)     |
+------------------------------+
| - instance: Notification     |
+------------------------------+
| + getInstance(): NotificationService |
| + notify(msg: string): void          |
+------------------------------+
```

Essas classes possuem um atributo privado `instance` que armazena a instância única e um método público `getInstance()` que retorna essa instância. Com isso, qualquer parte do sistema pode utilizar o serviço desejado sem recriar novos objetos.

<font size="3"><p style="text-align: center"><b>Autor:</b> Matheus Brant, 2025 </p></font>

## Referências

1. Refactoring Guru. Singleton Design Pattern. Disponível em: [https://refactoring.guru/design-patterns/singleton](https://refactoring.guru/design-patterns/singleton). Acesso em: 24 mai. 2025.
2. Cloudaffle. Singleton Implementation. In: Creational Design Patterns Series. Disponível em: [https://cloudaffle.com/series/creational-design-patterns/singleton-design-patterns/](https://cloudaffle.com/series/creational-design-patterns/singleton-design-patterns/). Acesso em: 24 mai. 2025.
3. Gamma, E. et al. Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.
4. Banda, G. Design Patterns with TypeScript. Leanpub, 2022.

## Histórico de Versões

| Versão | Data       | Alterações Principais                             | Autor(es)                                |
|--------|------------|---------------------------------------------------|------------------------------------------|
| 0.0.1  | 22-05-2025 | Introdução                                        | Matheus Brant                            |
| 0.0.2  | 22-05-2025 | Aplicação no Projeto & Vantagens e Justificativas | Matheus Brant                            |
| 0.0.3  | 22-05-2025 | Modelagem                                         | Matheus Brant                            |

