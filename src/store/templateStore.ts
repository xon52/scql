import { v4 as uuid } from 'uuid'
import { Ref, ref } from 'vue'

import { Template } from '@/types/types'
import { getQuestionFromJson } from '@/types/Question'
import { checkType } from '@/helpers'

import exampleTemplates from '@/assets/example.json'

export const templates: Ref<Template[]> = ref([])
export const selected: Ref<Template | undefined> = ref()

/**
 * Loads a pre-built set of Templates
 */
export const loadExamples = () => {
  exampleTemplates.forEach((json) => {
    const temp = convertFromJson(JSON.stringify(json))
    templates.value.push(temp)
  })
}

/**
 * Create a new and empty template
 * @returns the created template
 */
export const createTemplate = (): Template => ({
  id: uuid(),
  version: uuid(),
  modified: Date.now(),
  title: 'Unnamed Template',
  questions: [],
})

/**
 * Hold a template as selected
 * @param template to select
 */
export const select = (template: Template) => {
  clear()
  selected.value = template
}

/**
 * Clear any selected template
 */
export const clear = () => {
  selected.value = undefined
}

/**
 * Duplicates and Saves a given template
 * @param template as a Template or JSON
 */
export const save = (template: Template | string) => {
  const templateToSave: Template = typeof template === 'string' ? convertFromJson(template) : template
  const duplicatedTemplateToSave = duplicate(templateToSave)
  templates.value.push(duplicatedTemplateToSave)
}

/**
 * Attempts to turn a JSON string into a Template
 * @param json to parse
 * @returns the parsed template
 */
export const convertFromJson = (json: string): Template => {
  const parsed = JSON.parse(json)

  const isIdValid = checkType(parsed.id, 'string', 36)
  if (!isIdValid) throw new Error('Invalid template id.')
  const isVersionValid = checkType(parsed.version, 'string', 36)
  if (!isVersionValid) throw new Error('Invalid template version')
  const isModifiedValid = checkType(parsed.modified, 'timestamp')
  if (!isModifiedValid) throw new Error('Invalid modified timestamp')
  const isTitleValid = checkType(parsed.title, 'string', 1)
  if (!isTitleValid) throw new Error('Template title cannot be empty')
  const isQuestionsValid = checkType(parsed.questions, 'array')
  if (!isQuestionsValid) throw new Error('Invalid template questions')
  // Try turn questions into actual questions
  parsed.questions = parsed.questions.map((e: unknown) => getQuestionFromJson(JSON.stringify(e)))

  return parsed
}

/**
 * Checks if two templates are identical in values
 * @param a
 * @param b
 */
export const isIdential = (a: Template, b: Template) => {
  JSON.stringify(a) === JSON.stringify(b)
}

/**
 * Duplicates a template while also updating the
 * modified timestamp and setting a new version uuid
 * @param template
 * @returns
 */
export const duplicate = (template: Template): Template => {
  const copy = JSON.parse(JSON.stringify(template))
  copy.version = uuid()
  copy.modified = Date.now()
  return copy
}

/**
 * Attempts to convert a given json string to a Template
 * @param json
 * @returns True if ok, or a string if there was an error
 */
export const check = (json: string) => {
  try {
    convertFromJson(json)
    return true
  } catch (error: unknown) {
    return (error as Error).message
  }
}
