<template>
  <v-app :theme="darkTheme ? 'dark' : 'light'">
    <v-app-bar color="grey-lighten-2">
      <template #append>
        <v-btn :icon="darkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'" @click="toggleTheme"> </v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row no-gutters>
          <v-col :cols="4">
            <TemplateListVue />
            <hr />
            <InspectionListVue />
          </v-col>

          <v-col :cols="7" :offset="1">
            <TemplateEditorVue />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { darkTheme } from '@/store/appStore'
import { onMounted } from 'vue'
import EditorVue from './components/Editor.vue'
import InspectionListVue from './components/InspectionList.vue'
import InterpreterVue from './components/Interpreter.vue'
import TemplateEditorVue from './components/templateEditor/TemplateEditor.vue'
import TemplateListVue from './components/TemplateList.vue'
import { loadExamples } from './store/templateStore'

const toggleTheme = () => (darkTheme.value = !darkTheme.value)

onMounted(() => loadExamples())
</script>
