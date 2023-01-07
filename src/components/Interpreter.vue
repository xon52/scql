<template>
  <v-sheet>
    <v-card v-if="selectedScript">
      <VCardTitle>{{ selectedScript?.title ? selectedScript.title : 'Unnamed Template' }}</VCardTitle>
      <VCardSubtitle></VCardSubtitle>
      <VCardText>
        <QuestionVue v-for="question in selectedScript.questions" :question="question" @change="updateAnswer" />
      </VCardText>
      <VCardActions>
        <v-btn color="error"> Cancel </v-btn>
        <v-btn color="success" @click="submit"> Submit </v-btn>
      </VCardActions>
      <VCardText>
        {{ answers }}
      </VCardText>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { selectedScript } from '@/store/templateStore'
import { onMounted, ref, Ref, watch } from 'vue'
import QuestionVue from './Question.vue'

const answers: Ref<Record<string, string | number>> = ref({})

watch(selectedScript, (val) => {
  answers.value = {}
  val.questions.forEach((q) => (answers.value[q.name] = q.value))
})

const updateAnswer = (key: string, value: string | number) => (answers.value[key] = value)

const submit = () => {
  console.log(selectedScript.value)
  console.log(selectedScript.value)
}
</script>
