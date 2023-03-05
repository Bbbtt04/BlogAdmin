<template>
  <el-card>
    <basic-table :table-columns="tableColumns" :request-api="getPageList">
      <template #tableHeader>
          <el-button type="primary" icon="Tickets" @click="openPage">
            新建页面
          </el-button>
      </template>
      <template #options="scope">
        <el-button
            type="primary"
            link
            icon="EditPen"
            @click="edit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            link
            icon="Delete"
            @click="removeItem(deletePage,scope.row.id)"
          >
            删除
          </el-button>
      </template>
    </basic-table>
  </el-card>
</template>

<script setup lang="ts">
import { deletePage, getPage, getPageList } from '@/api/modules/page';
import { BasicTableColumnProps } from '@/components/BasicTable/types';
import router from '@/router';

const { removeItem } = useTable(getPage)

const tableColumns:BasicTableColumnProps[] = [
  {label:'页面名称',prop:'name'},
  {label:'路径',prop:'path'},
  {label:'排序',prop:'order'},
  {label:'阅读量',prop:'views'},
  {label:'状态',prop:'status'},
  {type:'options',label:"操作",prop:''}
]
/* action */
const openPage = () => {
  router.push('page/action')
}

const edit = (id: string) => {
  router.push({path:'page/action',query:{id}})
}
</script>
