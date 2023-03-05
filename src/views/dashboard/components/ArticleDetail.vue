<template>
  <div>
    <el-card>
      <template #header>
        <span>最近文章</span>
      </template>

      <div
        v-for="item in list"
        :key="item.id"
        p-3
        class="item"
        border-slate
        font-mono
      >
        <div font-semibold text-2xl># {{ item.title }}</div>
        <div mt-3 color-gray-400>
          {{ formatTime(item.createdAt) }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getArticleList } from '@/api/modules/article'
import { formatTime } from '@/utils'

const list: any = ref([])
onMounted(async () => {
  const data: any = await getArticleList({ pageSize: 5, sortBy: 'createdAt' })
  list.value = data.data.list
  console.log(list.value)
})
</script>

<style scoped>
.item {
  border-bottom: 1px solid #ebeef5;
}
</style>
