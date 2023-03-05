<script lang="ts" setup>
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const breadList = computed(() => {
  return route.matched.filter(item => item.meta.title)
})
const handleClick = (item: any) => {
  router.push(item.path)
}
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb" appear>
      <template v-for="(item, index) in breadList" :key="index">
        <template v-if="item.children.length >= 2">
          <el-breadcrumb-item>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ item.meta.title }}
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="(child, index) in item.children" :key="index" @click="handleClick(child)">
                    {{ child?.meta?.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-breadcrumb-item>
        </template>
        <el-breadcrumb-item v-else :to="item.path">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
.el-breadcrumb {
  position: relative;
  padding: 0 0 3px 10px;
}
</style>
