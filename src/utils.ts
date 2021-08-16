/**
 * Creates an empty array of specified length and fills it with `undefined`.
 *
 * Regular Array API creates array with 6 `empty` slots which can not be mapped until `.fill` is
 * called on it.
 */
export const createArray = (length: number) =>
  new Array(length).fill(undefined);
