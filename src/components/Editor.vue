<template>
  <v-container>
    <template v-if="scripts.length > 0">
      <v-select label="Select" :items="scripts" item-title="id" return-object @update:model-value="select" />
      <v-textarea v-model="selectedScript" :rows="20" />
      <v-btn @click="save" :disabled="!canSave">{{ exists ? 'Save' : 'Add' }}</v-btn>
    </template>
    <template v-else>
      <a href="#" @click="loadScripts">Load scripts</a>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { ScriptType } from '@/types/scriptTypes'
import { computed, Ref, ref } from 'vue'
import { getScripts, getSelectedScript, selectScript, updateScript, addScript, loadScripts } from '../store/scriptStore'

const scripts = getScripts()
const selectedScript = ref('')

const save = () => {
  if (exists.value) updateScript(JSON.parse(selectedScript.value))
  else addScript(JSON.parse(selectedScript.value))
}
const select = (s: ScriptType) => {
  selectScript(s)
  selectedScript.value = JSON.stringify(getSelectedScript(), undefined, 2)
}
const exists = computed(() => {
  try {
    const temp = JSON.parse(selectedScript.value)
    if (scripts.value.find((e) => e.id === temp.id)) return true
  } catch (error) {
    return false
  }
})
const canSave = computed(() => {
  try {
    JSON.parse(selectedScript.value)
    return true
  } catch (error) {
    return false
  }
})
</script>

<style lang="scss" scoped></style>
