<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { go } from '@/utils'
import { register } from '@/api/modules/user'

const loginForm = reactive({
  username: '',
  password: '',
  repassword: '',
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
}

const submit = async () => {
  if (loginForm.password !== loginForm.repassword)
    return ElMessage.error('两次密码不一致')

  const data: any = await register(loginForm)
  if (data.success) {
    // ..
    go('/login')
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <h2 class="title">
        博客后台注册
      </h2>
      <el-form :model="loginForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="重复密码" prop="repassword">
          <el-input
            v-model="loginForm.repassword"
            type="password"
            placeholder="请重复密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">
            注册
          </el-button>
        </el-form-item>
      </el-form>
      <h5>
        <a href="#" @click="go('/login')">Or 登录</a>
      </h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);

  .content {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 20px;
    }
  }

  h5 {
    color: #999;
    margin-top: 20px;
  }
}
</style>
