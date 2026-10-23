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
