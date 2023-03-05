<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:text'])

const mdText = computed({
  get() {
    return props.text
  },
  set(value) {
    emit('update:text', value)
  },
})
</script>

<template>
  <v-md-editor
    v-model="mdText"
    height="80vh"
    left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code | save"
  />
</template>
