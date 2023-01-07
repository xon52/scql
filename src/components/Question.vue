<template>
  <VCardSubtitle>{{ question.label }}</VCardSubtitle>
  <v-card-text>
    <v-text-field v-if="question.type === 'text'" v-model="value" @update:model-value="change" />
    <v-text-field
      v-else-if="question.type === 'currency'"
      label="Amount"
      v-model="value"
      prefix="$"
      @update:model-value="change"
    />
    <v-text-field v-else v-model="value" @update:model-value="change" />
  </v-card-text>
</template>

<script setup lang="ts">
import { QuestionType } from '@/types/types'
import { ref, Ref } from 'vue'

const props = defineProps<{ question: QuestionType }>()
const emit = defineEmits<{
  (e: 'change', name: string, value: string | number): void
}>()

const value: Ref<string | number> = ref(props.question.value)
const change = () => emit('change', props.question.name, value.value)
</script>

<style lang="scss" scoped></style>
