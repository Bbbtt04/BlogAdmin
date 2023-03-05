<script setup>
import Aside from './Aside.vue'
import Header from './Header.vue'
import Tabs from './Tabs/index.vue'
// store
const keepAliveStore = useKeepAliveStore()
const isCollapse = ref(false)

const toggle = (val) => {
  isCollapse.value = val
}
watch(isCollapse, (val) => {
  if (val) document.querySelector('.el-aside').style.width = '60px'
  else document.querySelector('.el-aside').style.width = '200px'
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <Header @toggle-collapse="toggle" />
        </el-header>
        <el-main>
          <Tabs />
          <div class="main">
            <router-view v-slot="{ Component, route }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive :include="keepAliveStore.include">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.common-layout {
  .el {
    &-aside {
      height: 100vh;
      background-color: #191a20;
      transition: width 0.6s;
      overflow: hidden;
    }

    &-header {
      background-color: #ffffff;
      padding: 0;
    }
    &-main {
      padding: 0;
      height: calc(100vh - 60px);
      transition: all 0.6s;
    }
  }
}

.main {
  padding: 15px 10px 0 10px;
  background-color: #f5f7f9;
  min-height: calc(100vh - 115px);
  position: relative;
}

main::-webkit-scrollbar {
  width: 7px;
}

main::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}

.fade-transform--move,
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter,
.fade-transform-leave-to {
  opacity: 0;
  transform: scale(1.2);
  transform-origin: center center;
}
</style>
