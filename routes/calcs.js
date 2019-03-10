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
 * Não valida o valor pasado.
 * o erro `RangeError` é lançado.
 * @param {number} n O número alvo da computação.
 * @returns {number} O n-ésimo número da sequência de Fibonacci.
 */
function fib(n) {
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

//#region [remove] middleware de verificação de parâmetros; válido deixar em um dir. `middlewares`
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};
//#endregion

router.post('/fat', [
  check('n')
    .isInt({ min: 0, max: 170 })
    .withMessage(`O número deve ser um natural menor ou igual a 170`),
  validateRequest,
], (req, res) => {
  const { n } = req.body;
  res.json({result: fat(n)});
});

router.post('/fib', [
  check('n')
    .isInt({ min: 0, max: 1476 })
    .withMessage(`O número deve ser um natural menor ou igual a 1476`),
  validateRequest,
], (req, res) => {
  const { n } = req.body;
  res.json({result: fib(n)});
});


module.exports = router;
