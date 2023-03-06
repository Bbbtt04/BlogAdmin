<script setup>
const { initTheme } = useTheme()
onMounted(() => {
  initTheme()
})
</script>

<template>
  <RouterView />
</template>
