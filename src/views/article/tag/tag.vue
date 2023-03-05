<script setup lang="ts" name="TagList">
import { useHandleData } from '@/hooks/useHandleData'
import { createTag, deleteTag, getTagList, updateTag } from '@/api/modules/tags'

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
    { required: true, message: '请输入标签名', trigger: 'blur' },
  ],
}

const refreshList = async () => {
  // 重新获取标签列表
  const res = await getTagList()
  list.value = res.data
}

const submitForm = () => {
  if (formData.name === '')
    return
  useHandleData(createTag, '创建新标签', formData).then((success) => {
    if (success) {
      // 重新获取标签列表
      refreshList()
    }
  })
}

const deleteItem = (id: string) => {
  useHandleData(deleteTag, '删除标签', { id }).then((success) => {
    if (success) {
      // 重新获取标签列表
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
  useHandleData(updateTag, '更新标签', selectedItem.value).then((success) => {
    if (success) {
      // 重新获取标签列表
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
      <el-card header="管理标签">
        <el-form :model="formData" :rules="rules">
          <el-form-item label="标签名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入标签名" />
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
      <el-card header="所有标签">
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
