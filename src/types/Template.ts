import { Question } from './Question'

export interface Template {
  id: string
  version: string
  modified: number
  title: string
  questions: Question[]
}
