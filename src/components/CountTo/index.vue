<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'

const props = defineProps({
  startVal: {
    type: Number,
    default: 0,
  },
  endVal: {
    type: Number,
    default: 2023,
  },
})

const count = ref(props.startVal)
let output = useTransition(count, {
  duration: 1500,
  transition: TransitionPresets.easeInOutCirc,
})
onMounted(() => {
  count.value = props.endVal
})
</script>

<template>
  <div class="font-sans text-3xl">{{ Math.round(output) }}</div>
</template>
