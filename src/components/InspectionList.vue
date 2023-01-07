<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title> Inspections </v-toolbar-title>
    </v-toolbar>
    <VList density="compact" v-model:selected="selected" @update:selected="select" height="200">
      <v-list-item
        v-for="item in inspections"
        :key="`${item.id}.${item.version}`"
        :title="item.title ? item.title : 'Unnamned'"
        :subtitle="`ID: ${item.id} - v${item.version}`"
        @click=""
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="blue" icon="mdi-text-box-check-outline"></v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn color="green" variant="tonal">
            Share
            <v-icon size="x-large">mdi-share-outline</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </VList>
  </v-card>
</template>

<script setup lang="ts">
import { inspections } from '@/store/inspectionStore'
import { Inspection } from '@/types/types'
import { Ref, ref } from 'vue'

const selected: Ref<Inspection[]> = ref([])
const select = (e: any) => console.log('Inspection List Updated', e[0])
</script>

<style lang="scss" scoped></style>
