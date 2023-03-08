export function useTable(requestApi: (params: any) => Promise<any>) {
  let total = ref(0)
  let pagination = reactive({
    page: 1,
    pageSize: 10,
  })
  let tableData = ref([])
  // 默认搜索
  const searchOther = ref('')

  async function getList(query: any = {}) {
    let {data} = await requestApi({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...query,
    })
    tableData.value = data.list || data
    total.value = data.count
  }

  /* action */
  function removeItem(api:any,id: string) {
    api(id).then(() => {
      ElMessage.success('删除成功')
      getList()
    }).catch(() => {
      ElMessage.error('删除失败')
    })
  }
  
  /* 分页功能 */
  function handleSizeChange(currentSize: number) {
    pagination.pageSize = currentSize
  }
  
  function handleCurrentChange(currentPage: number) {
    pagination.page = currentPage
  }
  /* 搜索功能 */
  function handleSearch(query: any = {}) {
    if(!searchOther.value)  {
      ElMessage.error('请输入搜索内容')
      return
    }

    getList(query)
  }
  function resetSearch() {
    searchOther.value = ''
    getList()
  }

  onMounted(() => {
    getList()
  })

  watch(pagination, () => {
    getList()
  }, {deep: true})

  return {
    total,
    searchOther,
    tableData,
    pagination,
    getList,
    handleSizeChange,
    handleCurrentChange,
    handleSearch,
    resetSearch,
    removeItem
  }
}

export default useTable;
