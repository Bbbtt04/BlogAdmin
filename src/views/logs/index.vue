<script setup lang="tsx">
import { createLog, deleteLog, getLog, getLogList } from '@/api/modules/logs'
import { BasicTableColumnProps } from '@/components/BasicTable/types'
import useDialog from '@/hooks/useDialog'

const tableColumn: BasicTableColumnProps[] = [
  {
    label: '日期',
    prop: 'date',
    render: (scope) => {
      return <>{scope.row.date}</>
    },
  },
  { label: '日志描述', prop: 'desc' },
  { type: 'options', label: '操作', prop: '' },
]
let form = reactive({
  date: 0,
  desc: '',
})
const { dialogVisible, openDialog, submitForm, editItem, deleteItem } =
  useDialog(form, getLog, getLogList, createLog, deleteLog)
</script>

<template>
  <div>
    <el-card>
      <basic-table :tableColumns="tableColumn" :request-api="getLogList">
        <template #tableHeader="scope">
          <el-button type="primary" icon="CirclePlus" @click="openDialog">
            新建日志
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
            class="ml-8"
            @click="deleteItem(scope.row.id)"
          >
            删除
          </el-link>
        </template>
      </basic-table>
      <el-dialog v-model="dialogVisible" title="新建日志" width="500">
        <el-form :model="form">
          <el-form-item label="日志时间">
            <!-- 时间选择 -->
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="请选择日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="日志内容">
            <el-input
              type="textarea"
              placeholder="请输入日志内容"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped></style>
