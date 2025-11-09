export function trimStrings<T extends Record<keyof T, string>>(obj: T): T {
  const result: Partial<T> = {};

  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    result[key] = obj[key].trim() as T[typeof key]; // <- cast ovde
  });

  return result as T;
}
