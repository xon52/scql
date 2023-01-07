import { checkType } from '@/helpers'
import { v4 as uuid } from 'uuid'
import { Question } from './QuestionClass'

export class Template {
  id: string
  version: string
  modified: number
  title: string
  questions: Question[]

  constructor(template?: Template) {
    const copy = template ? JSON.parse(JSON.stringify(template)) : undefined
    this.id = copy ? copy.id : uuid()
    this.version = uuid()
    this.modified = Date.now()
    this.title = copy ? copy.title : 'Unnamed Template'
    this.questions = copy ? copy.questions : []
  }

  updateFromJson(json: string) {
    // Parse incoming JSON
    const parsed = JSON.parse(json)
    // Check has changed
    const isIdentical = JSON.stringify(this) === JSON.stringify(parsed)
    if (isIdentical) throw new Error('No changes detected updating template')
    // Check Title
    const isTitleValid = checkType(parsed.title, 'string', 1)
    if (!isTitleValid) throw new Error('Template title cannot be empty')
    // Check Questions
    const isQuestionsValid =
      Array.isArray(parsed.questions) && parsed.questions.every((e: unknown) => e instanceof Question)
    if (!isQuestionsValid) {
      console.log(
        'here',
        parsed.questions.map((e) => e instanceof Question)
      )
      throw new Error('Invalid questions')
    }
    // Update
    this.version = uuid()
    this.modified = Date.now()
    this.title = parsed.title
    this.questions = parsed.questions
  }
}
