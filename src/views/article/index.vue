<script setup lang="tsx">
import { ElSwitch } from 'element-plus'
import {
  deleteArticle,
  getArticleList,
  updateArticle,
} from '@/api/modules/article'
import { getCategory } from '@/api/modules/category'
import { getTag } from '@/api/modules/tags'
import type { BasicTableColumnProps } from '@/components/BasicTable/types'
import router from '@/router'
import { formatTime } from '@/utils'

/* ref */
const I:any = ref(null)

const ArticleColumnTable: BasicTableColumnProps[] = [
  {
    type: 'section',
    prop: 'null',
    label: 'section',
  },
  {
    label: '标题',
    prop: 'title',
    width: '100px',
  },
  {
    type: 'number',
    label: '观看次数',
    prop: 'views',
    width: '60px',
  },
  {
    type: 'tag',
    label: '标签',
    prop: 'tags',
    api: getTag,
  },
  {
    type: 'tag',
    label: '分类',
    prop: 'category',
    width: '200px',
    api: getCategory,
  },
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
    label: '状态',
    prop: 'status',
    render: (scope) => {
      return (
        <>
          <el-tag>{scope.row.status === 0 ? '发布' : '未发布'}</el-tag>
        </>
      )
    },
  },
  {
    label: '是否置顶',
    prop: 'isTop',
    render: ({ row }) => {
      return h(ElSwitch, {
        modelValue: row.isTop,
        'onUpdate:modelValue': (value) => {
          useHandleData(
            updateArticle,
            '修改置顶',
            Object.assign(row, { isTop: value }),
          ).catch(() => {
            row.isTop = !row.isTop
          })
        },
      })
    },
    width: '100px',
  },
  {
    type: 'options',
    prop: 'options',
    label: '操作',
    fixed: 'right',
    width: '250px',
  },
]

const tableData = ref([])

/* 刷新列表 */
const refreshList = async () => {
  I.value.getList()
}

/* 删除选中项 */
const deleteSelectedItem = (ids: Array<String>) => {
  ids.map(async (id) => {
    await deleteArticle(id)
  })
  // 刷新列表
  refreshList()
}
/* 新建文章 */
const action = () => {
  router.push({ path: '/article/action' })
}
/* 编辑 */
const editArticle = ({ row }: any) => {
  router.push({ path: '/article/action', query: { id: row.id } })
}
/* 删除 */
const removeArticle = (id: string) => {
  useHandleData(deleteArticle, '删除文章', id).then(() => {
    refreshList()
  })
}

onMounted(() => {
  refreshList()
})
</script>

<template>
  <div>
    <ElCard>
      <BasicTable
        :table-columns="ArticleColumnTable"
        :table-data="tableData"
        :is-page="true"
        :request-api="getArticleList"
        ref="I"
      >
        <!-- Header -->
        <template #tableHeader="scope">
          <el-button type="primary" icon="CirclePlus" @click="action">
            新建文章
          </el-button>
          <el-button
            plain
            type="danger"
            icon="Delete"
            :disabled="!scope?.isSelected"
            @click="deleteSelectedItem(scope.selectedIds)"
          >
            批量删除
          </el-button>
        </template>
        <!-- 表格操作 -->
        <template #options="scope">
          <el-button
            type="primary"
            link
            icon="EditPen"
            @click="editArticle(scope)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            link
            icon="Delete"
            @click="removeArticle(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </BasicTable>
    </ElCard>
  </div>
</template>

<style scoped></style>
