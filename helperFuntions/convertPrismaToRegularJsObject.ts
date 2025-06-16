export function converToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
