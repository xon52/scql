<template>
  <v-card v-if="selected">
    <JsonEditorVue :target="selected" @save="saveJson" @cancel="cancel" />
  </v-card>
</template>

<script setup lang="ts">
import { Template } from '@/types/types'
import { computed, Ref, ref, watch } from 'vue'
import { selected, clear, save } from '@/store/templateStore'
import JsonEditorVue from './JsonEditor.vue'

const saveJson = (json: string) => {
  save(json)
}

const cancel = () => {
  clear()
}
</script>

<style lang="scss" scoped></style>
