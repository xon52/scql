export interface ScriptType {
  id: number
  questions: QuestionType[]
}

export interface QuestionType {
  name: string
  label: string
  value: string | number
  type: string
}
