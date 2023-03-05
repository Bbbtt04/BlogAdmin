<script lang="tsx" setup>
defineProps<{ column: any }>()

const renderLoop = (item: any) => {
  return (
    <>
      <el-table-column
        {...item}
        align = {item.align ?? 'center'}
      >
      {{
        default: (scope: any) => {
          if (item.render)
            return item.render(scope)
          return scope
        },
      }}
      </el-table-column>
    </>
  )
}
</script>

<template>
  <component :is="renderLoop(column)" />
</template>
