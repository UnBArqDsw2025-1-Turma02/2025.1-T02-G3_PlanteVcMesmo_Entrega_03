# 3.1. Módulo Padrões de Projeto GoFs Criacionais

Durante o desenvolvimento do projeto “Plante Você Mesmo”, utilizamos diferentes padrões de projeto criacionais para lidar com situações em que era necessário criar objetos de maneira mais estruturada, flexível e reutilizável. Esses padrões nos ajudaram a manter o código mais limpo, modular e fácil de manter (Gamma, E., et al, 1994, p.85)<sup><a><b>1</b></a></sup> — principalmente em contextos onde a complexidade da construção de objetos poderia gerar acoplamentos desnecessários.

Nesta seção, apresentamos três dos principais padrões criacionais aplicados no projeto:

- **Builder**, utilizado para facilitar a criação de objetos complexos em cenários de teste;

- **Factory**, adotado para encapsular a lógica de criação de diferentes serviços de LLM de forma padronizada;

- **Singleton**, implementado para garantir uma única instância de serviços reutilizáveis, como o cliente HTTP no frontend.

A seguir, detalhamos como cada um desses padrões foi aplicado no projeto, suas vantagens e exemplos práticos de implementação.

## Referências

1. <a id="#ref1"></a>Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley. Disponível em: https://www.javier8a.com/itc/bd1/articulo.pdf

| Versão | Data       | Alterações Principais                             | Autor(es)        |
|--------|------------|---------------------------------------------------| ---------------- |
| 1.0.0 | 01-06-2025 | Adição da introdução | [Caio Felipe Rocha][caio-felipee] |
| 1.0.1  | 01-06-2025 | Revisão bibliográfica | [Gabriel Fernando De Jesus Silva][MMcLovin] e [Pedro Henrique Fernandino da Silva][PedroHenrique061] |

[artrsousa1]: https://github.com/artrsousa1  
[CaioHabibe]: https://github.com/CaioHabibe  
[caio-felipee]: https://github.com/caio-felipee  
[caiolamego]: https://github.com/caiolamego  
[dcasseb]: https://github.com/dcasseb  
[MMcLovin]: https://github.com/MMcLovin  
[mateusvrs]: https://github.com/mateusvrs  
[MatheussBrant]: https://github.com/MatheussBrant  
[PedroHenrique061]: https://github.com/PedroHenrique061  
[rmatuda]: https://github.com/rmatuda

