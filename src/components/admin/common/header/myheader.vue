<template>
  <el-container>
    <el-aside>
      Daliy YouXian
    </el-aside>
    <el-main>
      <el-button type="primary" plain round @click="exit"> logout </el-button>
      <span>
        {{ username }}
      </span>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'myheader',
    data() {
      return {
        username: "",
      }
    },
    methods: {
      exit() {
        sessionStorage.clear();
        this.$router.push('/adminlogin');
        },
    },
    created() {
      this.username = sessionStorage.username;
    },
  }
</script>

<style scoped>
  .el-container {
    line-height: 60px;
  }
  .el-main {
    padding: 0;
  }
  .el-button {
    float: right;
    margin-top: 10px;
    margin-left: 20px;
  }
  span {
    font-size: 20px;
    float: right;
  }
  aside {
    font-size: 26px;
  }
</style>
