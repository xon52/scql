import { Template } from '@/types/types'
import { Ref, ref, computed } from 'vue'
import exampleTemplates from '@/assets/example.json'

export const templates: Ref<Template[]> = ref([])

export const load = () =>
  exampleTemplates.forEach((json) => {
    const temp = new Template()
    temp.updateFromJson(JSON.stringify(json))
    templates.value.push(temp)
  })

export const save = (template: Template) => {
  const index = templates.value.findIndex((e) => e.id === template.id)
  if (index === -1) templates.value.push(template)
  else templates.value.splice(index, 1, template)
}
