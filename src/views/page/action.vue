<script setup lang="ts">
import { createPage, getPage, updatePage } from '@/api/modules/page';

const show = ref(false)
const router = useRouter()
const route = useRoute()
const { id } = route.query

const page = ref({
  name: '',
  path: '',
  order: 0,
  isCommentOpen: true,
  content: ''
})

// 提交
const publicClick = () => {
  if (!page.value.name) {
    ElMessage.warning('标题不能为空')
    return
  }
  if (!page.value.content) {
    ElMessage.warning('内容不能为空')
    return
  }
  show.value = true
}

const submit = async () => {
  if(!id)
  createPage(page.value)
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

const update = async () => {
  updatePage(page.value)
  .then((_res) => {
      console.log(_res)

      ElMessage.success('更新成功')
      show.value = false
      router.back()
    })
    .catch((_err) => {
      ElMessage.error('更新失败')
    })
}

onMounted(async () => {
  if (id) {
    // 获取详情
    const data = await getPage(id)
    page.value = data.data
  }
})
</script>

<template>
  <div>
    <!-- header -->
    <el-row :gutter="20" mb-2>
      <el-col :span="10">
        <el-input
          v-model="page.name"
          placeholder="请输入页面名称"
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
    <MarkDown v-model:text="page.content" />
    <!-- 发布Drawer -->
    <el-drawer v-model="show" width="45%" title="发布页面">
      <!-- content -->
      <el-form :model="page">
        <el-form-item label="页面名称"><el-input v-model="page.name" placeholder="请输入页面名称"></el-input></el-form-item>
        <el-form-item label="页面路径"><el-input v-model="page.path" placeholder="请输入页面路径"></el-input></el-form-item>
        <el-form-item label="页面排序"><el-input-number v-model="page.order"></el-input-number></el-form-item>
        <el-form-item label="开启评论"><el-switch v-model="page.isCommentOpen"></el-switch></el-form-item>
      </el-form>
      
      <!-- footer -->
      <template #footer>
        <el-button size="large" @click="show = false"> 取消 </el-button>
        <el-button type="primary" size="large" @click="submit" v-if="!id">
          发布
        </el-button>
        <el-button type="warning" size="large" @click="update" v-else>更新</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>
