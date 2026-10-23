/* ==========================================================
   Laboratório Interativo de Algoritmos de Ordenação
   Disciplina: Estrutura de Dados

   Este arquivo tem duas partes:
   1) LÓGICA PURA (sem DOM): leitura da entrada e algoritmos.
   2) INTERFACE: lê o formulário e mostra os resultados.

   Os algoritmos NÃO usam Array.prototype.sort().
   ========================================================== */

/* ----------------------------------------------------------
   PARTE 1: LÓGICA
   ---------------------------------------------------------- */

/**
 * Converte o texto digitado em um vetor de números.
 * Aceita separação por vírgulas e/ou espaços.
 * Retorna { ok: true, numeros } ou { ok: false, erro }.
 */
function parseEntrada(texto) {
    const bruto = String(texto == null ? "" : texto).trim();

    if (bruto === "") {
        return { ok: false, vazio: true, erro: "Digite ao menos um número para ordenar." };
    }

    // Separa por qualquer combinação de vírgulas e espaços em branco
    const partes = bruto.split(/[,\s]+/).filter((p) => p !== "");

    if (partes.length === 0) {
        return { ok: false, vazio: true, erro: "Digite ao menos um número para ordenar." };
    }

    const numeros = [];
    for (const parte of partes) {
        // Aceita inteiros e decimais com ponto, com sinal opcional: -5, +3, 2.5
        if (!/^[-+]?\d+(\.\d+)?$/.test(parte)) {
            return {
                ok: false,
                erro: 'Valor inválido: "' + parte + '". Use apenas números separados por vírgula ou espaço (decimais com ponto).',
            };
        }
        numeros.push(Number(parte));
    }

    return { ok: true, numeros };
}

/**
 * Decide se "a" deve vir DEPOIS de "b" na ordem escolhida.
 * Crescente: a vem depois de b quando a > b.
 * Decrescente: a vem depois de b quando a < b.
 * Usa comparação estrita, então valores iguais nunca são trocados
 * (isso mantém a estabilidade no Bubble e no Insertion Sort).
 */
function veioDepois(a, b, crescente) {
    return crescente ? a > b : a < b;
}

/** Cria o objeto de resposta padrão dos algoritmos. */
function novoRegistro(vetor) {
    return {
        resultado: vetor,
        passos: [],
        comparacoes: 0,
        trocas: 0,
    };
}

/* ---------------- BUBBLE SORT ----------------
   Compara pares vizinhos; se estão fora de ordem, troca.
   A cada passagem completa, o último elemento da parte
   não ordenada já está na posição final.
   Se uma passagem inteira não trocar nada, já está ordenado.
   ---------------------------------------------- */
function bubbleSort(entrada, crescente = true) {
    const v = entrada.slice(); // cópia: não altera o vetor original
    const reg = novoRegistro(v);
    const n = v.length;

    for (let i = 0; i < n - 1; i++) {
        let trocou = false;

        // O fim do vetor (n - i) já está ordenado
        for (let j = 0; j < n - 1 - i; j++) {
            reg.comparacoes++;
            const fora = veioDepois(v[j], v[j + 1], crescente);
            reg.passos.push({
                tipo: "comparar",
                texto: "Compara " + v[j] + " (pos. " + j + ") com " + v[j + 1] + " (pos. " + (j + 1) + ")" + (fora ? ": fora de ordem." : ": já em ordem."),
                indices: [j, j + 1],
                vetor: v.slice(),
            });

            if (fora) {
                // Troca (swap) usando variável auxiliar
                const aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
                trocou = true;
                reg.trocas++;
                reg.passos.push({
                    tipo: "trocar",
                    texto: "Troca as posições " + j + " e " + (j + 1) + ".",
                    indices: [j, j + 1],
                    vetor: v.slice(),
                });
            }
        }

        // Parada antecipada: nenhuma troca significa vetor ordenado
        if (!trocou) break;
    }

    return reg;
}

/* ---------------- SELECTION SORT ----------------
   A cada passagem, procura o menor (ou maior) elemento da
   parte não ordenada e o leva para a posição "i".
   ------------------------------------------------ */
function selectionSort(entrada, crescente = true) {
    const v = entrada.slice();
    const reg = novoRegistro(v);
    const n = v.length;

    for (let i = 0; i < n - 1; i++) {
        let alvo = i; // posição do menor (ou maior) encontrado até agora

        for (let j = i + 1; j < n; j++) {
            reg.comparacoes++;
            // v[alvo] vem depois de v[j]? Então v[j] é melhor candidato.
            const melhor = veioDepois(v[alvo], v[j], crescente);
            reg.passos.push({
                tipo: "comparar",
                texto: "Compara " + v[j] + " (pos. " + j + ") com o candidato " + v[alvo] + " (pos. " + alvo + ")" + (melhor ? ": novo candidato." : ": mantém o candidato."),
                indices: [alvo, j],
                vetor: v.slice(),
            });
            if (melhor) alvo = j;
        }

        if (alvo !== i) {
            const aux = v[i];
            v[i] = v[alvo];
            v[alvo] = aux;
            reg.trocas++;
            reg.passos.push({
                tipo: "trocar",
                texto: "Troca a posição " + i + " com a posição " + alvo + " (leva " + v[i] + " para o lugar certo).",
                indices: [i, alvo],
                vetor: v.slice(),
            });
        }
    }

    return reg;
}

/* ---------------- INSERTION SORT ----------------
   Mantém uma sublista ordenada à esquerda. Pega o próximo
   elemento ("chave") e desloca para a direita os que vêm
   depois dele, até achar o lugar certo da chave.
   ------------------------------------------------ */
function insertionSort(entrada, crescente = true) {
    const v = entrada.slice();
    const reg = novoRegistro(v);
    const n = v.length;

    for (let i = 1; i < n; i++) {
        const chave = v[i];
        let j = i - 1;

        // Enquanto o elemento à esquerda vier depois da chave, desloca
        while (j >= 0) {
            reg.comparacoes++;
            const desloca = veioDepois(v[j], chave, crescente);
            reg.passos.push({
                tipo: "comparar",
                texto: "Compara a chave " + chave + " com " + v[j] + " (pos. " + j + ")" + (desloca ? ": desloca " + v[j] + " para a direita." : ": achou o lugar da chave."),
                indices: [j, j + 1],
                vetor: v.slice(),
            });

            if (!desloca) break;

            v[j + 1] = v[j]; // deslocamento
            reg.trocas++;
            j--;
        }

        // Só registra a inserção se a chave mudou de posição
        if (j + 1 !== i) {
            v[j + 1] = chave;
            reg.passos.push({
                tipo: "inserir",
                texto: "Insere a chave " + chave + " na posição " + (j + 1) + ".",
                indices: [j + 1],
                vetor: v.slice(),
            });
        }
    }

    return reg;
}

/** Tabela de algoritmos disponíveis (usada pelo seletor e pelos testes). */
const ALGORITMOS = {
    bubble: { nome: "Bubble Sort", funcao: bubbleSort, medeTrocas: "trocas" },
    selection: { nome: "Selection Sort", funcao: selectionSort, medeTrocas: "trocas" },
    insertion: { nome: "Insertion Sort", funcao: insertionSort, medeTrocas: "deslocamentos" },
};

/* Exporta para os testes em Node (no navegador isso é ignorado) */
if (typeof module !== "undefined" && module.exports) {
    module.exports = { parseEntrada, bubbleSort, selectionSort, insertionSort, ALGORITMOS };
}

/* ----------------------------------------------------------
   PARTE 2: INTERFACE (só roda no navegador)
   ---------------------------------------------------------- */
if (typeof document !== "undefined") {
    const MAX_PASSOS_NA_TELA = 500;

    const form = document.getElementById("formulario");
    const campoEntrada = document.getElementById("entrada");
    const campoAlgoritmo = document.getElementById("algoritmo");
    const campoErro = document.getElementById("erro");
    const areaResultado = document.getElementById("resultado");
    const saidaOriginal = document.getElementById("saida-original");
    const saidaOrdenada = document.getElementById("saida-ordenada");
    const rotuloOrdenada = document.getElementById("rotulo-ordenada");
    const resumo = document.getElementById("resumo");
    const listaPassos = document.getElementById("passos");
    const avisoPassos = document.getElementById("aviso-passos");
    const botaoLimpar = document.getElementById("limpar");

    function mostrarErro(mensagem) {
        campoErro.textContent = mensagem;
        campoErro.hidden = false;
        areaResultado.hidden = true;
    }

    function esconderErro() {
        campoErro.textContent = "";
        campoErro.hidden = true;
    }

    /** Monta a representação visual de um vetor (cada número em uma "pílula"). */
    function desenharVetor(vetor, indicesDestaque, tipo) {
        const frag = document.createDocumentFragment();
        vetor.forEach((valor, pos) => {
            const el = document.createElement("span");
            el.className = "num";
            if (indicesDestaque && indicesDestaque.indexOf(pos) !== -1) {
                el.classList.add("destaque-" + tipo);
            }
            el.textContent = valor;
            frag.appendChild(el);
        });
        return frag;
    }

    function mostrarPassos(passos) {
        listaPassos.innerHTML = "";
        avisoPassos.hidden = true;

        if (passos.length === 0) {
            const li = document.createElement("li");
            li.className = "passo";
            li.textContent = "Nenhum passo foi necessário: com um único elemento o vetor já está ordenado.";
            listaPassos.appendChild(li);
            return;
        }

        const visiveis = passos.slice(0, MAX_PASSOS_NA_TELA);
        visiveis.forEach((passo) => {
            const li = document.createElement("li");
            li.className = "passo passo-" + passo.tipo;

            const texto = document.createElement("p");
            texto.className = "passo-texto";
            texto.textContent = passo.texto;

            const vetor = document.createElement("div");
            vetor.className = "vetor";
            vetor.appendChild(desenharVetor(passo.vetor, passo.indices, passo.tipo));

            li.appendChild(texto);
            li.appendChild(vetor);
            listaPassos.appendChild(li);
        });

        if (passos.length > MAX_PASSOS_NA_TELA) {
            avisoPassos.textContent = "Mostrando os primeiros " + MAX_PASSOS_NA_TELA + " de " + passos.length + " passos.";
            avisoPassos.hidden = false;
        }
    }

    function ordenar(evento) {
        evento.preventDefault(); // evita recarregar a página
        esconderErro();

        const leitura = parseEntrada(campoEntrada.value);
        if (!leitura.ok) {
            mostrarErro(leitura.erro);
            return;
        }

        const sentido = form.elements["sentido"].value; // "crescente" ou "decrescente"
        const crescente = sentido === "crescente";
        const algoritmo = ALGORITMOS[campoAlgoritmo.value];
        const reg = algoritmo.funcao(leitura.numeros, crescente);

        saidaOriginal.innerHTML = "";
        saidaOriginal.appendChild(desenharVetor(leitura.numeros));
        saidaOrdenada.innerHTML = "";
        saidaOrdenada.appendChild(desenharVetor(reg.resultado));
        rotuloOrdenada.textContent = "Ordenada (" + sentido + ")";

        resumo.textContent =
            algoritmo.nome + " · " + leitura.numeros.length + " elemento(s) · " +
            reg.comparacoes + " comparações · " + reg.trocas + " " + algoritmo.medeTrocas;

        mostrarPassos(reg.passos);
        areaResultado.hidden = false;
    }

    function limpar() {
        form.reset();
        esconderErro();
        areaResultado.hidden = true;
        campoEntrada.focus();
    }

    form.addEventListener("submit", ordenar);
    botaoLimpar.addEventListener("click", limpar);
}
