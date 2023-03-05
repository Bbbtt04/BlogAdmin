<script setup>
const route = useRoute()
const router = useRouter()
const keepAliveStore = useKeepAliveStore()

const currentRoute = computed(() => {
  return {
    path: route.path,
    name: route.name,
    title: route.meta.title,
    icon: route.meta.icon,
    isKeepAlive: route.meta?.keepAlive
  }
})
const tabsMenuList = ref([])

/* 添加当前tab */
const addTab = (route) => {
  const index = tabsMenuList.value.findIndex(item => item.path === route.path)
  if (index === -1) {
    tabsMenuList.value.push(currentRoute.value)
    if(route.isKeepAlive) {
      keepAliveStore.addKeepAlive(route.name)
      console.log(keepAliveStore.getKeepAliveList);
    }
  }
}
/* 监听当前路由变化 */
watch(currentRoute, () => {
  addTab(currentRoute.value)
})

/* 点击事件 */
const handleClick = (tab) => {
  router.push(tab.props.name)
}
/* 关闭事件 */
const handleClose = (tab) => {
  const index = tabsMenuList.value.findIndex(item => item.path === tab)
  if (tabsMenuList.value.length === 1) {
    // 一个tab时不允许关闭
    return
  }
  /* 如果删除第一个 */
  const nextPage = index === 0 ? tabsMenuList.value[index + 1].path : tabsMenuList.value[index - 1].path
  keepAliveStore.removeKeepAlive(tabsMenuList.value[index].name)
  // log
  console.log(keepAliveStore.getKeepAliveList);

  tabsMenuList.value.splice(index, 1)
  router.push(nextPage)
}
/* mounted */
onMounted(() => {
  addTab(currentRoute.value)
})
</script>

<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="currentRoute.path"
        type="card"
        :editable="tabsMenuList.length >= 2"
        @tab-click="handleClick"
        @tab-remove="handleClose"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        >
          <!-- icon -->
          <template #label>
            <el-icon class="tabs-icon">
              <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss'
</style>
