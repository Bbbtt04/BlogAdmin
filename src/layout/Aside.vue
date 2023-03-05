<!-- eslint-disable antfu/if-newline -->
<script setup lang="ts">
defineProps<{
  isCollapse: boolean
}>()

const router = useRouter()
const routes = router.getRoutes()
const currentRoute = ref(router.currentRoute.value.path)

const activeRoute = computed(() => {
  if (currentRoute.value === '/dashboard') return '/'
  else return currentRoute.value
})

watchEffect(() => {
  currentRoute.value = router.currentRoute.value.path
})
</script>

<template>
  <div class="aside">
    <div class="title">
      <h2 v-if="!isCollapse">
        博客管理后台
      </h2>
      <h2 v-else>
        后台
      </h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="activeRoute"
        :collapse="isCollapse"
        :unique-opened="true"
        background-color="transparent"
        text-color="#fff"
        :collapse-transition="false"
        router
      >
        <template v-for="route in routes" :key="route.path">
          <!-- 多级菜单 -->
          <template v-if="route.children.length >= 2 && !route.meta.hidden">
            <el-sub-menu :index="route.path">
              <template #title>
                <el-icon>
                  <component :is="route.meta?.icon" class="icon" />
                </el-icon>
                <span>{{ route.meta.title }}</span>
              </template>

              <template v-for="child in route.children" :key="child.path">
                <el-menu-item
                  v-if="!child?.meta?.hidden"
                  :index="child.path"
                  class="sub-menu"
                  :route="child"
                >
                  <span>{{ child?.meta?.title }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <!-- 一级 -->
          <template
            v-else-if="route.children.length === 1 && !route.meta.hidden"
          >
            <el-menu-item :index="route.path" :route="route">
              <el-icon>
                <component :is="route.meta?.icon" class="icon" />
              </el-icon>
              <span>{{ route.meta.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aside {
  .title {
    display: flex;
    justify-content: center;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      padding: 15px 0;
    }
  }
}

.el-icon {
  font-size: 20px;
  color: #ffffff;
}

.el-menu {
  border-right: none;
  transition: width 0.6s;
}

.el-menu,
.el-menu--popup {
  .el-menu-item {
    background-color: #191a20;

    &.is-active {
      background: #060708;

      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        content: '';
        background: var(--el-color-primary);
      }
    }
  }
}
</style>
