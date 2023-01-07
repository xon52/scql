<template>
  <v-card v-if="template">
    <v-text-field disabled label="ID">{{ template.id }}</v-text-field>
    <v-text-field disabled label="Version">{{ template.version }}</v-text-field>
    <v-text-field label="Title">{{ title }}</v-text-field>
    <v-textarea v-model="json" :rows="20" />
    <v-btn @click="save" :disabled="!canSave">{{ exists ? 'Save' : 'Add' }}</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { Template, Inspection } from '@/types/types'
import { computed, Ref, ref } from 'vue'
import * as editor from '@/store/editorStore'

const template = editor.template.value
const title = editor.template.value?.title
const json = JSON.stringify(template?.questions, undefined, 2)

const save = () => {
  editor.save()
}
const canSave = computed(() => {
  try {
    JSON.parse(tempScript.value)
    return true
  } catch (error) {
    return false
  }
})
</script>

<style lang="scss" scoped></style>
