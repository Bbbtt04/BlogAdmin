<template>
  <div fbc>
    <div class="left">
      <el-card w-2xl>
        <template #header>
          <span class="title font-semibold">文章列表</span>
        </template>
        <tag-pie></tag-pie>
      </el-card>
    </div>
    <div class="right" mr-1>
      <el-card>
        <template #header>
          <span class="title font-semibold">文章阅读Top5</span>
        </template>
        <top-article></top-article>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.left {
  margin-right: 20px;
}
.right {
  flex: 1;
}
</style>
