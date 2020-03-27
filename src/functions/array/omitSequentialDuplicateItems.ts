/* Given an array, remove any item that is the same as the preceding item and return the result. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitSequentialDuplicateItems<T>(array: T[]): T[] {
  return array.reduce((uniqueArray, item) => {
    if (uniqueArray.slice(-1)[0] !== item) {
      uniqueArray.push(item);
    }
    return uniqueArray;
  }, [] as T[])
}