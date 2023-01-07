import { TemplateType } from '@/types/types'
import { Ref, ref, computed } from 'vue'

export const inspections: Ref<TemplateType[]> = ref([])

export const load = () => {
  throw new Error('Not implemented')
}

export const save = (template: TemplateType) => {
  const index = inspections.value.findIndex((e) => e.id === template.id)
  if (index === -1) inspections.value.push(template)
  else inspections.value.splice(index, 1, template)
}
