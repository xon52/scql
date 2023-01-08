import { Inspection, Template } from '@/types/types'
import { Ref, ref } from 'vue'
import { save as saveTemplate } from './templateStore'
import { save as saveInspection } from './inspectionStore'
import { getTemplateFromJson } from '@/types/Template'

export const draft: Ref<string | undefined> = ref()
export const original: Ref<string | undefined> = ref()
export const type: Ref<'inspection' | 'template' | undefined> = ref()

export const clear = () => {
  draft.value = undefined
  original.value = undefined
  type.value = undefined
}

export const editTemplate = (template: Template) => edit('template', template)
export const editInspection = (inspection: Inspection) => edit('inspection', inspection)

const edit = (editType: 'template' | 'inspection', target: Template | Inspection) => {
  clear()
  draft.value = JSON.stringify(target, undefined, 2)
  original.value = JSON.stringify(target)
  type.value = editType
}

export const reset = () => (draft.value = original.value)

export const save = () => {
  if (!draft.value) throw new Error('Failed to save undefined.')
  if (type.value === 'inspection') saveInspection(JSON.parse(draft.value))
  else if (type.value === 'template') saveTemplate(JSON.parse(draft.value))
}

export const check = () => {
  try {
    if (!draft.value) throw new Error('Failed to check undefined.')
    if (type.value === 'template') getTemplateFromJson(draft.value)
    // else if (type.value === 'template') getTemplateFromJson(draft.value)
    return true
  } catch (error: unknown) {
    return (error as Error).message
  }
}

export const checkTemplateWarnings = () => {
  if (!draft.value) throw new Error('Failed to check warnings of undefined.')
  if (type.value !== 'template') throw new Error(`Cannot check template warnings on type "${type.value}".`)

  const originalTemplate = original.value ? getTemplateFromJson(original.value) : undefined
  const draftTemplate = getTemplateFromJson(draft.value)

  if (originalTemplate) {
    if (originalTemplate.id !== draftTemplate.id) return 'You have changed the template id.'
    if (originalTemplate.version !== draftTemplate.version) return 'Changing the version will have no affect.'
    if (originalTemplate.modified !== draftTemplate.modified) return 'Changing the modified date will have no affect.'
  }
  return true
}
