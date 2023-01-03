import { ScriptType } from '@/types/scriptTypes'
import { Ref, ref, computed } from 'vue'
import exampleScripts from '@/assets/example.json'

const _scripts: Ref<ScriptType[]> = ref([])
const _selectedIndex = ref(-1)

export const getSelectedScript = () => _scripts.value[_selectedIndex.value]
export const getScripts = () => _scripts

export const loadScripts = () => (_scripts.value = exampleScripts)

export const selectScript = (script: ScriptType) =>
  (_selectedIndex.value = _scripts.value.findIndex((e) => e.id === script.id))
export const updateScript = (script: ScriptType) => _scripts.value.splice(_selectedIndex.value, 1, script)
export const addScript = (script: ScriptType) => {
  _scripts.value.push(script)
  _selectedIndex.value = _scripts.value.length - 1
}
