import { Ref, ref } from 'vue'

export const darkTheme = ref(!!globalThis.matchMedia('(prefers-color-scheme: dark)'))
