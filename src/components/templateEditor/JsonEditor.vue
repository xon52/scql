<template>
  <v-card>
    <v-card-text>
      <v-textarea v-model="json" :rows="20" :rules="[validate]" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="save" color="success" variant="elevated" :disabled="hasError">Save</v-btn>
      <v-btn @click="cancel" color="grey" variant="tonal">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Template } from '@/types/types'
import { computed, Ref, ref, watch, PropType } from 'vue'
import { check } from '@/store/templateStore'

const props = defineProps({
  target: { type: Object as PropType<Template>, required: true },
})

const emit = defineEmits<{
  (e: 'save', json: string): void
  (e: 'cancel'): void
}>()

const json = ref('')

const validate = (v: string) => check(v)

const hasError = computed(() => validate(json.value) !== true)

const save = () => {
  if (!hasError.value) emit('save', json.value)
}

const cancel = () => {
  emit('cancel')
}

watch(
  () => props.target,
  (newVal) => {
    json.value = JSON.stringify(newVal, null, 2)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
