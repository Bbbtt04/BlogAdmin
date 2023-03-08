<script setup>
// 自定义主题 
import { useTheme } from '@/hooks/useTheme'
const { initTheme } = useTheme()
initTheme()
</script>

<template>
  <RouterView />
</template>
