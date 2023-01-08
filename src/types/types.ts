import { v4 as uuid } from 'uuid'
import { Template } from './Template'
import { Question } from './Question'

export type { Template, Question }

export class Inspection {
  id: string
  template_id: string
  template_version: string
  answers: AnswerType[]

  constructor(template: Template) {
    this.id = uuid()
    this.template_id = template.id
    this.template_version = template.version
    this.answers = []
  }
}

export interface AnswerType {
  name: string
  value: string | number
}
