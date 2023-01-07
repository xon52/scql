export class Question {
  name: string
  label: string
  type: string
  initial?: string | number
  required?: boolean
  readonly?: boolean

  constructor(
    name: string,
    label: string,
    type: string,
    initial?: string | number,
    required?: boolean,
    readonly?: boolean
  ) {
    this.name = name
    this.label = label
    this.type = type
    this.initial = initial
    this.required = required
    this.readonly = readonly
  }
}
