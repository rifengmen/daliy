<template>
    <el-tabs v-model="activename">
        <el-tab-pane label="查看栏目" name="first">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="CID">
                    <el-input v-model="formInline.cid" placeholder="cid"></el-input>
                </el-form-item>
                <el-form-item label="栏目名称">
                    <el-input v-model="formInline.cname" placeholder="栏目名称"></el-input>
                </el-form-item>
                <el-form-item label="PID">
                    <el-input v-model="formInline.pid" placeholder="pid"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="cateArr" v-if="cateArr.length" v-loading="loading">
                <el-table-column label="cid" prop="cid"></el-table-column>
                <el-table-column label="栏目名称" prop="cname"></el-table-column>
                <el-table-column label="所属父栏目" prop="pid"></el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'updatecate',query:{cid:scope.row.cid}}" tag="el-button" class="el-button el-button--text el-button--small">修改</router-link>
                        <el-button type="text" size="small" @click="deleteCate(scope.row.cid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentpage"
                    :page-sizes="[10,25,50,100]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total='total'
                    background>
                </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="添加栏目" name="second">
            <el-form :model="form" v-loading="loading">
                <el-form-item label="父级栏目">
                    <el-select v-model="form.pid" placeholder="请选择父级栏目">
                        <el-option label="一级栏目" value="0"></el-option>
                        <el-option :label="item.cname" :value="item.cid" v-for="item in categorys"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="栏目名称" :rules="[{required: true}]">
                    <el-input v-model="form.cname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain round @click="insertCate">Submit</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "cate",
        data() {
            return {
                categorys: [],
                cateArr: [],
                form: {
                    pid: "0",
                    cname: "",
                },
                formInline: {
                    cid: '',
                    cname: '',
                    pid: '',
                },
                activename: "first",
                loading:true,
                currentpage: 1,
                total: 0,
                size: 10,
            }
        },
        methods: {
            //页码改变时
            currentChange(page) {
                this.currentpage = page;
                this.getTables();
            },
            //页数改变时
            sizeChange(size) {
                this.size = size;
                this.currentpage = 1;
                this.getTables();
            },
            //搜索
            search() {
                this.currentpage = 1;
                this.getTables();
            },
            //获取所有数据
            getTables() {
                this.loading = true;
                let obj = Object.assign({},this.formInline,{currentpage:this.currentpage},{size:this.size});
                this.axios.get('/admin/cate/querycate',{params:obj}).then(res => {
                    this.loading = false;
                    this.total = res.data.total;
                    this.cateArr = res.data.data;
                })
            },
            //获取一级标题
            getCategorys() {
                this.loading = true;
                this.axios.get('/admin/cate/querylevelcate').then(res => {
                    this.loading= false;
                    this.categorys = res.data;
                })
            },
            //插入数据
            insertCate() {
                this.loading = true;
                this.axios.post('/admin/cate/insertcate',this.form).then(res => {
                    this.loading = false;
                    if (res.data.code === 0) {
                        this.getCategorys();
                        this.form.cname = '';
                        this.form.pid = '0';
                        this.$message.success(res.data.msg);
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            //删除数据
            deleteCate(cid) {
                this.loading = true;
                this.axios.get('/admin/cate/deletecate',{params:{cid:cid}}).then(res => {
                    this.loading = false;
                    if (res.data.code === 0) {
                        this.cateArr = this.cateArr.filter(ele => ele.cid != cid);
                        --this.total;
                        this.$message.success(res.data.msg);
                    }
                    else if (res.data.code === 1) {
                        this.$message.error(res.data.msg);
                    }
                    else if (res.data.code === 2) {
                        this.$message.error(res.data.msg);
                    }
                })
            },
        },
        watch: {
            activename(nval,oval) {
                if (nval === "first") {
                    this.getTables();
                }
                else if (nval === "second") {
                    this.getCategorys();
                }
            },
        },
        created() {
            this.getTables();
        },
    }
</script>

<style scoped>

</style>
