// @ts-check

/**
 * Wrapper para handlers de rotas assíncronos.
 * Assim, não será preciso inserir clásulas `try..catch`
 * nos handlers.
 * Evitando a verbosidade abaixo:
 * @example
 * try {
 *  //...
 * } catch (error) {
 *  next(error)
 * }
 */
exports.asyncHandler = fnHandler =>
  // eslint-disable-next-line no-console
  (req, res, next = console.error) => Promise.resolve(fnHandler(req, res)).catch(next);
