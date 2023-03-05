<script setup lang="ts">
import usePublic from './usePublic'
import { addArticle, getArticleDetail } from '@/api/modules/article'
import { getCategoryList } from '@/api/modules/category'
import { getTagList } from '@/api/modules/tags'

const show = ref(false)
const tagsOption = ref()
const categoryOption = ref()
const router = useRouter()
const route = useRoute()
const { id } = route.query

// 文章发布逻辑
const { article } = usePublic(show)

// 提交
const publicClick = () => {
  if (!article.value.title) {
    ElMessage.warning('标题不能为空')
    return
  }
  if (!article.value.content) {
    ElMessage.warning('内容不能为空')
    return
  }
  show.value = true
}

// 获取tag和category
const fetchState = async () => {
  const [tagRes, categoryRes] = await Promise.all([
    getTagList(),
    getCategoryList(),
  ])

  tagsOption.value = tagRes.data.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
  categoryOption.value = categoryRes.data.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    }
  })
}

const submit = async () => {
  addArticle(article.value)
    .then((_res) => {
      console.log(_res)

      ElMessage.success('发布成功')
      show.value = false
      router.back()
    })
    .catch((_err) => {
      ElMessage.error('发布失败')
    })
}

onMounted(async () => {
  if (id) {
    // 获取文章详情
    const data = await getArticleDetail(id)
    article.value = data.data
  }
  // 获取tag和category
  fetchState()
})
</script>

<template>
  <div>
    <!-- header -->
    <el-row :gutter="20" mb-2>
      <el-col :span="10">
        <el-input
          v-model="article.title"
          placeholder="请输入文章标题"
          size="large"
        />
      </el-col>
      <el-col :span="4">
        <el-button size="large" type="primary" @click="publicClick">
          发布
        </el-button>
      </el-col>
    </el-row>
    <!-- 编辑器 -->
    <MarkDown v-model:text="article.content" />
    <!-- 发布Drawer -->
    <el-drawer v-model="show" width="45%" title="发布文章">
      <!-- content -->
      <el-form :model="article">
        <!-- <el-form-item label="文章封面" prop="cover">
        <el-upload
          action=""
          :show-file-list="false"
          :limit="1"
        >
          <img v-if="article.cover" :src="article.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item> -->
        <el-form-item label="编辑摘要">
          <el-input v-model="article.outline" />
        </el-form-item>
        <el-form-item label="添加分类">
          <el-select v-model="article.categoryId" placeholder="请选择分类">
            <el-option
              v-for="item in categoryOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="添加标签">
          <el-select v-model="article.tagsId" placeholder="请选择标签" multiple>
            <el-option
              v-for="item in tagsOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch v-model="article.isTop" />
        </el-form-item>
      </el-form>
      <!-- footer -->
      <template #footer>
        <el-button size="large" @click="show = false"> 取消 </el-button>
        <el-button type="primary" size="large" @click="submit">
          发布
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>
