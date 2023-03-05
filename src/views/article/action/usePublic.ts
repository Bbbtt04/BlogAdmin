import type { Ref } from 'vue'

const usePublic = (show: Ref<boolean>) => {
  const defaultVal = () => ({
    title: '',
    content: '',
    outline: '',
    cover: '',
    status: 0,
    views: 0,
    like: 0,
    isTop: false,
    tagsId: [],
    categoryId: [],
  })
  // 初始化文章
  const article = ref(defaultVal())


  return {
    article,
  }
}

export default usePublic
