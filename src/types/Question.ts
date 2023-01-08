import { checkType } from '@/helpers'

export interface Question {
  name: string
  label: string
  type: string
  initial?: string | number
  required?: boolean
  readonly?: boolean
}

export const getQuestionFromJson = (json: string): Question => {
  const parsed = JSON.parse(json)

  const isNameValid = checkType(parsed.name, 'string', 1)
  if (!isNameValid) throw new Error('Invalid question name.')
  const isLabelValid = checkType(parsed.label, 'string', 1)
  if (!isLabelValid) throw new Error('Invalid question label')
  const isTypeValid = checkType(parsed.type, 'string', 1)
  if (!isTypeValid) throw new Error('Invalid question type')
  const isInitialValid =
    parsed.initial === undefined || checkType(parsed.initial, 'string', 1) || checkType(parsed.initial, 'number')
  if (!isInitialValid) throw new Error('Invalid question initial value')
  const isRequiredValid = parsed.required === undefined || checkType(parsed.required, 'boolean')
  if (!isRequiredValid) throw new Error('Invalid question required')
  const isReadonlyValid = parsed.readonly === undefined || checkType(parsed.readonly, 'boolean')
  if (!isReadonlyValid) throw new Error('Invalid question readonly')

  return parsed
}
