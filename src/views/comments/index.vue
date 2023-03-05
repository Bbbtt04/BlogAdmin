<template>
  <el-card>
    <basic-table :request-api="getcomments" :table-columns="tableColumns">
      <template #tableHeader>
        <span font-mono text-2xl># 评论管理</span>
      </template>
      <template #options="scope">
        <el-button icon="Delete" type="primary" link size="large" @click="removeItem(deleteComment,scope.row.id)">
          删除
        </el-button>
      </template>
    </basic-table>
  </el-card>
</template>

<script setup lang="tsx" name="">
import { deleteComment, getcomments } from '@/api/modules/comments'
import { BasicTableColumnProps } from '@/components/BasicTable/types'
import { formatTime } from '@/utils'
import UAParser from 'ua-parser-js'

const tableData = ref([])
const { removeItem } = useTable(getcomments)
const tableColumns: BasicTableColumnProps[] = [
  { label: '评论人', prop: 'name' },
  {
    label: 'ip',
    prop: 'ip',
    render: (scope) => {
      return (
        <>
          <el-tag>{scope.row.ip}</el-tag>
        </>
      )
    },
  },
  {
    label: 'ua',
    prop: 'userAgent',
    render: (scope) => {
      const ua = scope.row.userAgent
      const parser = new UAParser(ua)
      const browser = parser.getBrowser()
      const os = parser.getOS()

      return (
        <>
          <el-tag>{browser.name + ' ' + browser.version}</el-tag>
          <el-tag style={{ marginLeft: '10px' }}>
            {os.name + '' + os.version}
          </el-tag>
        </>
      )
    },
  },
  { label: '留言内容', prop: 'content' },
  {
    label: '创建时间',
    prop: 'createdAt',
    width: '240px',
    render: (scope) => {
      const time = formatTime(scope.row.createdAt)
      return (
        <>
          <el-tag type="warning">{time}</el-tag>
        </>
      )
    },
  },
  {
    type:'options',
    label: '操作',
    prop: '',
  },
]

onMounted(async () => {
  const res = await getcomments()
  console.log(res)
  tableData.value = res.data.list
})
</script>


<style scoped>
span {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 10px;
}
</style>
