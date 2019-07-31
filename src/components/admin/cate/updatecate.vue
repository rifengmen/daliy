<template>
    <div>
        <h3>栏目内容修改</h3>
        <el-form :model="form" v-loading="loading">
        <el-form-item label="父级栏目">
            <el-select v-model="form.pid" placeholder="请选择父级栏目">
                <el-option :label="item.cname" :value="item.cid" v-for="item in categorys"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="栏目名称">
            <el-input v-model="form.cname"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" plain round @click="updateCate">Submit</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export default {
        name: "updatecate",
        data() {
            return {
                form:{
                    pid: '',
                    cname: '',
                },
                categorys: [],
                loading: true,
                cid: 0,
            }
        },
        methods:{
            //获取一级标题
            getCategorys() {
                this.loading = true;
                this.axios.get('/admin/cate/querylevelcate').then(res => {
                    this.loading= false;
                    this.categorys.push({cname:'一级栏目',cid:0},...res.data);
                })
            },
            //获取当前数据
            getCurrentCate() {
                this.axios.get('/admin/cate/querycurrentcate/'+this.cid).then(res => {
                    this.form = res.data;
                })
            },
            //修改数据
            updateCate() {
                let obj = Object.assign({},this.form,{cid:this.cid});
                this.axios.post('/admin/cate/updatecurrentcate',obj).then(res => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.msg);
                        this.$router.push('/cate');
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg)
                    }
                })
            },
        },
        created() {
            this.cid = this.$route.query.cid;
            this.getCategorys();
            this.getCurrentCate();
        },
    }
</script>

<style scoped>

    h3 {
        font-size: 26px;
    }

</style>
