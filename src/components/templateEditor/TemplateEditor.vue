<template>
  <v-card v-if="selected">
    <v-card-title>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="jsonMode" color="blue" mandatory divided>
          <v-tooltip text="Designer" location="left">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-pencil-ruler" :value="false" v-bind="props"></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="JSON" location="right">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-code-json" :value="true" v-bind="props"></v-btn>
            </template>
          </v-tooltip>
        </v-btn-toggle>
      </v-toolbar>
    </v-card-title>
    <JsonEditorVue v-if="jsonMode" :target="selected" @save="saveJson" @cancel="cancel" />
  </v-card>
</template>

<script setup lang="ts">
import { Template } from '@/types/types'
import { computed, Ref, ref, watch } from 'vue'
import { selected, clear, save } from '@/store/templateStore'
import JsonEditorVue from './JsonEditor.vue'

const jsonMode = ref(true)

const saveJson = (json: string) => {
  save(json)
}

const cancel = () => {
  clear()
}
</script>

<style lang="scss" scoped></style>
