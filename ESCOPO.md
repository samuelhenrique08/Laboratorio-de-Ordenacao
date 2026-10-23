# Escopo do Trabalho — Laboratório Interativo de Algoritmos de Ordenação

Disciplina: Estrutura de Dados · Curso Técnico em Informática · Trabalho grupal

## 1. Objetivo

Construir um site estático em que qualquer pessoa informa uma sequência de números, escolhe a ordem (crescente ou decrescente) e o algoritmo, e vê:

- a sequência original e a ordenada lado a lado;
- o passo a passo do algoritmo (comparações, trocas, deslocamentos), para fins didáticos.

## 2. Problema que resolve

Algoritmos de ordenação costumam ser ensinados só no papel. O site mostra, de forma visível, como o algoritmo recebe os dados brutos, compara, troca e chega ao resultado final.

## 3. Escopo incluído

| # | Funcionalidade obrigatória | Como será atendida |
|---|---|---|
| 01 | Entrada flexível | Campo de texto aceita números separados por vírgulas e/ou espaços |
| 02 | Validação | Mensagem de erro clara apontando o valor inválido |
| 03 | Sentido | Seleção explícita: crescente ou decrescente |
| 04 | Algoritmo | Seletor com Bubble, Selection e Insertion Sort |
| 05 | Execução | Botão "Ordenar" com JavaScript, sem recarregar a página |
| 06 | Comparação | Cartões "Original" e "Ordenada" lado a lado |
| 07 | Casos básicos | Repetidos, negativos, um elemento, vazio e inválido tratados |
| 08 | Responsividade | CSS com grid/flex e media query para celular |

Extras que apoiam o objetivo didático: contadores de comparações e trocas, e lista de passos com os elementos envolvidos destacados.

## 4. Fora do escopo

- Banco de dados, servidor próprio, frameworks e bibliotecas externas.
- Animação gráfica em tempo real (o passo a passo é em lista).
- Ordenação de texto (apenas números).

## 5. Algoritmos (implementados em JavaScript puro)

1. **Bubble Sort** — compara vizinhos e empurra o maior (ou menor) para o fim; para antecipadamente se uma passagem não trocar nada.
2. **Selection Sort** — procura o menor (ou maior) elemento da parte não ordenada e o coloca na posição correta.
3. **Insertion Sort** — insere cada elemento na posição correta da sublista já ordenada, deslocando os maiores.

Mínimo exigido: dois. Foram feitos três para dar mais opção de comparação. Qualquer integrante pode ser arguido sobre qualquer um dos três.

Regra: `Array.prototype.sort()` **não** é usado no site. Aparece apenas em `tests.js`, como gabarito.

## 6. Arquitetura

- `index.html`: estrutura semântica (formulário, seletores, contêineres de saída).
- `style.css`: layout, contraste e responsividade.
- `script.js`: duas camadas separadas no mesmo arquivo:
  - **Lógica pura** (sem DOM): `parseEntrada`, `bubbleSort`, `selectionSort`, `insertionSort`. Cada função recebe o vetor e o sentido, devolve `{ resultado, passos, comparacoes, trocas }` e não altera o vetor original.
  - **Interface**: lê o formulário, chama a lógica e escreve na tela.
- `tests.js`: testes automatizados rodados com Node (`node tests.js`).
- `README.md`: documentação exigida.

## 7. Casos de teste (rodam para cada algoritmo)

| Caso | Entrada | Esperado |
|---|---|---|
| Sequência comum | 5, 2, 8, 1 | 1, 2, 5, 8 |
| Valores repetidos | 4, 2, 4, 1 | 1, 2, 4, 4 |
| Valores negativos | 3, -5, 0, -1 | -5, -1, 0, 3 |
| Um elemento | 7 | 7 |
| Sequência vazia | (nada) | mensagem adequada |
| Entrada inválida | 3, abc, 2 | mensagem de erro compreensível |
| Ordem decrescente | 1, 5, 3 | 5, 3, 1 |

## 8. Divisão sugerida de tarefas (ajustar aos integrantes)

| Integrante | Responsabilidade principal |
|---|---|
| A | Algoritmo 1 e seus testes |
| B | Algoritmo 2 e seus testes |
| C | Validação/parsing da entrada |
| D | HTML + CSS (interface e responsividade) |
| Todos | README, publicação, post no LinkedIn e preparação para a arguição |

Cada integrante deve ser capaz de explicar **todo** o código na apresentação individual.

## 9. Plano de commits (histórico real, não um commit único)

1. `Estrutura inicial do projeto` — arquivos vazios/esqueleto
2. `Adiciona Bubble Sort e Insertion Sort` (e depois Selection Sort)
3. `Adiciona validação dos dados de entrada`
4. `Conecta interface e corrige erros`
5. `Documentação (README) e publicação no GitHub Pages`

## 10. Cronograma sugerido

| Etapa | Entrega |
|---|---|
| 1 | Repositório criado e estrutura inicial |
| 2 | Algoritmos funcionando no console |
| 3 | Validação e testes passando |
| 4 | Interface, responsividade e correções |
| 5 | README, GitHub Pages e post no LinkedIn |
| 6 | Ensaio da arguição individual |

## 11. Entregáveis e pesos

| Critério | Pontos |
|---|---|
| Implementação correta dos algoritmos | 30 |
| Funcionamento e validação do site | 20 |
| Qualidade do código e compreensão | 15 |
| Repositório, commits e README | 15 |
| Publicação no GitHub Pages | 10 |
| Divulgação no LinkedIn | 5 |
| Testes, apresentação e explicação | 5 |
| **Total** | **100** |

## 12. Critérios de aceite (checklist final)

- [ ] As 8 funcionalidades funcionam no site publicado
- [ ] Os 7 testes passam nos algoritmos (`node tests.js`)
- [ ] `Array.sort()` não é usado fora de `tests.js`
- [ ] Site abre em janela anônima, com CSS e JS carregando
- [ ] README completo com link do site publicado
- [ ] Nenhuma senha, chave ou token no repositório
- [ ] Post no LinkedIn publicado com os dois links, sem afirmar o que não existe
- [ ] Todos os integrantes sabem explicar uma função, simular uma comparação e identificar uma troca

## 13. Riscos

| Risco | Mitigação |
|---|---|
| Commit único no último dia | Seguir o plano de commits da seção 9 |
| Site funciona local mas não publicado | Testar a URL do GitHub Pages em janela anônima |
| Integrante não saber explicar o código | Ensaio de arguição; comentários didáticos no código |
| Entrada com decimais usando vírgula | Documentar: vírgula separa valores, o decimal usa ponto |
