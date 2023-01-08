<template>
  <v-card v-if="draft">
    <v-card-text>
      <v-textarea v-model="draft" :rows="20" :rules="[validate]" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="save" color="success" variant="elevated" :disabled="hasError">Save</v-btn>
      <v-btn @click="clear" color="grey" variant="tonal">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Template, Inspection } from '@/types/types'
import { computed, Ref, ref, watch } from 'vue'
import { draft, clear, reset, save, check } from '@/store/editorStore'

const error: Ref<string | undefined> = ref()

const validate = (v: any) => check()

const hasError = computed(() => validate(draft.value) !== true)
</script>

<style lang="scss" scoped></style>
