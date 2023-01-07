import { Inspection, Template } from '@/types/types'
import { Ref, ref } from 'vue'
import { save as saveTemplate } from './templateStore'
import { save as saveInspection } from './inspectionStore'

export const inspection: Ref<Inspection | undefined> = ref()
export const template: Ref<Template | undefined> = ref()

export const cancel = () => {
  inspection.value = undefined
  template.value = undefined
}

export const edit = (type: 'template' | 'inspection', target: Template | Inspection) => {
  cancel()
  if (type === 'template') template.value = JSON.parse(JSON.stringify(target))
  else if (type === 'inspection') inspection.value = JSON.parse(JSON.stringify(target))
}

export const save = () => {
  if (inspection.value) saveInspection(inspection.value)
  else if (template.value) saveTemplate(template.value)
  else throw new Error('Failed to save undefined.')
}
