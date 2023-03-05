const useSelected = () => {
  // 是否选中
  const isSelected = ref(false)
  // 选中的行
  const selectedList = ref([])
  // 选中的行的id
  const selectedIds = computed(() => {
    return selectedList.value.map((item: any) => item.id)
  })

  const selectionChange = (rowArr: any) => {
    if (rowArr.length > 0) {
      isSelected.value = true
      selectedList.value = rowArr
    }
    else {
      isSelected.value = false
      selectedList.value = []
    }
  }

  return {
    selectionChange,
    isSelected,
    selectedList,
    selectedIds,
  }
}

export default useSelected
