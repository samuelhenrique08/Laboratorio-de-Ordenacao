# Laboratório Interativo de Algoritmos de Ordenação

Trabalho integrador da disciplina de **Estrutura de Dados** · Curso Técnico em Informática

- **Site publicado:** _https://samuelhenrique08.github.io/Laboratorio-de-Ordenacao_
- **Repositório:** _https://github.com/samuelhenrique08/Laboratorio-de-Ordenacao_

## 1. Integrantes, objetivo e problema que resolve

**Integrantes:** _Samuel Henrique, Pedro Lucas, Anthony Gabriel, Victor Gabriel_ (preencher)

**Objetivo:** site em que qualquer pessoa informa uma sequência de números, escolhe a ordem (crescente ou decrescente) e o algoritmo, e acompanha o passo a passo da ordenação.

**Problema que resolve:** algoritmos de ordenação costumam ser explicados só no papel. Aqui é possível ver como o algoritmo recebe os dados, faz as comparações e trocas e chega ao resultado final.

## 2. Algoritmos e tecnologias

Algoritmos implementados em JavaScript puro, linha por linha (sem `Array.sort()`):

| Algoritmo | Ideia | Estável? |
|---|---|---|
| Bubble Sort | Compara vizinhos e troca os que estão fora de ordem; para se uma passagem não trocar nada | Sim |
| Selection Sort | Procura o menor (ou maior) da parte não ordenada e o coloca na posição certa | Não |
| Insertion Sort | Insere cada elemento na posição certa da sublista já ordenada, deslocando os outros | Sim |

Tecnologias: HTML5, CSS3 e JavaScript (sem frameworks, sem bibliotecas externas, sem servidor). Versionamento no GitHub e publicação no GitHub Pages.

O `Array.prototype.sort()` aparece **somente** em `tests.js`, como gabarito para conferir os resultados.

## 3. Como executar localmente e link do site

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador (não precisa de servidor).
3. Para rodar os testes (opcional, requer Node.js): `node tests.js`

Site publicado: _https://samuelhenrique08.github.io/Laboratorio-de-Ordenacao_

## 4. Como usar e exemplos

1. Digite números separados por vírgula e/ou espaço.
2. Escolha **Crescente** ou **Decrescente**.
3. Escolha o algoritmo.
4. Clique em **Ordenar**.

A tela mostra a sequência original e a ordenada lado a lado, o total de comparações e trocas (ou deslocamentos) e uma lista com cada passo, destacando os elementos envolvidos.

| Entrada | Ordem | Saída |
|---|---|---|
| `5, 2, 8, 1` | Crescente | `1, 2, 5, 8` |
| `4, 2, 4, 1` | Crescente | `1, 2, 4, 4` |
| `3, -5, 0, -1` | Crescente | `-5, -1, 0, 3` |
| `7` | Crescente | `7` |
| `1, 5, 3` | Decrescente | `5, 3, 1` |
| (vazio) | — | Mensagem pedindo ao menos um número |
| `3, abc, 2` | — | Erro apontando o valor inválido `abc` |

## 5. Estrutura do repositório

```
index.html   Estrutura da página (formulário, seletores, áreas de saída)
style.css    Layout, cores e responsividade (computador e celular)
script.js    Lógica (leitura da entrada e algoritmos) e interface
tests.js     Testes automatizados (node tests.js)
README.md    Esta documentação
ESCOPO.md    Escopo do trabalho
```

Em `script.js` a lógica fica separada da interface: as funções `parseEntrada`, `bubbleSort`, `selectionSort` e `insertionSort` não mexem na página e não alteram o vetor original.

## 6. Testes

Cada algoritmo passa nos 7 casos exigidos (sequência comum, repetidos, negativos, um elemento, vazia, inválida e decrescente), além de 300 vetores aleatórios comparados com o gabarito. Resultado da última execução: **46/46 verificações passaram** (veja `resultado-testes.txt`).

## 7. Limitações e melhorias futuras

- Aceita apenas números; o decimal usa ponto (a vírgula separa valores).
- O passo a passo é uma lista, sem animação; mostra no máximo 500 passos na tela.
- Futuras melhorias: Merge Sort e Quick Sort, animação com barras, comparação de desempenho entre algoritmos.

## 8. Autores

_Samuel Henrique Gomes de Oliveira · Pedro Lucas Silva Simões · Anthony Gabriel · Victor Gabriel_
