<script setup lang="ts">
import { getInfo } from '@/api/modules/site'
import DataCard from './components/DataCard.vue'
import ArticleData from './components/ArticleData.vue'
import ArticleDetail from './components/ArticleDetail.vue'

let loading = ref(true)
let info = ref({
  articleCount: 0,
  tagCount: 0,
  categoryCount: 0,
  commentCount: 0,
})

async function getInitData() {
  const res = await getInfo()
  info.value = res.data
}

onMounted(() => {
  getInitData().then(() => {
    loading.value = false
  })
})
</script>

<template>
  <div class="dashboard-wrapper" font-mono>
    <el-row :gutter="20">
      <el-col :span="6"
        ><data-card
          title="文章数目"
          :value="info.articleCount"
          :loading="loading"
        ></data-card
      ></el-col>
      <el-col :span="6"
        ><data-card
          title="标签数目"
          :value="info.commentCount"
          :loading="loading"
        >
          <el-icon size="40" color="purple">
            <CollectionTag />
          </el-icon> </data-card
      ></el-col>
      <el-col :span="6"
        ><data-card
          title="分类数目"
          :value="info.categoryCount"
          :loading="loading"
        >
          <el-icon size="40" color="blue">
            <Folder />
          </el-icon> </data-card
      ></el-col>
      <el-col :span="6"
        ><data-card
          title="评论数目"
          :value="info.commentCount"
          :loading="loading"
        >
          <el-icon size="40" color="seagreen">
            <Comment />
          </el-icon> </data-card
      ></el-col>
    </el-row>
    <article-data mt-4></article-data>
    <article-detail mt-4></article-detail>
  </div>
</template>

<style scoped></style>
