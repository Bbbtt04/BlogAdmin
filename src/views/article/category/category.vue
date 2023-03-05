<script setup lang="ts" name="CategoryList">
import { useHandleData } from '@/hooks/useHandleData'
import { createCategory, deleteCategory, getCategoryList, updateCategory } from '@/api/modules/category'

const list: any = ref([])
const selectedItem: any = ref({
  id: '',
  name: '',
})

const formData = reactive({
  name: '',
})
const rules = {
  name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
  ],
}

const refreshList = async () => {
  // 重新获取分类列表
  const res = await getCategoryList()
  list.value = res.data
}

const submitForm = () => {
  if (formData.name === '')
    return
  useHandleData(createCategory, '创建新分类', formData).then((success) => {
    if (success) {
      // 重新获取分类列表
      refreshList()
    }
  })
}

const deleteItem = (id: string) => {
  useHandleData(deleteCategory, '删除分类', { id }).then((success) => {
    if (success) {
      // 重新获取分类列表
      refreshList()
    }
  })
}

const selectItem = (item: any) => {
  selectedItem.value = {
    id: item.id,
    name: item.name,
  }
  console.log(selectedItem.value)
}

/* 更新item */
const updateItem = () => {
  useHandleData(updateCategory, '更新分类', selectedItem.value).then((success) => {
    if (success) {
      // 重新获取分类列表
      refreshList()
    }
  })
}
/* 取消选中（清空选中 */
const unSelected = () => {
  selectedItem.value = {
    id: '',
    name: '',
  }
}

onMounted(() => {
  refreshList()
})

watch(selectedItem, (newVal) => {
  formData.name = newVal.name
})
</script>

<template>
  <el-row ref="formRef" :gutter="20">
    <el-col :span="8">
      <el-card header="管理分类">
        <el-form :model="formData" :rules="rules">
          <el-form-item label="分类名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入分类名" />
          </el-form-item>
          <el-button v-if="!selectedItem.id" type="primary" @click="submitForm()">
            保存
          </el-button>
          <el-button v-if="selectedItem.id" type="primary" @click="updateItem()">
            更新
          </el-button>
          <el-button v-if="selectedItem.id" type="warning" @click="unSelected()">
            取消
          </el-button>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="15">
      <el-card header="所有分类">
        <el-tag v-for="item in list" :key="item.id" closable @close="deleteItem(item.id)" @click="selectItem(item)">
          {{ item.name }}
        </el-tag>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-tag {
  margin: 10px;
  cursor: pointer;
}
</style>
