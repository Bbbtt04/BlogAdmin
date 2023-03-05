export const useDialog:any = (form: any, getItemById: any ,getItems:any,createItem:any,deleteItemApi: any) => {
  // 是否显示
  const dialogVisible = ref(false)
  const tableData = ref([])
  // dialog表单: form

  // 打开dialog
  const openDialog = () => dialogVisible.value = true
  // 修改列
  const editItem = async (id: string) => {
    let {data} = await getItemById(id)
    form = data
    console.log(form);
    
    dialogVisible.value = true
  }
  /* 删除列 */
  const deleteItem = (id: string) => {
    useHandleData(deleteItemApi,"删除列",id).then(()=>{
      ElMessage.success('删除成功')
      refreshList()
    })
  }
  // 提交表单
  const submitForm = () => {
    createItem(form).then(()=>{
      dialogVisible.value = false
      refreshList()
    })
  }
  /* 刷新列表 */
  const refreshList = async () => {
    let {data} = await getItems()    
    tableData.value = data
  }

  onMounted(() => {
    refreshList()    
  })

  return {
    dialogVisible,
    openDialog,
    tableData,
    submitForm,
    editItem,
    deleteItem
  }
}

export default useDialog
