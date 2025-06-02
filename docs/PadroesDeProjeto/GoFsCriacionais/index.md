# 3.1. Módulo Padrões de Projeto GoFs Criacionais

Durante o desenvolvimento do projeto “Plante Você Mesmo”, utilizamos diferentes padrões de projeto criacionais para lidar com situações em que era necessário criar objetos de maneira mais estruturada, flexível e reutilizável. Esses padrões nos ajudaram a manter o código mais limpo, modular e fácil de manter — principalmente em contextos onde a complexidade da construção de objetos poderia gerar acoplamentos desnecessários.

Nesta seção, apresentamos três dos principais padrões criacionais aplicados no projeto:

- **Builder**, utilizado para facilitar a criação de objetos complexos em cenários de teste;

- **Factory**, adotado para encapsular a lógica de criação de diferentes serviços de LLM de forma padronizada;

- **Singleton**, implementado para garantir uma única instância de serviços reutilizáveis, como o cliente HTTP no frontend.

A seguir, detalhamos como cada um desses padrões foi aplicado no projeto, suas vantagens e exemplos práticos de implementação.

| Versão | Data       | Alterações Principais                             | Autor(es)        |
|--------|------------|---------------------------------------------------| ---------------- |
| 1.0.0  | 01-06-2025 | Adição de introdução | Caio Felipe |

