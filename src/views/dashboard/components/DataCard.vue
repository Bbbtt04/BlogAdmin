<template>
  <el-card>
    <template #header>
      <span class="title font-semibold" v-if="!props.loading">{{ title }}</span>
    </template>
    <div class="fbc h-16">
      <el-skeleton row="5" animated v-if="props.loading"></el-skeleton>
      <count-to :end-val="props.value" v-else></count-to>
      <slot v-if="!props.loading">
        <el-icon :size="40">
          <Edit />
        </el-icon>
      </slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  value: {
    type: Number,
    default: '0',
  },
  loading: {
    type: Boolean,
  },
})
</script>

<style scoped></style>
