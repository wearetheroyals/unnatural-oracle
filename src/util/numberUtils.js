/**
 * constrainNumberToRange
 * @param num       Number      The number to be evaluated
 * @param min       Number      The smallest permitted value
 * @param max       Number      The largest permitted value
 * @param strict    Boolean     @default false
 *                  if TRUE:    If @num is < @min or > @max, throw RangeError
 *                  if FALSE:   If @num is < @min, @return @min
 *                              If @num is > @max, @return @max
 * @returns Number
 * @throws  RangeError  If @strict is true and @num is > @max or < @min
 */
export const constrainNumberToRange = (num, min, max, strict = true) => {
  const result = Math.min(Math.max(num, min), max);
  if (!strict && result !== num) {
    throw new RangeError();
  }
  return result;
};
