<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title> Inspection Templates </v-toolbar-title>
      <template v-slot:append>
        <v-btn size="small" variant="flat" class="mr-3"> Create new </v-btn>
        <v-tooltip text="Click on a Template to edit it, or click on start to start it 😊">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" color="blue-lighten-2" size="large">mdi-help-circle</v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-toolbar>
    <VList density="compact" v-model:selected="selected" height="200">
      <v-list-item
        v-for="item in templates"
        :key="`${item.id}.${item.version}`"
        :title="item.title ? item.title : 'Unnamned'"
        :subtitle="getModified(item.modified)"
        @click="edit(item)"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="blue" icon="mdi-text-box-check-outline"></v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn color="green" variant="tonal" @click.stop="start">
            Start
            <v-icon size="x-large">mdi-play-outline</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </VList>
  </v-card>
</template>

<script setup lang="ts">
import { templates } from '@/store/templateStore'
import * as editor from '@/store/editorStore'
import { Template } from '@/types/types'
import { Ref, ref } from 'vue'
import dayjs from 'dayjs'

const selected: Ref<Template[]> = ref([])
const edit = (template: Template) => editor.editTemplate(template)
const start = () => {
  throw new Error('Not implemented')
}
const getModified = (timestamp: number) => dayjs(timestamp).format('D MMM YYYY - HH:mm')
</script>

<style lang="scss" scoped></style>
