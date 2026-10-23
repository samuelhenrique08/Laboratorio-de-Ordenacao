/* ==========================================================
   Testes automatizados — rode com:  node tests.js

   Aqui (e somente aqui) Array.prototype.sort() é usado,
   como GABARITO para conferir as respostas dos algoritmos.
   ========================================================== */

const { parseEntrada, ALGORITMOS } = require("./script.js");

let total = 0;
let falhas = 0;

function conferir(descricao, condicao, detalhe) {
    total++;
    if (condicao) {
        console.log("  ok   " + descricao);
    } else {
        falhas++;
        console.log("  FALHA " + descricao + (detalhe ? " -> " + detalhe : ""));
    }
}

function igual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Os 7 casos exigidos. "entrada" é o texto digitado pelo usuário.
const casos = [
    { nome: "Sequência comum", entrada: "5, 2, 8, 1", crescente: true, esperado: [1, 2, 5, 8] },
    { nome: "Valores repetidos", entrada: "4, 2, 4, 1", crescente: true, esperado: [1, 2, 4, 4] },
    { nome: "Valores negativos", entrada: "3, -5, 0, -1", crescente: true, esperado: [-5, -1, 0, 3] },
    { nome: "Um elemento", entrada: "7", crescente: true, esperado: [7] },
    { nome: "Sequência vazia", entrada: "", vazio: true },
    { nome: "Entrada inválida", entrada: "3, abc, 2", invalido: true },
    { nome: "Ordem decrescente", entrada: "1, 5, 3", crescente: false, esperado: [5, 3, 1] },
];

for (const chave of Object.keys(ALGORITMOS)) {
    const { nome, funcao } = ALGORITMOS[chave];
    console.log("\n" + nome);

    for (const caso of casos) {
        const leitura = parseEntrada(caso.entrada);

        if (caso.vazio) {
            conferir(caso.nome + ": mensagem adequada", !leitura.ok && leitura.vazio === true && leitura.erro.length > 0);
            continue;
        }
        if (caso.invalido) {
            conferir(caso.nome + ": mensagem de erro compreensível", !leitura.ok && /abc/.test(leitura.erro));
            continue;
        }

        const original = leitura.numeros.slice();
        const reg = funcao(leitura.numeros, caso.crescente);
        conferir(caso.nome + ": " + caso.entrada + " -> " + reg.resultado.join(", "), igual(reg.resultado, caso.esperado),
            "esperado " + caso.esperado.join(", "));
        conferir(caso.nome + ": não altera o vetor original", igual(leitura.numeros, original));
    }

    // Teste extra: vários vetores aleatórios comparados com o gabarito (Array.sort)
    let aleatoriosOk = true;
    for (let t = 0; t < 300 && aleatoriosOk; t++) {
        const tamanho = Math.floor(Math.random() * 15);
        const v = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 21) - 10);
        const gabaritoCres = v.slice().sort((a, b) => a - b);
        const gabaritoDesc = v.slice().sort((a, b) => b - a);
        if (!igual(funcao(v, true).resultado, gabaritoCres) || !igual(funcao(v, false).resultado, gabaritoDesc)) {
            aleatoriosOk = false;
        }
    }
    conferir("300 vetores aleatórios (com repetidos e negativos) batem com o gabarito", aleatoriosOk);
}

// Testes da leitura da entrada
console.log("\nLeitura da entrada");
conferir("aceita espaços", igual(parseEntrada("3 1 2").numeros, [3, 1, 2]));
conferir("aceita vírgulas sem espaço", igual(parseEntrada("3,1,2").numeros, [3, 1, 2]));
conferir("aceita mistura de vírgulas e espaços", igual(parseEntrada(" 3 ,1   2 ").numeros, [3, 1, 2]));
conferir("aceita decimais com ponto", igual(parseEntrada("2.5, -1.25").numeros, [2.5, -1.25]));
conferir("rejeita texto sem números (apenas espaços)", parseEntrada("   ").ok === false);
conferir("rejeita '1..2'", parseEntrada("1..2").ok === false);
conferir("rejeita '12abc'", parseEntrada("12abc").ok === false);

console.log("\n" + (total - falhas) + "/" + total + " verificações passaram.");
process.exit(falhas === 0 ? 0 : 1);
