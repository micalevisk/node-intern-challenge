const router = require('express').Router();

/**
 * Calcula o fatorial de um número natural.
 * Se o número passado não for um inteiro positivo,
 * o erro `RangeError` é lançado.
 * @param {number} n O número alvo da computação.
 * @returns {number} O fatorial de `n`.
 */
const fat = (function fat() {
  const valoresComputados = {0:1, 1:1}; // cache
  return calcFatComMemoizacao;

  function calcFatComMemoizacao(n) {
    if (n < 0 || !Number.isInteger(n)) {
      throw RangeError(`O valor passado ('${n}') é negativo ou não inteiro.`);
    }

    return (valoresComputados[n])
         ? valoresComputados[n]
         : valoresComputados[n] = n * calcFatComMemoizacao(n - 1);
  }
}());

router.post('/fat', (req, res) => {
  const {n} = req.body;

  if (!n) {
    res.sendStatus(400);
  }

  res.json({result: fat(n)});
});

module.exports = router;
