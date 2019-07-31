<template>
    <el-tabs v-model="activename">
        <el-tab-pane label="修改信息" name="first">
            <el-form :model="userinfo[0]" v-if="userinfo.length">
                <el-form-item label="账号">
                    <el-input type="text" v-model="userinfo[0].username" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="text" v-model="userinfo[0].password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateUserinfo">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "userinfo",
        data() {
            return {
                userinfo: [],
                username: "",
                activename: 'first',
            }
        },
        methods: {
            getUserinfo() {
                this.axios.get('/admin/userinfo/'+this.username).then(res => {
                    this.userinfo = res.data;
                })
            },
            updateUserinfo() {
                this.axios.post('/admin/userinfo',this.userinfo[0]).then(res => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.msg);
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created() {
            this.username = sessionStorage.username;
            this.getUserinfo();
        },
    }
</script>

<style scoped>

</style>
