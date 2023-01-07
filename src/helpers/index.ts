export const checkType = (input: unknown, type: 'string' | 'number' | 'boolean' | 'array', minLength?: number) => {
  switch (type) {
    case 'string':
      return typeof input === 'string' && (!minLength || input.length >= minLength)
    case 'number':
      return typeof input === 'number'
    case 'boolean':
      return typeof input === 'boolean'
    case 'array':
      return Array.isArray(input) && (!minLength || input.length >= minLength)
    default:
      throw new Error(`Unknown type "${type}" in checkType()`)
  }
}
