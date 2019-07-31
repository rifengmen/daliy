<template>
    <el-tabs v-model="activename">
        <el-tab-pane label="查看信息" name="first">
            <el-table :data="info">
                <el-table-column fixed label="网站名称" prop="names"></el-table-column>
                <el-table-column label="网站关键字" prop="keywords"></el-table-column>
                <el-table-column label="网站描述" prop="des"></el-table-column>
                <el-table-column label="联系方式" prop="phone"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="创始人" prop="leader"></el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="修改信息" name="second">
                <el-form :model="info[0]" v-if="info.length">
                    <el-form-item label="网站名称">
                        <el-input type="text" v-model="info[0].names"></el-input>
                    </el-form-item>
                    <el-form-item label="网站关键字">
                        <el-input type="text" v-model="info[0].keywords"></el-input>
                    </el-form-item>
                    <el-form-item label="网站描述">
                        <el-input type="textarea" v-model="info[0].des"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input type="text" v-model="info[0].phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input type="text" v-model="info[0].address"></el-input>
                    </el-form-item>
                    <el-form-item label="创始人">
                        <el-input type="text" v-model="info[0].leader" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateInfo">Submit</el-button>
                    </el-form-item>
                </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
  export default {
      name: 'webinfo',
      data() {
          return {
              info:[],
              activename: 'first'
          }
      },
      methods: {
          updateInfo() {
              this.axios.post('/admin/webinfo',this.info[0]).then(res => {
                  if (res.data.code === 0) {
                      this.$message.success(res.data.msg)
                  }
                  else if (res.data.code === 1) {
                      this.$message.error(res.data.msg)
                  }
              })
          },
          getInfo() {
              this.axios.get('/admin/webinfo').then(res => {
                  this.info = res.data;
              })
          },
      },
      created() {
          this.getInfo();
      },
  }
</script>

<style scoped>

</style>
