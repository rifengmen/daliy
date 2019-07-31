<template>
    <div class="box">
        <h3>后台登录</h3>
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="Password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // import axios from  'axios';
    export default {
        name: "login",
        data:function () {
            return {
                form:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onSubmit(){
                this.$refs.form.validate((valid)=> {
                    if (valid){
                        this.axios.post('/admin/login', this.form).then(res => {
                            if (res.data.code == 0) {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.$router.push('/main');
                                sessionStorage.username = this.form.username;
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<!-- style scoped 只作用于当前组件 防止组件间名字冲突-->
<style scoped>
    h3 {
        font-size: 40px;
    }
    .box{
        width: 300px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50% ,-50% ,0);
        border: 1px solid #d6e9c6;
        border-radius: 4px;
        padding: 20px 15px;
        box-shadow: 0 0 20px rgba(0,0,0,.1);
    }
</style>
