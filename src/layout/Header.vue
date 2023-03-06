<script setup lang="ts">
import Storage from '@/utils/Storage'
// emit
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue'
import { ACCESS_TOKEN } from '@/utils/contants';

const userStore = useUserStore()
const router = useRouter()
const emit = defineEmits(['toggleCollapse'])

const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('toggleCollapse', isCollapse.value)
}

const outLogin = () => {
  Storage.remove(ACCESS_TOKEN)
  router.push('/login')
  ElMessage.success('退出成功')
}
</script>

<template>
  <div class="header">
    <div class="header-left">
      <div class="icon-collapse" @click="toggleCollapse">
        <icon-park-solid-menu-fold-one v-if="isCollapse" />
        <icon-park-solid-menu-unfold-one v-else />
      </div>
      <Breadcrumb />
    </div>
    <div class="header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <icon-park-solid-user />
          <span class="username">{{ userStore.username }}</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 2px);
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  .header-left {
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 20px;
      color: #333;
    }
    .icon-collapse {
      margin-right: 10px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .username {
      margin-left: 5px;
      color: #333;
    }
  }
}
</style>
