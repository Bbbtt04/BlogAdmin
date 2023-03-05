<script setup lang="tsx" name="LinksList">
import {
  getLinkList,
  createLink,
  deleteLink,
  updateLink,
  getLink,
} from '@/api/modules/links'
import { BasicTableColumnProps } from '@/components/BasicTable/types'
import { ElSwitch } from 'element-plus'

const count = ref(0)
const dialogVisible = ref(false)
const defaultLogo =
  'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
// 表单数据
let form = reactive({
  url: '',
  avatar: '',
  desc: '',
  name: '',
})

const tableColumns: BasicTableColumnProps[] = [
  {
    label: '博客logo',
    prop: 'avatar',
    render: (scope) => {
      return (
        <>
          <el-avatar size={50} src={scope.row.avatar || defaultLogo}>
            {scope.row.avatar}
          </el-avatar>
        </>
      )
    },
  },
  {
    label: '地址',
    prop: 'url',
    render: ({ row }) => {
      return (
        <>
          <el-link href={row.url} target="_blank">
            {row.url}
          </el-link>
        </>
      )
    },
  },
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '描述',
    prop: 'desc',
  },
  {
    label: '状态',
    prop: 'status',
    render: ({ row }) => {
      return h(ElSwitch, {
        modelValue: row.status,
        'onUpdate:modelValue': (value) => {
          useHandleData(
            updateLink,
            '修改友联状态',
            Object.assign(row, { status: value }),
          ).catch(() => {
            row.status = !row.status
          })
        },
      })
    },
  },
  {
    type: 'options',
    label: '操作',
    prop: 'options',
  },
]

const openDialog = () => {
  // TODO: 新建链接
  dialogVisible.value = true
}
/* 创建友联 */
const submitForm = () => {
  createLink(form).then((res) => {
    dialogVisible.value = false
    getLinks()
  })
}

const getLinks = async () => {
  const res = await getLinkList()
  count.value = res.data.count
}

/* 删除操作 */
const deleteItem = (id: any) => {
  useHandleData(deleteLink, '删除友联', id).then(() => {
    getLinks()
  })
}
/* 编辑操作 */
const editItem = async (id: any) => {
  let { data } = await getLink(id)
  form = data
  dialogVisible.value = true
}

onMounted(() => {
  getLinks()
})
</script>

<template>
  <div>
    <el-card>
      <basic-table
        :request-api="getLinkList"
        :table-columns="tableColumns"
        :is-page="true"
      >
        <template #tableHeader="scope">
          <el-button type="primary" icon="CirclePlus" @click="openDialog">
            新建链接
          </el-button>
        </template>

        <template #options="scope">
          <el-link
            type="primary"
            icon="CirclePlus"
            @click="editItem(scope.row.id)"
          >
            编辑
          </el-link>
          <el-link
            type="primary"
            icon="CirclePlus"
            @click="deleteItem(scope.row.id)"
            class="ml-2"
          >
            删除
          </el-link>
        </template>
      </basic-table>
    </el-card>
    <!-- 新建 -->
    <el-dialog v-model="dialogVisible" title="新建友联" width="500">
      <el-form :model="form">
        <el-form-item label="博客地址">
          <el-input
            v-model="form.url"
            prop="url"
            placeholder="请输入博客地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客简介">
          <el-input
            v-model="form.desc"
            prop="desc"
            type="textarea"
            placeholder="请输入博客简介"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客名称">
          <el-input
            v-model="form.name"
            prop="name"
            placeholder="请输入博客名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客logo">
          <el-input
            v-model="form.avatar"
            prop="avatar"
            placeholder="请输入博客logo"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
