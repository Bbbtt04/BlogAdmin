<script setup lang="ts">
import type { BasicTableColumnProps } from './types'
import useSelected from '@/hooks/useSelected'
import useTable from '@/hooks/useTable'

const props = defineProps<{
  requestApi: (params: any) => Promise<any> // 请求表格数据的api ==> 必传
  tableColumns: BasicTableColumnProps[]
  isPage?: boolean
}>()

const isShowPage = ref(props?.isPage ?? true)
/* 选中逻辑 hooks */
const { selectionChange, selectedIds, isSelected } = useSelected()

const {
  total,
  searchOther,
  tableData,
  handleCurrentChange,
  handleSizeChange,
  handleSearch,
  resetSearch,
  getList
} = useTable(props.requestApi)

defineExpose({
  getList
})
</script>

<template>
  <div>
    <div class="fbc mb-8">
      <div class="header-lf">
        <slot
          name="tableHeader"
          :selected-ids="selectedIds"
          :is-selected="isSelected"
        />
      </div>
      <div class="header-ri" display="flex">
        <el-input
          placeholder="请输入搜索的内容"
          class="w-2 mr-2"
          v-model="searchOther"
        />
        <el-button type="primary" @click="handleSearch({ title: searchOther })">
          搜索
        </el-button>
        <el-button plain @click="resetSearch">重置</el-button>
      </div>
    </div>
    <!-- 表格主体 -->
    <el-table
      :data="tableData"
      :border="true"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽 -->
      <slot />

      <template v-for="item in tableColumns" :key="item.prop">
        <!-- normal -->
        <el-table-column v-if="!item.type && !item.render" v-bind="item" />
        <!-- section -->
        <el-table-column
          v-else-if="item.type === 'section'"
          type="selection"
          width="55"
        />
        <!-- expand -->
        <el-table-column v-else-if="item.type === 'expand'" v-bind="item">
          <template #default="scope">
            {{ scope.row }}
          </template>
        </el-table-column>

        <!-- render -->
        <el-table-column v-else-if="item.render" v-bind="item">
          <template #default="scope">
            <component :is="item.render(scope)" />
          </template>
        </el-table-column>

        <!-- other -->
        <el-table-column v-else-if="item.type === 'image'" v-bind="item" center>
          <template #default="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row[item.prop]"
            />
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type === `number`"
          v-bind="item"
          center
        >
          <template #default="scope">
            <el-tag round>
              {{ scope.row[item.prop] }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.type === `tag`" v-bind="item" center>
          <template #default="scope">
            <el-tag v-if="scope.row[item.prop]?.name" ml-1>
              {{ scope.row[item.prop].name }}
            </el-tag>
            <template v-else>
              <template v-for="e in scope.row[item.prop]" :key="e.name">
                <el-tag ml-1>
                  {{ e.name }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type === `options`"
          v-bind="item"
          align="center"
        >
          <template #default="scope">
            <slot name="options" :row="scope.row" />
          </template>
        </el-table-column>
      </template>

      <!-- 分页组件 -->
    </el-table>

    <div v-if="isShowPage">
      <div mt-4 float-right>
        <el-pagination
          background
          layout="sizes,total,prev, pager, next"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <div clear-both></div>
    </div>
  </div>
</template>
