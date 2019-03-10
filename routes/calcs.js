const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');

/**
 * Calcula o fatorial de um número natural.
 * Não valida o valor passado.
 * @param {number} n O número alvo da computação.
 * @returns {number} O fatorial de `n`.
 */
const fat = (function fat() {
  const valoresComputados = {0:1, 1:1}; // cache
  return calcFatComMemoizacao;

  function calcFatComMemoizacao(n) {
    return (valoresComputados[n])
         ? valoresComputados[n]
         : valoresComputados[n] = n * calcFatComMemoizacao(n - 1);
  }
}());

/**
 * Calcula o fibonacci (com sementes 0 e 1) de um número natural.
 * Se o número passado não for um inteiro positivo,
 * o erro `RangeError` é lançado.
 * @param {number} n O número alvo da computação.
 * @returns {number} O n-ésimo número da sequência de Fibonacci.
 */
function fib(n) {
  if (n < 0 || !Number.isInteger(n)) {
    throw RangeError(`O valor passado ('${n}') é negativo ou não inteiro.`);
  }

  let anterior = 0, corrente = 1;
  for (let i=1; i < n; ++i)
    [
      corrente,
      anterior
    ] = [
      corrente + anterior,
      corrente
    ];

  return corrente;
}


router.post('/fat', [
  check('n')
    .isInt({ max: 170 })
    .withMessage(`O número deve ser um natural menor ou igual a 170`)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { n } = req.body;
  res.json({result: fat(n)});
});

router.post('/fib', [
  check('n')
    .isInt({ max: 1476 })
    .withMessage(`O número deve ser um natural menor ou igual a 1476`)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { n } = req.body;
  res.json({result: fib(n)});
});


module.exports = router;
